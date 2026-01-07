"use client";

import React from "react";
import { Calendar, MessageSquare } from "lucide-react";
import ServicesPanel from "./ServicesPanel";
import Link from "next/link";

const PRIMARY_COLOR = "#8B23C2"; // Primary Purple
const ACCENT_COLOR = "#fc4aa9"; // Fuchsia Highlight

export default function HeroSection() {
  return (
    <section className="bg-gradient-hero">
      <div className="container pt-4 md:pt-[2rem] 2xl:pt-[5rem]">
        <div className="grid-2-col items-stretch">
          {/* Left Content */}
          <div>
            {/* Subtitle */}
            <div className="text-[12px] sm:text-[13px] text-purple-600 font-semibold tracking-wide">
              DAR AL HAQOOQ LEGAL CONSULTANCY LLC ®
            </div>
            <div className="text-sm text-slate-600 mb-1">
              In Association with Nawal Salem Advocates and Legal Consultants
            </div>
            <div className="text-sm text-purple-600 mb-6 ">
              Bringing Legal Excellence to your Screen – Online Services in UAE
              Redefined
            </div>

            {/* Main Heading */}
            <h1 className="heading leading-[2.8rem] md:leading-[4.5rem]">
              Get Legal Help{" "}
              {/* <span className="gradient-text tracking-wider"> */}
              <span className="gradient-text  tracking-wider">
                Anytime, Anywhere
              </span>
            </h1>

            {/* Description */}
            <p className="text-body-md max-w-2xl spacing-content text-center sm:text-start text-gray-500">
              Book consultations with UAE lawyers, pay securely by card, and
              meet via integrated video conferencing — all from one easy portal.
              Fast response, transparent pricing, and private communication.
            </p>

            {/* Mobile CTA Buttons - Mobile Only */}

            <div className="flex lg:hidden flex-col sm:flex-row gap-4 mb-8">
              <Link
                href="/services"
                className="w-full md:w-auto px-6 py-3 bg-gradient-to-r from-purple-600 to-violet-600  hover:from-purple-700 hover:to-violet-700  text-white font-bold rounded-xl transition-all duration-300 hover:shadow-purple-600/60 transform hover:-translate-y-0.5 flex items-center justify-center space-x-2"
              >
                <Calendar className="w-5 h-5" />
                <span>Book Consultation</span>
              </Link>

              {/* Secondary Action Button */}
              <Link href="#contact" passHref legacyBehavior>
                <button
                  className="
                        w-full md:w-auto px-6 py-3 
                        bg-white 
                        border-2 border-purple-300 
                        text-purple-600 font-semibold 
                        rounded-xl 
                        hover:border-purple-500 hover:shadow-md 
                        transition-all duration-300
                        flex items-center justify-center space-x-2
                    "
                >
                  <MessageSquare className="w-5 h-5" />
                  <span>Go to Dashboard</span>
                </button>
              </Link>
            </div>

            {/* Neumorphic Action Buttons - Desktop Only */}
            <div className="hidden lg:flex flex-wrap gap-6">
              <Link
                href="/services"
                className="card-neo flex-1 min-w-[200px] max-w-[250px] p-6 flex flex-col items-center justify-center hover:scale-105 group"
              >
                <div className="w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-violet-600 text-white shadow-sm bg-purple-600 mb-3 group-hover:scale-110 transition-transform">
                  <Calendar className="w-7 h-7" />
                </div>
                <span className="font-semibold text-slate-900">
                  Book Consultation
                </span>
              </Link>

              <Link
                href="#contact"
                className="card-neo flex-1 min-w-[200px] max-w-[250px] p-6 flex flex-col items-center justify-center hover:scale-105 group"
              >
                <div className="w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-violet-600 text-white shadow-lg mb-3 group-hover:scale-110 transition-transform">
                  <MessageSquare className="w-7 h-7" />
                </div>
                <span className="font-semibold text-slate-900">
                  Ask a Question
                </span>
              </Link>
            </div>
          </div>

          {/* Right: Services Panel */}
          <div>
            <ServicesPanel />
          </div>
        </div>
      </div>
    </section>
  );
}
