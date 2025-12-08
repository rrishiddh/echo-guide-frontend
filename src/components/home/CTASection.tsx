"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeInUp } from "../animations/FadeIn";

export const CTASection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-10"></div>

      <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-400 rounded-full blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-pink-400 rounded-full blur-3xl opacity-30 animate-pulse delay-1000"></div>

      <div className="container px-4 relative z-10">
        <FadeInUp>
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-yellow-400/20 px-4 py-2 rounded-full mb-6 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-yellow-300" />
              <span className="text-sm font-medium text-yellow-100">
                Limited Time Offer
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Ready to Start Your
              <span className="block text-yellow-300">Adventure?</span>
            </h2>

            <p className="text-xl md:text-2xl text-blue-100 mb-10 max-w-2xl mx-auto">
              Join thousands of travelers who have discovered authentic local
              experiences with Echo Guide
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/listings">
                <Button
                  size="lg"
                  className="bg-yellow-400 text-gray-900 hover:bg-yellow-300 font-semibold text-lg px-8 py-6 rounded-full group"
                >
                  Explore Tours
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/become-guide">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-indigo-600 font-semibold text-lg px-8 py-6 rounded-full"
                >
                  Become a Guide
                </Button>
              </Link>
            </div>

            <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  ✓
                </div>
                <span>No Booking Fees</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  ✓
                </div>
                <span>Instant Confirmation</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  ✓
                </div>
                <span>Free Cancellation</span>
              </div>
            </div>
          </div>
        </FadeInUp>
      </div>
    </section>
  );
};

export default CTASection;
