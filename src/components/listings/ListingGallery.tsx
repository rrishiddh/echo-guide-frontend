"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";

interface ListingGalleryProps {
  images: string[];
  title: string;
}

export const ListingGallery = ({ images, title }: ListingGalleryProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const displayImages = images.length > 0 ? images : ["/images/placeholder.jpg"];

  return (
    <div>
      <div className="grid grid-cols-4 gap-2 h-[400px]">
        <div className="col-span-4 md:col-span-3 relative group overflow-hidden rounded-lg">
          <Image
            src={displayImages[currentIndex]}
            alt={title}
            fill
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all">
            <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                variant="secondary"
                size="icon"
                onClick={prev}
                className="rounded-full"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <Button
                variant="secondary"
                size="icon"
                onClick={next}
                className="rounded-full"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="secondary"
                size="sm"
                className="absolute bottom-4 right-4"
              >
                <Maximize2 className="w-4 h-4 mr-2" />
                View All
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl">
              <div className="relative">
                <Image
                  src={displayImages[currentIndex]}
                  alt={title}
                  fill
                  className="w-full h-auto rounded-lg"
                />
                <div className="absolute inset-0 flex items-center justify-between p-4">
                  <Button
                    variant="secondary"
                    size="icon"
                    onClick={prev}
                    className="rounded-full"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </Button>
                  <Button
                    variant="secondary"
                    size="icon"
                    onClick={next}
                    className="rounded-full"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                </div>
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                  {currentIndex + 1} / {displayImages.length}
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="hidden md:flex flex-col gap-2">
          {displayImages.slice(1, 4).map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index + 1)}
              className="relative h-full overflow-hidden rounded-lg hover:opacity-80 transition-opacity"
            >
              <Image
                src={image}
                alt={`${title} ${index + 2}`}
                fill
                className="w-full h-full object-cover"
              />
              {index === 2 && displayImages.length > 4 && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white font-semibold">
                  +{displayImages.length - 4} more
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 mt-4">
        {displayImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex
                ? "bg-blue-600 w-8"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ListingGallery;