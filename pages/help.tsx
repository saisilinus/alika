"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Eye, Calendar, ArrowRight, Menu, X, Search } from "lucide-react";
import AuthModal from "@/components/auth-modal";
import UserDropdown from "@/components/user-dropdown";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Link from "next/link";

interface User {
  name: string;
  avatar: string;
  role: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

export default function HelpPage() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<User>({
    name: "John Doe",
    avatar: "/hero.jpg?height=32&width=32",
    role: "user",
  });
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFAQ, setActiveFAQ] = useState<number | null>(null);

  const handleAuthSuccess = (userData: User) => {
    setIsLoggedIn(true);
    setUser(userData);
    setIsAuthModalOpen(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser({ name: "", avatar: "", role: "user" });
  };

  const openModal = (modalId: string) => {
    setActiveModal(modalId);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  const toggleFAQ = (index: number) => {
    setActiveFAQ(activeFAQ === index ? null : index);
  };

  const handleSearch = () => {
    if (searchTerm.trim()) {
      alert(`Searching for: ${searchTerm}\n\nThis would normally show relevant help articles and guides.`);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const helpCategories = [
    {
      id: "gettingStarted",
      icon: "🚀",
      title: "Getting Started",
      description: "Learn the basics of creating and managing your first campaign",
      links: [
        "Creating Your First Campaign",
        "Setting Up Your Profile",
        "Platform Overview",
        "Account Verification"
      ]
    },
    {
      id: "campaigns",
      icon: "📢",
      title: "Campaign Management",
      description: "Advanced tips for running successful campaigns and events",
      links: [
        "Campaign Optimization",
        "Audience Engagement",
        "Analytics & Insights",
        "Best Practices"
      ]
    },
    {
      id: "events",
      icon: "🎪",
      title: "Event Planning",
      description: "Everything you need to know about organizing memorable events",
      links: [
        "Event Creation Guide",
        "Venue Management",
        "Ticketing Options",
        "Promotion Strategies"
      ]
    },
    {
      id: "payment",
      icon: "💳",
      title: "Payment & Billing",
      description: "Manage your payments, subscriptions, and financial settings",
      links: [
        "Payment Methods",
        "Subscription Plans",
        "Refund Policy",
        "Billing History"
      ]
    },
    {
      id: "account",
      icon: "👤",
      title: "Account Settings",
      description: "Customize your account, privacy settings, and notifications",
      links: [
        "Profile Settings",
        "Privacy Controls",
        "Notification Preferences",
        "Account Security"
      ]
    },
    {
      id: "troubleshooting",
      icon: "🔧",
      title: "Troubleshooting",
      description: "Common issues and their solutions to keep you running smoothly",
      links: [
        "Login Issues",
        "Technical Problems",
        "Browser Compatibility",
        "Performance Issues"
      ]
    }
  ];

  const faqData: Record<string, FAQItem[]> = {
    gettingStarted: [
      {
        question: "How do I create my first campaign?",
        answer: "Creating your first campaign is simple! Click the 'Create' button in the navigation bar, choose 'Campaign,' and follow our step-by-step wizard. You'll need to provide a campaign title, description, goals, and target audience. Don't worry - you can always edit these details later."
      },
      {
        question: "What makes a successful campaign?",
        answer: "Successful campaigns have clear objectives, compelling storytelling, engaging visuals, and consistent communication with supporters. Focus on your unique value proposition and use our analytics tools to track progress and optimize your approach."
      }
    ],
    campaigns: [
      {
        question: "How do I track my campaign performance?",
        answer: "Use our built-in analytics dashboard to monitor key metrics like views, engagement, conversions, and audience growth. Set up automated reports to stay informed about your campaign's progress and identify areas for improvement."
      },
      {
        question: "Can I collaborate with team members?",
        answer: "Yes! Alika supports team collaboration. You can invite team members with different permission levels - from viewers to full editors. This makes it easy to delegate tasks while maintaining control over your campaign."
      }
    ],
    events: [
      {
        question: "How do I set up event registration?",
        answer: "Navigate to your event settings and enable registration. You can customize registration forms, set capacity limits, collect attendee information, and even charge admission fees. Our system automatically handles confirmations and reminders."
      },
      {
        question: "What promotion tools are available?",
        answer: "Alika offers social media integration, email campaigns, shareable links, and embedded widgets. You can also create promotional codes, set up early bird pricing, and track which channels bring the most attendees."
      }
    ],
    payment: [
      {
        question: "What payment methods do you accept?",
        answer: "We accept all major credit cards, PayPal, and bank transfers. For enterprise accounts, we also offer invoice billing. All payments are processed securely through our encrypted payment system."
      },
      {
        question: "How do subscription plans work?",
        answer: "Choose from our Basic, Pro, or Enterprise plans based on your needs. You can upgrade or downgrade anytime, and we'll prorate the charges. Free trial periods are available for all paid plans."
      }
    ],
    account: [
      {
        question: "How do I update my profile information?",
        answer: "Go to Account Settings from your profile menu. You can update your name, bio, profile picture, contact information, and social media links. Changes are saved automatically."
      },
      {
        question: "What security features are available?",
        answer: "Enable two-factor authentication, review login history, set up account recovery options, and manage connected apps. We also provide security alerts for any suspicious activity."
      }
    ],
    troubleshooting: [
      {
        question: "I'm having trouble logging in. What should I do?",
        answer: "First, check that you're using the correct email and password. Try resetting your password if needed. Clear your browser cache and cookies, or try a different browser. If issues persist, contact our support team."
      },
      {
        question: "The platform is running slowly. How can I fix this?",
        answer: "Close unnecessary browser tabs, check your internet connection, and clear your browser cache. If you're using an older browser, consider updating to the latest version. For persistent issues, try our mobile app as an alternative."
      }
    ]
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header/>
      

      {/* Hero Section */}
      
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">How can we help you?</h1>
            <p className="text-xl text-blue-100">Find answers, get support, and learn how to maximize your campaign's impact</p>
            <br></br>
          </div>
        </div>
      </div>
     

      {/* Search Section */}
      <div className="bg-white py-12 -mt-8 relative z-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            <input
              type="text"
              className="w-full px-6 py-4 border-2 border-gray-200 rounded-full text-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
              placeholder="Search for help articles, guides, or FAQs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <Button
              className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full px-6 py-2"
              onClick={handleSearch}
            >
              <Search className="mr-2 h-4 w-4" />
              Search
            </Button>
          </div>
        </div>
      </div>

      {/* Help Categories */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Browse Help Topics</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose a category to find the help you need
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {helpCategories.map((category) => (
              <Card
                key={category.id}
                className="hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => openModal(category.id)}
              >
                <CardContent className="p-6">
                  <div className="w-14 h-14 rounded-full bg-purple-500 flex items-center justify-center text-2xl mb-4">
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{category.title}</h3>
                  <p className="text-gray-600 mb-4">{category.description}</p>
                  <ul className="space-y-1 text-blue-600">
                    {category.links.map((link, index) => (
                      <li key={index}>
                        <a
                          href="#"
                          className="hover:underline"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="py-16 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Still need help?</h2>
          <p className="text-xl mb-8">
            Our support team is here to help you succeed. Get personalized assistance for your specific needs.
          </p>
          <Button
            variant="secondary"
            className="px-8 py-4 text-lg"
            onClick={() => openModal("contact")}
          >
            Contact Support
          </Button>
        </div>
      </div>

      {/* Footer */}
      <Footer/>
      {/* Modals */}
      {activeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">
                  {activeModal === "gettingStarted" && "Getting Started with Alika"}
                  {activeModal === "campaigns" && "Campaign Management"}
                  {activeModal === "events" && "Event Planning"}
                  {activeModal === "payment" && "Payment & Billing"}
                  {activeModal === "account" && "Account Settings"}
                  {activeModal === "troubleshooting" && "Troubleshooting"}
                  {activeModal === "contact" && "Contact Support"}
                </h2>
                <button
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {activeModal !== "contact" ? (
                <div className="space-y-4">
                  {faqData[activeModal]?.map((faq, index) => (
                    <div key={index} className="border rounded-lg overflow-hidden">
                      <button
                        className="w-full text-left p-4 bg-gray-50 hover:bg-gray-100 flex justify-between items-center"
                        onClick={() => toggleFAQ(index)}
                      >
                        <span className="font-medium">{faq.question}</span>
                        <span>{activeFAQ === index ? "-" : "+"}</span>
                      </button>
                      {activeFAQ === index && (
                        <div className="p-4 bg-white">
                          <p>{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="font-medium">📧 Email Support</div>
                    <div>support@alika.com</div>
                    <div className="text-sm text-gray-500">Response time: 24-48 hours</div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="font-medium">💬 Live Chat</div>
                    <div>Available 9 AM - 6 PM EST</div>
                    <div className="text-sm text-gray-500">Click the chat icon in the bottom right</div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="font-medium">📞 Phone Support</div>
                    <div>1-800-ALIKA-HELP</div>
                    <div className="text-sm text-gray-500">Premium plan members only</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        mode={authMode}
        onAuthSuccess={handleAuthSuccess}
      />
    </div>
  );
}