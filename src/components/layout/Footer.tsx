"use client";

import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { href: "/home", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/business", label: "Business Retainer" },
    { href: "/how-it-works", label: "How it Works" },
    { href: "/legal-resources", label: "Legal Resources" },
    { href: "/contact", label: "Contact Us" },
  ];

  const legalLinks = [
    { href: "/about", label: "About Us" },
    { href: "/faqs", label: "FAQs" },
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
    { href: "/disclaimer", label: "Disclaimer" },
  ];

  const serviceCategories = [
    { name: "Corporate & Business", href: "/services" },
    { name: "Legal Consultation", href: "/services" },
    { name: "Disputes & Litigation", href: "/services" },
    { name: "Documents & Contracts", href: "/services" },
    { name: "Business Retainer Plans", href: "/business" },
  ];

  return (
    <footer className="bg-gradient-to-b from-slate-50 to-white border-t-2 border-slate-200 mt-auto">
      <div className="container  pt-12 pb-6">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1  lg:grid-cols-2 items-stretch gap-8 lg:gap-12 mb-12">
          {/* Company Info */}
          <div>
            <Link
              href="/home"
              className="flex items-center gap-3 mb-6 group w-fit"
            >
              <Image
                src="/EZLogo.png"
                alt="LegalHire Logo"
                width={48}
                height={48}
                priority
                className="h-12 w-12 object-contain group-hover:opacity-90 transition-opacity"
              />
              <div className="flex flex-col">
                <span className="text-2xl font-black bg-gradient-to-r from-purple-700 to-pink-600 bg-clip-text text-transparent group-hover:from-purple-600 group-hover:to-pink-500 transition-all leading-none">
                  LEGALHIRE
                </span>
                <span className="text-[10px] font-semibold bg-gradient-to-r from-purple-700 to-pink-600 bg-clip-text text-transparent mt-0.5">
                  UAE&apos;s First Integrated Legaltech Portal
                </span>
              </div>
            </Link>

            <p className="text-sm text-slate-600 mb-6 leading-relaxed max-w-md">
              Professional legal consultancy services in the UAE. In association
              with Nawal Salem Advocates and Legal Consultants. Bringing legal
              excellence to your screen with online services redefined.
            </p>

            {/* Contact Info Cards */}
            <div className="space-y-3 mb-6">
              <a
                href="tel:+971564591060"
                className="flex items-center gap-3 p-3 rounded-xl bg-white border-2 border-slate-200 hover:border-purple-300 hover:shadow-md transition-all group"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-violet-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Phone className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-medium">
                    Call Us
                  </div>
                  <div className="font-bold text-sm text-slate-900">
                    (+971) 564-591-060
                  </div>
                </div>
              </a>

              <a
                href="mailto:help@ezlegalhire.com "
                className="flex items-center gap-3 p-3 rounded-xl bg-white border-2 border-slate-200 hover:border-purple-300 hover:shadow-md transition-all group"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-violet-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Mail className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-medium">
                    Email Us
                  </div>
                  <div className="font-semibold text-slate-900 text-sm">
                    help@ezlegalhire.com
                  </div>
                </div>
              </a>
            </div>

            {/* Office Hours */}
            <div className="flex items-start gap-3 p-4 rounded-xl bg-purple-50 border border-purple-200">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <div className="font-bold text-slate-900 text-sm mb-1">
                  Office Hours
                </div>
                <div className="text-xs text-slate-600 space-y-0.5">
                  <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                  <p>Saturday: Closed</p>
                  <p className="text-purple-700 font-semibold mt-1">
                    Available 24/7 for urgent cases
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-2">
            <div>
              <h3 className="text-slate-900 font-bold text-base mb-4 flex items-center gap-2">
                <div className="w-1 h-5 bg-gradient-to-b from-purple-600 to-violet-600 rounded-full"></div>
                Quick Links
              </h3>
              <ul className="space-y-2.5">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-600 hover:text-purple-700 transition-colors flex items-center gap-2 group"
                    >
                      <ArrowRight className="w-3 h-3 text-purple-400 opacity-0 group-hover:opacity-100 -ml-5 group-hover:ml-0 transition-all" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="mt-6">
                <h4 className="text-slate-900 font-bold text-sm mb-2 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-purple-600" />
                  Dubai Office
                </h4>
                <p className="text-xs text-slate-600 pl-6 leading-relaxed">
                  903 Al Serkal Building, Port Saeed
                  <br />
                  Near City Center, Deira
                  <br />
                  Dubai, UAE
                </p>
              </div>
              {/* Service Categories */}
              {/* <div className="mt-6">
                <h4 className="text-slate-900 font-bold text-sm mb-3">
                  Services
                </h4>
                <ul className="space-y-2">
                  {serviceCategories.map((category) => (
                    <li key={category.href}>
                      <Link
                        href={category.href}
                        className="text-sm text-slate-600 hover:text-purple-700 transition-colors flex items-center gap-2"
                      >
                        <span className="inline-block w-1.5 h-1.5 bg-purple-400 rounded-full"></span>
                        {category.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div> */}
            </div>

            {/* Legal & Social */}
            <div>
              <h3 className="text-slate-900 font-bold text-base mb-4 flex items-center gap-2">
                <div className="w-1 h-5 bg-gradient-to-b from-purple-600 to-violet-600 rounded-full"></div>
                Services
              </h3>
              <ul className="space-y-2.5 mb-12">
                {serviceCategories.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-600 hover:text-purple-700 transition-colors flex items-center gap-2 group"
                    >
                      <ArrowRight className="w-3 h-3 text-purple-400 opacity-0 group-hover:opacity-100 -ml-5 group-hover:ml-0 transition-all" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Office Locations */}
              <div className="space-y-4">
                <div>
                  <h4 className="text-slate-900 font-bold text-sm mb-2 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-purple-600" />
                    Sharjah Office
                  </h4>
                  <p className="text-xs text-slate-600 pl-6 leading-relaxed">
                    101 Sharjah Media City
                    <br />
                    Shams Freezone, Al Dhaid Road
                    <br />
                    Sharjah, UAE 515000
                  </p>
                </div>
              </div>

              {/* Social Links */}
            </div>
            <div className="col-span-2">
              <div className="mt-6">
                <h4 className="text-slate-900 font-bold text-sm mb-3">
                  Follow Us
                </h4>
                <div className="flex gap-2 flex-wrap">
                  <a
                    href="https://wa.me/971564591060"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white border-2 border-slate-200 rounded-lg flex items-center justify-center hover:border-green-400 hover:bg-green-50 transition-all group"
                    aria-label="WhatsApp"
                  >
                    <svg
                      className="w-5 h-5 text-slate-600 group-hover:text-green-600 group-hover:scale-110 transition-all"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                  </a>
                  <a
                    href="https://t.me/+971564591060"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white border-2 border-slate-200 rounded-lg flex items-center justify-center hover:border-blue-400 hover:bg-blue-50 transition-all group"
                    aria-label="Telegram"
                  >
                    <svg
                      className="w-5 h-5 text-slate-600 group-hover:text-blue-600 group-hover:scale-110 transition-all"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                    </svg>
                  </a>
                  <a
                    href="viber://contact?number=971564591060"
                    className="w-10 h-10 bg-white border-2 border-slate-200 rounded-lg flex items-center justify-center hover:border-purple-400 hover:bg-purple-50 transition-all group"
                    aria-label="Viber"
                  >
                    <svg
                      className="w-5 h-5 text-slate-600 group-hover:text-purple-600 group-hover:scale-110 transition-all"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M11.4 0C9.473.028 5.333.344 3.02 2.467 1.302 4.187.696 6.7.633 9.817.57 12.933.488 18.776 6.12 20.36h.003l-.004 2.644s-.037.977.61 1.177c.777.242 1.234-.5 1.98-1.302.407-.44.972-1.084 1.397-1.58 3.85.323 6.812-.416 7.15-.525.776-.252 5.176-.816 5.892-6.657.74-6.02-.36-9.83-2.34-11.546-.596-.55-3.006-2.3-8.375-2.323 0 0-.395-.025-1.029-.017zm.058 1.693c.545-.004.88.02.88.02 4.54.01 6.711 1.395 7.249 1.908 1.66 1.473 2.5 4.74 1.863 9.894-.6 4.877-4.018 5.14-4.668 5.34-.292.09-2.893.734-6.143.49 0 0-2.425 2.925-3.176 3.676-.12.12-.26.167-.352.145-.13-.03-.166-.18-.165-.396l.02-4.385c-4.762-1.32-4.485-6.253-4.43-8.82.054-2.563.587-4.656 1.976-6.112 1.96-1.826 5.527-2.115 7.003-2.14l-.057-.02zm.36 2.322a.397.397 0 0 0-.369.42c.016.217.205.364.42.347 1.974-.16 3.856.337 5.16 1.664 1.304 1.326 1.717 3.108 1.507 5.06-.024.216.135.4.352.427.218.026.4-.135.427-.353.236-2.192-.254-4.22-1.744-5.743-1.49-1.524-3.576-2.085-5.753-1.913a.41.41 0 0 0-.097-.01l.097.01zm.386 1.93a.385.385 0 0 0-.368.355.397.397 0 0 0 .347.434c1.467.18 2.688.737 3.48 1.567.793.83 1.242 1.942 1.332 3.394.013.22.198.38.418.367a.4.4 0 0 0 .368-.418c-.105-1.647-.627-2.966-1.57-4.013-.944-1.046-2.34-1.705-4.007-1.908a.36.36 0 0 0-.097-.008l.097.008zm.437 1.945s-.256-.023-.292.303c-.035.328.224.438.224.438.945.174 1.555.585 1.926 1.015.372.43.645 1.036.645 1.81 0 .224.17.4.39.4.222 0 .394-.177.394-.4 0-.989-.337-1.788-.837-2.367-.5-.578-1.258-1.064-2.45-1.27z" />
                    </svg>
                  </a>
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white border-2 border-slate-200 rounded-lg flex items-center justify-center hover:border-purple-400 hover:bg-purple-50 transition-all group"
                    aria-label="Facebook"
                  >
                    <Facebook className="w-4 h-4 text-slate-600 group-hover:text-purple-600 group-hover:scale-110 transition-all" />
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white border-2 border-slate-200 rounded-lg flex items-center justify-center hover:border-purple-400 hover:bg-purple-50 transition-all group"
                    aria-label="Twitter"
                  >
                    <Twitter className="w-4 h-4 text-slate-600 group-hover:text-purple-600 group-hover:scale-110 transition-all" />
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white border-2 border-slate-200 rounded-lg flex items-center justify-center hover:border-purple-400 hover:bg-purple-50 transition-all group"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-4 h-4 text-slate-600 group-hover:text-purple-600 group-hover:scale-110 transition-all" />
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white border-2 border-slate-200 rounded-lg flex items-center justify-center hover:border-purple-400 hover:bg-purple-50 transition-all group"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-4 h-4 text-slate-600 group-hover:text-purple-600 group-hover:scale-110 transition-all" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}

        {/* Bottom Bar */}
        <div className="border-t-2 border-slate-200 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-slate-600 text-center md:text-left">
              <p className="font-semibold text-slate-900">
                © {currentYear} EZ Legal Hire Consultancy LLC. All rights
                reserved.
              </p>
              {/* <p className="text-xs text-slate-500 mt-1">
                In Association with Nawal Salem Advocates and Legal Consultants
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Licensed and regulated by UAE authorities • PDPL Compliant
              </p> */}
            </div>

            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <Link
                href="/terms"
                className="text-slate-600 hover:text-purple-700 transition-colors font-medium"
              >
                Terms
              </Link>
              <Link
                href="/privacy"
                className="text-slate-600 hover:text-purple-700 transition-colors font-medium"
              >
                Privacy
              </Link>
              <Link
                href="/disclaimer"
                className="text-slate-600 hover:text-purple-700 transition-colors font-medium"
              >
                Disclaimer
              </Link>
              <Link
                href="/sitemap"
                className="text-slate-600 hover:text-purple-700 transition-colors font-medium"
              >
                Sitemap
              </Link>
            </div>
          </div>

          {/* Trust Badges */}
          {/* <div className="mt-6 flex flex-wrap justify-center gap-4">
            <div className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-600 font-medium">
              🔒 SSL Secured
            </div>

            <div className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-600 font-medium">
              ⚖️ UAE Licensed
            </div>
          </div> */}
        </div>
      </div>

      {/* Accent Bar */}
      <div className="h-2 bg-purple-600"></div>
    </footer>
  );
}
