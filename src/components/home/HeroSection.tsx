"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FadeInUp,FadeInDown } from "../animations/FadeIn";

export const HeroSection = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery) params.set("search", searchQuery);
    if (location) params.set("city", location);
    router.push(`/listings?${params.toString()}`);
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white overflow-hidden">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-10"></div>

      <div className="container relative z-10 px-4 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <FadeInDown delay={0.2}>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              Discover Authentic
              <span className="block text-yellow-400">Local Experiences</span>
            </h1>
          </FadeInDown>

          <FadeInUp delay={0.4}>
            <p className="text-xl md:text-2xl text-blue-100 max-w-2xl mx-auto">
              Connect with passionate local guides who know the hidden gems and
              authentic stories of their cities
            </p>
          </FadeInUp>

          <FadeInUp delay={0.6}>
            <form
              onSubmit={handleSearch}
              className="bg-white rounded-full shadow-2xl p-2 max-w-3xl mx-auto flex flex-col md:flex-row gap-2"
            >
              <div className="flex-1 flex items-center px-4 border-r border-gray-200">
                <Search className="w-5 h-5 text-gray-400 mr-2" />
                <Input
                  type="text"
                  placeholder="What do you want to explore?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="border-0 focus-visible:ring-0 text-gray-900 placeholder:text-gray-500"
                />
              </div>

              <div className="flex-1 flex items-center px-4">
                <MapPin className="w-5 h-5 text-gray-400 mr-2" />
                <Input
                  type="text"
                  placeholder="Where?"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="border-0 focus-visible:ring-0 text-gray-900 placeholder:text-gray-500"
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="rounded-full bg-blue-600 hover:bg-blue-700 text-white px-8"
              >
                Search
              </Button>
            </form>
          </FadeInUp>

          <FadeInUp delay={0.8}>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="text-blue-200">Popular:</span>
              {["Food Tours", "Historical Sites", "Photography Walks", "Night Life"].map(
                (tag) => (
                  <button
                    key={tag}
                    onClick={() => {
                      setSearchQuery(tag);
                    }}
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors backdrop-blur-sm"
                  >
                    {tag}
                  </button>
                )
              )}
            </div>
          </FadeInUp>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
};

export default HeroSection;