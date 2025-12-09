"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Listing } from "@/src/types";
import {
  Clock,
  Users,
  MapPin,
  DollarSign,

  CheckCircle,
  XCircle,
} from "lucide-react";
import { formatPrice } from "@/src/utils/formatPrice";

interface ListingInfoProps {
  listing: Listing;
}

export const ListingInfo = ({ listing }: ListingInfoProps) => {
  const highlights = [
    {
      icon: Clock,
      label: "Duration",
      value: `${listing.duration} hours`,
    },
    {
      icon: Users,
      label: "Max Group Size",
      value: `${listing.maxGroupSize} people`,
    },
    {
      icon: DollarSign,
      label: "Price",
      value: formatPrice(listing.tourFee),
    },
    {
      icon: MapPin,
      label: "Meeting Point",
      value: listing.meetingPoint,
    },
  ];

  const whatsIncluded = [
    "Professional local guide",
    "All entrance fees",
    "Small group experience",
    "Flexible cancellation",
  ];

  const whatsNotIncluded = [
    "Food and drinks",
    "Transportation to meeting point",
    "Personal expenses",
    "Gratuities",
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Tour Highlights</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {highlights.map((highlight, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <highlight.icon className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">{highlight.label}</p>
                  <p className="font-medium text-gray-900">{highlight.value}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Categories</h3>
          <div className="flex flex-wrap gap-2">
            {listing.category?.map((cat) => (
              <Badge key={cat} variant="outline">
                {cat}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <h3 className="font-semibold text-gray-900 mb-4">What&apos;s Included</h3>
          <div className="space-y-2">
            {whatsIncluded.map((item, index) => (
              <div key={index} className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">{item}</span>
              </div>
            ))}
          </div>

          <Separator className="my-4" />

          <h3 className="font-semibold text-gray-900 mb-4">What&apos;s Not Included</h3>
          <div className="space-y-2">
            {whatsNotIncluded.map((item, index) => (
              <div key={index} className="flex items-start gap-2">
                <XCircle className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <h3 className="font-semibold text-gray-900 mb-4">
            Important Information
          </h3>
          <div className="space-y-3 text-sm text-gray-700">
            <p>
              <strong>Cancellation Policy:</strong> Free cancellation up to 24 hours
              before the tour starts
            </p>
            <p>
              <strong>Meeting Point:</strong> {listing.meetingPoint}
            </p>
            <p>
              <strong>Languages:</strong> {listing.guide?.languagesSpoken?.join(", ")}
            </p>
            <p>
              <strong>Accessibility:</strong> Please contact the guide for specific
              accessibility requirements
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ListingInfo;