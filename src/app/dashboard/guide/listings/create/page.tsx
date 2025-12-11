import { Metadata } from "next";
import PageHeader from "@/src/components/common/PageHeader";
import ProtectedRoute from "@/src/components/common/ProtectedRoute";
import { Card, CardContent } from "@/components/ui/card";
import BackButton from "@/src/components/common/BackButton";
import ListingForm from "@/src/components/forms/ListingForm";

export const metadata: Metadata = {
  title: "Create Tour | Guide Dashboard",
  description: "Create a new tour listing",
};

const CreateListingPage = () => {
  return (
    <ProtectedRoute allowedRoles={["guide"]}>
      <div className="min-h-screen bg-gray-50">
        <PageHeader
          title="Create New Tour"
          description="Share your unique experience with travelers"
        >
          <BackButton fallbackUrl="/dashboard/guide/listings" />
        </PageHeader>

        <div className="container px-4 py-8 max-w-3xl">
          <Card>
            <CardContent className="p-8">
              <ListingForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default CreateListingPage;