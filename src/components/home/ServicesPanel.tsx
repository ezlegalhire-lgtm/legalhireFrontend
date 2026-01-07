"use client";

import React from "react";
import Link from "next/link";

export default function ServicesPanel() {
  const [view, setView] = React.useState<"services" | "retainer">("services");

  return (
    <div className="card rounded-2xl overflow-hidden h-full">
      <div className="p-3.5 md:p-4">
        {/* Header */}
        <div>
          <h3 className="text-lg light-anton anton">Choose Your Legal Service</h3>
          <p className="text-[12px] text-gray-500">
            Select from instant consultations or monthly retainer plans
          </p>
        </div>

        {/* Toggle Button */}
        <div className="flex bg-slate-100 p-0.5 rounded-lg text-[11px] md:text-xs font-medium my-3.5 shadow-sm">
          <button
            className={`flex-1 p-2.5  rounded-l-xl transition-all duration-300 text-[14px] ${
              view === "services"
                ? "bg-purple-600 text-white shadow-md"
                : "text-slate-600 hover:text-purple-700"
            }`}
            onClick={() => setView("services")}
          >
            Instantly Available
          </button>
          <button
            className={`flex-1 p-2.5 rounded-r-xl transition-all text-[14px] duration-300 ${
              view === "retainer"
                ? "bg-purple-600 text-white shadow-md"
                : "text-slate-600 hover:text-purple-700"
            }`}
            onClick={() => setView("retainer")}
          >
            Monthly Retainer
          </button>
        </div>

        {view === "services" ? (
          <>
            <div className="space-y-4">
              <ServiceRow
                icon="🗓️"
                title="30-min Consultation"
                note="Available now"
                price="AED 250"
              />
              <ServiceRow
                icon="📄"
                title="Document Review"
                note="Available now"
                price="AED 500"
              />
              <ServiceRow
                icon="🏢"
                title="Business Setup"
                note="Available now"
                price="From AED 1,200"
              />
              <ServiceRow
                icon="🏠"
                title="Tenancy Dispute"
                note="Available now"
                price="AED 350"
              />
            </div>
            <Link href="/services">
              <button className="group mt-7 w-full rounded-xl bg-gradient-to-r from-purple-700 to-pink-600 font-semibold py-3 shadow-lg transition-all duration-300 flex items-center justify-center gap-x-2 text-[1.23rem] md:text-sm text-white">
                View All 40+ Services
                <svg
                  className="w-6 h-6"
                  fill="#ffcb05"
                  viewBox="0 0 24 24"
                  stroke="#ffcb05"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </button>
            </Link>
          </>
        ) : (
          <>
            <div className="space-y-1.5">
              <RetainerPlanRow
                icon="💼"
                title="Starter Retainer"
                badge="Popular for Startups"
                price="AED 999 / month"
                features={[
                  "2 consultations (30 min)",
                  "Basic document review (up to 5 pages)",
                  "Email support (48h)",
                  "Discounted hourly rates",
                ]}
              />
              <RetainerPlanRow
                icon="🚀"
                title="Growth Retainer"
                badge="Best Value"
                price="AED 1,999 / month"
                features={[
                  "4 consultations (45 min)",
                  "Drafting: 2 simple agreements",
                  "Priority email & WhatsApp (24h)",
                  "1 dispute advisory / month",
                ]}
              />
              <RetainerPlanRow
                icon="🏛️"
                title="Corporate Retainer"
                badge="For SMEs 25+ Staff"
                price="AED 3,999 / month"
                features={[
                  "Unlimited consultations",
                  "Drafting & review (reasonable use)",
                  "Dedicated account manager",
                  "Board/Shareholder meeting support",
                ]}
              />
            </div>
            <Link href="#plans">
              <button className="group mt-7 w-full rounded-xl bg-gradient-to-r from-purple-700 to-pink-600 font-semibold py-3 shadow-lg transition-all duration-300 flex items-center justify-center gap-x-2 text-[1.3m]  text-white">
                Compare Full Plans
                <svg
                  className="w-5 h-5"
                  fill="#ffcb05"
                  viewBox="0 0 24 24"
                  stroke="#ffcb05"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

function ServiceRow({
  icon,
  title,
  note,
  price,
}: {
  icon: string;
  title: string;
  note: string;
  price: string;
}) {
  return (
    <div className="service-row group">
      <div className="flex items-center gap-2.5 min-w-0">
        <div className="h-10 w-10 rounded-lg text-[1.3rem] bg-gradient-to-br from-purple-100 to-violet-100 flex items-center justify-center text-sm flex-shrink-0 group-hover:scale-110 transition-transform">
          {icon}
        </div>
        <div className="min-w-0">
          <p className="font-bold text-[14px]">{title}</p>
          <p className="text-[12px] text-gray-500">{note}</p>
        </div>
      </div>
      <div className="text-[14px] font-bold whitespace-nowrap">{price}</div>
    </div>
  );
}

function RetainerPlanRow({
  icon,
  title,
  price,
  features,
  badge,
}: {
  icon: string;
  title: string;
  price: string;
  features: string[];
  badge?: string;
}) {
  return (
    <div className="retainer-plan group">
      <div className="flex items-start justify-between gap-2 flex-wrap mb-1">
        <div className="flex items-center gap-1.5">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-purple-100 to-violet-100 flex items-center justify-center text-sm flex-shrink-0 group-hover:scale-110 transition-transform">
            {icon}
          </div>
          <div>
            <p className="font-bold text-slate-900 text-[14px] leading-tight tracking-wide">
              {title}
            </p>
            {badge && (
              <span className="inline-block text-[10px] font-semibold text-purple-700 border border-purple-200 bg-purple-50 px-1 py-0.5 rounded mt-0.5">
                {badge}
              </span>
            )}
          </div>
        </div>
        <div className="text-[13px] font-extrabold  whitespace-nowrap">
          {price}
        </div>
      </div>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-0.5 text-[12px] text-slate-600">
        {features.map((f, i) => (
          <li key={i} className="flex items-start gap-2">
            <span className="text-green-500 flex-shrink-0 text-[12px]">✓</span>
            <span className="leading-tight">{f}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
