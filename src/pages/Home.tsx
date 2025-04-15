import { Link } from "react-router";

const HomePage = () => {
  return (
    <div>
      <h2 className="font-medium text-3xl">Welcome to Book Log</h2>
      <p className="text-dark">
        Don’t have an account?{" "}
        <span>
          <Link
            className="text-brown no-underline font-semibold
"
            to="/register"
          >
            Sign up
          </Link>
        </span>
      </p>
    </div>
  );
};

export default HomePage;
