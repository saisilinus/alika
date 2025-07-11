"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Eye, Calendar, ArrowRight, Menu, X } from "lucide-react";
import AuthModal from "@/components/auth-modal";
import UserDropdown from "@/components/user-dropdown";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Link from "next/link";
import React from 'react';

// Mock data - replace with real API calls
const banners = [
    {
      id: 1,
      title: "Summer Music Festival 2024",
      description: "Join us for an unforgettable summer music experience with top artists from around the world.",
      thumbnail: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&h=300&fit=crop",
      category: "Music",
      viewCount: "2.5K",
      createdAt: "2024-07-08T10:00:00Z",
      creator: {
        name: "EventCorp",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
      }
    },
    {
      id: 2,
      title: "Tech Innovation Conference",
      description: "Discover the latest in AI, blockchain, and emerging technologies with industry leaders.",
      thumbnail: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop",
      category: "Technology",
      viewCount: "1.8K",
      createdAt: "2024-07-07T14:30:00Z",
      creator: {
        name: "TechHub",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
      }
    },
    {
      id: 3,
      title: "Charity Run for Clean Water",
      description: "Help us raise funds for clean water access in underserved communities worldwide.",
      thumbnail: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
      category: "Charity",
      viewCount: "3.2K",
      createdAt: "2024-07-06T09:15:00Z",
      creator: {
        name: "WaterAid",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b332c6ab?w=100&h=100&fit=crop&crop=face"
      }
    },
    {
      id: 4,
      title: "Local Food Festival",
      description: "Taste amazing local cuisine from the best restaurants and food trucks in the city.",
      thumbnail: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop",
      category: "Food",
      viewCount: "4.1K",
      createdAt: "2024-07-05T16:45:00Z",
      creator: {
        name: "Foodie Events",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
      }
    },
    {
      id: 5,
      title: "Art Gallery Opening",
      description: "Experience contemporary art from emerging artists in our new downtown gallery space.",
      thumbnail: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=400&h=300&fit=crop",
      category: "Art",
      viewCount: "1.3K",
      createdAt: "2024-07-04T11:20:00Z",
      creator: {
        name: "Modern Arts",
        avatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=100&h=100&fit=crop&crop=face"
      }
    },
    {
      id: 6,
      title: "Business Networking Event",
      description: "Connect with entrepreneurs and business leaders in our monthly networking meetup.",
      thumbnail: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=300&fit=crop",
      category: "Business",
      viewCount: "2.7K",
      createdAt: "2024-07-03T13:00:00Z",
      creator: {
        name: "BizConnect",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
      }
    }
  ];
  const handleCardClick = (bannerId) => {
    // Handle navigation to individual banner/event page
    console.log(`Navigate to banner/event: ${bannerId}`);
    // Example: navigate(`/events/${bannerId}`) or router.push(`/events/${bannerId}`)
  };

  const handleBackClick = () => {
    // Handle back navigation
    console.log("Navigate back");
    // Example: navigate(-1) or router.back()
  };

const categories = [
  {
    name: "Business",
    image: "/placeholder.svg?height=150&width=200",
    count: 45,
  },
  {
    name: "Technology",
    image: "/placeholder.svg?height=150&width=200",
    count: 32,
  },
  { name: "Music", image: "/placeholder.svg?height=150&width=200", count: 28 },
  {
    name: "Education",
    image: "/placeholder.svg?height=150&width=200",
    count: 38,
  },
  { name: "Sports", image: "/placeholder.svg?height=150&width=200", count: 22 },
  { name: "Food", image: "/placeholder.svg?height=150&width=200", count: 19 },
];

export default function HomePage() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState({
    name: "John Doe",
    avatar: "/hero.jpg?height=32&width=32",
    role: "user",
  });

  const handleAuthSuccess = (userData: any) => {
    setIsLoggedIn(true);
    setUser(userData);
    setIsAuthModalOpen(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser({ name: "", avatar: "", role: "user" });
  };
  const RecentBannersPage = ({ banners }) => {
  // Component code...
}

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
     <Header/>

      {/* Hero Section */}
      {/* <section className="relative bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20 lg:py-32"> */}
      <section className="relative bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20 lg:py-16">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20" style={{backgroundImage: 'url("/flow.jpg")'}}></div>
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Recent Campaigns and Events
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-100">
            See trending and recent enagements
          </p>
          
        </div>
      </section>

      {/* Recent Banners Section */}
      <section id="discover" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              Recent Campaigns & Events
            </h2>
            
          </div> */}
  
          {banners.map((banner) => (
              <Link href={`/campaign/${banner.id}`} key={banner.id}>
                {/* Main Content */}
                      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        {/* Grid of Banner Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {banners.map((banner) => (
                            <Card
                              key={banner.id}
                              className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                              onClick={() => handleCardClick(banner.id)}
                            >
                              <div className="aspect-video relative">
                                <img
                                  src={banner.thumbnail || "/placeholder.svg"}
                                  alt={banner.title}
                                  className="w-full h-full object-cover"
                                />
                                <Badge className="absolute top-3 left-3 bg-red-500 hover:bg-red-600">
                                  {banner.category}
                                </Badge>
                              </div>
                              <CardContent className="p-4">
                                <h3 className="font-semibold text-lg mb-2">{banner.title}</h3>
                                <p className="text-gray-600 text-sm mb-3">
                                  {banner.description}
                                </p>
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center space-x-2">
                                    <Avatar className="h-6 w-6">
                                      <AvatarImage
                                        src={banner.creator.avatar || "/placeholder.svg"}
                                      />
                                      <AvatarFallback>
                                        {banner.creator.name[0]}
                                      </AvatarFallback>
                                    </Avatar>
                                    <span className="text-sm text-gray-600">
                                      {banner.creator.name}
                                    </span>
                                  </div>
                                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                                    <div className="flex items-center">
                                      <Eye className="h-4 w-4 mr-1" />
                                      {banner.viewCount}
                                    </div>
                                    <div className="flex items-center">
                                      <Calendar className="h-4 w-4 mr-1" />
                                      {new Date(banner.createdAt).toLocaleDateString()}
                                    </div>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div></div>
                
              
              </Link>
            ))}
          
          <br></br>
          <Button
              variant="ghost"
              className="text-blue-600 hover:text-blue-700"
            >
              Load More<ArrowRight className="ml-2 h-4 w-4" />
            </Button>
        </div>
      </section>

      {/* Footer */}
      <Footer/>
    

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        mode={authMode}
        onSuccess={handleAuthSuccess}
        onSwitchMode={(mode) => setAuthMode(mode)}
      />
    </div>
  );
}
