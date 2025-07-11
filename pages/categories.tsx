"use client";
import React from 'react';
import{useState} from "react";
import{Button} from "@/components/ui/button";
import{Card, CardContent} from "@/components/ui/card";
import{Badge} from "@/components/ui/badge";
import{Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import{Eye, Calendar, ArrowRight,Search, Menu, User, X} from "lucide-react";
import AuthModal from "@/components/auth-modal";
import UserDropdown from "@/components/user-dropdown";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Link from "next/link";

const CategoriesPage = () => {
  // Categories data
  const categories = [
    {
      id: 1,
      name: "Business",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop",
      count: 245
    },
    {
      id: 2,
      name: "Tech",
      image: "https://images.unsplash.com/photo-1592478411213-6153e4ebc696?w=400&h=300&fit=crop",
      count: 189
    },
    {
      id: 3,
      name: "Music",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop",
      count: 156
    },
    {
      id: 4,
      name: "Social",
      image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&h=300&fit=crop",
      count: 203
    },
    {
      id: 5,
      name: "Sports",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
      count: 134
    },
    {
      id: 6,
      name: "Movement",
      image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400&h=300&fit=crop",
      count: 87
    },
    {
      id: 7,
      name: "Art & Culture",
      image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=400&h=300&fit=crop",
      count: 112
    },
    {
      id: 8,
      name: "Film",
      image: "https://images.unsplash.com/photo-1489599242320-69c5ad6f1c02?w=400&h=300&fit=crop",
      count: 78
    },
    {
      id: 9,
      name: "Food & Drinks",
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop",
      count: 167
    },
    {
      id: 10,
      name: "Fashion & Beauty",
      image: "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=400&h=300&fit=crop",
      count: 93
    },
    {
      id: 11,
      name: "Safety & Health",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop",
      count: 145
    },
    {
      id: 12,
      name: "Others",
      image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=300&fit=crop",
      count: 201
    }
  ];
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
  const handleCategoryClick = (categoryId, categoryName) => {
    console.log(`Navigate to category: ${categoryName} (ID: ${categoryId})`);
  };

  const handleNavigation = (section) => {
    console.log(`Navigate to ${section}`);
  };
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


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header/>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Browse Categories</h1>
            <p className="text-xl text-blue-100">Discover campaigns and events by category</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              onClick={() => handleCategoryClick(category.id, category.name)}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-lg bg-white shadow-md hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                <div className="aspect-[4/3] relative">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute inset-0 flex items-end p-4">
                    <div className="text-white">
                      <h3 className="text-lg font-semibold mb-1">{category.name}</h3>
                      <p className="text-sm text-gray-200">{category.count} campaigns</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center px-6 py-3 bg-white rounded-lg shadow-sm">
            <span className="text-gray-600">
              Total: <span className="font-semibold text-blue-600">{categories.reduce((sum, cat) => sum + cat.count, 0)}</span> campaigns across <span className="font-semibold text-blue-600">{categories.length}</span> categories
            </span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer/>
    </div>
  );
};

export default CategoriesPage;