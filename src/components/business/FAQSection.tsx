// FAQSection.tsx
"use client";
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

interface FAQSectionProps {
  onOpenModal: () => void;
}

export default function FAQSection({ onOpenModal }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "How does the retainer work?",
      answer:
        "Choose a monthly plan. Track hours, book meetings, and share documents in your dashboard.",
    },
    {
      question: "Can I switch plans?",
      answer:
        "Yes, upgrade/downgrade anytime. Hours reset monthly for fairness.",
    },
    {
      question: "Do you offer one-time services?",
      answer:
        "Yes — instant consultations and fixed-fee services are available.",
    },
    {
      question: "Is my data secure?",
      answer: "Yes. Encrypted storage and UAE-hosted infrastructure.",
    },
  ];

  return (
    <section id="faq" className="py-16 bg-gradient-to-b from-slate-50 to-white">
      <div className="container">
        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-8 items-start">
          {/* FAQ List */}
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-8">
              Frequently Asked Questions
            </h2>
            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <div key={index} className="card-neo overflow-hidden">
                  <button
                    onClick={() =>
                      setOpenIndex(openIndex === index ? -1 : index)
                    }
                    className="w-full flex items-center justify-between p-5 text-left"
                  >
                    <span className="font-semibold text-slate-900 pr-4">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-purple-600 flex-shrink-0 transition-transform ${
                        openIndex === index ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openIndex === index && (
                    <div className="px-5 pb-5">
                      <p className="text-slate-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* CTA Card */}
          <div className="card-neo p-8 lg:mt-[4.5rem]">
            <h3 className="text-2xl font-extrabold text-slate-900 mb-3">
              Still have questions?
            </h3>
            <p className="text-slate-600 mb-6 leading-relaxed">
              Our team replies within 24 hours. Book a free consultation today.
            </p>
            <div className="space-y-3">
              <Link href="/services">
                <button
                  // onClick={onOpenModal}
                  className="w-full btn-solid py-4 bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white"
                >
                  Book Consultation
                </button>
              </Link>
              <button
                onClick={onOpenModal}
                className="w-full py-4 rounded-xl border-2 border-slate-300 font-semibold text-slate-700 hover:border-purple-300 hover:bg-purple-50 transition-all"
              >
                Talk to a Lawyer Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
