import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerFormSchema } from "./RegisterFormSchema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { Link, useNavigate } from "react-router";
import { useState } from "react";
import supabase from "@/lib/supabase-client";

const RegisterForm = () => {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (formData: z.infer<typeof registerFormSchema>) => {
    const { data, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: {
          username: formData.username,
        },
      },
    });

    if (error) {
      setMessage(error.message);
      return;
    }

    if (data) {
      setMessage("User account created!");
      navigate("/login");
    }
  };

  return (
    <div className="h-fit w-[40dvw] border border-[var(--border)] rounded-lg shadow-sm p-6">
      <h3 className="text-center text-3xl font-semibold mb-8">Sign Up</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {message && <p className="text-destructive text-center">{message}</p>}
          <div className="flex flex-col gap-4 items-center">
            <Button type="submit">Sign Up</Button>
            <p>
              Already have an account?{" "}
              <span className="font-semibold text-brown">
                <Link to="/login">Sign in</Link>
              </span>
            </p>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default RegisterForm;
