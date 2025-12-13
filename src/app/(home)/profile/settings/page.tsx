
import { Metadata } from "next";
import ProtectedRoute from "@/src/components/common/ProtectedRoute";
import PageHeader from "@/src/components/common/PageHeader";
import BackButton from "@/src/components/common/BackButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

export const metadata: Metadata = {
  title: "Settings | Echo Guide",
  description: "Manage your account settings",
};

const SettingsPage = () => {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <PageHeader
          title="Settings"
          description="Manage your account settings"
        >
          <BackButton fallbackUrl="/profile" />
        </PageHeader>

        <div className="container px-4 py-8 max-w-3xl space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Privacy Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="privateProfile">Private Profile</Label>
                    <p className="text-sm text-gray-600">
                      Hide your profile from public search
                    </p>
                  </div>
                  <Checkbox id="privateProfile" />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="showEmail">Show Email</Label>
                    <p className="text-sm text-gray-600">
                      Allow others to see your email address
                    </p>
                  </div>
                  <Checkbox id="showEmail" defaultChecked />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="showPhoneNumber">Show Phone Number</Label>
                    <p className="text-sm text-gray-600">
                      Allow others to contact you via phone
                    </p>
                  </div>
                  <Checkbox id="showPhoneNumber" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Activity Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="showActivity">Show Last Active</Label>
                    <p className="text-sm text-gray-600">
                      Let others see when you were last active
                    </p>
                  </div>
                  <Checkbox id="showActivity" defaultChecked />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="allowMessages">Allow Messages</Label>
                    <p className="text-sm text-gray-600">
                      Allow others to send you messages
                    </p>
                  </div>
                  <Checkbox id="allowMessages" defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Email Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="primaryEmail">Primary Email</Label>
                  <Input
                    id="primaryEmail"
                    type="email"
                    defaultValue="john@example.com"
                    disabled
                    className="mt-1"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Your primary email cannot be changed here
                  </p>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="marketingEmails">Marketing Emails</Label>
                    <p className="text-sm text-gray-600">
                      Receive promotional offers and updates
                    </p>
                  </div>
                  <Checkbox id="marketingEmails" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="productUpdates">Product Updates</Label>
                    <p className="text-sm text-gray-600">
                      Get notified about new features
                    </p>
                  </div>
                  <Checkbox id="productUpdates" defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Danger Zone</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert className="border-red-200 bg-red-50">
                <AlertTriangle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-800">
                  These actions cannot be undone. Please proceed with caution.
                </AlertDescription>
              </Alert>

              <Button variant="destructive" className="w-full">
                Delete Account
              </Button>
            </CardContent>
          </Card>

          <div className="flex gap-4">
            <Button variant="outline" className="flex-1">
              Cancel
            </Button>
            <Button className="flex-1">Save Changes</Button>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default SettingsPage;
