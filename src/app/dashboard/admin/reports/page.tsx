import { Metadata } from "next";
import PageHeader from "@/src/components/common/PageHeader";
import ProtectedRoute from "@/src/components/common/ProtectedRoute";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileText, Calendar, TrendingUp } from "lucide-react";

export const metadata: Metadata = {
  title: "Reports | Admin Dashboard",
  description: "Generate and download platform reports",
};

const AdminReportsPage = () => {
  const reports = [
    {
      title: "User Activity Report",
      description: "Detailed breakdown of user registrations, activity, and engagement",
      icon: TrendingUp,
      type: "users",
    },
    {
      title: "Revenue Report",
      description: "Financial summary including revenue, refunds, and commission",
      icon: FileText,
      type: "revenue",
    },
    {
      title: "Booking Analytics",
      description: "Booking trends, conversion rates, and cancellation data",
      icon: Calendar,
      type: "bookings",
    },
    {
      title: "Listing Performance",
      description: "Tour listing metrics, views, bookings, and ratings",
      icon: FileText,
      type: "listings",
    },
  ];

  const handleDownload = (type: string) => {
    console.log(`Downloading ${type} report`);
  };

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <div className="min-h-screen bg-gray-50">
        <PageHeader 
          title="Reports" 
          description="Generate and download platform reports"
        />
        
        <div className="container px-4 py-8 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Generate Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {reports.map((report) => (
                  <div
                    key={report.type}
                    className="p-6 border-2 rounded-lg hover:border-blue-500 transition-all"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <report.icon className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-2">
                          {report.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-4">
                          {report.description}
                        </p>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDownload(report.type)}
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Download Report
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { name: "Monthly Revenue Report - November 2024", date: "Dec 1, 2024", size: "2.4 MB" },
                  { name: "User Activity Report - Q4 2024", date: "Nov 28, 2024", size: "1.8 MB" },
                  { name: "Booking Analytics - October 2024", date: "Nov 15, 2024", size: "3.1 MB" },
                ].map((report, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="font-medium text-gray-900">{report.name}</p>
                        <p className="text-sm text-gray-600">
                          {report.date} • {report.size}
                        </p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default AdminReportsPage;