"use client";

import React, { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  Printer,
  MessageSquare,
} from "lucide-react";
import Link from "next/link";
import PublicHeader from "@/components/layout/PublicHeader";
import { Zap, LayoutDashboard, CalendarCheck } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });

      // Reset status after 5 seconds
      setTimeout(() => setSubmitStatus("idle"), 5000);
    }, 1500);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const ACCENT_COLOR_CLASS = "border-fuchsia-500 text-fuchsia-600";
  const ICON_BG_COLOR_CLASS = "bg-fuchsia-500";

  return (
    <>
      <PublicHeader />
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white pt-24 pb-20">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="heading text-center font-black uppercase  text-transparent bg-clip-text  bg-gradient-to-r from-purple-700 to-pink-500 leading-tight mb-3">
              Get in Touch
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Have a legal question or need consultation? We&apos;re here to
              help. Reach out to us and we&apos;ll respond as soon as possible.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {/* Phone Card */}
            <div className="group relative bg-white rounded-3xl p-8  shadow-purple-500/10 ring-1 ring-slate-100 transition-all duration-300 hover:shadow-purple-500/20 hover:ring-purple-200">
              <div className="w-14 h-14 bg-purple-600 rounded-full flex items-center justify-center mb-6 shadow-md group-hover:bg-purple-700 transition-colors">
                <Phone className="w-7 h-7 text-white" />
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Phone Support
              </h3>

              <a
                href="tel:+971564591060"
                className="text-xl font-extrabold text-purple-600 block hover:text-purple-700 transition-colors"
              >
                (+971) 564-591-060
              </a>

              <p className="text-base text-slate-500 mt-3">
                Monday to Friday, 9 AM - 6 PM
              </p>
            </div>

            {/* Email Card */}
            <div className="group relative bg-white rounded-3xl p-8  shadow-purple-500/10 ring-1 ring-slate-100 transition-all duration-300 hover:shadow-purple-500/20 hover:ring-purple-200">
              <div className="w-14 h-14 bg-purple-600 rounded-full flex items-center justify-center mb-6 shadow-md group-hover:bg-purple-700 transition-colors">
                <Mail className="w-7 h-7 text-white" />
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Email Correspondence
              </h3>

              <a
                href="mailto:info@daralhaqooq.com"
                 className="text-xl font-extrabold text-purple-600 block hover:text-purple-700 transition-colors"
              >
                help@ezlegalhire.com
              </a>

              <p className="text-base text-slate-500 mt-3">
                We&apos;ll respond within 24 hours
              </p>
            </div>

            {/* Live Chat Card */}
            <div className="group relative bg-white rounded-3xl p-8  shadow-purple-500/10 ring-1 ring-slate-100 transition-all duration-300 hover:shadow-purple-500/20 hover:ring-purple-200">
              <div className="w-14 h-14 bg-purple-600 rounded-full flex items-center justify-center mb-6 shadow-md group-hover:bg-purple-700 transition-colors">
                <MessageSquare className="w-7 h-7 text-white" />
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Live Chat
              </h3>

              <Link
                href="/dashboard"
                 className="text-xl font-extrabold text-purple-600 block hover:text-purple-700 transition-colors"
              >
                Start a conversation
              </Link>

              <p className="text-base text-slate-500 mt-3">
                Available during business hours
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-xl p-3 md:p-6  border border-slate-200">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                Send us a Message
              </h2>

              {submitStatus === "success" && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-start gap-3">
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg
                      className="w-3 h-3 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-green-800 font-medium">
                      Message sent successfully!
                    </p>
                    <p className="text-sm text-green-600 mt-1">
                      We&apos;ll get back to you within 24 hours.
                    </p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-slate-700 mb-2"
                    >
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-600 transition-all outline-none"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-slate-700 mb-2"
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-600 transition-all outline-none"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-slate-700 mb-2"
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-600 transition-all outline-none"
                      placeholder="+971 50 123 4567"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-slate-700 mb-2"
                    >
                      Subject *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-600 transition-all outline-none"
                    >
                      <option value="">Select a subject</option>
                      <option value="consultation">Book a Consultation</option>
                      <option value="tenancy">Tenancy Issue</option>
                      <option value="employment">Employment Dispute</option>
                      <option value="company">Company Formation</option>
                      <option value="visa">Visa & Immigration</option>
                      <option value="family">Family Law</option>
                      <option value="other">Other Legal Matter</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-slate-700 mb-2"
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-600 transition-all resize-none outline-none"
                    placeholder="Please describe your legal matter in detail..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-violet-600 text-white font-semibold rounded-xl hover:shadow-xl transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Office Information */}
            <div className="space-y-8">
              {/* Dubai Office */}
              <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-2xl p-8 border border-purple-200 grid gi">
                <div>
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 mb-1">
                        Dubai Office
                      </h3>
                      <p className="text-sm text-slate-600">Main Branch</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                      <p className="text-slate-700">
                        903 Al Serkal Building, Port Saeed
                        <br />
                        Near City Center, Deira
                        <br />
                        Dubai, UAE
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-purple-600" />
                      <a
                        href="tel:+971564591060"
                        className="text-slate-700 hover:text-purple-600"
                      >
                        (+971) 564-591-060
                      </a>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-purple-600" />
                      <p className="text-slate-700">
                        Mon - Fri: 9:00 AM - 6:00 PM
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sharjah Office */}
              <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-2xl p-8 border border-violet-200">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-violet-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-1">
                      Sharjah Office
                    </h3>
                    <p className="text-sm text-slate-600">Shams Freezone</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-violet-600 flex-shrink-0 mt-0.5" />
                    <p className="text-slate-700">
                      101 Sharjah Media City
                      <br />
                      Shams Freezone, Al Dhaid Road
                      <br />
                      Sharjah, UAE 515000
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Printer className="w-5 h-5 text-violet-600" />
                    <p className="text-slate-700">Fax: 961 1 899241</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-violet-600" />
                    <p className="text-slate-700">
                      Mon - Fri: 9:00 AM - 6:00 PM
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
            </div>
          </div>
          <div
            className="
        relative 
        bg-white 
        rounded-3xl 
        p-6 md:p-8 
        border border-purple-100 
        mt-6 
        overflow-hidden /* Crucial for background design */
    "
          >
            {/* === Abstract Background Design (Funky Element) === */}
            <div
              className="
            absolute top-0 right-0 w-32 h-32 
            bg-purple-100/70 rounded-full 
            transform translate-x-1/2 -translate-y-1/2 
            mix-blend-multiply opacity-50 
            pointer-events-none 
            blur-xl /* Soft blur effect */
        "
            />
            <div
              className="
            absolute bottom-0 left-0 w-24 h-24 
            bg-pink-100/70 rounded-full 
            transform -translate-x-1/3 translate-y-1/3 
            mix-blend-multiply opacity-50 
            pointer-events-none 
            blur-xl
        "
            />

            {/* === Main Content Layout === */}
            <div
              className="
            relative z-10 
            flex flex-col md:flex-row 
            justify-between items-start 
            gap-6
        "
            >
              {/* === Left Content: Text and Description === */}
              <div className="md:w-3/5">
                <div className="flex items-center space-x-3 mb-2">
                  <Zap className="w-6 h-6 text-red-500 fill-red-100" />
                  <h3 className="text-xl font-extrabold text-slate-800">
                    Need Immediate Legal Help?
                  </h3>
                </div>

                {/* --- Expanded Description --- */}
                <p className="text-slate-600 text-base mt-2">
                  Access rapid support for urgent matters. If your legal
                  situation requires immediate attention or you need to check on
                  an active case, use the quick actions below.
                </p>
              </div>

              {/* === Right Content: Action Buttons (Right Aligned) === */}
              <div
                className="
                md:w-2/5 
                flex flex-col sm:flex-row md:flex-col 
                gap-3 w-full 
                md:items-end /* Right align buttons on desktop */
            "
              >
                {/* Primary Action Button */}
                <Link href="/services" passHref legacyBehavior>
                  <button
                    className="
                        w-full md:w-auto px-6 py-3 
                        bg-gradient-to-r from-purple-600 to-violet-600 
                        hover:from-purple-700 hover:to-violet-700 
                        text-white font-bold 
                        rounded-xl transition-all duration-300 
                        hover:shadow-xl hover:shadow-purple-600/60
                        transform hover:-translate-y-0.5 
                        flex items-center justify-center space-x-2
                    "
                  >
                    <CalendarCheck className="w-5 h-5" />
                    <span>Book Consultation</span>
                  </button>
                </Link>

                {/* Secondary Action Button */}
                <Link href="/dashboard" passHref legacyBehavior>
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
                    <LayoutDashboard className="w-5 h-5" />
                    <span>Go to Dashboard</span>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
