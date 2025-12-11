import { Metadata } from "next";
import GuideList from "@/src/components/users/GuideList";
import PageHeader from "@/src/components/common/PageHeader";

export const metadata: Metadata = {
  title: "Find Guides | Echo Guide",
  description: "Discover amazing local guides from around the world",
};

const GuidesPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        title="Find Local Guides"
        description="Discover passionate local experts ready to share their cities"
      />

      <div className="container px-4 py-8">
        <GuideList />
      </div>
    </div>
  );
};

export default GuidesPage;