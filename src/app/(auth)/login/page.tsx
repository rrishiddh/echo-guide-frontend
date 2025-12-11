
import LoginForm from "@/src/components/forms/LoginForm";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Login | Echo Guide",
  description: "Login to your Echo Guide account",
};

const LoginPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Welcome Back</h2>
        <p className="text-gray-600 mt-2">Sign in to your account to continue</p>
      </div>

      <LoginForm />

      <div className="text-center text-sm text-gray-600">
        Don&apos;t have an account?{" "}
        <Link href="/auth/register" className="text-blue-600 hover:text-blue-700 font-semibold">
          Sign up
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;