"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Eye, Calendar, ArrowRight,ChevronRight, Menu, X } from "lucide-react";
import AuthModal from "@/components/auth-modal";
import UserDropdown from "@/components/user-dropdown";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { LoadingCard } from "@/components/ui/loading";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from 'react';
import {
    useGetTrendingCampaignsQuery,
    useGetLatestCampaignsQuery,
} from "@/features";



export default function RecentsPage() {
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
     <Header/>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20 lg:py-16">
          <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20" style={{backgroundImage: 'url("/flow.jpg")'}}></div>
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Recent Campaigns and Events
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-100">
            Discover what's capturing attention right now
          </p>
          
        </div>
      </section>

      {/* Recent Banners/campaigns Section */}
            <section id="recents" className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900">
                                Latest Campaigns & Events
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
                    </div> */}

                    {latestLoading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                            {[...Array(4)].map((_, i) => (
                                <LoadingCard key={i} />
                            ))}
                        </div>
                    ) : latestError ? (
                        <div className="text-center py-8">
                            <p className="text-red-600">
                                Error loading lastest campaigns
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
