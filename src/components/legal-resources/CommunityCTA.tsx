"use client";

import React, { useState } from "react";
import { Section, BRAND } from "./SharedUI";

export default function CommunityCTA() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    alert("Thank you for subscribing!");
    setEmail("");
  };

  return (
    <Section className="py-2 md:py-10">
      <div className=" relative rounded-3xl  bg-white  p-8 lg:p-10 border border-purple-300-300">
        {/* Optional: Add a subtle patterned or abstract background texture here if desired */}

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center relative z-10">
          {/* === Left Content: Funky Title & Description === */}
          <div>
            {/* Title: Larger, Bolder, and utilizing gradient or extreme contrast */}
            <h3
              className="
                text-3xl md:text-4xl lg:text-5xl font-black uppercase whitespace-nowrap  text-transparent bg-clip-text  bg-gradient-to-r from-purple-700 to-pink-500 tracking-widest leading-tight anton
            "
            >
              Join the Legal Vibe
            </h3>
            {/* Subtext: Clear but punchy */}
            <p className="text-slate-600 mt-3 text-md font-medium">
              Unlock legal insights, alerts, and guidance weekly. Zero static
              content.
            </p>
          </div>

          {/* === Right Content: Funky Form === */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3"
          >
            {/* Email Input: Wider border, funky shadow on focus */}
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="
                    flex-1 border-2 border-purple-300 rounded-xl /* Thicker border, rounder */
                    px-4 py-3.5 text-base text-slate-700
                    focus:outline-none focus:ring-4 focus:ring-purple-200 
                    focus:border-purple-600 
                    transition-all duration-300 
                    placeholder:text-purple-300 
                    shadow-md hover:shadow-lg
                "
              placeholder="Email address"
              required
            />

            {/* Subscribe Button: Bold Gradient, Extreme Hover Effect */}
            <button
              type="submit"
              className="
                    px-6 py-3.5 rounded-xl text-white text-base font-extrabold uppercase
                    bg-gradient-to-br from-purple-600 to-indigo-700 
                    transform transition-all duration-300 shrink-0
                    hover:scale-[1.03] h
                "
              // Replaced style={{ background: BRAND.accent }} with the gradient above
            >
              Get Access
            </button>
          </form>
        </div>
      </div>
    </Section>
  );
}
