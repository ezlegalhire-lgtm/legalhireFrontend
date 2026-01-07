// src/app/order/success/page.tsx
'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle, Calendar, Clock, Mail, Phone, User, FileText, ArrowRight, Download, Share2, UserCheck, UserPlus } from 'lucide-react';
import PublicHeader from '@/components/layout/PublicHeader';

//const API_BASE_URL = process.env.NEXT_PUBLIC_CMS_API_URL || 'https://cms.ezlegalhire.com';

interface Order {
  id: number;
  orderNumber: string;
  serviceName: string;
  serviceCategory: string;
  serviceDuration?: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  bookingDate: string;
  bookingTime: string;
  servicePrice: number;
  platformFee: number;
  totalAmount: number;
  status: string;
  paymentStatus: string;
  paymentMethod: string | null;
  meetingLink: string | null;
  notes: string | null;
  isAuthenticated: boolean;
  createdAt: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_CMS_API_URL || 'https://cms.ezlegalhire.com';

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get('orderNumber');
  const email = searchParams.get('email');

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('clientToken');
    setIsLoggedIn(!!token);
  }, []);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!orderNumber) {
        setError('No order number provided');
        setLoading(false);
        return;
      }

      try {
        // Get token if user is logged in
        const token = localStorage.getItem('clientToken');
        const headers: HeadersInit = {
          'Content-Type': 'application/json',
        };
        
        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
        }

        // Build query params
        const params = new URLSearchParams({ orderNumber });
        if (email) {
          params.append('email', email);
        }
        
        // Fetch order from CMS API
        const response = await fetch(`${API_BASE_URL}/api/public/orders?${params.toString()}`, { headers });

        if (!response.ok) {
          throw new Error('Order not found');
        }

        const data = await response.json();
        setOrder(data.order);
      } catch (err) {
        console.error('Error fetching order:', err);
        setError(err instanceof Error ? err.message : 'Failed to load order');
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderNumber, email]);

  if (loading) {
    return (
      <>
        <PublicHeader />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center pt-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading your order details...</p>
          </div>
        </div>
      </>
    );
  }

  if (error || !order) {
    return (
      <>
        <PublicHeader />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center pt-20">
          <div className="text-center max-w-md mx-auto px-6">
            <div className="text-red-600 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Order Not Found</h1>
            <p className="text-gray-600 mb-8">{error || 'The order you\'re looking for doesn\'t exist.'}</p>
            <Link href="/services">
              <button className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-all">
                Browse Services
              </button>
            </Link>
          </div>
        </div>
      </>
    );
  }

  const bookingDate = new Date(order.bookingDate);
  const formattedDate = bookingDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <>
      <PublicHeader />
      <div className="min-h-screen bg-gray-50 pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-6 py-12">
          {/* Success Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Booking Confirmed!
            </h1>
            <p className="text-xl text-gray-600 mb-2">
              Thank you for your booking, {order.customerName}
            </p>
            <p className="text-gray-500">
              Your order number is <span className="font-semibold text-indigo-600">{order.orderNumber}</span>
            </p>
            {order.isAuthenticated && (
              <div className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm font-medium">
                <UserCheck className="w-4 h-4" />
                Linked to your account
              </div>
            )}
          </div>

          {/* Create Account Notice (Only for guest users) */}
          {!order.isAuthenticated && !isLoggedIn && (
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-xl p-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <UserPlus className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-2">Create an Account for Easy Booking</h3>
                  <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                    Create an account to track your orders, book faster next time, and access your consultation history.
                  </p>
                  <Link href="/client/register">
                    <button className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-all text-sm">
                      Create Free Account
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Account Dashboard Notice (For logged in users) */}
          {order.isAuthenticated && isLoggedIn && (
            <div className="bg-violet-50 border border-violet-200 rounded-xl p-6 mb-8">
              <div className="flex items-start gap-4">
                <UserCheck className="w-6 h-6 text-violet-600 flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-2">View in Your Dashboard</h3>
                  <p className="text-gray-700 text-sm mb-3 leading-relaxed">
                    This order has been added to your account dashboard where you can track all your bookings and consultations.
                  </p>
                  <Link href="/client/dashboard">
                    <button className="px-5 py-2 bg-violet-600 text-white rounded-lg font-semibold hover:bg-violet-700 transition-all text-sm">
                      Go to Dashboard
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Confirmation sent notice */}
          <div className="bg-violet-50 border border-violet-200 rounded-xl p-6 mb-8">
            <div className="flex items-start gap-4">
              <Mail className="w-6 h-6 text-violet-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Confirmation Email Sent</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  We&apos;ve sent a confirmation email to <strong>{order.customerEmail}</strong> with all the details of your booking. 
                  Please check your inbox (and spam folder if you don&apos;t see it).
                </p>
              </div>
            </div>
          </div>

          {/* Order Details Card */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-lg mb-8">
            {/* Service Info */}
            <div className="p-8 border-b border-gray-200">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="inline-block px-3 py-1 bg-green-50 text-green-700 text-xs font-semibold rounded-full uppercase mb-3">
                    {order.serviceCategory}
                  </span>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {order.serviceName}
                  </h2>
                  {order.serviceDuration && (
                    <p className="text-gray-600 text-sm">
                      Duration: {order.serviceDuration}
                    </p>
                  )}
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-indigo-600">
                    {order.totalAmount} <span className="text-lg text-gray-600">AED</span>
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    {order.paymentStatus === 'completed' ? (
                      <span className="inline-flex items-center gap-1 text-green-600">
                        <CheckCircle className="w-4 h-4" />
                        Paid
                      </span>
                    ) : (
                      <span className="text-yellow-600">Payment Pending</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Booking Details */}
            <div className="p-8 bg-gray-50 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Booking Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Appointment Date</div>
                    <div className="font-semibold text-gray-900">{formattedDate}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Time</div>
                    <div className="font-semibold text-gray-900">{order.bookingTime}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="p-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Your Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-700">{order.customerName}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-700">{order.customerEmail}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-700">{order.customerPhone}</span>
                </div>
              </div>
            </div>

            {/* Meeting Link (if available) */}
            {order.meetingLink && (
              <div className="p-8 bg-indigo-50 border-t border-indigo-200">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <ArrowRight className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-2">Video Consultation Link</h3>
                    <p className="text-gray-700 text-sm mb-4">
                      Join your consultation at the scheduled time using the link below:
                    </p>
                    <a 
                      href={order.meetingLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-all"
                    >
                      Join Video Call
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* Notes */}
            {order.notes && (
              <div className="p-8 bg-gray-50 border-t border-gray-200">
                <div className="flex items-start gap-3">
                  <FileText className="w-5 h-5 text-gray-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Your Notes</h3>
                    <p className="text-gray-700 text-sm leading-relaxed">{order.notes}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <button 
              onClick={() => window.print()}
              className="flex items-center justify-center gap-2 px-6 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:border-indigo-300 hover:text-indigo-600 transition-all"
            >
              <Download className="w-5 h-5" />
              Download Confirmation
            </button>
            <button 
              onClick={() => {
                const url = window.location.href;
                if (navigator.share) {
                  navigator.share({
                    title: 'Order Confirmation',
                    text: `Order ${order.orderNumber} confirmed`,
                    url: url,
                  });
                } else {
                  navigator.clipboard.writeText(url);
                  alert('Link copied to clipboard!');
                }
              }}
              className="flex items-center justify-center gap-2 px-6 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:border-indigo-300 hover:text-indigo-600 transition-all"
            >
              <Share2 className="w-5 h-5" />
              Share Details
            </button>
          </div>

          {/* What's Next */}
          <div className="bg-white rounded-xl border border-gray-200 p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">What Happens Next?</h3>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">1</div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Check Your Email</h4>
                  <p className="text-gray-600 text-sm">You&apos;ll receive a confirmation email with all booking details and instructions.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">2</div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Prepare Your Documents</h4>
                  <p className="text-gray-600 text-sm">Gather any relevant documents you&apos;d like to discuss during the consultation.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">3</div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Receive Reminder</h4>
                  <p className="text-gray-600 text-sm">We&apos;ll send you a reminder 24 hours before your scheduled consultation.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">4</div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Join Your Consultation</h4>
                  <p className="text-gray-600 text-sm">At the scheduled time, click the video link to meet with your lawyer.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Support */}
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">Need to reschedule or have questions?</p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <a href="tel:+971564591060" className="text-indigo-600 hover:text-indigo-700 font-semibold">
                Call: (+971) 56-459-1060
              </a>
              <span className="text-gray-300">|</span>
              <a href="mailto:info@daralhaqqoq.com" className="text-indigo-600 hover:text-indigo-700 font-semibold">
                Email: info@daralhaqqoq.com
              </a>
            </div>
          </div>

          {/* Back to Services */}
          <div className="text-center mt-8">
            <Link href="/services">
              <button className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl">
                Browse More Services
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

// Loading component for Suspense fallback
function OrderSuccessLoading() {
  return (
    <>
      <PublicHeader />
      <div className="min-h-screen bg-gray-50 flex items-center justify-center pt-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your order details...</p>
        </div>
      </div>
    </>
  );
}

// Main component with Suspense boundary
export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<OrderSuccessLoading />}>
      <OrderSuccessContent />
    </Suspense>
  );
}