import { Suspense } from "react";
import LoadingScreen from "@/src/components/common/LoadingScreen";
import CreateBookingContent from "./create-booking-content";

const CreateBookingPage = () => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <CreateBookingContent />
    </Suspense>
  );
};

export default CreateBookingPage;
