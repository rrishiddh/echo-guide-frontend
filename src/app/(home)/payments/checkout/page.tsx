import { Suspense } from "react";
import CheckoutPageContent from "./checkout-page-content";
import LoadingScreen from "@/src/components/common/LoadingScreen";

const CheckoutPage = () => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <CheckoutPageContent />
    </Suspense>
  );
};

export default CheckoutPage;
