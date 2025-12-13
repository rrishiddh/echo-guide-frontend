
import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Users,
  MapPin,
  Star,
  Globe,
  TrendingUp,
  Zap,
  Heart,
  Award,
} from "lucide-react";
import Link from "next/link";
import FeaturedListings from "@/src/components/listings/FeaturedListings";
import RecentListings from "@/src/components/listings/RecentListings";
import PopularListings from "@/src/components/listings/PopularListings";

export const metadata: Metadata = {
  title: "Echo Guide - Connect with Local Experts",
  description:
    "Discover authentic tours and experiences with passionate local guides from around the world.",
};

const HomePage = () => {
  const stats = [
    { label: "Active Guides", value: "1,200+", icon: Users },
    { label: "Happy Travelers", value: "50,000+", icon: Heart },
    { label: "Tours Completed", value: "75,000+", icon: Globe },
    { label: "Avg. Rating", value: "4.8/5", icon: Star },
  ];

  const features = [
    {
      icon: MapPin,
      title: "Authentic Experiences",
      description: "Real connections between travelers and local experts",
    },
    {
      icon: Users,
      title: "Verified Guides",
      description: "All guides are verified and background checked",
    },
    {
      icon: Zap,
      title: "Easy Booking",
      description: "Simple and secure booking process",
    },
    {
      icon: Globe,
      title: "Global Community",
      description: "Guides and travelers from 150+ countries",
    },
    {
      icon: TrendingUp,
      title: "Earn Money",
      description: "Guides can earn up to 85% per booking",
    },
    {
      icon: Award,
      title: "Support",
      description: "24/7 customer support for all users",
    },
  ];

  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-20 md:py-32">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              Connect with Local Experts
            </h1>
            <p className="text-xl md:text-2xl text-blue-100">
              Discover authentic tours and experiences from passionate local guides around the world
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <Link href="/listings">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                  Explore Tours
                </Button>
              </Link>
              <Link href="/become-guide">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-white text-blue-600 hover:bg-blue-50"
                >
                  Become a Guide
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="container px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <Card key={stat.label}>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <p className="text-3xl font-bold text-gray-900 mb-2">
                    {stat.value}
                  </p>
                  <p className="text-gray-600">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container px-4">
          <FeaturedListings />
        </div>
      </section>

      <section className="py-16">
        <div className="container px-4">
          <PopularListings />
        </div>
      </section>

      <section className="py-16">
        <div className="container px-4">
          <RecentListings />
        </div>
      </section>

      <section className="py-16">
        <div className="container px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Why Choose Echo Guide?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <Card key={feature.title}>
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16">
        <div className="container px-4 text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Join thousands of travelers discovering authentic experiences, or share your passion as a local guide
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/listings">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                Browse Tours
              </Button>
            </Link>
            <Link href="/become-guide">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-white text-blue-600 hover:bg-blue-50"
              >
                Start Guiding
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            What Our Community Says
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Traveler",
                text: "The best travel experience I've ever had. Meeting local guides made me see cities completely differently.",
                rating: 5,
              },
              {
                name: "Marco Rossi",
                role: "Guide",
                text: "Echo Guide has changed my life. I love sharing my city and earning good money doing what I'm passionate about.",
                rating: 5,
              },
              {
                name: "Emma Chen",
                role: "Traveler",
                text: "Authentic, safe, and affordable. This is exactly what I was looking for in travel experiences.",
                rating: 5,
              },
            ].map((testimonial) => (
              <Card key={testimonial.name}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4">{testimonial.text}</p>
                  <div>
                    <p className="font-semibold text-gray-900">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;