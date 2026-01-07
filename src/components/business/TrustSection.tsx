import React from 'react';
import { Shield, Award, Server, CreditCard } from 'lucide-react';

export default function TrustSection() {
  const companies = [
    'Noor Group',
    'Emirates HR',
    'Dubai Foods',
    'GreenTech',
    'Al Futtaim (ex.)',
    'Ras Al Khaimah (ex.)'
  ];

  const badges = [
    { icon: Shield, text: 'Licensed UAE Lawyers' },
    { icon: Award, text: 'ISO 27001 Security' },
    { icon: Server, text: 'UAE Data Hosting' },
    { icon: CreditCard, text: 'Secure Payments' }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3">
            Trusted by UAE Businesses
          </h2>
          <p className="text-lg text-slate-600">
            Your data stays in UAE — never shared overseas.
          </p>
        </div>

        {/* Company Logos */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-10">
          {companies.map((company, index) => (
            <div
              key={index}
              className="px-6 py-4 rounded-xl bg-gradient-to-br from-purple-50 to-fuchsia-50 border-2 border-purple-200  transition-all"
            >
              <span className="text-sm font-bold text-slate-700">
                {company}
              </span>
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center gap-4">
          {badges.map((badge, index) => {
            const Icon = badge.icon;
            return (
              <div
                key={index}
                className="flex items-center gap-2 px-5 py-3 rounded-full bg-gradient-to-br from-purple-50 to-fuchsia-50 border-2 border-purple-200 shadow-sm"
              >
                <Icon className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-semibold text-slate-700">
                  {badge.text}
                </span>
              </div>
            );
          })}
        </div>

        {/* Additional Trust Indicators */}
        <div className="mt-10 text-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-8 text-slate-600">
            <div className="text-center">
              <div className="text-4xl font-bold text-slate-900 mb-1">500+</div>
              <div className="text-sm">Active Clients</div>
            </div>
            <div className="h-12 w-px bg-slate-300"></div>
            <div className="text-center">
              <div className="text-4xl font-bold text-slate-900 mb-1">15+</div>
              <div className="text-sm">UAE Lawyers</div>
            </div>
            <div className="h-12 w-px bg-slate-300"></div>
            <div className="text-center">
              <div className="text-4xl font-bold text-slate-900 mb-1">4.9/5</div>
              <div className="text-sm">Client Rating</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}