import React from "react";
import { ArrowRight, Phone, Shield, Clock, CreditCard } from "lucide-react";
import Link from "next/link";

export default function CTASection() {
  return (
    <section id="contact" className="bg-gradient-to-b from-slate-50 to-white">
      <div className="container text-center">
        <h2 className="text-4xl anton tracking-wider text-center text-slate-900 mb-4">
          Ready to Get Started?
        </h2>
        <p className="text-body-lg text-gray-600 max-w-2xl mx-auto mb-10">
          Book your consultation today and get expert legal advice from verified
          UAE lawyers. Available for video calls, in-person meetings, or monthly
          retainers.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10 max-w-xl mx-auto">
          <Link href="/services" className="flex-1">
            <button className="w-full inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-violet-600 text-white font-bold rounded-full hover:from-purple-700 hover:to-violet-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group">
              Browse All Services
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
          <a href="tel:+971564591060" className="flex-1">
            <button className="w-full inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-slate-900 font-bold rounded-full  border border-slate-300 hover:border-purple-600 hover:bg-purple-50 hover:text-purple-700 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 group">
              <Phone className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              Call Now
            </button>
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto mb-8">
          <div className="flex items-center justify-center gap-3 px-6 py-4 bg-white rounded-2xl  border border-purple-200 shadow-sm">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Clock className="w-5 h-5 text-purple-600" />
            </div>
            <div className="text-left">
              <div className="font-bold text-slate-900 text-sm">
                Available 24/7
              </div>
              <div className="text-xs text-slate-600">Round the clock</div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 px-6 py-4 bg-white rounded-2xl  border border-purple-200 shadow-sm">
            <div className="w-10 h-10 bg-violet-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Shield className="w-5 h-5 text-violet-600" />
            </div>
            <div className="text-left">
              <div className="font-bold text-slate-900 text-sm">
                Instant Booking
              </div>
              <div className="text-xs text-slate-600">Quick & easy</div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 px-6 py-4 bg-white rounded-2xl  border border-purple-200 shadow-sm">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
              <CreditCard className="w-5 h-5 text-purple-600" />
            </div>
            <div className="text-left">
              <div className="font-bold text-slate-900 text-sm">
                Secure Payments
              </div>
              <div className="text-xs text-slate-600">100% protected</div>
            </div>
          </div>
        </div>
        <p className="hidden">Test</p>

        {/* <div className="inline-flex items-center gap-2 px-6 py-3 bg-slate-100 rounded-full border border-slate-200">
          <Shield className="w-4 h-4 text-slate-600" />
          <span className="text-xs text-slate-700 font-medium">
            Licensed by UAE authorities
          </span>
        </div> */}
      </div>
    </section>
  );
}
