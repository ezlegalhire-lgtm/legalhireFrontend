import React from "react";
import { Check } from "lucide-react";

interface Plan {
  name: string;
  price: string;
  badge: string;
  features: string[];
  cta: string;
  highlight?: boolean;
}

interface PlansSectionProps {
  onSelectPlan: (planName: string) => void;
}

export default function PlansSection({ onSelectPlan }: PlansSectionProps) {
  const plans: Plan[] = [
    {
      name: "Starter",
      price: "AED 999",
      badge: "For individuals & startups",
      features: [
        "2 consultations (30m each)",
        "Basic doc review (up to 5 pages)",
        "Email support (48h response)",
        "Discounted hourly rates",
      ],
      cta: "Start Starter Plan",
    },
    {
      name: "Growth",
      price: "AED 1,999",
      badge: "Best Value for SMEs",
      highlight: true,
      features: [
        "4 consultations (45m each)",
        "Drafting – 2 simple agreements",
        "Priority email & WhatsApp (24h)",
        "1 dispute advisory / month",
      ],
      cta: "Start Growth Plan",
    },
    {
      name: "Corporate",
      price: "AED 3,999",
      badge: "For teams 25+ staff",
      features: [
        "Unlimited consultations (fair use)",
        "Drafting & review (reasonable use)",
        "Dedicated account manager",
        "Board / shareholder support",
      ],
      cta: "Start Corporate Plan",
    },
  ];

  return (
    <section id="plans" className="py-16 md:py-20 bg-white">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-4">
            Choose Your Retainer
          </h2>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto">
            Simple monthly plans for individuals, startups, and enterprises.
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-2xl p-8 transition-all duration-300 ${
                plan.highlight
                  ? "bg-gradient-to-br from-purple-50 to-fuchsia-50 border-4 border-purple-400 shadow-2xl transform scale-105"
                  : "bg-white border-2 border-slate-200 shadow-lg hover:shadow-xl hover:border-purple-300"
              }`}
            >
              {/* Best Value Badge */}
              {plan.highlight && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="inline-block px-6 py-2 rounded-full text-sm font-bold bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white shadow-lg">
                    Best Value
                  </span>
                </div>
              )}

              {/* Plan Header */}
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">
                  {plan.name}
                </h3>
                <p className="text-sm text-slate-600 font-medium">
                  {plan.badge}
                </p>
              </div>

              {/* Price */}
              <div className="mb-6">
                <p className="text-4xl font-extrabold bg-gradient-to-r from-purple-600 to-fuchsia-600 bg-clip-text text-transparent">
                  {plan.price}/<span className="text-2xl">Month</span>
                </p>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 text-green-600 stroke-[3]" />
                    </div>
                    <span className="text-sm text-slate-700 leading-relaxed">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button
                onClick={() => onSelectPlan(plan.name)}
                className={`w-full py-4 rounded-xl font-bold text-sm transition-all ${
                  plan.highlight
                    ? "bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white shadow-lg hover:shadow-xl hover:scale-105"
                    : "bg-purple-600 text-white hover:bg-purple-700 shadow-md hover:shadow-lg"
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-slate-600 mb-4">
            Not sure which plan is right for you?
          </p>
          <button
            onClick={() => onSelectPlan("")}
            className="btn-solid px-8 py-3 bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white"
          >
            Talk to Our Team
          </button>
        </div>
      </div>
    </section>
  );
}
