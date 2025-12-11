import { Metadata as Metadata4 } from "next";
import { ProtectedRoute as ProtectedRoute4 } from "@/src/components/common/ProtectedRoute";
import { PageHeader as PageHeader4 } from "@/src/components/common/PageHeader";

import {
  Card as Card4,
  CardContent as CardContent4,
  CardHeader as CardHeader4,
  CardTitle as CardTitle4,
} from "@/components/ui/card";
import { Button as Button4 } from "@/components/ui/button";
import { RevenueChart as RevenueChart4 } from "@/src/components/dashboard/RevenueChart";

import {
  DollarSign,
  TrendingUp,
  CreditCard,
  Download,
  Wallet,
} from "lucide-react";

export const metadata: Metadata4 = {
  title: "Earnings | Guide Dashboard",
  description: "View your earnings and payment history",
};

const GuideEarningsPage = () => {
  const stats = [
    {
      label: "Total Earnings",
      value: "$12,450",
      icon: DollarSign,
      color: "green",
    },
    {
      label: "This Month",
      value: "$2,450",
      icon: TrendingUp,
      color: "blue",
    },
    {
      label: "Pending Payout",
      value: "$1,200",
      icon: CreditCard,
      color: "yellow",
    },
    {
      label: "Available Balance",
      value: "$4,800",
      icon: Wallet,
      color: "purple",
    },
  ];

  const earningsData = [
    { month: "Jan", revenue: 1200, bookings: 10 },
    { month: "Feb", revenue: 1500, bookings: 12 },
    { month: "Mar", revenue: 1800, bookings: 15 },
    { month: "Apr", revenue: 2100, bookings: 17 },
    { month: "May", revenue: 2400, bookings: 20 },
    { month: "Jun", revenue: 2450, bookings: 20 },
  ];

  const transactions = [
    {
      id: "1",
      date: "2024-06-15",
      description: "Booking #1234 - Jazz Tour",
      amount: 75,
      type: "earning",
      status: "completed",
    },
    {
      id: "2",
      date: "2024-06-14",
      description: "Payout to Bank Account",
      amount: 2000,
      type: "payout",
      status: "completed",
    },
    {
      id: "3",
      date: "2024-06-13",
      description: "Booking #1233 - Street Food Tour",
      amount: 50,
      type: "earning",
      status: "completed",
    },
    {
      id: "4",
      date: "2024-06-12",
      description: "Platform Fee",
      amount: 37.5,
      type: "fee",
      status: "completed",
    },
  ];

  return (
    <ProtectedRoute4 allowedRoles={["guide"]}>
      <div className="min-h-screen bg-gray-50">
        <PageHeader4
          title="Earnings"
          description="View your earnings and payment history"
        >
          <Button4 variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Download Report
          </Button4>
        </PageHeader4>

        <div className="container px-4 py-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <Card4 key={stat.label}>
                <CardContent4 className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-12 h-12 bg-${stat.color}-100 rounded-lg flex items-center justify-center`}
                    >
                      <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                </CardContent4>
              </Card4>
            ))}
          </div>

          <RevenueChart4 data={earningsData} title="Earnings Trend" />

          <Card4>
            <CardHeader4>
              <CardTitle4>Transaction History</CardTitle4>
            </CardHeader4>
            <CardContent4>
              <div className="space-y-4">
                {transactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          transaction.type === "earning"
                            ? "bg-green-100"
                            : transaction.type === "payout"
                            ? "bg-blue-100"
                            : "bg-red-100"
                        }`}
                      >
                        {transaction.type === "earning" && (
                          <TrendingUp className="w-5 h-5 text-green-600" />
                        )}
                        {transaction.type === "payout" && (
                          <CreditCard className="w-5 h-5 text-blue-600" />
                        )}
                        {transaction.type === "fee" && (
                          <DollarSign className="w-5 h-5 text-red-600" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">
                          {transaction.description}
                        </p>
                        <p className="text-sm text-gray-600">
                          {transaction.date}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p
                        className={`font-semibold ${
                          transaction.type === "earning"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {transaction.type === "earning" && "+"}$
                        {transaction.amount}
                      </p>
                      <p className="text-xs text-gray-600 capitalize">
                        {transaction.status}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent4>
          </Card4>

          <Card4>
            <CardHeader4>
              <CardTitle4>Payout Settings</CardTitle4>
            </CardHeader4>
            <CardContent4 className="space-y-6">
              <div>
                <p className="font-medium text-gray-900 mb-2">Bank Account</p>
                <p className="text-gray-600">
                  Account ending in ****5678 (Wells Fargo)
                </p>
              </div>

              <div>
                <p className="font-medium text-gray-900 mb-2">
                  Payout Frequency
                </p>
                <p className="text-gray-600">Weekly (Every Monday)</p>
              </div>

              <div>
                <p className="font-medium text-gray-900 mb-2">Minimum Payout</p>
                <p className="text-gray-600">
                  $100 (Next payout when balance reaches $100)
                </p>
              </div>

              <Button4 variant="outline">Update Payout Settings</Button4>
            </CardContent4>
          </Card4>
        </div>
      </div>
    </ProtectedRoute4>
  );
};

export default GuideEarningsPage;
