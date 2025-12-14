import { Suspense } from "react";
import PaymentSuccessContent from "./payment-success-content";
import LoadingScreen from "@/src/components/common/LoadingScreen";

const PaymentSuccessPage = () => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <PaymentSuccessContent />
    </Suspense>
  );
};

export default PaymentSuccessPage;
