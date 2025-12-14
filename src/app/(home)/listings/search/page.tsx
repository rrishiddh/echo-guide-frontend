import { Suspense } from "react";
import SearchPageContent from "./search-page-content";
import LoadingScreen from "@/src/components/common/LoadingScreen";

const SearchPage = () => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <SearchPageContent />
    </Suspense>
  );
};

export default SearchPage;