import { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import PageHeader from "@/src/components/common/PageHeader";
import ListingGrid from "@/src/components/listings/ListingGrid";
import { getAllListingsServer } from "@/src/components/server/listing.server";

export const metadata: Metadata = {
  title: "Browse Tours | Echo Guide",
  description: "Explore authentic tours from local guides around the world",
};

const ListingsPage = async () => {
  const { listings, meta } = await getAllListingsServer({
    page: 1,
    limit: 12,
    status: "active",
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        title="Explore Tours"
        description="Discover authentic experiences from local guides"
      />

      <div className="container px-4 py-8 space-y-8">
        <Card>
          <CardContent className="p-6">
            <p className="text-gray-600">
              Found{" "}
              <span className="font-semibold">
                {meta?.total ?? listings.length} tours
              </span>{" "}
              matching your criteria
            </p>
          </CardContent>
        </Card>

        <ListingGrid listings={listings} />
      </div>
    </div>
  );
};

export default ListingsPage;
