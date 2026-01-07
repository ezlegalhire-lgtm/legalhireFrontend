//src/app/lawyer/register/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Mail, ArrowRight, Scale, CheckCircle, AlertCircle, User, Phone, Briefcase, FileText, Award, Building } from 'lucide-react';

const API_BASE_URL = process.env.NEXT_PUBLIC_CMS_API_URL || 'https://cms.ezlegalhire.com';

export default function LawyerRegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    licenseNumber: '',
    specialization: '',
    yearsOfExperience: '',
    barAssociation: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('lawyerToken');
      if (token) {
        router.push('/lawyer/dashboard');
      }
    }
  }, [router]);

  const validateForm = () => {
    const errors: string[] = [];

    if (!formData.firstName.trim() || formData.firstName.trim().length < 2) {
      errors.push('First name must be at least 2 characters');
    }

    if (!formData.lastName.trim() || formData.lastName.trim().length < 2) {
      errors.push('Last name must be at least 2 characters');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      errors.push('Please enter a valid email address');
    }

    if (!formData.phone.trim() || formData.phone.trim().length < 10) {
      errors.push('Please enter a valid phone number');
    }

    if (!formData.licenseNumber.trim()) {
      errors.push('License number is required');
    }

    if (!formData.specialization.trim()) {
      errors.push('Specialization is required');
    }

    if (!formData.yearsOfExperience.trim()) {
      errors.push('Years of experience is required');
    }

    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate form
    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      setError(validationErrors[0]);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/public/lawyer/request-access`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName.trim(),
          lastName: formData.lastName.trim(),
          email: formData.email.toLowerCase().trim(),
          phone: formData.phone.trim(),
          licenseNumber: formData.licenseNumber.trim(),
          specialization: formData.specialization.trim(),
          yearsOfExperience: parseInt(formData.yearsOfExperience),
          barAssociation: formData.barAssociation.trim() || undefined,
          message: formData.message.trim() || undefined,
        }),
      });

      // Check if response has content before parsing
      const contentType = response.headers.get('content-type');
      let data;
      
      if (contentType && contentType.includes('application/json')) {
        const text = await response.text();
        if (text) {
          try {
            data = JSON.parse(text);
          } catch (e) {
            console.error('JSON parse error:', e);
            throw new Error('Invalid server response. Please try again.');
          }
        } else {
          throw new Error('Empty response from server');
        }
      } else {
        throw new Error('Server returned an invalid response format');
      }

      if (!response.ok) {
        if (data?.details && Array.isArray(data.details)) {
          throw new Error(data.details.join(', '));
        }
        throw new Error(data?.error || `Request failed (${response.status})`);
      }

      // Success - show success message
      setSuccess(true);
    } catch (err) {
      console.error('Request error:', err);
      if (err instanceof TypeError && err.message.includes('Failed to fetch')) {
        setError('Network error. Please check your connection and try again.');
      } else {
        setError(err instanceof Error ? err.message : 'Request failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Success screen
  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center px-6">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-gray-200 p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Request Submitted Successfully!
          </h1>
          <p className="text-gray-600 mb-6">
            Thank you for your interest in joining our legal team. We&apos;ve received your access request and will review your credentials.
          </p>
          <div className="bg-violet-50 border border-violet-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-violet-800 mb-2">
              <strong>What happens next?</strong>
            </p>
            <ul className="text-sm text-violet-800 text-left space-y-1">
              <li>• Our team will review your application</li>
              <li>• We&apos;ll verify your credentials</li>
              <li>• You&apos;ll receive an email within 2-3 business days</li>
              <li>• If approved, you&apos;ll get login credentials</li>
            </ul>
          </div>
          <p className="text-sm text-gray-600 mb-6">
            We&apos;ve sent a confirmation email to{' '}
            <strong>{formData.email}</strong>
          </p>
          <Link href="/home">
            <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-all">
              Back to Home
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex flex-col">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/home" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <Scale className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                Dar Al Haqooq
              </div>
              <div className="text-xs text-gray-600">Legal Consultancy</div>
            </div>
          </Link>
          <Link href="/home" className="text-sm text-gray-600 hover:text-indigo-600 font-medium">
            Back to Home
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-2xl">
          {/* Registration Card */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Briefcase className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Join Our Legal Team
              </h1>
              <p className="text-gray-600">
                Request access to the lawyer portal
              </p>
            </div>

            {/* Info Banner */}
            <div className="mb-6 p-4 bg-violet-50 border border-violet-200 rounded-lg">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-violet-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-violet-900 font-medium mb-1">
                    Lawyer accounts require admin approval
                  </p>
                  <p className="text-sm text-violet-800">
                    Fill out this form to request access. Our team will review your credentials and contact you within 2-3 business days.
                  </p>
                </div>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-red-800 font-medium">Request Failed</p>
                  <p className="text-sm text-red-700 mt-1">{error}</p>
                </div>
              </div>
            )}

            {/* Registration Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                    First Name *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="firstName"
                      type="text"
                      placeholder="John"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="lastName"
                      type="text"
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    placeholder="lawyer@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>
              </div>

              {/* Phone Field */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="phone"
                    type="tel"
                    placeholder="+971 50 123 4567"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>
              </div>

              {/* Professional Information */}
              <div className="border-t border-gray-200 pt-5">
                <h3 className="text-sm font-medium text-gray-700 mb-4">
                  Professional Information
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="licenseNumber" className="block text-sm font-medium text-gray-700 mb-2">
                      License Number *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Award className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="licenseNumber"
                        type="text"
                        placeholder="e.g., UAE-LAW-12345"
                        value={formData.licenseNumber}
                        onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="specialization" className="block text-sm font-medium text-gray-700 mb-2">
                        Specialization *
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FileText className="h-5 w-5 text-gray-400" />
                        </div>
                        <select
                          id="specialization"
                          value={formData.specialization}
                          onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                          className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          required
                        >
                          <option value="">Select...</option>
                          <option value="Corporate Law">Corporate Law</option>
                          <option value="Commercial Law">Commercial Law</option>
                          <option value="Family Law">Family Law</option>
                          <option value="Real Estate Law">Real Estate Law</option>
                          <option value="Criminal Law">Criminal Law</option>
                          <option value="Immigration Law">Immigration Law</option>
                          <option value="Intellectual Property">Intellectual Property</option>
                          <option value="Labor Law">Labor Law</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="yearsOfExperience" className="block text-sm font-medium text-gray-700 mb-2">
                        Years of Experience *
                      </label>
                      <input
                        id="yearsOfExperience"
                        type="number"
                        min="0"
                        max="60"
                        placeholder="e.g., 5"
                        value={formData.yearsOfExperience}
                        onChange={(e) => setFormData({ ...formData, yearsOfExperience: e.target.value })}
                        className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="barAssociation" className="block text-sm font-medium text-gray-700 mb-2">
                      Bar Association (Optional)
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Building className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="barAssociation"
                        type="text"
                        placeholder="e.g., Dubai Bar Association"
                        value={formData.barAssociation}
                        onChange={(e) => setFormData({ ...formData, barAssociation: e.target.value })}
                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Additional Information (Optional)
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      placeholder="Tell us about your experience, expertise, or any additional information..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Submitting Request...
                  </>
                ) : (
                  <>
                    Submit Access Request
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Already have an account?</span>
              </div>
            </div>

            {/* Login Link */}
            <Link href="/lawyer/login">
              <button className="w-full py-3 px-4 border-2 border-indigo-600 text-indigo-600 font-semibold rounded-lg hover:bg-indigo-50 transition-all">
                Sign In to Lawyer Portal
              </button>
            </Link>
          </div>

          {/* Support */}
          <p className="text-center text-sm text-gray-600 mt-6">
            Questions about joining our team?{' '}
            <a href="mailto:careers@daralhaqqoq.com" className="text-indigo-600 hover:text-indigo-700 font-medium">
              Contact HR Department
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}