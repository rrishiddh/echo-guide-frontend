
import ForgotPasswordForm from "@/src/components/forms/ForgotPasswordForm";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Forgot Password | Echo Guide",
  description: "Reset your Echo Guide password",
};

const ForgotPasswordPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Forgot Password?</h2>
        <p className="text-gray-600 mt-2">
          Enter your email and we&apos;ll send you a link to reset your password
        </p>
      </div>

      <ForgotPasswordForm />

      <div className="text-center text-sm text-gray-600">
        Remember your password?{" "}
        <Link href="/auth/login" className="text-blue-600 hover:text-blue-700 font-semibold">
          Sign in
        </Link>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;