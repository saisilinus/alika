"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Eye,
    Calendar,
    ArrowRight,
    Menu,
    X,
    ChevronRight,
    Link,
    Rocket,
    Settings,
    Share2,
    Upload,
} from "lucide-react";
import { LoadingCard } from "@/components/ui/loading";
import AuthModal from "@/components/auth-modal";
import UserDropdown from "@/components/user-dropdown";
import {
    useGetTrendingCampaignsQuery,
    useGetLatestCampaignsQuery,
} from "@/features";
import { useSession } from "next-auth/react";
import { Footer } from "react-day-picker";

const categories = [
    {
        id: 1,
        name: "Business",
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop",
        count: 245,
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
        count: 156,
    },
    {
        id: 4,
        name: "Social",
        image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&h=300&fit=crop",
        count: 203,
    },
    {
        id: 5,
        name: "Sports",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
        count: 134,
    },
    {
        id: 6,
        name: "Movement",
        image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400&h=300&fit=crop",
        count: 87,
    },
    {
        id: 7,
        name: "Art & Culture",
        image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=400&h=300&fit=crop",
        count: 112,
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
        count: 167,
    },
    {
        id: 10,
        name: "Fashion & Beauty",
        image: "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=400&h=300&fit=crop",
        count: 93,
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
        content:
            "Alika helped us increase event attendance by 300% with their beautiful campaign banners and easy sharing tools.",
        avatar: "/avatar1.jpg",
    },
    {
        name: "Michael Chen",
        role: "Marketing Director",
        content:
            "Our campaign went viral thanks to Alika's seamless integration with social platforms. Best decision we made!",
        avatar: "/avatar2.jpg",
    },
    {
        name: "Emma Rodriguez",
        role: "Nonprofit Founder",
        content:
            "As a small nonprofit, Alika gave us professional-looking campaigns without the professional price tag.",
        avatar: "/avatar3.jpg",
    },
];

export default function HomePage() {
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [authMode, setAuthMode] = useState<"login" | "register">("login");
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [currentTestimonial, setCurrentTestimonial] = useState(0);

    const { data: session } = useSession();
    const isLoggedIn = !!session;

    console.log({ session });

    // RTK Query hooks - these return Campaign[] directly
    const {
        data: trendingCampaigns,
        isLoading: trendingLoading,
        error: trendingError,
    } = useGetTrendingCampaignsQuery({ limit: 4 });

    const {
        data: latestCampaigns,
        isLoading: latestLoading,
        error: latestError,
    } = useGetLatestCampaignsQuery({ limit: 4 });

    const handleAuthSuccess = (userData: any) => {
        setIsAuthModalOpen(false);
    };

    const handleLogout = () => {
        // Handled by NextAuth
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo */}
                        <div className="flex-shrink-0">
                            <h1 className="text-2xl font-bold text-gray-900">
                                Alika
                            </h1>
                        </div>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex space-x-8">
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
                                href="/terminal"
                                className="text-gray-700 hover:text-gray-900 font-medium"
                            >
                                TERMINAL
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
                                        LOGIN
                                    </Button>
                                    <Button
                                        onClick={() => {
                                            setAuthMode("register");
                                            setIsAuthModalOpen(true);
                                        }}
                                    >
                                        REGISTER
                                    </Button>
                                </>
                            ) : (
                                <UserDropdown
                                    user={{
                                        name: session.user?.name || "User",
                                        avatar: session.user?.image || "",
                                        role: "user",
                                    }}
                                    onLogout={handleLogout}
                                />
                            )}
                        </div>

                        {/* Mobile menu button */}
                        <div className="md:hidden">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() =>
                                    setIsMobileMenuOpen(!isMobileMenuOpen)
                                }
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
                                    href="/terminal"
                                    className="text-gray-700 hover:text-gray-900 font-medium"
                                >
                                    TERMINAL
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
                                        <UserDropdown
                                            user={{
                                                name:
                                                    session.user?.name ||
                                                    "User",
                                                avatar:
                                                    session.user?.image || "",
                                                role: "user",
                                            }}
                                            onLogout={handleLogout}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </header>

            {/* Hero Section */}
            <section className="relative bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20 lg:py-32 overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-bottom bg-no-repeat opacity-20"
                    style={{ backgroundImage: 'url("/hero.jpg")' }}
                ></div>
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0 bg-[url('/pattern.svg')] bg-[length:300px_300px] opacity-20"></div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="inline-flex items-center bg-blue-500/20 px-4 py-2 rounded-full text-sm font-medium mb-4">
                        <Rocket className="mr-2 h-4 w-4" /> Welcome to the
                        future of campaigns
                    </div>

                    <h1 className="text-3xl md:text-6xl font-bold mb-6 leading-tight">
                        <span className="text-orange-500">Invite</span> Your{" "}
                        <span className="text-green-500">Audience</span> To
                        <br />
                        <span className="text-purple-500">
                            Champion
                        </span> Your{" "}
                        <span className="text-orange-500">Cause</span>
                    </h1>
                    <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
                        Everything you need to build<br></br> unstoppable
                        momentum for your campaign or event
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
                        <p className="text-gray-500 text-sm font-medium">
                            Trusted by innovative organizers{" "}
                        </p>
                    </div>

                    {trendingLoading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                            {[...Array(4)].map((_, i) => (
                                <LoadingCard key={i} />
                            ))}
                        </div>
                    ) : trendingError ? (
                        <div className="text-center py-8">
                            <p className="text-red-600">
                                Error loading trending campaigns
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                            {trendingCampaigns?.campaigns.map((banner) => (
                                <Card
                                    key={banner._id?.toString()}
                                    className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                                >
                                    <div className="aspect-video relative">
                                        <img
                                            src={
                                                banner.templateUrl ||
                                                banner.imageUrl ||
                                                "/placeholder.svg"
                                            }
                                            alt={banner.title}
                                            className="w-full h-full object-cover"
                                        />
                                        <Badge className="absolute top-3 left-3 bg-red-500 hover:bg-red-600">
                                            {banner.category}
                                        </Badge>
                                    </div>
                                    <CardContent className="p-4">
                                        <h3 className="font-semibold text-lg mb-2">
                                            {banner.title}
                                        </h3>
                                        <p className="text-gray-600 text-sm mb-3">
                                            {banner.description}
                                        </p>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-2">
                                                <Avatar className="h-6 w-6">
                                                    <AvatarImage
                                                        src={
                                                            banner.creator
                                                                ?.image ||
                                                            "/placeholder.svg"
                                                        }
                                                    />
                                                    <AvatarFallback>
                                                        {banner.creator
                                                            ?.name?.[0] || "U"}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <span className="text-sm text-gray-600">
                                                    {banner.creator?.name ||
                                                        "Creator"}
                                                </span>
                                            </div>
                                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                                                <div className="flex items-center">
                                                    <Eye className="h-4 w-4 mr-1" />
                                                    {banner.viewCount || 0}
                                                </div>
                                                <div className="flex items-center">
                                                    <Calendar className="h-4 w-4 mr-1" />
                                                    {new Date(
                                                        banner.createdAt
                                                    ).toLocaleDateString()}
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
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
                            <p className="text-gray-600 mt-2">
                                Discover what's capturing attention right now
                            </p>
                        </div>
                        <Link href="/recents">
                            <Button
                                variant="ghost"
                                className="text-blue-600 hover:text-blue-700 group"
                            >
                                View All{" "}
                                <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                    </div>

                    {latestLoading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                            {[...Array(4)].map((_, i) => (
                                <LoadingCard key={i} />
                            ))}
                        </div>
                    ) : latestError ? (
                        <div className="text-center py-8">
                            <p className="text-red-600">
                                Error loading latest campaigns
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                            {latestCampaigns?.campaigns.map((banner) => (
                                <Card
                                    key={banner._id?.toString()}
                                    className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                                >
                                    <div className="aspect-video relative">
                                        <img
                                            src={
                                                banner.templateUrl ||
                                                banner.imageUrl ||
                                                "/placeholder.svg"
                                            }
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
                                                        src={
                                                            banner.creator
                                                                ?.image ||
                                                            "/placeholder.svg"
                                                        }
                                                    />
                                                    <AvatarFallback>
                                                        {banner.creator
                                                            ?.name?.[0] || "U"}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <span className="text-sm text-gray-600">
                                                    {banner.creator?.name ||
                                                        "Creator"}
                                                </span>
                                            </div>
                                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                                                <div className="flex items-center">
                                                    <Eye className="h-4 w-4 mr-1" />
                                                    {banner.viewCount || 0}
                                                </div>
                                                <div className="flex items-center">
                                                    <Calendar className="h-4 w-4 mr-1" />
                                                    {new Date(
                                                        banner.createdAt
                                                    ).toLocaleDateString()}
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Browse by Category Section */}
            <section id="categories" className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
                        Browse by Category
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {categories.map((category) => (
                            <Card
                                key={category.name}
                                className="overflow-hidden hover:shadow-lg transition-all cursor-pointer group"
                            >
                                <div className="aspect-square relative">
                                    <img
                                        src={
                                            category.image || "/placeholder.svg"
                                        }
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

            {/* How It Works Section */}
            <section className="py-16 bg-gradient-to-r from-blue-50 to-indigo-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            How Alika Works
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Create stunning dp banners for your campaigns &
                            events in just a few simple steps
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Upload Frame",
                                description:
                                    "Upload your banner cover image with placeholders for avatars and name",
                                icon: (
                                    <Upload className="w-8 h-8 text-blue-600" />
                                ),
                            },
                            {
                                title: "Configure Banner",
                                description:
                                    "Customize avatar shape, size, position and name styling to match your brand",
                                icon: (
                                    <Settings className="w-8 h-8 text-blue-600" />
                                ),
                            },
                            {
                                title: "Publish & Share",
                                description:
                                    "Get a shortened URL to instantly share your professional banner",
                                icon: (
                                    <Share2 className="w-8 h-8 text-blue-600" />
                                ),
                            },
                        ].map((step, index) => (
                            <div
                                key={index}
                                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                            >
                                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                                    {step.icon}
                                </div>
                                <h3 className="text-xl font-semibold mb-2">
                                    {step.title}
                                </h3>
                                <p className="text-gray-600">
                                    {step.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-16 bg-gradient-to-r from-blue-50 to-indigo-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            What Our Users Say
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Don't just take our word for it - hear from our
                            community
                        </p>
                    </div>
                    <div className="relative h-64">
                        {testimonials.map((testimonial, index) => (
                            <div
                                key={index}
                                className={`absolute inset-0 transition-opacity duration-500 ${
                                    index === currentTestimonial
                                        ? "opacity-100"
                                        : "opacity-0 pointer-events-none"
                                }`}
                            >
                                <div className="bg-white p-8 rounded-xl shadow-sm max-w-3xl mx-auto">
                                    <div className="flex items-center mb-6">
                                        <Avatar className="h-12 w-12">
                                            <AvatarImage
                                                src={testimonial.avatar}
                                            />
                                            <AvatarFallback>
                                                {testimonial.name[0]}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="ml-4">
                                            <h4 className="font-semibold">
                                                {testimonial.name}
                                            </h4>
                                            <p className="text-gray-600 text-sm">
                                                {testimonial.role}
                                            </p>
                                        </div>
                                    </div>
                                    <p className="text-gray-700 italic">
                                        "{testimonial.content}"
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-center mt-8 space-x-2">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentTestimonial(index)}
                                className={`w-3 h-3 rounded-full ${
                                    index === currentTestimonial
                                        ? "bg-blue-600"
                                        : "bg-gray-300"
                                }`}
                                aria-label={`View testimonial ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        Ready to Launch Your Campaign?
                    </h2>
                    <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
                        Join thousands of creators who are building momentum
                        with Alika
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
