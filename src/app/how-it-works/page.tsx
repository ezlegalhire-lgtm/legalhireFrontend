"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import PublicHeader from "@/components/layout/PublicHeader";
import {
  Search,
  CreditCard,
  UserCheck,
  MessageSquare,
  FileText,
  Building2,
  Key,
  Users,
  Clock,
  Settings,
  Upload,
  Calendar,
  Receipt,
  Bot,
  Shield,
  CheckCircle2,
} from "lucide-react";
import Image from "next/image";

export default function HowItWorksPage() {
  const revealRefs = useRef<(HTMLDivElement | HTMLDetailsElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      revealRefs.current.forEach((ref) => {
        if (ref) {
          const rect = ref.getBoundingClientRect();
          if (rect.top < window.innerHeight - 80) {
            ref.classList.add("opacity-100", "translate-y-0");
            ref.classList.remove("opacity-0", "translate-y-5");
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const addToRefs = (el: HTMLDivElement | HTMLDetailsElement | null) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }
  };

  const individualSteps = [
    {
      icon: Search,
      title: "1️⃣ Choose a Service",
      description:
        "Consultation, document review, or tenancy dispute — just a few clicks away.",
    },
    {
      icon: CreditCard,
      title: "2️⃣ Pay Securely",
      description:
        "Pay online via Stripe UAE or FAB with instant confirmation.",
    },
    {
      icon: UserCheck,
      title: "3️⃣ Get Matched",
      description:
        "We assign the right UAE lawyer based on your case type and location.",
    },
    {
      icon: MessageSquare,
      title: "4️⃣ Chat or Meet",
      description:
        "Connect instantly via built-in chat or video call through your dashboard.",
    },
    {
      icon: FileText,
      title: "5️⃣ Receive Documents",
      description:
        "Final drafts, notices, and contracts saved securely in your account.",
    },
  ];

  const businessSteps = [
    {
      icon: Building2,
      title: "1️⃣ Subscribe to a Plan",
      description:
        "Choose Starter, Growth, or Corporate based on your team size.",
    },
    {
      icon: Key,
      title: "2️⃣ Receive Credentials",
      description: "Login credentials for your private legal dashboard.",
    },
    {
      icon: Users,
      title: "3️⃣ Get a Dedicated Team",
      description: "Assigned account manager + specialist lawyers.",
    },
    {
      icon: Clock,
      title: "4️⃣ Track Hours & Tasks",
      description: "Monitor usage, invoices, and case updates live.",
    },
    {
      icon: Settings,
      title: "5️⃣ Modify Anytime",
      description: "Upgrade, pause, or change your plan whenever needed.",
    },
  ];

  const dashboardFeatures = [
    {
      icon: Upload,
      title: "Upload & Receive Documents",
      description: "Store and sign documents securely.",
    },
    {
      icon: MessageSquare,
      title: "Chat with Your Lawyer",
      description: "Instant updates, messages, and file sharing.",
    },
    {
      icon: Calendar,
      title: "Schedule Meetings",
      description: "Integrated calendar and reminders.",
    },
    {
      icon: Receipt,
      title: "Track Payments",
      description: "Invoices, history, and transaction receipts.",
    },
    {
      icon: Bot,
      title: "AI Draft Assistant",
      description: "Auto-generate drafts for faster work.",
    },
    {
      icon: Shield,
      title: "UAE-Based Hosting",
      description: "Bank-level encryption and privacy.",
    },
  ];

  const securityFeatures = [
    "💳 Payments via Stripe UAE & FAB",
    "🧾 Instant invoices for all transactions",
    "🔒 SSL Encryption & ISO 27001 Compliance",
    "🇦🇪 UAE Data Centers — Local Hosting",
    "✅ Verified Licensed Lawyers",
    "↩️ Refund & Service Replacement Policy",
  ];

  const faqs = [
    {
      question: "How soon will I be assigned a lawyer?",
      answer: "Usually within 2 hours during working days.",
    },
    {
      question: "Can I change or cancel my retainer?",
      answer: "Yes, you can modify or pause your plan anytime.",
    },
    {
      question: "Is my data secure?",
      answer: "Yes, all data is encrypted and hosted on UAE servers.",
    },
    {
      question: "Do you support Arabic and English?",
      answer: "Yes, the entire portal is bilingual.",
    },
  ];

  return (
    <>
      <PublicHeader />

      {/* Hero Section */}
      <section className=" bg-gradient-to-tr from-[#fc4aa9] via-[#8B23C2] to-[#8B23C2] text-white text-center pb-20 pt-12">
        <div className="container mx-auto px-6 grid xl:grid-cols-2">
          <div>
            <h1 className="text-4xl xl:text-6xl sm:mb-3 text-center md:text-start sm:whitespace-nowrap anton">
              Simplify Your Legal Life with,
            </h1>
            <h1 className="text-4xl xl:text-6xl mb-7 text-center md:text-start common-color anton">
              Our Integrated Portal.
            </h1>
            <p className="text-white/90 text-lg max-w-2xl text-center md:text-justify mb-8">
              Seamlessly connect with UAE lawyers, manage cases, meetings, and
              documents — all powered by smart technology. Seamlessly connect
              with UAE lawyers, manage cases, meetings, and documents — all
              powered by smart technology.Seamlessly connect with UAE lawyers,
              manage cases, meetings, and documents — all powered by smart
              technology.
            </p>
            <div className="flex flex-wrap gap-4 mb-8">
              <Link href="/services">
                <button className="btn-solid px-8 py-4 text-lg bg-white text-purple-600 hover:bg-purple-50 w-full xl:w-fit">
                  Book Consultation
                </button>
              </Link>
              <a
                href="#plans"
                className="px-8 py-4 text-lg font-semibold rounded-xl bg-white/10 hover:bg-white/20 border-2 border-white/30 backdrop-blur-sm transition-all w-full xl:w-fit"
              >
                View Retainer Plans
              </a>
            </div>
          </div>
          <div>
            <div className="relative flex justify-center items-start">
              <Image
                src="/howItsWorks.png"
                alt="LegalHire Logo"
                width={800} // Set to the original width of the image
                height={1000} // Set to the original height of the image
                priority
                className="scale-110 sm:scale-100"
              />
            </div>
          </div>
        </div>
      </section>

      {/* For Individuals */}
      <section className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text leading-[3.5rem]">
            For Individuals — Legal Help in Minutes
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Everything from booking to document delivery happens online — fast,
            secure, and transparent.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
          {individualSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                ref={addToRefs}
                className="rounded-[15px] bg-[#faf5ff] transition-all border border-purple-300 px-3 py-2"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-violet-100 rounded-xl flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">{step.title}</h3>
                <p className="text-sm text-slate-600">{step.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* For Businesses */}
      <section className="bg-slate-50 py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
              For Businesses — Smarter Retainers
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Manage all your company&apos;s legal work with predictable pricing
              and dedicated support.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            {businessSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={index}
                  ref={addToRefs}
                  className="rounded-[15px] bg-[#faf5ff] transition-all border border-purple-300 px-3 py-2"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-violet-100 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-slate-600">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Dashboard Overview */}
      <section className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text ">
            Your Client Dashboard — Total Control
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Everything you need to manage your legal work — in one place.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {dashboardFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                ref={addToRefs}
                className="rounded-[15px] bg-[#faf5ff] transition-all border border-purple-300 px-3 py-2"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-violet-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-slate-600">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Payments & Security */}
      <section className="bg-slate-50 py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
              Payments & Security
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              We ensure every transaction and document remains safe, encrypted,
              and UAE-compliant.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {securityFeatures.map((feature, index) => (
              <div
                key={index}
                ref={addToRefs}
                className="rounded-[10px] bg-[#faf5ff] transition-all border border-purple-300 px-3 py-4 flex items-center gap-3"
              >
                <CheckCircle2 className="w-5 h-5 text-purple-600 flex-shrink-0" />
                <p className="text-sm font-medium text-slate-700">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
            Why Clients Choose Us
          </h2>
          <p className="text-slate-600 text-lg">
            A modern, transparent, and tech-powered experience.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-200">
            <thead>
              <tr className="bg-slate-100">
                <th className="p-4 text-left font-bold text-slate-900">
                  Feature
                </th>
                <th className="p-4 text-center font-bold text-slate-900">
                  Traditional Firms
                </th>
                <th className="p-4 text-center font-bold text-white bg-gradient-to-r from-purple-600 to-violet-600">
                  EZ Legal Hire
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  feature: "Booking",
                  traditional: "Phone & Email",
                  ours: "Online Instant",
                },
                {
                  feature: "Pricing",
                  traditional: "Hourly Billing",
                  ours: "Fixed / Monthly",
                },
                {
                  feature: "Tracking",
                  traditional: "None",
                  ours: "Live Dashboard",
                },
                {
                  feature: "Document Handling",
                  traditional: "Manual",
                  ours: "Secure E‑Vault",
                },
                {
                  feature: "Support",
                  traditional: "Slow Response",
                  ours: "24/7 Portal Access",
                },
              ].map((row, index) => (
                <tr key={index} className="border-t border-slate-200">
                  <td className="p-4 font-medium text-slate-900">
                    {row.feature}
                  </td>
                  <td className="p-4 text-center text-slate-600">
                    {row.traditional}
                  </td>
                  <td className="p-4 text-center font-semibold text-purple-700">
                    {row.ours}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-slate-50 py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 gradient-text text-center">
            Client Success Stories
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div
              ref={addToRefs}
              className="rounded-[15px] bg-[#faf5ff] transition-all border border-purple-300 p-5"
            >
              <p className="text-slate-700 mb-4 italic">
                &quot;I booked a consultation online and had my tenancy issue
                resolved the same day. Everything was professional and
                fast.&quot;
              </p>
              <p className="text-sm text-slate-600 font-medium">
                — Fatima K., Dubai
              </p>
            </div>

            <div
              ref={addToRefs}
              className="rounded-[15px] bg-[#faf5ff] transition-all border border-purple-300  p-5"
            >
              <p className="text-slate-700 mb-4 italic">
                &quot;Our SME switched to a retainer. Now we track every task,
                document, and invoice through the dashboard. Zero
                surprises.&quot;
              </p>
              <p className="text-sm text-slate-600 font-medium">
                — Ahmed A., Noor Trading LLC
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 gradient-text text-center">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <details
              key={index}
              ref={addToRefs}
              className="opacity-0 translate-y-5 transition-all duration-700 bg-white border border-slate-200 rounded-xl p-5 group"
            >
              <summary className="cursor-pointer font-semibold text-slate-900 list-none flex items-center justify-between">
                {faq.question}
                <span className="text-purple-600 group-open:rotate-180 transition-transform">
                  ▼
                </span>
              </summary>
              <p className="mt-4 text-slate-600 text-sm leading-relaxed">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gradient-to-r from-purple-600 to-violet-600 text-white text-center py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
            Experience the Future of Legal Services
          </h2>
          <p className="text-white/90 text-lg mb-8">
            Join hundreds of UAE clients using EZ Legal Hire today.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <button className="btn-solid px-8 py-4 text-lg bg-white text-purple-600 hover:bg-purple-50 w-full md:w-fit">
              Book a Free Consultation
            </button>
            <a
              href="#plans"
              className="px-8 py-4 text-lg font-semibold rounded-xl bg-white/10 hover:bg-white/20 border-2 border-white/30 backdrop-blur-sm transition-all w-full md:w-fit"
            >
              View Plans
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
