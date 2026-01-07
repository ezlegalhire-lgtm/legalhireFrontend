import React from 'react';
import { Star } from 'lucide-react';

interface Feature {
  title: string;
  description: string;
}

export default function FeaturesGrid() {
  const features: Feature[] = [
    {
      title: 'Smart Retainer CRM',
      description: 'Track hours, invoices, and deliverables in real time.'
    },
    {
      title: 'Calendar & Meetings',
      description: 'Schedule consultations instantly with calendar sync.'
    },
    {
      title: 'Secure Document Vault',
      description: 'Upload, review, and e-sign documents securely.'
    },
    {
      title: 'Licensed UAE Lawyers',
      description: 'Verified advocates and consultants on one portal.'
    },
    {
      title: '24/7 Client Chat',
      description: 'Direct chat with your lawyer & notification center.'
    },
    {
      title: 'Transparent Hour Tracking',
      description: 'See used vs remaining hours — zero surprises.'
    },
    {
      title: 'Virtual Legal Department',
      description: 'Your cloud-based alternative to in-house teams.'
    },
    {
      title: 'AI Drafting (beta)',
      description: 'Faster first drafts; lawyers finalize for accuracy.'
    }
  ];

  return (
    <section id="features" className="pb-16 md:pb-20 bg-gradient-to-b from-white to-slate-50">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-4">
            Why Choose Online Legal UAE
          </h2>
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto">
            Built for UAE businesses and professionals who demand speed, clarity, and security.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="card-neo p-6 hover-lift transition-all group"
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-fuchsia-600 flex items-center justify-center shadow-lg mb-4 group-hover:scale-110 transition-transform">
                <Star className="w-6 h-6 text-white fill-white" />
              </div>

              {/* Content */}
              <h3 className="font-bold text-slate-900 mb-2 leading-tight">
                {feature.title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}