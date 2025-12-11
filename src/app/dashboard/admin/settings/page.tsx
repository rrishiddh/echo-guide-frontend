import { Metadata } from "next";
import PageHeader from "@/src/components/common/PageHeader";
import ProtectedRoute from "@/src/components/common/ProtectedRoute";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Settings, Bell, Lock, Mail, Globe, DollarSign } from "lucide-react";

export const metadata: Metadata = {
  title: "Settings | Admin Dashboard",
  description: "Manage platform settings",
};

const AdminSettingsPage = () => {
  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <div className="min-h-screen bg-gray-50">
        <PageHeader
          title="Settings"
          description="Manage platform configuration and preferences"
        />

        <div className="container px-4 py-8">
          <Tabs defaultValue="general" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="payment">Payment</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="w-5 h-5" />
                    General Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="siteName">Site Name</Label>
                    <Input
                      id="siteName"
                      defaultValue="Echo Guide"
                      placeholder="Your platform name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="siteUrl">Site URL</Label>
                    <Input
                      id="siteUrl"
                      defaultValue="https://echaguide.com"
                      placeholder="Your website URL"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="supportEmail">Support Email</Label>
                    <Input
                      id="supportEmail"
                      defaultValue="support@echoguide.com"
                      type="email"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="supportPhone">Support Phone</Label>
                    <Input
                      id="supportPhone"
                      defaultValue="+1 (555) 123-4567"
                      placeholder="Your support phone number"
                    />
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-900">Features</h3>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="enableReviews">Enable Reviews</Label>
                        <p className="text-sm text-gray-600">
                          Allow users to leave reviews
                        </p>
                      </div>
                      <Switch id="enableReviews" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="enableChat">Enable Chat</Label>
                        <p className="text-sm text-gray-600">
                          Allow direct messaging between users
                        </p>
                      </div>
                      <Switch id="enableChat" />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="enableVerification">
                          Require Email Verification
                        </Label>
                        <p className="text-sm text-gray-600">
                          Verify emails before account activation
                        </p>
                      </div>
                      <Switch id="enableVerification" defaultChecked />
                    </div>
                  </div>

                  <Button className="w-full">Save Changes</Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notifications" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="w-5 h-5" />
                    Notification Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-900">
                      Email Notifications
                    </h3>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="notifyNewUsers">
                          New User Registration
                        </Label>
                        <p className="text-sm text-gray-600">
                          Notify when new users register
                        </p>
                      </div>
                      <Switch id="notifyNewUsers" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="notifyListings">New Listings</Label>
                        <p className="text-sm text-gray-600">
                          Notify when new listings are created
                        </p>
                      </div>
                      <Switch id="notifyListings" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="notifyDisputes">
                          Disputes & Reports
                        </Label>
                        <p className="text-sm text-gray-600">
                          Notify about user disputes and reports
                        </p>
                      </div>
                      <Switch id="notifyDisputes" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="notifyPayments">Payment Issues</Label>
                        <p className="text-sm text-gray-600">
                          Notify about failed payments and refunds
                        </p>
                      </div>
                      <Switch id="notifyPayments" defaultChecked />
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label htmlFor="notificationEmail">
                      Admin Notification Email
                    </Label>
                    <Input
                      id="notificationEmail"
                      defaultValue="admin@echoguide.com"
                      type="email"
                    />
                  </div>

                  <Button className="w-full">Save Changes</Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="payment" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5" />
                    Payment Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="platformFee">Platform Commission (%)</Label>
                    <Input
                      id="platformFee"
                      defaultValue="15"
                      type="number"
                      min="0"
                      max="100"
                    />
                    <p className="text-sm text-gray-600">
                      Percentage of each booking fee taken by the platform
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="minPayment">Minimum Payout Amount</Label>
                    <Input
                      id="minPayment"
                      defaultValue="100"
                      type="number"
                      min="0"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="payoutFrequency">Payout Frequency</Label>
                    <select className="w-full px-3 py-2 border rounded-lg">
                      <option>Weekly</option>
                      <option>Bi-weekly</option>
                      <option>Monthly</option>
                    </select>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-900">
                      Payment Gateways
                    </h3>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">Stripe</p>
                        <p className="text-sm text-gray-600">
                          Credit/Debit Card Payments
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">PayPal</p>
                        <p className="text-sm text-gray-600">PayPal Account</p>
                      </div>
                      <Switch />
                    </div>
                  </div>

                  <Button className="w-full">Save Changes</Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lock className="w-5 h-5" />
                    Security Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-900">
                      Account Security
                    </h3>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="twoFactor">
                          Two-Factor Authentication
                        </Label>
                        <p className="text-sm text-gray-600">
                          Require 2FA for admin accounts
                        </p>
                      </div>
                      <Switch id="twoFactor" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="ipWhitelist">IP Whitelist</Label>
                        <p className="text-sm text-gray-600">
                          Restrict admin access by IP address
                        </p>
                      </div>
                      <Switch id="ipWhitelist" />
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-900">
                      Data & Privacy
                    </h3>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="gdpr">GDPR Compliance</Label>
                        <p className="text-sm text-gray-600">
                          Enable GDPR compliance features
                        </p>
                      </div>
                      <Switch id="gdpr" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="dataRetention">
                          Data Retention Policy
                        </Label>
                        <p className="text-sm text-gray-600">
                          Automatically delete inactive accounts
                        </p>
                      </div>
                      <Switch id="dataRetention" />
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label htmlFor="sessionTimeout">
                      Session Timeout (minutes)
                    </Label>
                    <Input
                      id="sessionTimeout"
                      defaultValue="30"
                      type="number"
                      min="5"
                    />
                  </div>

                  <Button className="w-full">Save Changes</Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default AdminSettingsPage;
