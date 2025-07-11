"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Eye, Type, Share2, Settings, Rocket, TrendingUp, LayoutGrid, Star, ChevronRight, Upload,UserCircle } from "lucide-react";
import AuthModal from "@/components/auth-modal";
import UserDropdown from "@/components/user-dropdown";
import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";

// Mock data - replace with real API calls
const trendingBanners = [
  {
    id: 1,
    title: "Cracking the Code 1.0",
    description: "University Life Career Launch & Beyond",
    thumbnail: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&h=300&fit=crop",
    creator: {
      name: "Tech University",
      avatar: "/hero.jpg?height=40&width=40",
    },
    viewCount: 1250,
    createdAt: "2024-01-15",
    category: "Education",
    isFeatured: true
  },
  {
    id: 2,
    title: "Summer Music Festival",
    description: "Join us for the biggest music celebration of the year",
    thumbnail: "/img2.jpg?height=200&width=300",
    creator: {
      name: "Music Events",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    viewCount: 890,
    createdAt: "2024-01-12",
    category: "Music",
    isFeatured: false
  },
  {
    id: 3,
    title: "Tech Conference 2024",
    description: "Innovation and Technology Summit with industry leaders",
    thumbnail: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop",
    creator: {
      name: "TechCorp",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    viewCount: 2100,
    createdAt: "2024-01-10",
    category: "Technology",
    isFeatured: true
  },
  {
    id: 4,
    title: "Business Networking Event",
    description: "Connect with industry leaders and grow your network",
    thumbnail: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=300&fit=crop",
    creator: {
      name: "Business Hub",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    viewCount: 650,
    createdAt: "2024-01-08",
    category: "Business",
    isFeatured: false
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
];

const categories = [
    {
      id: 1,
      name: "Business",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop",
      count: 245
    },
    // {
    //   id: 2,
    //   name: "Tech",
    //   image: "https://images.unsplash.com/photo-1592478411213-6153e4ebc696?w=400&h=300&fit=crop",
    //   count: 189
    // },
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
    // {
    //   id: 8,
    //   name: "Film",
    //   image: "https://images.unsplash.com/photo-1489599242320-69c5ad6f1c02?w=400&h=300&fit=crop",
    //   count: 78
    // },
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
    // {
    //   id: 11,
    //   name: "Safety & Health",
    //   image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop",
    //   count: 145
    // },
    // {
    //   id: 12,
    //   name: "Others",
    //   image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=300&fit=crop",
    //   count: 201
    // }
  ];

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Event Organizer",
    content: "Alika helped us increase event attendance by 300% with their beautiful campaign banners and easy sharing tools.",
    avatar: "/avatar1.jpg"
  },
  {
    name: "Michael Chen",
    role: "Marketing Director",
    content: "Our campaign went viral thanks to Alika's seamless integration with social platforms. Best decision we made!",
    avatar: "/avatar2.jpg"
  },
  {
    name: "Emma Rodriguez",
    role: "Nonprofit Founder",
    content: "As a small nonprofit, Alika gave us professional-looking campaigns without the professional price tag.",
    avatar: "/avatar3.jpg"
  }
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
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

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
     <Header/>
        

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-bottom bg-no-repeat opacity-20" style={{backgroundImage: 'url("/hero.jpg")'}}></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('/pattern.svg')] bg-[length:300px_300px] opacity-20"></div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center bg-blue-500/20 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Rocket className="mr-2 h-4 w-4" /> Welcome to the future of campaigns
          </div>
          
          <h1 className="text-3xl md:text-6xl font-bold mb-6 leading-tight">
          <span className="text-orange-500">Invite</span> Your{' '}
          <span className="text-green-500">Audience</span> To<br />
          <span className="text-purple-500">Champion</span> Your{' '}
          <span className="text-orange-500">Cause</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
            Everything you need to build<br></br> unstoppable momentum for your campaign or event
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-orange-500 hover:bg-orange-600 text-white shadow-lg hover:shadow-orange-500/30 transition-all"
              onClick={() => {
                setAuthMode("register");
                setIsAuthModalOpen(true);
              }}
            >
              Get Started - It's Free
            </Button>
            <Link href="#discover">
              <Button
                size="lg"
                variant="outline"
                className="bg-white/10 hover:bg-white/20 text-white border-white/20 hover:border-white/30"
              >
                Explore Campaigns
              </Button>
            </Link>
          </div>
          
        </div>
      </section>

      {/* Clients/Partners Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <p className="text-gray-500 text-sm font-medium">Trusted by innovative organizers </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center">
            {['TechCorp', 'UniEvents', 'StartupHub', 'MusicFest', 'EduNetwork', 'BizConnect'].map((logo) => (
              <div key={logo} className="flex justify-center opacity-70 hover:opacity-100 transition-opacity">
                <div className="h-12 w-32 bg-gray-200 rounded-lg flex items-center justify-center text-gray-700 font-bold">
                  {logo}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Banners Section */}
      <section id="discover" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                Trending Campaigns & Events
              </h2>
              <p className="text-gray-600 mt-2">Discover what's capturing attention right now</p>
            </div>
            <Link href="/recents">
              <Button
                variant="ghost"
                className="text-blue-600 hover:text-blue-700 group"
              >
                View All <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trendingBanners.map((banner) => (
              <Link href={`/campaign/${banner.id}`} key={banner.id}>
                <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group h-full flex flex-col">
                  <div className="aspect-video relative overflow-hidden">
                    <img
                      src={banner.thumbnail || "/placeholder.svg"}
                      alt={banner.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {banner.isFeatured && (
                      <Badge className="absolute top-3 left-3 bg-blue-600 hover:bg-blue-700">
                        Featured
                      </Badge>
                    )}
                    <Badge className="absolute top-3 right-3 bg-gray-800 hover:bg-gray-900">
                      {banner.category}
                    </Badge>
                  </div>
                  <CardContent className="p-4 flex-grow flex flex-col">
                    <h3 className="font-semibold text-lg mb-2 group-hover:text-blue-600 transition-colors">
                      {banner.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 flex-grow">
                      {banner.description}
                    </p>
                    <div className="flex items-center justify-between pt-2 border-t border-gray-100">
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
                          {banner.viewCount.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How Alika Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Create stunning dp banners for your campaigns & events in just a few simple steps
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
          title: "Upload Frame",
          description: "Upload your banner cover image with placeholders for avatars and name",
          icon: <Upload className="w-8 h-8 text-blue-600" />
        },
        {
          title: "Configure Banner",
          description: "Customize avatar shape, size, position and name styling to match your brand",
          icon: <Settings className="w-8 h-8 text-blue-600" />
        },
        {
          title: "Publish & Share",
          description: "Get a shortened URL to instantly share your professional banner",
          icon: <Share2 className="w-8 h-8 text-blue-600" />
        }
            ].map((step, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Browse by Category Section */}
      <section id="categories" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Browse by Category</h2>
              <p className="text-gray-600 mt-2">Find campaigns that match your interests</p>
            </div>
            <Link href="/categories">
              <Button
                variant="ghost"
                className="text-blue-600 hover:text-blue-700 group"
              >
                All Categories <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories.map((category) => (
              <Link href={`/categories/${category.name.toLowerCase()}`} key={category.name}>
                <Card className="overflow-hidden hover:shadow-lg transition-all cursor-pointer group h-full">
                  <div className="aspect-square relative">
                    <img
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute inset-0 bg-black/30 flex flex-col justify-end p-3">
                      <div className="flex items-center">
                        <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mr-2">
                          {category.icon}
                        </div>
                        <h3 className="text-white font-semibold text-sm">
                          {category.name}
                        </h3>
                      </div>
                      <p className="text-gray-200 text-xs mt-1">
                        {category.count} campaigns
                      </p>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Users Say</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it - hear from our community
            </p>
          </div>
          <div className="relative h-64">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className={`absolute inset-0 transition-opacity duration-500 ${index === currentTestimonial ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
              >
                <div className="bg-white p-8 rounded-xl shadow-sm max-w-3xl mx-auto">
                  <div className="flex items-center mb-6">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={testimonial.avatar} />
                      <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="ml-4">
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-gray-600 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 italic">"{testimonial.content}"</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full ${index === currentTestimonial ? 'bg-blue-600' : 'bg-gray-300'}`}
                aria-label={`View testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Launch Your Campaign?</h2>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
            Join thousands of creators who are building momentum with Alika
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 shadow-lg hover:shadow-white/30 transition-all"
              onClick={() => {
                setAuthMode("register");
                setIsAuthModalOpen(true);
              }}
            >
              Get Started for Free
            </Button>
            <Link href="/recents">
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent hover:bg-white/10 text-white border-white/20 hover:border-white/30"
              >
                Explore Campaigns
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
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