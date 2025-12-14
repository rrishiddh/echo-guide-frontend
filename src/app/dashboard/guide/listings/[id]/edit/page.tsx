"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import PageHeader from "@/src/components/common/PageHeader";
import ProtectedRoute from "@/src/components/common/ProtectedRoute";
import { Card, CardContent } from "@/components/ui/card";
import BackButton from "@/src/components/common/BackButton";
import ListingForm from "@/src/components/forms/ListingForm";
import { Listing } from "@/src/types";
import { listingService } from "@/src/services/listing.service";



const EditListingPage = () => {
  const { id } = useParams<{ id: string }>();
  const [listing, setListing] = useState<Listing | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchListing = async () => {
      try {
        const data = await listingService.getListing(id);
        setListing(data);
      } catch (error) {
        console.error("Failed to fetch listing:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [id]);

  return (
    <ProtectedRoute allowedRoles={["guide"]}>
      <div className="min-h-screen bg-gray-50">
        <PageHeader
          title="Edit Tour"
          description="Update your tour listing details"
        >
          <BackButton fallbackUrl="/dashboard/guide/listings" />
        </PageHeader>

        <div className="container px-4 py-8 max-w-3xl">
          <Card>
            <CardContent className="p-8">
              {loading ? (
                <p className="text-center text-gray-500">
                  Loading tour details...
                </p>
              ) : listing ? (
                <ListingForm listing={listing} />
              ) : (
                <p className="text-center text-red-500">
                  Failed to load listing
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default EditListingPage;
