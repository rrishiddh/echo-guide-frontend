"use client";

import Link from "next/link";
import { DollarSign, Users, Clock, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FadeInLeft, FadeInRight } from "../animations/FadeIn";

const benefits = [
  {
    icon: DollarSign,
    title: "Earn Extra Income",
    description: "Set your own rates and earn money sharing your local knowledge",
  },
  {
    icon: Users,
    title: "Meet New People",
    description: "Connect with travelers from around the world",
  },
  {
    icon: Clock,
    title: "Flexible Schedule",
    description: "Work when you want, on your own terms",
  },
  {
    icon: TrendingUp,
    title: "Grow Your Business",
    description: "Build your reputation and grow your client base",
  },
];

export const BecomeGuide = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-10"></div>

      <div className="container px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <FadeInLeft>
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Share Your City,
                <span className="block text-yellow-300">Earn Money</span>
              </h2>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                Turn your local knowledge into income. Join thousands of guides who are
                already sharing their passion and earning money by showing travelers the
                authentic side of their cities.
              </p>

              <div className="space-y-4 mb-8">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <benefit.icon className="w-6 h-6 text-yellow-300" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">
                        {benefit.title}
                      </h3>
                      <p className="text-blue-100">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <Link href="/become-guide">
                  <Button
                    size="lg"
                    className="bg-yellow-400 text-gray-900 hover:bg-yellow-300 font-semibold"
                  >
                    Become a Guide
                  </Button>
                </Link>
                <Link href="/how-it-works">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-white text-white hover:bg-white hover:text-indigo-600"
                  >
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
          </FadeInLeft>

          <FadeInRight delay={0.3}>
            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardContent className="p-8">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center p-6 bg-white/10 rounded-lg">
                    <div className="text-4xl font-bold mb-2">$2,500+</div>
                    <div className="text-blue-100">Avg. Monthly Earnings</div>
                  </div>
                  <div className="text-center p-6 bg-white/10 rounded-lg">
                    <div className="text-4xl font-bold mb-2">10K+</div>
                    <div className="text-blue-100">Active Guides</div>
                  </div>
                  <div className="text-center p-6 bg-white/10 rounded-lg">
                    <div className="text-4xl font-bold mb-2">4.9★</div>
                    <div className="text-blue-100">Average Rating</div>
                  </div>
                  <div className="text-center p-6 bg-white/10 rounded-lg">
                    <div className="text-4xl font-bold mb-2">95%</div>
                    <div className="text-blue-100">Satisfaction Rate</div>
                  </div>
                </div>

                <div className="mt-8 p-6 bg-yellow-400/20 rounded-lg border border-yellow-400/30">
                  <p className="text-sm text-center">
                    <span className="font-semibold">Special Offer:</span> Sign up now and
                    get <span className="text-yellow-300 font-bold">0% commission</span>{" "}
                    on your first 5 bookings!
                  </p>
                </div>
              </CardContent>
            </Card>
          </FadeInRight>
        </div>
      </div>
    </section>
  );
};

export default BecomeGuide;