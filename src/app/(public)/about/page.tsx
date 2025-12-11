import { Metadata } from "next";
import { Card, CardContent} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Target, Heart, Globe } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About Us | Echo Guide",
  description: "Learn about Echo Guide and our mission",
};

const AboutPage = () => {
  const team = [
    {
      name: "Sarah Johnson",
      role: "Co-Founder & CEO",
      image: "/images/user-placeholder.png",
    },
    {
      name: "Mike Chen",
      role: "Co-Founder & CTO",
      image: "/images/user-placeholder.png",
    },
    {
      name: "Emily Davis",
      role: "Head of Community",
      image: "/images/user-placeholder.png",
    },
    {
      name: "Alex Rodriguez",
      role: "Head of Operations",
      image: "/images/user-placeholder.png",
    },
  ];

  const values = [
    {
      icon: Users,
      title: "Community First",
      description: "We believe in empowering local communities and travelers.",
    },
    {
      icon: Target,
      title: "Authentic Experiences",
      description: "Real connections between travelers and local experts.",
    },
    {
      icon: Heart,
      title: "Trust & Safety",
      description: "Verified guides and secure transactions for peace of mind.",
    },
    {
      icon: Globe,
      title: "Global Impact",
      description: "Supporting local economies and sustainable tourism.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-20">
        <div className="container px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Echo Guide</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Connecting travelers with passionate local guides for authentic, unforgettable experiences.
          </p>
        </div>
      </div>

      <div className="container px-4 py-16 space-y-20">
        <section>
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">Our Story</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Echo Guide was founded in 2023 with a simple mission: to transform how people experience travel. We believed that the best way to truly understand a city is through the eyes of someone who lives there.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              What started as a small project has grown into a vibrant community of over 1,000 passionate guides and 50,000+ satisfied travelers from around the world. Today, we&apos;re proud to be the leading platform for authentic, personalized tour experiences.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <Card key={value.title}>
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <value.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {value.title}
                  </h3>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member) => (
              <Card key={member.name}>
                <CardContent className="p-6 text-center">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-lg font-semibold text-gray-900">
                    {member.name}
                  </h3>
                  <p className="text-sm text-gray-600">{member.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="bg-blue-50 rounded-lg p-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
            Join Our Community
          </h2>
          <p className="text-center text-gray-700 mb-8 max-w-2xl mx-auto">
            Whether you&apos;re a traveler looking for authentic experiences or a local wanting to share your passion, Echo Guide is for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/listings">
              <Button size="lg">Explore Tours</Button>
            </Link>
            <Link href="/become-guide">
              <Button size="lg" variant="outline">Become a Guide</Button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;