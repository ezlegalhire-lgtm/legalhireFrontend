'use client';

import React, { useState, useEffect } from 'react';
import { Scale, Menu, X, Phone, LogOut, LayoutDashboard, Settings, ChevronDown, Calendar, Briefcase, FileText } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

interface LawyerUser {
  firstName: string;
  lastName: string;
  email: string;
  specialization?: string;
  licenseNumber?: string;
}

export default function LawyerHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<LawyerUser | null>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  
  // Check authentication status
  useEffect(() => {
    const checkAuth = () => {
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('lawyerToken');
        const userData = localStorage.getItem('lawyerData');
        
        setIsLoggedIn(!!token);
        if (userData) {
          try {
            setCurrentUser(JSON.parse(userData));
          } catch (e) {
            console.error('Error parsing lawyer data:', e);
          }
        }
      }
    };
    
    checkAuth();
    
    // Listen for auth changes
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, []);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const isActive = (path: string) => pathname === path;
  
  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('lawyerToken');
      localStorage.removeItem('lawyerData');
      setIsLoggedIn(false);
      setCurrentUser(null);
      setShowUserMenu(false);
      router.push('/home');
    }
  };
  
  return (
    <header 
      className={`header-sticky ${
        isScrolled 
          ? 'header-scrolled' 
          : 'bg-white/70 backdrop-blur border-b border-slate-200'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left: Logo */}
        <Link href="/home" className="flex items-center gap-3 group">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-purple-600 to-violet-600 flex items-center justify-center shadow-md group-hover:shadow-lg transition-all">
            <Scale className="w-5 h-5 text-white" />
          </div>
          <div className="leading-tight">
            <p className="text-sm font-semibold text-slate-900 group-hover:text-purple-700 transition-colors">EZ Legal Hire </p>
            <p className="text-[11px] text-slate-500 -mt-0.5">Legal Consultancy</p>
          </div>
        </Link>

        {/* Center: Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link 
            href="/home"
            className={`font-medium transition-colors ${
              isActive('/home') ? 'text-purple-700' : 'hover:text-slate-900 text-slate-600'
            }`}
          >
            Home
          </Link>
          <Link 
            href="/services"
            className={`transition-colors ${
              isActive('/services') ? 'text-purple-700 font-medium' : 'hover:text-slate-900 text-slate-600'
            }`}
          >
            Services
          </Link>
          <a 
            href="#plans"
            className="hover:text-slate-900 text-slate-600 transition-colors"
          >
            Business Retainer
          </a>
          <a 
            href="#how"
            className="hover:text-slate-900 text-slate-600 transition-colors"
          >
            How it works
          </a>
          <Link 
            href="/contact"
            className={`transition-colors ${
              isActive('/contact') ? 'text-purple-700 font-medium' : 'hover:text-slate-900 text-slate-600'
            }`}
          >
            Contact
          </Link>
        </nav>

        {/* Right: Phone & Lawyer Portal */}
        <div className="hidden md:flex items-center gap-3">
          {/* Phone */}
          <a 
            href="tel:+971564591060" 
            className="flex items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:text-purple-700 rounded-lg transition-all group"
          >
            <Phone className="w-4 h-4 group-hover:scale-110 transition-transform" />
            <span className="font-medium">(+971) 564-591-060</span>
          </a>
          
          {isLoggedIn && currentUser ? (
            // Logged In Lawyer Menu
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="btn-solid px-4 py-2 text-sm flex items-center gap-2"
              >
                <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-xs font-bold">
                  {currentUser.firstName[0]}{currentUser.lastName[0]}
                </div>
                <span>Lawyer Portal</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
              </button>
              
              {showUserMenu && (
                <>
                  <div className={`user-dropdown ${showUserMenu ? 'show' : ''}`}>
                    {/* User Info Header */}
                    <div className="user-dropdown-header">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                          <span className="text-lg font-bold">
                            {currentUser.firstName[0]}{currentUser.lastName[0]}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-semibold">
                            {currentUser.firstName} {currentUser.lastName}
                          </p>
                          <p className="text-xs opacity-90">{currentUser.email}</p>
                        </div>
                      </div>
                      {currentUser.specialization && (
                        <div className="flex items-center gap-1 text-xs">
                          <Briefcase className="w-3 h-3" />
                          <span>{currentUser.specialization}</span>
                        </div>
                      )}
                    </div>
                    
                    {/* Menu Items */}
                    <div className="py-2">
                      <Link
                        href="/lawyer/dashboard"
                        onClick={() => setShowUserMenu(false)}
                        className="user-dropdown-item"
                      >
                        <div className="user-dropdown-icon">
                          <LayoutDashboard className="w-5 h-5 text-violet-600" />
                        </div>
                        <div>
                          <div className="font-medium text-slate-900">Dashboard</div>
                          <div className="text-xs text-slate-500">Manage client orders</div>
                        </div>
                      </Link>
                      <Link
                        href="/lawyer/orders"
                        onClick={() => setShowUserMenu(false)}
                        className="user-dropdown-item"
                      >
                        <div className="user-dropdown-icon">
                          <FileText className="w-5 h-5 text-violet-600" />
                        </div>
                        <div>
                          <div className="font-medium text-slate-900">All Orders</div>
                          <div className="text-xs text-slate-500">View order history</div>
                        </div>
                      </Link>
                      <Link
                        href="/lawyer/calendar"
                        onClick={() => setShowUserMenu(false)}
                        className="user-dropdown-item"
                      >
                        <div className="user-dropdown-icon">
                          <Calendar className="w-5 h-5 text-violet-600" />
                        </div>
                        <div>
                          <div className="font-medium text-slate-900">Schedule</div>
                          <div className="text-xs text-slate-500">Manage appointments</div>
                        </div>
                      </Link>
                      <Link
                        href="/lawyer/profile"
                        onClick={() => setShowUserMenu(false)}
                        className="user-dropdown-item"
                      >
                        <div className="user-dropdown-icon">
                          <Settings className="w-5 h-5 text-violet-600" />
                        </div>
                        <div>
                          <div className="font-medium text-slate-900">Account Settings</div>
                          <div className="text-xs text-slate-500">Manage your profile</div>
                        </div>
                      </Link>
                    </div>
                    
                    {/* Logout */}
                    <div className="border-t border-slate-200">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="w-5 h-5" />
                        <span className="font-medium">Sign Out</span>
                      </button>
                    </div>
                  </div>
                  {/* Backdrop */}
                  <div 
                    className="backdrop"
                    onClick={() => setShowUserMenu(false)}
                  />
                </>
              )}
            </div>
          ) : (
            // Guest User - Login Button
            <Link href="/lawyer/login">
              <button className="btn-solid px-4 py-2 text-sm">
                Lawyer Portal
              </button>
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 text-slate-700 hover:text-purple-700 rounded-lg transition-colors"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="mobile-menu">
          <div className="px-4 py-4 space-y-3 max-w-7xl mx-auto">
            {/* Navigation Links */}
            <Link 
              href="/home"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`mobile-menu-item ${isActive('/home') ? 'active' : ''}`}
            >
              Home
            </Link>
            <Link 
              href="/services"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`mobile-menu-item ${isActive('/services') ? 'active' : ''}`}
            >
              Services
            </Link>
            <a 
              href="#plans"
              onClick={() => setIsMobileMenuOpen(false)}
              className="mobile-menu-item"
            >
              Business Retainer
            </a>
            <a 
              href="#how"
              onClick={() => setIsMobileMenuOpen(false)}
              className="mobile-menu-item"
            >
              How it works
            </a>
            <Link 
              href="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`mobile-menu-item ${isActive('/contact') ? 'active' : ''}`}
            >
              Contact
            </Link>
            
            {/* Mobile Auth Section */}
            <div className="pt-4 border-t border-slate-200 space-y-3">
              {isLoggedIn && currentUser ? (
                <>
                  {/* User Info */}
                  <div className="px-4 py-3 bg-gradient-to-r from-purple-50 to-violet-50 rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-violet-600 rounded-full flex items-center justify-center text-white font-bold">
                        {currentUser.firstName[0]}{currentUser.lastName[0]}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900">
                          {currentUser.firstName} {currentUser.lastName}
                        </p>
                        <p className="text-xs text-slate-600">{currentUser.email}</p>
                        {currentUser.specialization && (
                          <p className="text-xs text-purple-600 font-medium">{currentUser.specialization}</p>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <Link 
                    href="/lawyer/dashboard"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <button className="btn-primary w-full py-3 flex items-center justify-center gap-2">
                      <LayoutDashboard className="w-5 h-5" />
                      Dashboard
                    </button>
                  </Link>
                  
                  <div className="grid grid-cols-3 gap-2">
                    <Link 
                      href="/lawyer/orders"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <button className="w-full flex flex-col items-center gap-1 py-2.5 border-2 border-slate-300 text-slate-700 font-semibold rounded-lg hover:border-purple-300 hover:text-purple-700">
                        <FileText className="w-4 h-4" />
                        <span className="text-xs">Orders</span>
                      </button>
                    </Link>
                    <Link 
                      href="/lawyer/calendar"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <button className="w-full flex flex-col items-center gap-1 py-2.5 border-2 border-slate-300 text-slate-700 font-semibold rounded-lg hover:border-purple-300 hover:text-purple-700">
                        <Calendar className="w-4 h-4" />
                        <span className="text-xs">Schedule</span>
                      </button>
                    </Link>
                    <Link 
                      href="/lawyer/profile"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <button className="w-full flex flex-col items-center gap-1 py-2.5 border-2 border-slate-300 text-slate-700 font-semibold rounded-lg hover:border-purple-300 hover:text-purple-700">
                        <Settings className="w-4 h-4" />
                        <span className="text-xs">Profile</span>
                      </button>
                    </Link>
                  </div>
                  
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-center gap-2 py-2.5 border-2 border-red-200 text-red-600 font-semibold rounded-lg hover:bg-red-50"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <div className="px-4 py-3 bg-gradient-to-r from-purple-50 to-violet-50 rounded-lg">
                    <p className="text-sm font-semibold text-slate-900 mb-1">Lawyer Portal</p>
                    <p className="text-xs text-slate-600">Sign in to access your dashboard</p>
                  </div>
                  
                  <Link 
                    href="/lawyer/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <button className="btn-primary w-full py-3">
                      Sign In as Lawyer
                    </button>
                  </Link>
                  
                  <div className="pt-2 border-t border-slate-200">
                    <p className="text-xs text-slate-600 text-center mb-2">Looking for client portal?</p>
                    <Link 
                      href="/client/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <button className="w-full py-2.5 border-2 border-purple-300 text-purple-600 font-semibold rounded-lg hover:bg-purple-50">
                        Go to Client Portal
                      </button>
                    </Link>
                  </div>
                </>
              )}
              
              <a href="tel:+971564591060" className="flex items-center justify-center gap-2 py-3 text-slate-700 border-2 border-slate-300 rounded-lg font-medium hover:border-purple-300 hover:text-purple-700">
                <Phone className="w-4 h-4" />
                (+971) 564-591-060
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}