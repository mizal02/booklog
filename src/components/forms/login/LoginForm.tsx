import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginFormSchema } from "./LoginFormSchema";
import { z } from "zod";
import supabase from "@/lib/supabase-client";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const LoginForm = () => {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (formData: z.infer<typeof loginFormSchema>) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      setMessage(error.message);
      return;
    }

    if (data) {
      navigate("/dashboard");
    }
  };

  return (
    <div className="h-fit w-[40dvw] border border-[var(--border)] rounded-lg shadow-sm p-6">
      <h3 className="text-center text-3xl font-semibold mb-8">Sign In</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
            <Button type="submit">Sign In</Button>
            <p>
              Don't have an account?{" "}
              <span className="font-semibold text-brown">
                <Link to="/register">Sign up</Link>
              </span>
            </p>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
