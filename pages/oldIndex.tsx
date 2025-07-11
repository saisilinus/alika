"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Eye, Calendar, ArrowRight, Menu, X } from "lucide-react";
import AuthModal from "@/components/auth-modal";
import UserDropdown from "@/components/user-dropdown";
import Link from "next/link";

// Mock data - replace with real API calls
const trendingBanners = [
  {
    id: 1,
    title: "Cracking the Code 1.0",
    description: "University Life Career Launch & Beyond",
    thumbnail: "/hero.jpg?height=200&width=300",
    creator: {
      name: "Tech University",
      avatar: "/hero.jpg?height=40&width=40",
    },
    viewCount: 1250,
    createdAt: "2024-01-15",
    category: "Education",
  },
  {
    id: 2,
    title: "Summer Music Festival",
    description: "Join us for the biggest music celebration",
    thumbnail: "/img2.jpg?height=200&width=300",
    creator: {
      name: "Music Events",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    viewCount: 890,
    createdAt: "2024-01-12",
    category: "Music",
  },
  {
    id: 3,
    title: "Tech Conference 2024",
    description: "Innovation and Technology Summit",
    thumbnail: "/placeholder.svg?height=200&width=300",
    creator: {
      name: "TechCorp",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    viewCount: 2100,
    createdAt: "2024-01-10",
    category: "Technology",
  },
  {
    id: 4,
    title: "Business Networking Event",
    description: "Connect with industry leaders",
    thumbnail: "/placeholder.svg?height=200&width=300",
    creator: {
      name: "Business Hub",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    viewCount: 650,
    createdAt: "2024-01-08",
    category: "Business",
  },
];

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

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                      <div className="flex justify-between items-center h-16">
                        {/* Logo */}
                        <div className="flex-shrink-0">
                          <a href="/">
                          <h1 className="text-2xl font-bold text-gray-900">Alika</h1>
                          </a>
                        </div>
            
                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex space-x-8">
                          <a
                            href="/"
                            className="text-gray-700 hover:text-gray-900 font-medium"
                          >
                            Create
                          </a>
                          <a
                            href="/recents"
                            className="text-gray-700 hover:text-gray-900 font-medium"
                          >
                            Recent Campaigns/Events
                          </a>
                          <a
                            href="/categories"
                            className="text-gray-700 hover:text-gray-900 font-medium"
                          >
                            Categories
                          </a>
                          <a
                            href="/help"
                            className="text-gray-700 hover:text-gray-900 font-medium"
                          >
                            Help
                          </a>
                        </nav>
            
                        {/* Desktop Auth */}
                        <div className="hidden md:flex items-center space-x-4">
                          {!isLoggedIn ? (
                            <>
                              <Button
                                variant="ghost"
                                onClick={() => {
                                  setAuthMode("login");
                                  setIsAuthModalOpen(true);
                                }}
                              >
                                Login
                              </Button>
                              <Button
                                onClick={() => {
                                  setAuthMode("register");
                                  setIsAuthModalOpen(true);
                                }}
                              >
                                Register
                              </Button>
                            </>
                          ) : (
                            <UserDropdown user={user} onLogout={handleLogout} />
                          )}
                        </div>
            
                        {/* Mobile menu button */}
                        <div className="md:hidden">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                          >
                            {isMobileMenuOpen ? (
                              <X className="h-6 w-6" />
                            ) : (
                              <Menu className="h-6 w-6" />
                            )}
                          </Button>
                        </div>
                      </div>
            
                      {/* Mobile Navigation */}
                      {isMobileMenuOpen && (
                        <div className="md:hidden border-t border-gray-200 py-4">
                          <div className="flex flex-col space-y-4">
                            <a
                              href="#discover"
                              className="text-gray-700 hover:text-gray-900 font-medium"
                            >
                              DISCOVER
                            </a>
                            <a
                              href="#categories"
                              className="text-gray-700 hover:text-gray-900 font-medium"
                            >
                              BROWSE CATEGORIES
                            </a>
                            <a
                              href="#create"
                              className="text-gray-700 hover:text-gray-900 font-medium"
                            >
                              CREATE DP BANNER
                            </a>
                            <a
                              href="/#"
                              className="text-gray-700 hover:text-gray-900 font-medium"
                            >
                              Help
                            </a>
                            {!isLoggedIn ? (
                              <div className="flex space-x-2 pt-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => {
                                    setAuthMode("login");
                                    setIsAuthModalOpen(true);
                                    setIsMobileMenuOpen(false);
                                  }}
                                >
                                  LOGIN
                                </Button>
                                <Button
                                  size="sm"
                                  onClick={() => {
                                    setAuthMode("register");
                                    setIsAuthModalOpen(true);
                                    setIsMobileMenuOpen(false);
                                  }}
                                >
                                  REGISTER
                                </Button>
                              </div>
                            ) : (
                              <div className="pt-2">
                                <UserDropdown user={user} onLogout={handleLogout} />
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </header>

      {/* Hero Section */}
      {/* <section className="relative bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20 lg:py-32"> */}
      <section className="relative bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20 lg:py-32">
        <div className="absolute inset-0 bg-cover bg-bottom bg-no-repeat opacity-20" style={{backgroundImage: 'url("/hero.jpg")'}}></div>
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Let you audiences champion your cause!
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-100">
            Everything you need to build unstoppable momentum on your Campaign or Event
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-orange-500 hover:bg-orange-600 text-white"
            >
              Get Started
            </Button>
            {/* <Button
              size="lg"
              variant="secondary"
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Categories
            </Button> */}
            
          </div>
        </div>
      </section>

      {/* Trending Banners Section */}
      <section id="discover" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              Recent Campaigns & Events
            </h2>
            
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {trendingBanners.map((banner) => (
              <Link href={`/campaign/${banner.id}`} key={banner.id}>
              <Card
                key={banner.id}
                className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
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
              </Link>
            ))}
          </div>
          <br></br>
          <Button
              variant="ghost"
              className="text-blue-600 hover:text-blue-700"
            >
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
        </div>
      </section>

      {/* Browse by Category Section */}
      <section id="categories" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-left mb-12">
            Categories
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories.map((category) => (
              <Card
                key={category.name}
                className="overflow-hidden hover:shadow-lg transition-all cursor-pointer group"
              >
                <div className="aspect-square relative">
                  <img
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-end p-3">
                    <h3 className="text-white font-semibold text-sm">
                      {category.name}
                    </h3>
                    <p className="text-gray-200 text-xs">
                      {category.count} banners
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Alika</h3>
              <p className="text-gray-400">
                Let your audiences champion your cause!
              </p>
              <br />
              <p className="text-gray-400">
                With <b>Alika</b> you Get Everything you need to build unstoppable momentum on your Campaign or Event
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/recents" className="hover:text-white">
                    Recent Campaigns
                  </Link>
                </li>
                <li>
                  <Link href="/" className="hover:text-white">
                    Create your own
                  </Link>
                </li>
                <li>
                  <Link href="/categories" className="hover:text-white">
                    Categories
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/help" className="hover:text-white">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white">
                    Twitter
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Facebook
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Instagram
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Alika. All rights reserved.</p>
          </div>
        </div>
      </footer>

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
