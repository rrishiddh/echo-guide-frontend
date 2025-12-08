"use client";

import { useState } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { getInitials } from "@/src/utils/helpers";

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    location: "Mumbai, India",
    image: "/images/testimonials/user1.jpg",
    rating: 5,
    text: "Our guide Aarav was absolutely amazing! He showed us hidden gems in Mumbai that we would have never discovered on our own. The street food tour was incredible, and his knowledge of local history made the experience truly memorable.",
    tour: "Mumbai Street Food Tour",
  },
  {
    id: 2,
    name: "Rahul Verma",
    location: "Bengaluru, India",
    image: "/images/testimonials/user2.jpg",
    rating: 5,
    text: "I was skeptical at first, but this platform exceeded all my expectations. Our guide Meera in Bengaluru was professional, friendly, and incredibly knowledgeable. Best investment for our vacation!",
    tour: "Bengaluru Photography Walk",
  },
  {
    id: 3,
    name: "Ananya Gupta",
    location: "Delhi, India",
    image: "/images/testimonials/user3.jpg",
    rating: 5,
    text: "What an incredible experience! Our guide took us to authentic local restaurants and shared fascinating stories about Delhi's culture. It felt like exploring the city with a close friend rather than a tour guide.",
    tour: "Delhi Night Food Adventure",
  },
  {
    id: 4,
    name: "Vikram Singh",
    location: "Jaipur, India",
    image: "/images/testimonials/user4.jpg",
    rating: 5,
    text: "The personalized attention and local insights made all the difference. Our guide helped us avoid tourist traps and showed us the real Jaipur. Highly recommend for anyone wanting an authentic experience!",
    tour: "Jaipur Heritage Experience",
  },
  {
    id: 5,
    name: "Sanya Kapoor",
    location: "Kolkata, India",
    image: "/images/testimonials/user5.jpg",
    rating: 5,
    text: "This platform made my trip unforgettable! Our guide in Kolkata was warm, knowledgeable, and took us through the most beautiful and hidden parts of the city. The experience felt personal and very authentic.",
    tour: "Kolkata Cultural Walk",
  },
];


export const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials[currentIndex];

  return (
    <section className="py-20 bg-white">
      <div className="container px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900">
            What Travelers Are Saying
          </h2>
          <p className="text-xl text-gray-600 mt-4">
            Real experiences from real travelers
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="border-2 shadow-xl">
            <CardContent className="p-8 md:p-12">
              <Quote className="w-16 h-16 text-blue-500 mb-6" />

              <div className="flex items-center gap-1 mb-6">
                {[...Array(current.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-6 h-6 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              <p className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-8 italic">
                {current.text}
              </p>

              <div className="flex items-center gap-4 mb-6">
                <Avatar className="w-16 h-16 border-2 border-blue-500">
                  <AvatarImage src={current.image} alt={current.name} />
                  <AvatarFallback className="bg-blue-500 text-white text-xl">
                    {getInitials(current.name)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">
                    {current.name}
                  </h4>
                  <p className="text-gray-600">{current.location}</p>
                  <p className="text-sm text-blue-600 font-medium">
                    {current.tour}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-6 border-t">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={prev}
                  className="rounded-full"
                >
                  <ChevronLeft className="w-5 h-5" />
                </Button>

                <div className="flex gap-2">
                  {testimonials.map((_, index) => (
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

                <Button
                  variant="outline"
                  size="icon"
                  onClick={next}
                  className="rounded-full"
                >
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;