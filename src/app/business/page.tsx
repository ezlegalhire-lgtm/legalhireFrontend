//src/app/business/page.tsx
'use client';

import React, { useState } from 'react';
import HeroSection from '@/components/business/HeroSection';
import PlansSection from '@/components/business/PlansSection';
import FeaturesGrid from '@/components/business/FeaturesGrid';
import TrustSection from '@/components/business/TrustSection';
import ComparisonTable from '@/components/business/ComparisonTable';
import SavingsCalculator from '@/components/business/SavingsCalculator';
import TestimonialsSection from '@/components/business/TestimonialsSection';
import BlogInsights from '@/components/business/BlogInsights';
import FAQSection from '@/components/business/FAQSection';
import ROIBanner from '@/components/business/ROIBanner';
import ContactModal from '@/components/business/ContactModal';
import FloatingChatButton from '@/components/business/FloatingChatButton';
import PublicHeader from '@/components/layout/PublicHeader';

export default function BusinessRetainerPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('');

  const handleOpenModal = (plan: string = '') => {
    setSelectedPlan(plan);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedPlan('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header Section */}
      <PublicHeader />
      
      {/* Hero Section */}
      <HeroSection onOpenModal={handleOpenModal} />

      {/* Plans Section */}
      <PlansSection onSelectPlan={handleOpenModal} />

      {/* Features Grid */}
      <FeaturesGrid />

      {/* Trust & Authority Section */}
      <TrustSection />

      {/* Comparison Table */}
      <ComparisonTable />

      {/* Savings Calculator */}
      <SavingsCalculator onOpenModal={handleOpenModal} />

      {/* Testimonials */}
      <TestimonialsSection />

      {/* Blog Insights */}
      <BlogInsights />

      {/* ROI Banner */}
      <ROIBanner onOpenModal={handleOpenModal} />

      {/* FAQ Section */}
      <FAQSection onOpenModal={handleOpenModal} />

      {/* Contact Modal */}
      <ContactModal 
        open={modalOpen}
        onClose={handleCloseModal}
        prefillPlan={selectedPlan}
      />

      {/* Floating Chat Button */}
      <FloatingChatButton onClick={handleOpenModal} />
    </div>
  );
}