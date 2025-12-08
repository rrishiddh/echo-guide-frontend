"use client";

import { Search, UserCheck, Calendar, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { FadeInUp } from "../animations/FadeIn";

const steps = [
  {
    icon: Search,
    title: "Search & Discover",
    description:
      "Browse through hundreds of unique experiences and local guides in your destination",
    color: "bg-blue-500",
  },
  {
    icon: UserCheck,
    title: "Choose Your Guide",
    description:
      "Read reviews, check ratings, and select the perfect guide that matches your interests",
    color: "bg-purple-500",
  },
  {
    icon: Calendar,
    title: "Book & Pay Securely",
    description:
      "Request your preferred date and time, then pay securely through our platform",
    color: "bg-green-500",
  },
  {
    icon: Star,
    title: "Enjoy & Review",
    description:
      "Experience authentic local culture and share your experience with the community",
    color: "bg-orange-500",
  },
];

export const HowItWorks = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container px-4">
        <div className="text-center mb-16">
          <FadeInUp>
            <h2 className="text-4xl font-bold text-gray-900">How It Works</h2>
            <p className="text-xl text-gray-600 mt-4 max-w-2xl mx-auto">
              Booking your perfect local experience is easy. Just follow these simple steps
            </p>
          </FadeInUp>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          <div className="hidden lg:block absolute top-1/4 left-0 right-0 h-1 bg-gradient-to-r from-blue-200 via-purple-200 to-orange-200 -z-10"></div>

          {steps.map((step, index) => (
            <FadeInUp key={step.title} delay={index * 0.2}>
              <Card className="relative hover:shadow-xl transition-shadow duration-300 border-2 hover:border-blue-300">
                <CardContent className="p-6 text-center">
                  <div className="relative inline-block mb-6">
                    <div
                      className={`w-20 h-20 ${step.color} rounded-full flex items-center justify-center mx-auto shadow-lg`}
                    >
                      <step.icon className="w-10 h-10 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full border-4 border-blue-500 flex items-center justify-center font-bold text-blue-600">
                      {index + 1}
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">{step.description}</p>
                </CardContent>
              </Card>
            </FadeInUp>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;