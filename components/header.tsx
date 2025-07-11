"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu,Rocket, X } from "lucide-react";
import Link from "next/link";
import UserDropdown from "../components/user-dropdown";
import AuthModal from "../components/auth-modal";


interface HeaderProps {
  isLoggedIn?: boolean;
  user?: {
    name: string;
    avatar: string;
    role: string;
  };
  onLogin?: () => void;
  onLogout?: () => void;
  onRegister?: () => void;
}

export default function Header({ 
  isLoggedIn = false, 
  user = { name: "", avatar: "", role: "user" },
  onLogin = () => {},
  onLogout = () => {},
  onRegister = () => {},
}: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");

  const handleAuthSuccess = (userData: any) => {
    setIsAuthModalOpen(false);
    // You might want to handle this differently based on your auth flow
  };

  return (
    <>
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/">
                <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                  <Rocket className="text-blue-600 mr-2" /> Alika
                </h1>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                Create
              </Link>
              <Link href="/recents" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                Recent Campaigns
              </Link>
              <Link href="/categories" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                Categories
              </Link>
              <Link href="/help" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                Help
              </Link>
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
                      onLogin();
                    }}
                    className="hover:bg-blue-50 hover:text-blue-600"
                  >
                    Login
                  </Button>
                  <Button
                    onClick={() => {
                      setAuthMode("register");
                      setIsAuthModalOpen(true);
                      onRegister();
                    }}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Register
                  </Button>
                </>
              ) : (
                <UserDropdown user={user} onLogout={onLogout} />
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
                <Link
                  href="/create"
                  className="text-gray-700 hover:text-blue-600 font-medium px-4 py-2 rounded-lg hover:bg-blue-50"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Create
                </Link>
                <Link
                  href="/recents"
                  className="text-gray-700 hover:text-blue-600 font-medium px-4 py-2 rounded-lg hover:bg-blue-50"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Recent Campaigns
                </Link>
                <Link
                  href="/categories"
                  className="text-gray-700 hover:text-blue-600 font-medium px-4 py-2 rounded-lg hover:bg-blue-50"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Categories
                </Link>
                <Link
                  href="/help"
                  className="text-gray-700 hover:text-blue-600 font-medium px-4 py-2 rounded-lg hover:bg-blue-50"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Help
                </Link>
                {!isLoggedIn ? (
                  <div className="flex space-x-2 pt-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setAuthMode("login");
                        setIsAuthModalOpen(true);
                        setIsMobileMenuOpen(false);
                        onLogin();
                      }}
                      className="w-full"
                    >
                      LOGIN
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => {
                        setAuthMode("register");
                        setIsAuthModalOpen(true);
                        setIsMobileMenuOpen(false);
                        onRegister();
                      }}
                      className="w-full bg-blue-600 hover:bg-blue-700"
                    >
                      REGISTER
                    </Button>
                  </div>
                ) : (
                  <div className="pt-2">
                    <UserDropdown user={user} onLogout={onLogout} />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </header>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        mode={authMode}
        onSuccess={handleAuthSuccess}
        onSwitchMode={(mode) => setAuthMode(mode)}
      />
    </>
  );
}