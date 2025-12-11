"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import PageHeader from "@/src/components/common/PageHeader";
import ProtectedRoute from "@/src/components/common/ProtectedRoute";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, XCircle, Trash2, Flag } from "lucide-react";
import { toast } from "sonner";
import BackButton from "@/src/components/common/BackButton";
import ListingDetail from "@/src/components/listings/ListingDetail";
import { useListings } from "@/src/hooks/useListings";
import LoadingScreen from "@/src/components/common/LoadingScreen";

const AdminListingDetailPage = () => {
  const params = useParams();
  const listingId = params.id as string;
  const { listing, fetchListing, updateListing, deleteListing, isLoading } =
    useListings();

  useEffect(() => {
    if (listingId) {
      fetchListing(listingId);
    }
  }, [listingId]);

  const handleApprove = async () => {
    if (!listing) return;
    try {
      await updateListing(listing.id, { status: "active" });
      toast.success("Listing approved");
    } catch (error) {
      toast.error("Failed to approve listing");
    }
  };

  const handleReject = async () => {
    if (!listing) return;
    try {
      await updateListing(listing.id, { status: "inactive" });
      toast.success("Listing rejected");
    } catch (error) {
      toast.error("Failed to reject listing");
    }
  };

  const handleDelete = async () => {
    if (!listing) return;
    if (confirm("Are you sure you want to delete this listing?")) {
      try {
        await deleteListing(listing.id);
        toast.success("Listing deleted");
      } catch (error) {
        toast.error("Failed to delete listing");
      }
    }
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!listing) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Listing not found</p>
      </div>
    );
  }

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <div className="min-h-screen bg-gray-50">
        <PageHeader
          title="Listing Details"
          description={`Manage ${listing.title}`}
        >
          <BackButton fallbackUrl="/dashboard/admin/listings" />
        </PageHeader>

        <div className="container px-4 py-8 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Admin Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                <Button variant="outline" onClick={handleApprove}>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Approve Listing
                </Button>
                <Button variant="outline" onClick={handleReject}>
                  <XCircle className="w-4 h-4 mr-2" />
                  Reject Listing
                </Button>
                <Button variant="outline">
                  <Flag className="w-4 h-4 mr-2" />
                  Flag for Review
                </Button>
                <Button variant="destructive" onClick={handleDelete}>
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Listing
                </Button>
              </div>
            </CardContent>
          </Card>

          <ListingDetail listing={listing} />
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default AdminListingDetailPage;
