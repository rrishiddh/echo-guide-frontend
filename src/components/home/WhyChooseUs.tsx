"use client";

import { Shield, Award, HeadphonesIcon, Globe } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

import StaggerChildren, { StaggerItem } from "../animations/StaggerChildren";

const features = [
  {
    icon: Shield,
    title: "Verified Guides",
    description:
      "All our guides are carefully vetted and verified to ensure quality and safety",
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
  {
    icon: Award,
    title: "Best Price Guarantee",
    description:
      "We guarantee the best prices with no hidden fees or surprise charges",
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    icon: HeadphonesIcon,
    title: "24/7 Support",
    description:
      "Our customer support team is always here to help you, any time of day",
    color: "text-purple-600",
    bgColor: "bg-purple-100",
  },
  {
    icon: Globe,
    title: "Global Coverage",
    description:
      "Access local guides in over 500 cities across 100+ countries worldwide",
    color: "text-orange-600",
    bgColor: "bg-orange-100",
  },
];

export const WhyChooseUs = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900">
            Why Choose Echo Guide
          </h2>
          <p className="text-xl text-gray-600 mt-4">
            We&apos;re committed to providing the best travel experiences
          </p>
        </div>
        <StaggerChildren staggerDelay={0.15}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <StaggerItem key={feature.title}>
                <Card className="border-2 hover:border-blue-500 hover:shadow-xl transition-all duration-300 h-full">
                  <CardContent className="p-6 text-center">
                    <div
                      className={`w-16 h-16 ${feature.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}
                    >
                      <feature.icon className={`w-8 h-8 ${feature.color}`} />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </div>
        </StaggerChildren>

        <div className="mt-16 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">
                500+
              </div>
              <div className="text-gray-700 font-medium">Cities Covered</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">
                50K+
              </div>
              <div className="text-gray-700 font-medium">Happy Travelers</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">
                10K+
              </div>
              <div className="text-gray-700 font-medium">Expert Guides</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default WhyChooseUs;
