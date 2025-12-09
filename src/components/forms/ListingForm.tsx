/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, AlertCircle,  X } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";
import { useListings } from "@/src/hooks/useListings";
import { useCloudinary } from "@/src/hooks/useCloudinary";
import { Listing,TourCategory } from "@/src/types";
import { TOUR_CATEGORIES } from "@/src/constants";

interface ListingFormProps {
  listing?: Listing;
  onSuccess?: () => void;
}

export const ListingForm = ({ listing, onSuccess }: ListingFormProps) => {
  const router = useRouter();
  const { createListing, updateListing, isLoading } = useListings();
  const { uploadMultipleToCloudinary, isUploading } = useCloudinary();
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    itinerary: "",
    tourFee: 0,
    duration: 0,
    meetingPoint: "",
    maxGroupSize: 1,
    category: [] as TourCategory[],
    city: "",
    country: "",
  });
  const [images, setImages] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);

useEffect(() => {
  if (listing) {
    queueMicrotask(() => {
      setFormData({
        title: listing.title,
        description: listing.description,
        itinerary: listing.itinerary,
        tourFee: listing.tourFee,
        duration: listing.duration,
        meetingPoint: listing.meetingPoint,
        maxGroupSize: listing.maxGroupSize,
        category: listing.category || [],
        city: listing.city,
        country: listing.country,
      });
      setExistingImages(listing.images || []);
    });
  }
}, [listing]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };
  const handleCategoryChange = (category: TourCategory, checked: boolean) => {
    setFormData({
      ...formData,
      category: checked
        ? [...formData.category, category]
        : formData.category.filter((c) => c !== category),
    });
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
    }
  };
  const removeExistingImage = (image: string) => {
    setExistingImages(existingImages.filter((img) => img !== image));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!formData.title || !formData.description || !formData.itinerary) {
      setError("Please fill in all required fields");
      return;
    }

    if (formData.category.length === 0) {
      setError("Please select at least one category");
      return;
    }

    try {
      let uploadedImages = existingImages;

      if (images.length > 0) {
        const uploads = await uploadMultipleToCloudinary(images);
        uploadedImages = [...existingImages, ...uploads.map((u) => u.url)];
      }

      const listingData = {
        ...formData,
        images: uploadedImages,
      };

      if (listing) {
        await updateListing(listing.id, listingData);
        toast.success("Listing updated successfully");
      } else {
        await createListing(listingData);
        toast.success("Listing created successfully");
      }

      if (onSuccess) {
        onSuccess();
      } else {
        router.push("/dashboard/guide/listings");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to save listing");
    }
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <div className="space-y-2">
        <Label htmlFor="title">Tour Title *</Label>
        <Input
          id="title"
          name="title"
          type="text"
          value={formData.title}
          onChange={handleChange}
          placeholder="E.g., Hidden Jazz Bars of New Orleans"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description *</Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          placeholder="Describe your tour..."
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="itinerary">Itinerary *</Label>
        <Textarea
          id="itinerary"
          name="itinerary"
          value={formData.itinerary}
          onChange={handleChange}
          rows={6}
          placeholder="Describe what you'll do during the tour..."
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="tourFee">Tour Fee (USD) *</Label>
          <Input
            id="tourFee"
            name="tourFee"
            type="number"
            value={formData.tourFee}
            onChange={handleChange}
            min={0}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="duration">Duration (hours) *</Label>
          <Input
            id="duration"
            name="duration"
            type="number"
            value={formData.duration}
            onChange={handleChange}
            min={0}
            step={0.5}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="maxGroupSize">Max Group Size *</Label>
          <Input
            id="maxGroupSize"
            name="maxGroupSize"
            type="number"
            value={formData.maxGroupSize}
            onChange={handleChange}
            min={1}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="meetingPoint">Meeting Point *</Label>
          <Input
            id="meetingPoint"
            name="meetingPoint"
            type="text"
            value={formData.meetingPoint}
            onChange={handleChange}
            placeholder="E.g., Central Station"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="city">City *</Label>
          <Input
            id="city"
            name="city"
            type="text"
            value={formData.city}
            onChange={handleChange}
            placeholder="E.g., New York"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="country">Country *</Label>
          <Input
            id="country"
            name="country"
            type="text"
            value={formData.country}
            onChange={handleChange}
            placeholder="E.g., USA"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Categories *</Label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {Object.values(TOUR_CATEGORIES).map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={category}
                checked={formData.category.includes(category)}
                onCheckedChange={(checked) =>
                  handleCategoryChange(category, checked as boolean)
                }
              />
              <label
                htmlFor={category}
                className="text-sm font-medium leading-none cursor-pointer"
              >
                {category}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="images">Images</Label>
        <Input
          id="images"
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
        />
        <p className="text-xs text-gray-500">
          Upload up to 10 images (JPG, PNG, WebP)
        </p>

        {existingImages.length > 0 && (
          <div className="grid grid-cols-3 md:grid-cols-5 gap-4 mt-4">
            {existingImages.map((image, index) => (
              <div key={index} className="relative">
                <Image
                  src={image}
                  alt={`Listing ${index + 1}`}
                  fill
                  className="w-full h-24 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => removeExistingImage(image)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <Button
        type="submit"
        className="w-full"
        size="lg"
        disabled={isLoading || isUploading}
      >
        {isLoading || isUploading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {isUploading ? "Uploading images..." : "Saving..."}
          </>
        ) : listing ? (
          "Update Listing"
        ) : (
          "Create Listing"
        )}
      </Button>
    </form>
  );
};
export default ListingForm;
