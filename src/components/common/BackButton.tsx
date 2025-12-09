"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

interface BackButtonProps {
  label?: string;
  fallbackUrl?: string;
}

export const BackButton = ({ label = "Back", fallbackUrl = "/" }: BackButtonProps) => {
  const router = useRouter();

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push(fallbackUrl);
    }
  };

  return (
    <Button variant="ghost" onClick={handleBack}>
      <ChevronLeft className="w-4 h-4 mr-2" />
      {label}
    </Button>
  );
};

export default BackButton;