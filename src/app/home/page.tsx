"use client";

import FloatingChatButton from "@/components/business/FloatingChatButton";
import CTASection from "@/components/home/CTASection";
import FeaturesSection from "@/components/home/FeaturesSection";
import HeroSection from "@/components/home/HeroSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import MetricsSection from "@/components/home/MetricsSection";
import PlansSection from "@/components/home/PlansSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import PublicHeader from "@/components/layout/PublicHeader";
import React, { useState } from "react";

export default function HomePage() {
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsChatModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsChatModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-white">
      <PublicHeader />

      {/* Hero Section - Gradient background with neumorphic cards */}
      
      <HeroSection />

      {/* Features Section - Why Choose Us with neumorphic cards */}

      <div className="pt-12">
        <FeaturesSection />
      </div>

      {/* Plans Section - Retainer plans with neumorphic styling */}
      <div className="pt-12">
        <PlansSection />
      </div>

      {/* How It Works Section - Table + Video preview */}
      <div className="pt-12">
        <HowItWorksSection />
      </div>

      {/* Testimonials Section - Client reviews */}
      <div className="pt-12">
        <TestimonialsSection />
      </div>

      {/* Metrics Section - Stats with neumorphic cards */}
      <div className="pt-12">
        <MetricsSection />
      </div>

      {/* CTA Section - Final call to action */}
      <div className="py-12 bg-gradient-to-b from-slate-50 to-white">
        <CTASection />
      </div>

      {/* Floating Chat Button */}
      <FloatingChatButton onClick={handleOpenModal} />

      {/* Chat Modal - Add your chat modal component here if you have one */}
      {isChatModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-slate-900">Chat with Us</h3>
              <button
                onClick={handleCloseModal}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <p className="text-slate-600 mb-4">
              How can we help you today? Our legal team is here to assist you.
            </p>
            {/* Add your chat interface here */}
            <div className="space-y-3">
              <a
                href="tel:+971564591060"
                className="btn-primary w-full py-3 flex items-center justify-center gap-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                Call Now
              </a>
              <a
                href="mailto:onlinelegaluae@gmail.com"
                className="btn-secondary w-full py-3 flex items-center justify-center gap-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                Send Email
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
