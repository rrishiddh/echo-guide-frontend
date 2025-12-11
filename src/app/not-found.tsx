
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {  Home, Search } from "lucide-react";
import Link from "next/link";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <Card className="max-w-md w-full border-blue-200">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="text-6xl font-bold text-blue-600">404</div>
          </div>
          <CardTitle className="text-2xl text-gray-900">
            Page Not Found
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-gray-600 text-center">
            Sorry, the page you&apos;re looking for doesn&apos;t exist. It might have been moved or deleted.
          </p>

          <div className="space-y-3">
            <Link href="/">
              <Button className="w-full flex items-center justify-center gap-2">
                <Home className="w-4 h-4" />
                Back to Home
              </Button>
            </Link>

            <Link href="/listings">
              <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                <Search className="w-4 h-4" />
                Explore Tours
              </Button>
            </Link>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-900">
              Need help? Contact our support team at support@echoguide.com
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFoundPage;