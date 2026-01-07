import React from "react";
import { Shield, Video, FileText, CheckCircle } from "lucide-react";
import Link from "next/link";

interface HeroSectionProps {
  onOpenModal: (plan?: string) => void;
}

export default function HeroSection({ onOpenModal }: HeroSectionProps) {
  const benefits = [
    { icon: Shield, text: "Encrypted UAE Hosting" },
    { icon: Video, text: "Built-in Video Meetings" },
    { icon: FileText, text: "Transparent Pricing" },
  ];

  const features = [
    "Dedicated CRM (hours, tasks, invoices)",
    "Secure document vault & e-sign",
    "Smart calendar & booking",
    "Bilingual support (Arabic & English)",
  ];

  return (
    <section className="bg-gradient-to-tr from-[#fc4aa9] via-[#8B23C2] to-[#8B23C2] text-white">
      <div className="container py-16 md:py-20">
        <div className="grid lg:grid-cols-2 gap-4 sm:gap-12 items-center">
          {/* Left Content */}
          <div className="animate-fade-in">
            <h1 className="heading text-white leading-tight text-center md:text-start">
              <span className="common-color ">Centralized</span> Platform for
              Legal Excellence
            </h1>

            <p className="text-lg md:text-xl text-purple-50 leading-relaxed mb-8 text-center md:text-start">
              Hire verified UAE lawyers for consultations and monthly retainers.
              Manage meetings, documents, hours, and invoices in one secure
              portal.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 mb-8">
              <Link href="/services">
                <button
                  // onClick={() => onOpenModal()}
                  className="btn-solid px-8 py-4 text-lg bg-white text-purple-600 hover:bg-purple-50 w-full 2xl:w-fit"
                >
                  Book Consultation
                </button>
              </Link>
              <a
                href="#plans"
                className="px-8 py-4 text-lg font-semibold rounded-xl bg-white/10 hover:bg-white/20 border-2 border-white/30 backdrop-blur-sm transition-all w-full 2xl:w-fit text-center"
              >
                View Retainer Plans
              </a>
            </div>

            {/* Benefits Icons */}
          </div>

          {/* Right - What You Get Card */}
          <div className="animate-slide-in-right">
            <div className="rounded-2xl bg-white/10 backdrop-blur-lg border-2 border-white/20 px-6 py-4">
              <h3 className="text-3xl font-extrabold mb-6 common-color light-anton anton">
                What you get
              </h3>
              <ul className="space-y-4">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-white/90 leading-relaxed text-lg">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-x-8 gap-y-4 mt-4 lg:mt-0 ml-2">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div key={index} className="flex items-center gap-3">
                <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center border border-white/30">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <span className="text-base font-semibold text-white/90">
                  {benefit.text}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
