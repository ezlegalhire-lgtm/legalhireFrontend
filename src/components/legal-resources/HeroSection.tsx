"use client";

import React from "react";
import { Section } from "./SharedUI";
import { CheckCircle } from "lucide-react";

interface HeroSectionProps {
  onAsk: () => void;
}

const benefitsArray = [
  { text: "Company formation & restructuring" },
  { text: "Employment law & HR policies" },
  { text: "Commercial contracts & disputes" },
  { text: "IP, data protection & compliance" },
];

export default function HeroSection({ onAsk }: HeroSectionProps) {
  return (
    <div className="bg-gradient-to-tr from-[#fc4aa9] via-[#8B23C2] to-[#8B23C2] text-white">
      <Section className="py-14">
        <div className="grid md:grid-cols-2 gap-6 items-center">
          <div>
            <h1 className="heading text-white leading-tight anton text-center md:text-start">
              Legal Resources &amp;{" "}
              <span className="common-color anton">Insights</span>
            </h1>
            <p className="mt-3 text-white/90 text-lg text-center md:text-start">
              Stay informed with UAE legal blogs, expert answers, and practical
              guidance for businesses and individuals.
            </p>
            <div className="mt-6 flex flex-wrap justify-center sm:justify-start gap-3">
              <button
                onClick={onAsk}
                className="rounded-lg px-5 py-3 text-md font-bold text-purple-700 shadow-lg hover:shadow-xl bg-white  transition-all w-full lg:w-fit"
              >
                Ask a Legal Question
              </button>
              <a
                href="#blogs"
                className="rounded-lg px-5 py-3 text-md text-center font-semibold bg-white/10 hover:bg-white/20 border border-white/30 transition-all tracking-wide w-full md:w-fit"
              >
                Read Latest Blog
              </a>
            </div>
          </div>
          <div className="grid xl:grid-cols-2 gap-2 rounded-2xl bg-white/10 border border-white/20 px-6 py-3 backdrop-blur-sm">
            <div className="">
              <h3 className="font-extrabold text-3xl  mb-3 common-color light-anton anton">
                Popular Topics
              </h3>
              <ul className="space-y-3 text-white/90">
                {benefitsArray.map((benefit, index) => (
                  <li key={index} className="flex items-center gap-3">
                    {/* The icon display logic is now clean and consistent */}
                    <div className="w-6 h-6 rounded-full bg-green-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle className="w-4 h-4 text-white fill-green-400" />
                      {/* Note: I've replaced the SVG with a Lucide icon for cleaner code, and added fill-green-400 to make it solid if desired */}
                    </div>
                    {benefit.text}
                  </li>
                ))}
              </ul>
            </div>
            <div className="">
              <h3 className="font-extrabold text-3xl  mb-3 common-color light-anton anton ">
                Anonymous Q&A
              </h3>
              <ul className="space-y-3 text-white/90">
                {benefitsArray.map((benefit, index) => (
                  <li key={index} className="flex items-center gap-3">
                    {/* The icon display logic is now clean and consistent */}
                    <div className="w-6 h-6 rounded-full bg-green-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle className="w-4 h-4 text-white fill-green-400" />
                      {/* Note: I've replaced the SVG with a Lucide icon for cleaner code, and added fill-green-400 to make it solid if desired */}
                    </div>
                    {benefit.text}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
