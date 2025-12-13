import { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, User, Calendar, MapPin } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How It Works | Echo Guide",
  description: "Learn how Echo Guide works",
};

const HowItWorksPage = () => {
  const touristSteps = [
    {
      number: 1,
      icon: Search,
      title: "Search & Discover",
      description: "Browse through thousands of authentic tours and find guides that match your interests.",
    },
    {
      number: 2,
      icon: User,
      title: "Connect with Guide",
      description: "View guide profiles, read reviews, and send booking requests.",
    },
    {
      number: 3,
      icon: Calendar,
      title: "Confirm & Pay",
      description: "Confirm your booking and make a secure payment through our platform.",
    },
    {
      number: 4,
      icon: MapPin,
      title: "Enjoy Experience",
      description: "Meet your guide and explore the city like a local.",
    },
  ];

  const guideSteps = [
    {
      number: 1,
      title: "Create Your Profile",
      description: "Sign up and showcase your expertise, languages, and specialties.",
    },
    {
      number: 2,
      title: "List Your Tours",
      description: "Create detailed tour listings with descriptions, pricing, and availability.",
    },
    {
      number: 3,
      title: "Receive Bookings",
      description: "Get booking requests from travelers interested in your tours.",
    },
    {
      number: 4,
      title: "Lead & Earn",
      description: "Guide travelers through your city and earn money for each tour.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-20">
        <div className="container px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">How It Works</h1>
          <p className="text-xl text-blue-100">
            Simple steps to amazing experiences
          </p>
        </div>
      </div>

      <div className="container px-4 py-16 space-y-20">
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            For Travelers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {touristSteps.map((step) => (
              <div key={step.number} className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <step.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            For Guides
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {guideSteps.map((step) => (
              <Card key={step.number}>
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-lg font-bold text-green-600">
                        {step.number}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {step.title}
                      </h3>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="bg-blue-50 rounded-lg p-12">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-gray-700 mb-8">
              Join thousands of travelers and guides who are already discovering and sharing authentic experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/listings">
                <Button size="lg">Browse Tours</Button>
              </Link>
              <Link href="/become-guide">
                <Button size="lg" variant="outline">Become a Guide</Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HowItWorksPage;