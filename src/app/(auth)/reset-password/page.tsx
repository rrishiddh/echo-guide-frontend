
import ResetPasswordForm from "@/src/components/forms/ResetPasswordForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reset Password | Echo Guide",
  description: "Reset your Echo Guide password",
};

const ResetPasswordPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Reset Password</h2>
        <p className="text-gray-600 mt-2">
          Enter your new password below
        </p>
      </div>

      <ResetPasswordForm />
    </div>
  );
};

export default ResetPasswordPage;