import { Metadata } from "next";
import PageHeader from "@/src/components/common/PageHeader";
import ProtectedRoute from "@/src/components/common/ProtectedRoute";
import { Card, CardContent } from "@/components/ui/card";
import { DollarSign, TrendingUp, CreditCard, RefreshCw } from "lucide-react";
import PaymentHistory from "@/src/components/payments/PaymentHistory";

export const metadata: Metadata = {
  title: "Manage Payments | Admin Dashboard",
  description: "Manage all platform payments",
};

const AdminPaymentsPage = () => {
  const stats = [
    { label: "Total Revenue", value: "$125,450", icon: DollarSign, color: "green" },
    { label: "This Month", value: "$25,680", icon: TrendingUp, color: "blue" },
    { label: "Transactions", value: "1,234", icon: CreditCard, color: "purple" },
    { label: "Refunds", value: "$2,340", icon: RefreshCw, color: "red" },
  ];

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <div className="min-h-screen bg-gray-50">
        <PageHeader 
          title="Manage Payments" 
          description="View and manage all platform payments"
        />
        
        <div className="container px-4 py-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <Card key={stat.label}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 bg-${stat.color}-100 rounded-lg flex items-center justify-center`}>
                      <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <PaymentHistory />
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default AdminPaymentsPage;