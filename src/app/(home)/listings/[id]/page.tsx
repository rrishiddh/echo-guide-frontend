import PageHeader from "@/src/components/common/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import BackButton from "@/src/components/common/BackButton";
import ListingDetail from "@/src/components/listings/ListingDetail";
import { Listing } from "@/src/types";
import { getListingServer } from "@/src/components/server/listing.server";

interface Props {
  params: Promise<{ id: string }>;
}

const ListingDetailPage = async ({ params }: Props) => {
  const { id } = await params;

  const listing: Listing | null = await getListingServer(id);

  if (!listing) {
    return (
      <div className="min-h-screen bg-gray-50">
        <PageHeader title="Tour Not Found">
          <BackButton fallbackUrl="/listings" />
        </PageHeader>

        <div className="container px-4 py-8 flex items-center justify-center min-h-96">
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-gray-600">
                The tour you&apos;re looking for doesn&apos;t exist.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        title={listing.title}
        description={`${listing.city}, ${listing.country}`}
      >
        <BackButton fallbackUrl="/listings" />
      </PageHeader>

      <div className="container px-4 py-8">
        <ListingDetail listing={listing} />
      </div>
    </div>
  );
};

export default ListingDetailPage;
