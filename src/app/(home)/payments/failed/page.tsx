import { Suspense } from "react";
import PaymentFailedContent from "./payment-failed-content";
import LoadingScreen from "@/src/components/common/LoadingScreen";

const PaymentFailedPage = () => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <PaymentFailedContent />
    </Suspense>
  );
};

export default PaymentFailedPage;
