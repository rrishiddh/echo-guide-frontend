import { Metadata } from "next";
import ProtectedRoute from "@/src/components/common/ProtectedRoute";
import PageHeader from "@/src/components/common/PageHeader";
import BackButton from "@/src/components/common/BackButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import ChangePasswordForm from "@/src/components/forms/ChangePasswordForm";

export const metadata: Metadata = {
  title: "Change Password | Echo Guide",
  description: "Update your account password",
};

const ChangePasswordPage = () => {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <PageHeader
          title="Change Password"
          description="Update your account password"
        >
          <BackButton fallbackUrl="/profile" />
        </PageHeader>

        <div className="container px-4 py-8 max-w-2xl">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Password Security Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-blue-600 font-bold mt-0.5">✓</span>
                <p className="text-sm text-gray-700">
                  Use a password with at least 8 characters
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-blue-600 font-bold mt-0.5">✓</span>
                <p className="text-sm text-gray-700">
                  Include uppercase and lowercase letters
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-blue-600 font-bold mt-0.5">✓</span>
                <p className="text-sm text-gray-700">
                  Include numbers and special characters
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-blue-600 font-bold mt-0.5">✓</span>
                <p className="text-sm text-gray-700">
                  Avoid using personal information
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Update Password</CardTitle>
            </CardHeader>
            <CardContent>
              <ChangePasswordForm />
            </CardContent>
          </Card>

          <Alert className="mt-8 border-blue-200 bg-blue-50">
            <AlertCircle className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-800">
              For your security, you will be logged out of all other sessions after changing your password.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default ChangePasswordPage;
