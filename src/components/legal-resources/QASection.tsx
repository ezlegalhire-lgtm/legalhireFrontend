"use client";

import React, { useState, useEffect } from "react";
import { Section, Skeleton, BRAND } from "./SharedUI";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface QAData {
  q: string;
  a: string;
}

interface QAItemProps {
  q: string;
  a: string;
  i: number;
  open: number;
  setOpen: (i: number) => void;
}

const QAItem = ({ q, a, slug }: any) => (
  <div className="rounded-[15px] bg-[#faf5ff] transition-all border border-purple-300 py-5 px-3   duration-300 fade-in">
    <h3 className="mt-2 text-lg font-semibold text-slate-900">{q}</h3>
    <p className="mt-1 text-sm text-slate-600">
      <div
        className="rich-text-excerpt"
        dangerouslySetInnerHTML={{ __html: a }}
      ></div>
    </p>
    <div className="mt-3 flex items-center justify-end">
      <Link
        href={`qa/${slug}`}
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-600 to-purple-700 text-white text-sm font-semibold rounded-full hover:from-purple-700 hover:to-purple-800 transition-all duration-300 group-hover:gap-3 shadow-md hover:shadow-lg"
      >
        View Details
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  </div>
);

interface QASectionProps {
  onAsk: () => void;
}

export default function QASection({ onAsk }: QASectionProps) {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<any>([]);
  const [open, setOpen] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const API_BASE_URL =
    process.env.NEXT_PUBLIC_CMS_API_URL || "https://cms.ezlegalhire.com";

  useEffect(() => {
    // Replace with your API: fetch('/api/qa?limit=8')
    setLoading(true);
    setTimeout(() => {
      setItems([
        {
          q: "What's the difference between a retainer and a one-time consultation?",
          a: "A retainer provides ongoing monthly access with tracked hours and priority support. One-time covers a specific issue or call.",
        },
        {
          q: "Can foreign investors open a company in the UAE?",
          a: "Yes. Popular options include mainland LLCs and free zone entities. Requirements vary by activity and emirate.",
        },
        {
          q: "How can I sign documents online legally in UAE?",
          a: "Use approved e-sign tools and ensure parties consent to electronic signatures. Certain documents still require notarization.",
        },
        {
          q: "Are DIFC court judgments enforceable locally?",
          a: "Yes — mechanisms exist between DIFC and Dubai Courts for mutual enforcement, subject to rules.",
        },
        {
          q: "What's included in corporate retainers?",
          a: "Advisory calls, document drafting/review, meeting support, and compliance guidance. Scope varies by plan.",
        },
        {
          q: "Can non-residents hire UAE lawyers?",
          a: "Absolutely. We support remote consultations, doc sharing, and meetings.",
        },
        {
          q: "Do you support Arabic & English?",
          a: "Yes, bilingual support for consultations and drafting.",
        },
        {
          q: "How quickly do you respond?",
          a: "Within 24 hours; priority response for Growth & Corporate retainers.",
        },
      ]);
      setLoading(false);
    }, 400);
  }, []);

  const fetchServiceData = async () => {
    try {
      setLoading(true);
      setError(null);

      const serviceResponse = await fetch(`${API_BASE_URL}/api/public/faqs`);

      if (!serviceResponse.ok) {
        throw new Error("Service not found");
      }

      const serviceData = await serviceResponse.json();
      setItems(serviceData?.faqs);
    } catch (err) {
      console.error("Error fetching service:", err);
      setError(err instanceof Error ? err.message : "Failed to load service");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchServiceData();
  }, []);

  return (
    <Section id="qa" className="py-12">
      <div className="text-center mb-8">
        <h3 className="text-3xl  text-slate-900 light-anton anton">
          Legal{" "}
          <span className="font-black uppercase  text-transparent bg-clip-text  bg-gradient-to-r from-purple-700 to-pink-500">
            Q&amp;A
          </span>
        </h3>
        <p className="text-slate-600">
          Answers to common questions from UAE clients and businesses.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-5">
        {loading ? (
          <div className="p-4 space-y-3">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-5 w-3/4" />
            ))}
          </div>
        ) : (
          items?.map((it: any, i: any) => (
            <QAItem
              key={i}
              q={it?.question}
              a={it?.answer}
              slug={it?.slug}
              i={i}
              open={open}
              setOpen={setOpen}
            />
          ))
        )}
      </div>

      <div className="mt-6 text-center">
        <button
          onClick={onAsk}
          className="rounded-lg px-5 py-3 text-sm font-semibold text-white shadow-lg hover:shadow-xl transition-all"
          style={{ background: BRAND.accent }}
        >
          Post Your Question
        </button>
      </div>
    </Section>
  );
}
