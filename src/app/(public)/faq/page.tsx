
import { Metadata } from "next";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "FAQ | Echo Guide",
  description: "Frequently asked questions about Echo Guide",
};

const FAQPage = () => {
  const faqCategories = [
    {
      category: "For Travelers",
      questions: [
        {
          q: "How do I book a tour?",
          a: "Search for a tour that interests you, select a date and time, and submit a booking request. The guide will confirm your booking, and you'll receive confirmation details.",
        },
        {
          q: "What payment methods do you accept?",
          a: "We accept all major credit cards, PayPal, and bank transfers for payments made through our secure payment gateway.",
        },
        {
          q: "Can I cancel my booking?",
          a: "Yes, you can cancel up to 24 hours before the tour starts for a full refund. Cancellations made within 24 hours may have a cancellation fee.",
        },
        {
          q: "Are the guides verified?",
          a: "Yes, all guides go through a verification process including identity checks and background verification for your safety.",
        },
      ],
    },
    {
      category: "For Guides",
      questions: [
        {
          q: "How much can I earn?",
          a: "You set your own prices for tours. Echo Guide takes a 15% commission on each booking. You keep the remaining 85%.",
        },
        {
          q: "How do I receive payments?",
          a: "Payments are automatically transferred to your bank account on a weekly basis once you reach the minimum payout amount of $100.",
        },
        {
          q: "Can I edit my tour listings?",
          a: "Yes, you can edit your tour listings anytime. Changes will take effect immediately.",
        },
        {
          q: "What support do guides get?",
          a: "We provide 24/7 customer support, helpful guides, and a community forum where guides can share tips and experiences.",
        },
      ],
    },
    {
      category: "General",
      questions: [
        {
          q: "Is Echo Guide safe?",
          a: "Yes, safety is our top priority. We verify all users, use secure payment processing, and have a 24/7 support team.",
        },
        {
          q: "What languages are supported?",
          a: "Currently, our platform supports English. We're working on adding more languages soon.",
        },
        {
          q: "How do I report a problem?",
          a: "You can contact our support team at support@echoguide.com or through the help section in your account.",
        },
        {
          q: "Do you have an app?",
          a: "We currently operate through our web platform. A mobile app is in development.",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-20">
        <div className="container px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">FAQ</h1>
          <p className="text-xl text-blue-100">
            Find answers to common questions
          </p>
        </div>
      </div>

      <div className="container px-4 py-16">
        <div className="space-y-12">
          {faqCategories.map((category) => (
            <div key={category.category}>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {category.category}
              </h2>
              <Card>
                <CardContent className="p-0">
                  <Accordion type="single" collapsible>
                    {category.questions.map((item, index) => (
                      <AccordionItem
                        key={index}
                        value={`${category.category}-${index}`}
                        className="border-0 px-6 py-0 [&:not(:last-child)]:border-b"
                      >
                        <AccordionTrigger className="hover:no-underline py-4">
                          <span className="text-left font-medium text-gray-900">
                            {item.q}
                          </span>
                        </AccordionTrigger>
                        <AccordionContent className="pb-4 text-gray-600">
                          {item.a}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQPage;