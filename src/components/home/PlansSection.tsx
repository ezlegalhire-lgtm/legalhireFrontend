import { Check } from "lucide-react";
import React from "react";

export default function PlansSection() {
  const plans = [
    {
      name: "Starter",
      features: [
        "2 consultations / month",
        "Basic document review (up to 5 pages)",
        "WhatsApp & email support",
        "Priority scheduling (48 hrs)",
        "Access to templates library",
        "Integrated CRM — track tickets & files",
        "Secure client portal & billing",
        "Monthly status report",
      ],
      price: "AED 999/mo",
      cta: "Choose Plan",
      recommended: false,
    },
    {
      name: "Growth",
      features: [
        "4 consultations / month",
        "Drafting 2 agreements (up to 10 pages)",
        "Dedicated account manager",
        "Priority scheduling (24 hrs)",
        "Integrated CRM — tasks & reminders",
        "Team access & permissions",
        "Quarterly compliance checklist",
        "Advanced document vault",
      ],
      price: "AED 1,999/mo",
      cta: "Choose Plan",
      recommended: true,
    },
    {
      name: "Corporate",
      features: [
        "8 consultations / month",
        "Contract drafting & negotiation",
        "On-call legal support",
        "Integrated CRM — full analytics",
        "Custom workflows & approvals",
        "In‑person meetings on request",
        "Multi-location support (UAE-wide)",
        "Bespoke SLA & reporting",
      ],
      price: "AED 3999/mo ",
      cta: "Talk to Sales",
      recommended: false,
    },
  ];

  return (
    <section id="plans" className=" bg-white">
      <div className="container">
        {/* Header */}
        <h2 className="text-4xl anton tracking-wider text-center text-slate-900">
          Choose Your Retainer
        </h2>
        <p className="text-center text-[16px] text-gray-500 max-w-2xl mx-auto spacing-section mt-2">
          Simple monthly plans for individuals, startups, and enterprises.
        </p>

        {/* Plans Grid */}
        <div className="grid-3-col mb-8 mt-16">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`rounded-[0.8rem] p-6 group relative hover:bg-purple-50 mt-10 lg:mt-0 ${
                plan.recommended ? "ring-4 ring-purple-600" : "ring-2 ring-purple-200"
              }`}
            >
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                <div className="inline-block text-center px-6 py-2 rounded-[0.8rem] text-sm font-bold bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white shadow-lg">
                  <h1 className="tracking-wider text-[14px]">{plan.name}</h1>
                  <div className="font-extrabold text-lg text-white">
                    {plan.price}
                  </div>
                </div>
              </div>

              <ul className="space-y-4 text-sm mb-5 mt-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex gap-3 items-center">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-green-600 stroke-[4]" />
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="flex items-center justify-center">
                <button className="btn-solid px-4 py-2 w-full">
                  {plan.cta}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        {/* <div className="text-center">
          <button className="btn-solid px-8 py-3">Book a Demo Call</button>
        </div> */}
      </div>
    </section>
  );
}
