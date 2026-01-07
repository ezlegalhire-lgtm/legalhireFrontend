"use client";

import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  LogOut,
  LayoutDashboard,
  Settings,
  ChevronDown,
  Calendar,
  Briefcase,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

interface ClientUser {
  firstName: string;
  lastName: string;
  email: string;
  isVerified: boolean;
}

export default function PublicHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<ClientUser | null>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);

  // Check authentication status
  useEffect(() => {
    const checkAuth = () => {
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("clientToken");
        const userData = localStorage.getItem("clientData");

        setIsLoggedIn(!!token);
        if (userData) {
          try {
            setCurrentUser(JSON.parse(userData));
          } catch (error) {
            console.error("Error parsing user data:", error);
            setCurrentUser(null);
          }
        }
      }
    };

    checkAuth();

    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path: string) => pathname === path;

  const handleLogout = async () => {
    if (typeof window !== "undefined") {
      // Check if user logged in with Google
      const clientData = localStorage.getItem("clientData");
      if (clientData) {
        try {
          const data = JSON.parse(clientData);
          if (data.provider === "google") {
            // Sign out from Supabase
            const { signOutFromSupabase } = await import("@/lib/supabase");
            await signOutFromSupabase();
          }
        } catch (e) {
          console.error("Error during logout:", e);
        }
      }

      localStorage.removeItem("clientToken");
      localStorage.removeItem("clientData");
      setIsLoggedIn(false);
      setCurrentUser(null);
      setShowUserMenu(false);
      window.dispatchEvent(new Event("storage"));
      router.push("/home");
    }
  };

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Main Header */}
      <header
        className={`sticky top-0 z-50 ${
          isScrolled
            ? "shadow-lg bg-gradient-to-r from-purple-700 to-pink-600"
            : "bg-gradient-to-r from-purple-700 to-pink-600 border-b border-purple-800"
        }`}
      >
        <div className="mx-auto xl:container px-5 xl:px-0 py-3">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/home" className="flex items-center gap-3 group">
              <div className="relative">
                <Image
                  src="/wLogo.png"
                  alt="LegalHire Logo"
                  width={75}
                  height={75}
                  priority
                />
                <div className="flex flex-col absolute top-[49%] right-[-11rem] -translate-y-[49%]">
                  <span
                    style={{ fontWeight: 500 }}
                    className="text-[2.2rem] anton  font-black leading-[43px] text-white  underline underline-offset-[6px] decoration-[3px] tracking-[0.13em]"
                  >
                    LEGALHIRE
                  </span>
                  <span className="text-[10.2px] anton light-anton font-semibold mt-0.5 text-white tracking-tight mt-1">
                    UAE&apos;s First Integrated Legaltech Portal
                  </span>
                </div>
              </div>
            </Link>
            <div className="flex items-center gap-3">
              <nav className="hidden lg:flex items-center gap-3 text-sm">
                <Link
                  href="/home"
                  className={`px-3 py-2 rounded-lg font-medium transition-colors ${
                    isActive("/home")
                      ? "bg-white/20 text-white"
                      : "text-white hover:bg-white/10"
                  }`}
                >
                  Home
                </Link>
                <Link
                  href="/services"
                  className={`px-3 py-2 rounded-lg font-medium transition-colors ${
                    isActive("/services")
                      ? "bg-white/20 text-white"
                      : "text-white hover:bg-white/10"
                  }`}
                >
                  Services
                </Link>
                <Link
                  href="/business"
                  className={`px-3 py-2 rounded-lg font-medium transition-colors ${
                    isActive("/business")
                      ? "bg-white/20 text-white"
                      : "text-white hover:bg-white/10"
                  }`}
                >
                  Business Retainer
                </Link>
                <Link
                  href="/how-it-works"
                  className={`px-3 py-2 rounded-lg font-medium transition-colors ${
                    isActive("/how-it-works")
                      ? "bg-white/20 text-white"
                      : "text-white hover:bg-white/10"
                  }`}
                >
                  How it works
                </Link>
                <Link
                  href="/legal-resources"
                  className={`px-3 py-2 rounded-lg font-medium transition-colors ${
                    isActive("/legal-resources")
                      ? "bg-white/20 text-white"
                      : "text-white hover:bg-white/10"
                  }`}
                >
                  Legal Resources
                </Link>
                <Link
                  href="/contact"
                  className={`px-3 py-2 rounded-lg font-medium transition-colors ${
                    isActive("/contact")
                      ? "bg-white/20 text-white"
                      : "text-white hover:bg-white/10"
                  }`}
                >
                  Contact
                </Link>
              </nav>

              <div className="hidden lg:flex items-center gap-4">
                {/* Phone Number Display */}
                {/* <div className="text-sm text-white font-medium hidden lg:block">
              (+971) 564-591-060
            </div>
             */}
                {isLoggedIn && currentUser ? (
                  // Logged In - Member Area Button with Dropdown
                  <div className="relative">
                    <button
                      onClick={() => setShowUserMenu(!showUserMenu)}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-white bg-white/10 hover:bg-white/20 transition-all border border-white/20 hover:border-white/30"
                    >
                      <div className="w-6 h-6 bg-white/90 rounded-full flex items-center justify-center text-purple-700 text-xs font-bold shadow-sm">
                        {currentUser.firstName[0]}
                        {currentUser.lastName[0]}
                      </div>
                      <span>{currentUser.firstName}</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${
                          showUserMenu ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {showUserMenu && (
                      <>
                        <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-50">
                          {/* User Info Header */}
                          <div className="bg-gradient-to-br from-cyan-500 to-blue-600 p-4 text-white">
                            <div className="flex items-center gap-3 mb-3">
                              <div className="w-14 h-14 bg-white/30 rounded-full flex items-center justify-center border-2 border-white/50">
                                <span className="text-xl font-bold">
                                  {currentUser.firstName[0]}
                                  {currentUser.lastName[0]}
                                </span>
                              </div>
                              <div className="flex-1">
                                <p className="font-bold text-base">
                                  {currentUser.firstName} {currentUser.lastName}
                                </p>
                                <p className="text-xs opacity-90 mt-0.5">
                                  {currentUser.email}
                                </p>
                              </div>
                            </div>
                            {currentUser.isVerified ? (
                              <div className="flex items-center gap-2 text-xs bg-green-500/30 px-3 py-1.5 rounded-lg">
                                <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></div>
                                <span className="font-semibold">
                                  Verified Account
                                </span>
                              </div>
                            ) : (
                              <div className="flex items-center gap-2 text-xs bg-yellow-500/30 px-3 py-1.5 rounded-lg">
                                <div className="w-2 h-2 bg-yellow-300 rounded-full animate-pulse"></div>
                                <span className="font-semibold">
                                  Pending Verification
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Menu Items */}
                          <div className="p-2">
                            <Link
                              href="/client/dashboard"
                              onClick={() => setShowUserMenu(false)}
                              className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors group"
                            >
                              <div className="w-10 h-10 bg-cyan-50 rounded-lg flex items-center justify-center group-hover:bg-cyan-100 transition-colors">
                                <LayoutDashboard className="w-4 h-4 text-cyan-600" />
                              </div>
                              <div className="flex-1">
                                <p className="text-sm font-semibold text-slate-900">
                                  Dashboard
                                </p>
                                <p className="text-xs text-slate-500">
                                  Overview & stats
                                </p>
                              </div>
                            </Link>

                            <Link
                              href="/client/orders"
                              onClick={() => setShowUserMenu(false)}
                              className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors group"
                            >
                              <div className="w-10 h-10 bg-cyan-50 rounded-lg flex items-center justify-center group-hover:bg-cyan-100 transition-colors">
                                <Calendar className="w-4 h-4 text-cyan-600" />
                              </div>
                              <div className="flex-1">
                                <p className="text-sm font-semibold text-slate-900">
                                  My Orders
                                </p>
                                <p className="text-xs text-slate-500">
                                  Bookings & consultations
                                </p>
                              </div>
                            </Link>

                            <Link
                              href="/client/profile"
                              onClick={() => setShowUserMenu(false)}
                              className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors group"
                            >
                              <div className="w-10 h-10 bg-cyan-50 rounded-lg flex items-center justify-center group-hover:bg-cyan-100 transition-colors">
                                <Settings className="w-4 h-4 text-cyan-600" />
                              </div>
                              <div className="flex-1">
                                <p className="text-sm font-semibold text-slate-900">
                                  Profile Settings
                                </p>
                                <p className="text-xs text-slate-500">
                                  Update your info
                                </p>
                              </div>
                            </Link>
                          </div>

                          {/* Logout */}
                          <div className="px-2 pb-2 pt-1 border-t border-slate-200">
                            <button
                              onClick={async () => {
                                setShowUserMenu(false);
                                await handleLogout();
                              }}
                              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-colors font-semibold text-sm"
                            >
                              <LogOut className="w-4 h-4" />
                              Sign Out
                            </button>
                          </div>

                          {/* Lawyer Portal Link */}
                          <div className="px-2 pb-2 border-t border-slate-200">
                            <Link
                              href="/lawyer/login"
                              onClick={() => setShowUserMenu(false)}
                            >
                              <button className="btn btn-primary w-full py-3 text-sm">
                                <Briefcase className="w-4 h-4" />
                                Lawyer Portal
                              </button>
                            </Link>
                          </div>
                        </div>

                        {/* Backdrop */}
                        <div
                          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
                          onClick={() => setShowUserMenu(false)}
                        />
                      </>
                    )}
                  </div>
                ) : (
                  // Guest - Member Area Button (leads to login)
                  <Link href="/client/login">
                    <button className="px-4 py-2 rounded-lg font-medium text-white bg-white/10 hover:bg-white/20 transition-all border border-white/20 hover:border-white/30">
                      Login
                    </button>
                  </Link>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden px-3 py-2 rounded-lg border border-white/30 text-white text-sm font-medium hover:bg-white/10 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="mobile-menu">
            <div className="px-4 py-5 space-y-2 max-w-7xl mx-auto">
              {/* Navigation Links */}
              <Link
                href="/home"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`mobile-menu-item ${
                  isActive("/home") ? "active" : ""
                }`}
              >
                Home
              </Link>
              <Link
                href="/services"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`mobile-menu-item ${
                  isActive("/services") ? "active" : ""
                }`}
              >
                Services
              </Link>
              <Link
                href="/business"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`mobile-menu-item ${
                  isActive("/business") ? "active" : ""
                }`}
              >
                Business Retainer
              </Link>
              <Link
                href="/how-it-works"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`mobile-menu-item ${
                  isActive("/how-it-works") ? "active" : ""
                }`}
              >
                How it works
              </Link>
              <Link
                href="/legal-resources"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`mobile-menu-item ${
                  isActive("/legal-resources") ? "active" : ""
                }`}
              >
                Legal Resources
              </Link>
              <Link
                href="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`mobile-menu-item ${
                  isActive("/contact") ? "active" : ""
                }`}
              >
                Contact
              </Link>

              {/* Mobile Auth Section */}
              <div className="pt-4 border-t-2 border-slate-200 space-y-3">
                {isLoggedIn && currentUser ? (
                  <>
                    {/* User Info */}
                    <div className="px-5 py-4 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-2xl border-2 border-cyan-200">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-12 h-12 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-full flex items-center justify-center text-white font-bold shadow-md">
                          {currentUser.firstName[0]}
                          {currentUser.lastName[0]}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-bold text-slate-900">
                            {currentUser.firstName} {currentUser.lastName}
                          </p>
                          <p className="text-xs text-slate-600 font-medium">
                            {currentUser.email}
                          </p>
                        </div>
                      </div>
                      {currentUser.isVerified && (
                        <div className="flex items-center gap-2 text-xs text-green-700 bg-green-100 px-3 py-1.5 rounded-lg font-semibold">
                          <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                          Verified Account
                        </div>
                      )}
                    </div>

                    <Link
                      href="/client/dashboard"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <button className="btn btn-primary w-full py-4 shadow-lg hover:shadow-xl">
                        <LayoutDashboard className="w-5 h-5" />
                        Dashboard
                      </button>
                    </Link>

                    <div className="grid grid-cols-2 gap-3">
                      <Link
                        href="/client/orders"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <button className="w-full flex flex-col items-center gap-2 py-3 border-2 border-cyan-300 text-cyan-700 font-semibold rounded-xl hover:bg-cyan-50 transition-colors">
                          <Calendar className="w-5 h-5" />
                          <span className="text-sm">Orders</span>
                        </button>
                      </Link>
                      <Link
                        href="/client/profile"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <button className="w-full flex flex-col items-center gap-2 py-3 border-2 border-cyan-300 text-cyan-700 font-semibold rounded-xl hover:bg-cyan-50 transition-colors">
                          <Settings className="w-5 h-5" />
                          <span className="text-sm">Profile</span>
                        </button>
                      </Link>
                    </div>

                    <button
                      onClick={async () => {
                        setIsMobileMenuOpen(false);
                        await handleLogout();
                      }}
                      className="w-full flex items-center justify-center gap-2 py-3 border-2 border-red-300 text-red-600 font-semibold rounded-xl hover:bg-red-50 transition-colors"
                    >
                      <LogOut className="w-5 h-5" />
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/client/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <button className="btn btn-primary w-full py-4 shadow-lg hover:shadow-xl">
                        Member Area Login
                      </button>
                    </Link>
                  </>
                )}

                {/* Lawyer Portal Link - Mobile */}
                <div className="pt-3 border-t-2 border-slate-200">
                  <p className="text-xs text-slate-600 text-center mb-3 font-medium">
                    Are you a lawyer?
                  </p>
                  <Link
                    href="/lawyer/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <button className="w-full py-3 bg-slate-900 text-white font-semibold rounded-xl hover:bg-slate-800 transition-colors flex items-center justify-center gap-2">
                      <Briefcase className="w-5 h-5" />
                      Lawyer Portal
                    </button>
                  </Link>
                </div>

                {/* Phone Link */}
                {/* <a 
                href="tel:+971564591060" 
                className="flex items-center justify-center gap-2 py-4 text-slate-700 border-2 border-slate-300 rounded-xl font-bold hover:border-cyan-300 hover:text-cyan-700 transition-colors"
              >
                <Phone className="w-5 h-5" />
                (+971) 564-591-060
              </a> */}
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
