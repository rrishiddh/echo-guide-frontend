
import { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, DollarSign, Users, TrendingUp } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Become a Guide | Echo Guide",
  description: "Start earning by sharing your local expertise",
};

const BecomeGuidePage = () => {
  const benefits = [
    {
      icon: DollarSign,
      title: "Earn Money",
      description: "Set your own rates and earn from each tour you lead.",
    },
    {
      icon: Users,
      title: "Meet People",
      description: "Connect with travelers from around the world and share stories.",
    },
    {
      icon: CheckCircle,
      title: "Be Your Own Boss",
      description: "Work on your own schedule with complete flexibility.",
    },
    {
      icon: TrendingUp,
      title: "Grow Your Business",
      description: "Build a loyal customer base and scale your tours.",
    },
  ];

  const requirements = [
    "Must be at least 18 years old",
    "Fluent in English (additional languages a plus)",
    "Knowledge and passion for your city",
    "Background check and identity verification",
    "Valid government-issued ID",
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-20">
        <div className="container px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Become a Guide</h1>
          <p className="text-xl text-green-100">
            Share your passion and earn money
          </p>
        </div>
      </div>

      <div className="container px-4 py-16 space-y-20">
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Why Become a Guide?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit) => (
              <Card key={benefit.title}>
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                    <benefit.icon className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Requirements</h2>
            <div className="space-y-3">
              {requirements.map((req, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{req}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              How to Get Started
            </h2>
            <div className="space-y-4">
              <Card>
                <CardContent className="p-4">
                  <p className="text-sm text-gray-600 mb-2">Step 1</p>
                  <p className="font-semibold text-gray-900">
                    Sign up for free
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <p className="text-sm text-gray-600 mb-2">Step 2</p>
                  <p className="font-semibold text-gray-900">
                    Complete your profile
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <p className="text-sm text-gray-600 mb-2">Step 3</p>
                  <p className="font-semibold text-gray-900">
                    Verification (24-48 hours)
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <p className="text-sm text-gray-600 mb-2">Step 4</p>
                  <p className="font-semibold text-gray-900">
                    Create your first tour
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="bg-green-50 rounded-lg p-12">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to Share Your Passion?
            </h2>
            <p className="text-gray-700 mb-8">
              Join our community of local guides and start earning today.
            </p>
            <Link href="/auth/register?role=guide">
              <Button size="lg">Get Started</Button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default BecomeGuidePage;