// src/components/privacy/PrivacyPage.tsx
'use client';

import React from 'react';
import { Shield, Lock, Eye, FileText, UserCheck, Globe, Mail, Phone } from 'lucide-react';
import Link from 'next/link';
import PublicHeader from '@/components/layout/PublicHeader';

export default function PrivacyPage() {
  return (
    <>
      <PublicHeader />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-24 pb-20">
        <div className="max-w-4xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-6">
              <Shield className="w-8 h-8 text-indigo-600" />
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              Privacy Policy
            </h1>
            <p className="text-lg text-gray-600">
              Last Updated: October 22, 2025
            </p>
          </div>

          {/* Introduction */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 mb-8">
            <p className="text-gray-700 leading-relaxed">
              At <strong>EZ Legal Hire Legal Consultancy LLC</strong>, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our online legal consultation platform.
            </p>
          </div>

          {/* Key Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-gradient-to-br from-violet-50 to-indigo-50 rounded-xl p-6 border border-indigo-100">
              <Lock className="w-8 h-8 text-indigo-600 mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Secure & Encrypted</h3>
              <p className="text-sm text-gray-600">Your data is protected with industry-standard encryption</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100">
              <UserCheck className="w-8 h-8 text-purple-600 mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Your Control</h3>
              <p className="text-sm text-gray-600">You can access, update, or delete your data anytime</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
              <Eye className="w-8 h-8 text-green-600 mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Transparent</h3>
              <p className="text-sm text-gray-600">Clear information about how we use your data</p>
            </div>
          </div>

          {/* Main Content */}
          <div className="space-y-8">
            {/* Section 1 */}
            <section className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileText className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">1. Information We Collect</h2>
                </div>
              </div>
              
              <div className="space-y-6 ml-14">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">1.1 Personal Information</h3>
                  <p className="text-gray-700 mb-3">When you create an account or book a consultation, we collect:</p>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                    <li>Full name and contact details (email, phone number)</li>
                    <li>Identification documents (Emirates ID, passport)</li>
                    <li>Payment information (processed securely through third-party providers)</li>
                    <li>Legal case information and consultation details</li>
                    <li>Communication records and correspondence</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">1.2 Automatically Collected Information</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                    <li>Device information (IP address, browser type, operating system)</li>
                    <li>Usage data (pages visited, time spent, consultation history)</li>
                    <li>Cookies and similar tracking technologies</li>
                    <li>Google Calendar and Meet integration data</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">1.3 Lawyer Information</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                    <li>Professional credentials and bar membership details</li>
                    <li>Specialization and practice areas</li>
                    <li>Availability and scheduling information</li>
                    <li>Calendar synchronization data (Google Calendar)</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 2 */}
            <section className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Globe className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">2. How We Use Your Information</h2>
                </div>
              </div>
              
              <div className="space-y-4 ml-14">
                <p className="text-gray-700">We use your information to:</p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li><strong>Provide Legal Services:</strong> Schedule and conduct video consultations with qualified lawyers</li>
                  <li><strong>Account Management:</strong> Create and maintain your user account</li>
                  <li><strong>Communication:</strong> Send appointment reminders, updates, and important notifications</li>
                  <li><strong>Calendar Integration:</strong> Sync consultations with Google Calendar for lawyers and clients</li>
                  <li><strong>Payment Processing:</strong> Process consultation fees securely</li>
                  <li><strong>Improve Services:</strong> Analyze usage patterns to enhance platform functionality</li>
                  <li><strong>Legal Compliance:</strong> Comply with UAE legal and regulatory requirements</li>
                  <li><strong>Security:</strong> Protect against fraud, unauthorized access, and other security threats</li>
                </ul>
              </div>
            </section>

            {/* Section 3 */}
            <section className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Lock className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">3. Data Security</h2>
                </div>
              </div>
              
              <div className="space-y-4 ml-14">
                <p className="text-gray-700 mb-3">We implement robust security measures to protect your information:</p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li><strong>Encryption:</strong> SSL/TLS encryption for data transmission</li>
                  <li><strong>Secure Storage:</strong> Encrypted database storage</li>
                  <li><strong>Access Control:</strong> Limited access to authorized personnel only</li>
                  <li><strong>Google OAuth:</strong> Secure authentication through Google&apos;s trusted infrastructure</li>
                  <li><strong>Regular Audits:</strong> Periodic security assessments and updates</li>
                  <li><strong>Confidentiality:</strong> Attorney-client privilege protection for legal consultations</li>
                </ul>
              </div>
            </section>

            {/* Section 4 */}
            <section className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <UserCheck className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">4. Information Sharing</h2>
                </div>
              </div>
              
              <div className="space-y-4 ml-14">
                <p className="text-gray-700 mb-3">We may share your information with:</p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li><strong>Assigned Lawyers:</strong> Your consultation details are shared with the lawyer you book</li>
                  <li><strong>Service Providers:</strong> Google (Calendar/Meet), payment processors, and hosting providers</li>
                  <li><strong>Legal Authorities:</strong> When required by law or to protect rights and safety</li>
                  <li><strong>Business Transfers:</strong> In case of merger, acquisition, or sale of assets</li>
                </ul>
                <p className="text-gray-700 mt-4">
                  <strong>We never sell your personal information to third parties.</strong>
                </p>
              </div>
            </section>

            {/* Section 5 */}
            <section className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">5. Your Rights</h2>
                </div>
              </div>
              
              <div className="space-y-4 ml-14">
                <p className="text-gray-700 mb-3">You have the right to:</p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li><strong>Access:</strong> Request a copy of your personal information</li>
                  <li><strong>Correction:</strong> Update or correct inaccurate information</li>
                  <li><strong>Deletion:</strong> Request deletion of your account and data (subject to legal obligations)</li>
                  <li><strong>Opt-Out:</strong> Unsubscribe from marketing communications</li>
                  <li><strong>Data Portability:</strong> Request your data in a machine-readable format</li>
                  <li><strong>Revoke Consent:</strong> Withdraw consent for data processing</li>
                </ul>
                <p className="text-gray-700 mt-4">
                  To exercise these rights, contact us at <a href="mailto:onlinelegaluae@gmail.com" className="text-indigo-600 hover:text-indigo-700 font-medium">onlinelegaluae@gmail.com</a>
                </p>
              </div>
            </section>

            {/* Section 6 */}
            <section className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Eye className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">6. Cookies and Tracking</h2>
                </div>
              </div>
              
              <div className="space-y-4 ml-14">
                <p className="text-gray-700 mb-3">We use cookies to:</p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>Maintain your login session</li>
                  <li>Remember your preferences</li>
                  <li>Analyze website traffic and usage patterns</li>
                  <li>Improve user experience</li>
                </ul>
                <p className="text-gray-700 mt-4">
                  You can control cookies through your browser settings. Note that disabling cookies may affect platform functionality.
                </p>
              </div>
            </section>

            {/* Section 7 */}
            <section className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Globe className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">7. Third-Party Services</h2>
                </div>
              </div>
              
              <div className="space-y-4 ml-14">
                <p className="text-gray-700 mb-3">We integrate with third-party services:</p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li><strong>Google Workspace:</strong> Calendar, Meet, OAuth authentication</li>
                  <li><strong>Payment Gateways:</strong> Secure payment processing</li>
                  <li><strong>Analytics Tools:</strong> Website usage analysis</li>
                </ul>
                <p className="text-gray-700 mt-4">
                  These services have their own privacy policies. We recommend reviewing them:
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4 mt-2">
                  <li><a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-700">Google Privacy Policy</a></li>
                </ul>
              </div>
            </section>

            {/* Section 8 */}
            <section className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileText className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">8. Data Retention</h2>
                </div>
              </div>
              
              <div className="space-y-4 ml-14">
                <p className="text-gray-700">
                  We retain your personal information for as long as necessary to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>Provide our services</li>
                  <li>Comply with legal obligations (minimum 7 years for legal records in UAE)</li>
                  <li>Resolve disputes and enforce agreements</li>
                  <li>Maintain business records</li>
                </ul>
                <p className="text-gray-700 mt-4">
                  After this period, we securely delete or anonymize your data.
                </p>
              </div>
            </section>

            {/* Section 9 */}
            <section className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <UserCheck className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">9. Children&apos;s Privacy</h2>
                </div>
              </div>
              
              <div className="space-y-4 ml-14">
                <p className="text-gray-700">
                  Our platform is not intended for children under 18 years old. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately.
                </p>
              </div>
            </section>

            {/* Section 10 */}
            <section className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">10. Changes to Privacy Policy</h2>
                </div>
              </div>
              
              <div className="space-y-4 ml-14">
                <p className="text-gray-700">
                  We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated &quot;Last Updated&quot; date. Continued use of our services after changes constitutes acceptance of the updated policy.
                </p>
              </div>
            </section>

            {/* Contact Section */}
            <section className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-8 border border-indigo-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
              <p className="text-gray-700 mb-6">
                If you have questions about this Privacy Policy or your personal information:
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-indigo-600" />
                  <a href="mailto:onlinelegaluae@gmail.com" className="text-indigo-600 hover:text-indigo-700 font-medium">
                    onlinelegaluae@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-indigo-600" />
                  <a href="tel:+971564591060" className="text-indigo-600 hover:text-indigo-700 font-medium">
                    (+971) 564-591-060
                  </a>
                </div>
                <div className="flex items-start gap-3">
                  <Globe className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-gray-700 font-medium">EZ Legal Hire  Legal Consultancy LLC</p>
                    <p className="text-gray-600 text-sm">903 Al Serkal Building, Port Saeed, Dubai, UAE</p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Footer Links */}
          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">Related Documents</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/terms" className="text-indigo-600 hover:text-indigo-700 font-medium">
                Terms of Service
              </Link>
              <span className="text-gray-300">•</span>
              <Link href="/contact" className="text-indigo-600 hover:text-indigo-700 font-medium">
                Contact Us
              </Link>
              <span className="text-gray-300">•</span>
              <Link href="/home" className="text-indigo-600 hover:text-indigo-700 font-medium">
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}