'use client';

import React, { useState } from 'react';
import PublicHeader from '@/components/layout/PublicHeader';
import HeroSection from '@/components/legal-resources/HeroSection';
import BlogSection from '@/components/legal-resources/BlogSection';
import QASection from '@/components/legal-resources/QASection';
import CommunityCTA from '@/components/legal-resources/CommunityCTA';
import { BlogModal, AskModal } from '@/components/legal-resources/Modals';

interface BlogItem {
  id: number;
  category: string;
  title: string;
  readTime: number;
  excerpt: string;
  content: string;
}

export default function LegalResourcesPage() {
  const [askOpen, setAskOpen] = useState(false);
  const [blogOpen, setBlogOpen] = useState(false);
  const [blogItem, setBlogItem] = useState<BlogItem | null>(null);

  function openBlog(item: BlogItem) {
    setBlogItem(item);
    setBlogOpen(true);
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <PublicHeader />
      <HeroSection onAsk={() => setAskOpen(true)} />
      <BlogSection onOpenBlog={openBlog} />
      <QASection onAsk={() => setAskOpen(true)} />
      <CommunityCTA />

      {/* Modals */}
      <AskModal open={askOpen} onClose={() => setAskOpen(false)} />
      <BlogModal open={blogOpen} onClose={() => setBlogOpen(false)} item={blogItem} />
    </div>
  );
}
