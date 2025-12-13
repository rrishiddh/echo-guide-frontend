
import RegisterForm from "@/src/components/forms/RegisterForm";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sign Up | Echo Guide",
  description: "Create a new Echo Guide account",
};

const RegisterPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Create Account</h2>
        <p className="text-gray-600 mt-2">Join Echo Guide to book tours or become a guide</p>
      </div>

      <RegisterForm />

      <div className="text-center text-sm text-gray-600">
        Already have an account?{" "}
        <Link href="/auth/login" className="text-blue-600 hover:text-blue-700 font-semibold">
          Sign in
        </Link>
      </div>
    </div>
  );
};

export default RegisterPage;