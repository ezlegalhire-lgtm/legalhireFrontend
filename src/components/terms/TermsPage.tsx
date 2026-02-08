// src/components/terms/TermsPage.tsx
'use client';

import React from 'react';
import { FileText, Scale, AlertCircle, CheckCircle, Users, CreditCard, Video, Shield } from 'lucide-react';
import Link from 'next/link';
import PublicHeader from '@/components/layout/PublicHeader';

export default function TermsPage() {
  return (
    <>
      <PublicHeader />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-24 pb-20">
        <div className="max-w-4xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-6">
              <Scale className="w-8 h-8 text-indigo-600" />
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              Terms of Service
            </h1>
            <p className="text-lg text-gray-600">
              Last Updated: October 22, 2025
            </p>
          </div>

          {/* Introduction */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 mb-8">
            <p className="text-gray-700 leading-relaxed mb-4">
              Welcome to <strong>EZ Legal Hire  Legal Consultancy LLC</strong>. These Terms of Service (&quot;Terms&quot;) govern your use of our online legal consultation platform and services. By accessing or using our platform, you agree to be bound by these Terms.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Please read these Terms carefully before using our services. If you do not agree with any part of these Terms, you must not use our platform.
            </p>
          </div>

          {/* Quick Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
              <CheckCircle className="w-8 h-8 text-green-600 mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">What You Can Do</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Book online consultations</li>
                <li>• Connect with licensed lawyers</li>
                <li>• Use Google Meet for sessions</li>
                <li>• Manage your appointments</li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-xl p-6 border border-red-100">
              <AlertCircle className="w-8 h-8 text-red-600 mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Important Notes</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• You must be 18+ years old</li>
                <li>• Provide accurate information</li>
                <li>• Follow cancellation policies</li>
                <li>• Respect lawyer-client privilege</li>
              </ul>
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
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">1. Acceptance of Terms</h2>
                </div>
              </div>
              
              <div className="space-y-4 ml-14">
                <p className="text-gray-700">
                  By creating an account, booking a consultation, or using any of our services, you acknowledge that you have read, understood, and agree to be bound by these Terms and our Privacy Policy.
                </p>
                <p className="text-gray-700">
                  These Terms constitute a legally binding agreement between you and EZ Legal Hire  Legal Consultancy LLC.
                </p>
              </div>
            </section>

            {/* Section 2 */}
            <section className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">2. Eligibility and Account Registration</h2>
                </div>
              </div>
              
              <div className="space-y-4 ml-14">
                <h3 className="text-lg font-semibold text-gray-900">2.1 Age Requirement</h3>
                <p className="text-gray-700">
                  You must be at least 18 years old to use our services. By using the platform, you represent and warrant that you meet this age requirement.
                </p>

                <h3 className="text-lg font-semibold text-gray-900 mt-6">2.2 Account Creation</h3>
                <p className="text-gray-700 mb-2">When creating an account, you agree to:</p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>Provide accurate, current, and complete information</li>
                  <li>Maintain and update your information as necessary</li>
                  <li>Keep your login credentials confidential</li>
                  <li>Accept responsibility for all activities under your account</li>
                  <li>Notify us immediately of any unauthorized access</li>
                </ul>

                <h3 className="text-lg font-semibold text-gray-900 mt-6">2.3 Account Suspension</h3>
                <p className="text-gray-700">
                  We reserve the right to suspend or terminate accounts that violate these Terms, provide false information, or engage in fraudulent activities.
                </p>
              </div>
            </section>

            {/* Section 3 */}
            <section className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Scale className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">3. Legal Services</h2>
                </div>
              </div>
              
              <div className="space-y-4 ml-14">
                <h3 className="text-lg font-semibold text-gray-900">3.1 Nature of Services</h3>
                <p className="text-gray-700 mb-2">Our platform provides:</p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>Online video consultations with licensed lawyers in the UAE</li>
                  <li>Legal advice on various practice areas</li>
                  <li>Document review and guidance (where applicable)</li>
                  <li>Appointment scheduling and calendar integration</li>
                </ul>

                <h3 className="text-lg font-semibold text-gray-900 mt-6">3.2 Lawyer-Client Relationship</h3>
                <p className="text-gray-700">
                  A lawyer-client relationship is established only upon booking and confirmation of a paid consultation. This relationship is subject to UAE legal and ethical standards, including attorney-client privilege and confidentiality.
                </p>

                <h3 className="text-lg font-semibold text-gray-900 mt-6">3.3 Scope of Services</h3>
                <p className="text-gray-700 mb-2">Our services include:</p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>Family Law (divorce, custody, inheritance)</li>
                  <li>Corporate & Commercial Law (company formation, contracts)</li>
                  <li>Employment Law (disputes, contracts, labor issues)</li>
                  <li>Real Estate & Tenancy Law</li>
                  <li>Visa & Immigration Services</li>
                  <li>Criminal Law Consultations</li>
                </ul>

                <h3 className="text-lg font-semibold text-gray-900 mt-6">3.4 Platform Role</h3>
                <p className="text-gray-700">
                  EZ Legal Hire  acts as a platform connecting clients with licensed lawyers. We do not provide legal advice directly but facilitate consultations with qualified legal professionals.
                </p>
              </div>
            </section>

            {/* Section 4 */}
            <section className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Video className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">4. Booking and Consultations</h2>
                </div>
              </div>
              
              <div className="space-y-4 ml-14">
                <h3 className="text-lg font-semibold text-gray-900">4.1 Booking Process</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>Select a service and available lawyer</li>
                  <li>Choose a convenient time slot</li>
                  <li>Complete payment</li>
                  <li>Receive confirmation email with Google Calendar invitation</li>
                  <li>Google Meet link will be provided for the consultation</li>
                </ul>

                <h3 className="text-lg font-semibold text-gray-900 mt-6">4.2 Consultation Duration</h3>
                <p className="text-gray-700">
                  Standard consultations are 30 minutes unless otherwise specified. Extended sessions may be available at additional cost.
                </p>

                <h3 className="text-lg font-semibold text-gray-900 mt-6">4.3 Attendance Requirements</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>Join the consultation on time via Google Meet</li>
                  <li>Ensure stable internet connection and working camera/microphone</li>
                  <li>Be prepared with relevant documents and information</li>
                  <li>Late arrivals may result in shortened consultation time</li>
                </ul>

                <h3 className="text-lg font-semibold text-gray-900 mt-6">4.4 No-Show Policy</h3>
                <p className="text-gray-700">
                  If you miss your consultation without prior notice, the session fee is forfeited. No refunds will be issued for no-shows.
                </p>
              </div>
            </section>

            {/* Section 5 */}
            <section className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">5. Cancellation and Refund Policy</h2>
                </div>
              </div>
              
              <div className="space-y-4 ml-14">
                <h3 className="text-lg font-semibold text-gray-900">5.1 Client Cancellations</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li><strong>More than 24 hours before:</strong> Full refund minus 5% processing fee</li>
                  <li><strong>12-24 hours before:</strong> 50% refund</li>
                  <li><strong>Less than 12 hours before:</strong> No refund</li>
                  <li><strong>No-show:</strong> No refund</li>
                </ul>

                <h3 className="text-lg font-semibold text-gray-900 mt-6">5.2 Lawyer Cancellations</h3>
                <p className="text-gray-700">
                  If a lawyer cancels or is unavailable, you will receive a full refund or the option to reschedule with the same or different lawyer at no additional cost.
                </p>

                <h3 className="text-lg font-semibold text-gray-900 mt-6">5.3 Rescheduling</h3>
                <p className="text-gray-700">
                  You may reschedule once free of charge if done at least 24 hours before the consultation. Additional rescheduling requests may incur a fee.
                </p>

                <h3 className="text-lg font-semibold text-gray-900 mt-6">5.4 Refund Processing</h3>
                <p className="text-gray-700">
                  Approved refunds will be processed within 7-10 business days to the original payment method.
                </p>
              </div>
            </section>

            {/* Section 6 */}
            <section className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <CreditCard className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">6. Fees and Payment</h2>
                </div>
              </div>
              
              <div className="space-y-4 ml-14">
                <h3 className="text-lg font-semibold text-gray-900">6.1 Service Fees</h3>
                <p className="text-gray-700">
                  Consultation fees vary by service type and lawyer expertise. All fees are displayed clearly before booking and are in UAE Dirhams (AED).
                </p>

                <h3 className="text-lg font-semibold text-gray-900 mt-6">6.2 Payment Methods</h3>
                <p className="text-gray-700 mb-2">We accept:</p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>Credit/Debit cards (Visa, Mastercard, AMEX)</li>
                  <li>Online banking transfers</li>
                  <li>Digital wallets (where applicable)</li>
                </ul>

                <h3 className="text-lg font-semibold text-gray-900 mt-6">6.3 Payment Processing</h3>
                <p className="text-gray-700">
                  Payments are processed securely through third-party payment gateways. We do not store your full credit card information.
                </p>

                <h3 className="text-lg font-semibold text-gray-900 mt-6">6.4 VAT</h3>
                <p className="text-gray-700">
                  All fees are inclusive of UAE Value Added Tax (VAT) as required by law.
                </p>

                <h3 className="text-lg font-semibold text-gray-900 mt-6">6.5 Price Changes</h3>
                <p className="text-gray-700">
                  We reserve the right to modify service fees with 30 days&apos; notice. Changes will not affect already booked consultations.
                </p>
              </div>
            </section>

            {/* Section 7 */}
            <section className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">7. User Conduct and Responsibilities</h2>
                </div>
              </div>
              
              <div className="space-y-4 ml-14">
                <h3 className="text-lg font-semibold text-gray-900">7.1 Acceptable Use</h3>
                <p className="text-gray-700 mb-2">You agree to:</p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>Use the platform only for lawful purposes</li>
                  <li>Provide truthful and accurate information</li>
                  <li>Treat lawyers and staff with respect</li>
                  <li>Maintain confidentiality of sensitive information</li>
                  <li>Comply with UAE laws and regulations</li>
                </ul>

                <h3 className="text-lg font-semibold text-gray-900 mt-6">7.2 Prohibited Activities</h3>
                <p className="text-gray-700 mb-2">You must NOT:</p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>Share your account credentials with others</li>
                  <li>Record consultations without explicit consent</li>
                  <li>Harass, abuse, or threaten lawyers or staff</li>
                  <li>Use the platform for fraudulent purposes</li>
                  <li>Attempt to hack, disrupt, or compromise platform security</li>
                  <li>Upload malware, viruses, or harmful code</li>
                  <li>Scrape or copy platform content without permission</li>
                </ul>

                <h3 className="text-lg font-semibold text-gray-900 mt-6">7.3 Consequences</h3>
                <p className="text-gray-700">
                  Violation of these terms may result in immediate account suspension, legal action, and reporting to relevant authorities.
                </p>
              </div>
            </section>

            {/* Section 8 */}
            <section className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileText className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">8. Intellectual Property</h2>
                </div>
              </div>
              
              <div className="space-y-4 ml-14">
                <p className="text-gray-700">
                  All content on the platform, including text, graphics, logos, icons, images, software, and design, is the property of EZ Legal Hire  Legal Consultancy LLC and protected by UAE and international intellectual property laws.
                </p>
                <p className="text-gray-700">
                  You may not reproduce, distribute, modify, or create derivative works without our written permission.
                </p>
              </div>
            </section>

            {/* Section 9 */}
            <section className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Scale className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">9. Disclaimers and Limitations of Liability</h2>
                </div>
              </div>
              
              <div className="space-y-4 ml-14">
                <h3 className="text-lg font-semibold text-gray-900">9.1 No Guarantees</h3>
                <p className="text-gray-700">
                  While our lawyers are licensed professionals, we cannot guarantee specific outcomes. Legal matters are complex and results depend on many factors.
                </p>

                <h3 className="text-lg font-semibold text-gray-900 mt-6">9.2 Platform Availability</h3>
                <p className="text-gray-700">
                  We strive for 99.9% uptime but cannot guarantee uninterrupted service. We are not liable for technical issues, downtime, or service interruptions.
                </p>

                <h3 className="text-lg font-semibold text-gray-900 mt-6">9.3 Third-Party Services</h3>
                <p className="text-gray-700">
                  We use third-party services (Google Meet, payment processors). We are not responsible for their performance, availability, or security.
                </p>

                <h3 className="text-lg font-semibold text-gray-900 mt-6">9.4 Limitation of Liability</h3>
                <p className="text-gray-700">
                  To the maximum extent permitted by law, EZ Legal Hire  Legal Consultancy LLC shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the platform.
                </p>
              </div>
            </section>

            {/* Section 10 */}
            <section className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">10. Termination</h2>
                </div>
              </div>
              
              <div className="space-y-4 ml-14">
                <h3 className="text-lg font-semibold text-gray-900">10.1 Your Right to Terminate</h3>
                <p className="text-gray-700">
                  You may close your account at any time through your account settings or by contacting us. Unused consultation credits will be refunded according to our refund policy.
                </p>

                <h3 className="text-lg font-semibold text-gray-900 mt-6">10.2 Our Right to Terminate</h3>
                <p className="text-gray-700">
                  We reserve the right to suspend or terminate your account for violations of these Terms, suspected fraud, or any reason we deem necessary to protect our platform and users.
                </p>

                <h3 className="text-lg font-semibold text-gray-900 mt-6">10.3 Effect of Termination</h3>
                <p className="text-gray-700">
                  Upon termination, your access to the platform will cease, but certain provisions of these Terms (including confidentiality and liability limitations) will survive.
                </p>
              </div>
            </section>

            {/* Section 11 */}
            <section className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Scale className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">11. Governing Law and Dispute Resolution</h2>
                </div>
              </div>
              
              <div className="space-y-4 ml-14">
                <h3 className="text-lg font-semibold text-gray-900">11.1 Governing Law</h3>
                <p className="text-gray-700">
                  These Terms are governed by the laws of the United Arab Emirates and the Emirate of Dubai.
                </p>

                <h3 className="text-lg font-semibold text-gray-900 mt-6">11.2 Dispute Resolution</h3>
                <p className="text-gray-700">
                  Any disputes arising from these Terms or your use of the platform shall be resolved through negotiation in good faith. If unresolved, disputes shall be submitted to the competent courts of Dubai, UAE.
                </p>

                <h3 className="text-lg font-semibold text-gray-900 mt-6">11.3 Arbitration (Optional)</h3>
                <p className="text-gray-700">
                  Parties may agree to arbitration through the Dubai International Arbitration Centre (DIAC) as an alternative to litigation.
                </p>
              </div>
            </section>

            {/* Section 12 */}
            <section className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileText className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">12. Changes to Terms</h2>
                </div>
              </div>
              
              <div className="space-y-4 ml-14">
                <p className="text-gray-700">
                  We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting to the platform. We will notify users of significant changes via email.
                </p>
                <p className="text-gray-700">
                  Your continued use of the platform after changes constitutes acceptance of the updated Terms.
                </p>
              </div>
            </section>

            {/* Section 13 */}
            <section className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">13. General Provisions</h2>
                </div>
              </div>
              
              <div className="space-y-4 ml-14">
                <h3 className="text-lg font-semibold text-gray-900">13.1 Entire Agreement</h3>
                <p className="text-gray-700">
                  These Terms, together with our Privacy Policy, constitute the entire agreement between you and EZ Legal Hire  Legal Consultancy LLC.
                </p>

                <h3 className="text-lg font-semibold text-gray-900 mt-6">13.2 Severability</h3>
                <p className="text-gray-700">
                  If any provision of these Terms is found to be unenforceable, the remaining provisions shall remain in full force and effect.
                </p>

                <h3 className="text-lg font-semibold text-gray-900 mt-6">13.3 Waiver</h3>
                <p className="text-gray-700">
                  Our failure to enforce any right or provision of these Terms shall not constitute a waiver of such right or provision.
                </p>

                <h3 className="text-lg font-semibold text-gray-900 mt-6">13.4 Assignment</h3>
                <p className="text-gray-700">
                  You may not assign or transfer your rights under these Terms. We may assign our rights and obligations without restriction.
                </p>
              </div>
            </section>

            {/* Contact Section */}
            <section className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-8 border border-indigo-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Questions About These Terms?</h2>
              <p className="text-gray-700 mb-6">
                If you have any questions or concerns about these Terms of Service, please contact us:
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-4 h-4 text-indigo-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">EZ Legal Hire Consultancy LLC</p>
                    <p className="text-sm text-gray-600">Licensed Legal Consultancy in Dubai, UAE</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-4 h-4 text-indigo-600" />
                  </div>
                  <a href="mailto:onlinelegaluae@gmail.com" className="text-indigo-600 hover:text-indigo-700 font-medium">
                    onlinelegaluae@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-4 h-4 text-indigo-600" />
                  </div>
                  <a href="tel:+971564591060" className="text-indigo-600 hover:text-indigo-700 font-medium">
                    (+971) 564-591-060
                  </a>
                </div>
              </div>
            </section>
          </div>

          {/* Footer Links */}
          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">Related Documents</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/privacy" className="text-indigo-600 hover:text-indigo-700 font-medium">
                Privacy Policy
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

          {/* Acknowledgment Box */}
          <div className="mt-12 bg-violet-50 border-2 border-violet-200 rounded-2xl p-6">
            <div className="flex items-start gap-4">
              <CheckCircle className="w-6 h-6 text-violet-600 flex-shrink-0 mt-1" />
              <div>
                <p className="text-violet-900 font-medium mb-2">
                  By using EZ Legal Hire Legal Consultancy platform, you acknowledge that you have read, understood, and agree to these Terms of Service.
                </p>
                <p className="text-sm text-violet-700">
                  Last reviewed and accepted by continuing to use our services.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}