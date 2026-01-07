"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import PublicHeader from "@/components/layout/PublicHeader";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Mail,
  Phone,
  User,
  FileText,
  CheckCircle,
  CreditCard,
  ExternalLink,
  Upload,
  Download,
  AlertCircle,
  Loader2,
} from "lucide-react";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_CMS_API_URL || "https://cms.ezlegalhire.com";

interface Order {
  id: number;
  orderNumber: string;
  serviceName?: string;
  service_name?: string;
  service?: { name?: string; title?: string };
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
  meetingLink?: string | null;
  meeting_link?: string | null;
  notes: string | null;
  isAuthenticated: boolean;
  createdAt: string;
}

// Helper to get service name from various field names
const getServiceName = (order: Order): string => {
  return order.serviceName || order.service_name || order.service?.name || order.service?.title || 'Unknown Service';
};

// Helper to get meeting link from various field names
const getMeetingLink = (order: Order): string | null => {
  return order.meetingLink || order.meeting_link || null;
};

interface ClientData {
  id: number | string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
}

const steps = [
  { number: 1, label: "Order Created" },
  { number: 2, label: "Payment Confirmed" },
  { number: 3, label: "First Interaction" },
  { number: 4, label: "Consultation Done" },
  { number: 5, label: "Completed" },
];

export default function OrderDetailPage() {
  const router = useRouter();
  const params = useParams();
  const orderId = params.id as string;

  const [order, setOrder] = useState<Order | null>(null);
  const [clientData, setClientData] = useState<ClientData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [processingPayment, setProcessingPayment] = useState(false);

  useEffect(() => {
    const checkAuthAndFetchOrder = async () => {
      const token = localStorage.getItem("clientToken");
      const userData = localStorage.getItem("clientData");

      if (!token || !userData) {
        router.push("/client/login");
        return;
      }

      try {
        const parsedUser = JSON.parse(userData);
        setClientData(parsedUser);

        const headers: HeadersInit = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };

        // Try to fetch single order first, then fall back to list
        let response = await fetch(
          `${API_BASE_URL}/api/public/orders/${orderId}`,
          { headers }
        );

        // If single order endpoint fails, try list endpoint
        if (!response.ok) {
          response = await fetch(
            `${API_BASE_URL}/api/public/orders?id=${orderId}&email=${encodeURIComponent(parsedUser.email)}`,
            { headers }
          );
        }

        if (!response.ok) {
          throw new Error("Order not found");
        }

        const data = await response.json();
        console.log("Order detail API response:", data);

        // Handle different response formats
        let foundOrder = null;
        if (data.order) {
          foundOrder = data.order;
        } else if (Array.isArray(data.orders) && data.orders.length > 0) {
          // Find order by ID in the array
          foundOrder = data.orders.find(
            (o: Order) => String(o.id) === orderId || o.orderNumber === orderId
          );
        } else if (Array.isArray(data) && data.length > 0) {
          foundOrder = data.find(
            (o: Order) => String(o.id) === orderId || o.orderNumber === orderId
          );
        }

        if (foundOrder) {
          console.log("Found order:", foundOrder);
          console.log("Meeting link (camelCase):", foundOrder.meetingLink);
          console.log("Meeting link (snake_case):", foundOrder.meeting_link);
          setOrder(foundOrder);
        } else {
          throw new Error("Order not found");
        }
      } catch (err) {
        console.error("Error fetching order:", err);
        setError(err instanceof Error ? err.message : "Failed to load order");
      } finally {
        setLoading(false);
      }
    };

    if (orderId) {
      checkAuthAndFetchOrder();
    }
  }, [orderId, router]);

  const getCurrentStep = (order: Order): number => {
    if (order.status === "completed") return 5;
    if (order.status === "confirmed") return 3;
    if (order.paymentStatus === "completed") return 2;
    if (order.status === "pending") return 1;
    return 1;
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "confirmed":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return "text-green-600";
      case "failed":
        return "text-red-600";
      default:
        return "text-amber-600";
    }
  };

  const getPaymentStatusText = (status: string) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return "Paid";
      case "failed":
        return "Payment Failed";
      default:
        return "Payment Pending";
    }
  };

  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "N/A";
      return date.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return "N/A";
    }
  };

  const handleCompletePayment = async () => {
    if (!order || !clientData) return;

    try {
      setProcessingPayment(true);

      if (!clientData.phone) {
        alert("Please update your phone number in your profile before making a payment");
        router.push("/client/profile");
        return;
      }

      const paymentRequest = {
        orderNumber: order.orderNumber,
        paymentRequest: {
          title: getServiceName(order).length > 47 ? getServiceName(order).substring(0, 47) + "..." : getServiceName(order),
          amount: order.totalAmount,
          currency: "AED",
          customer_name: `${clientData.firstName} ${clientData.lastName}`,
          customer_email: clientData.email,
          customer_phone: clientData.phone,
          return_url: `${API_BASE_URL}/api/payment/verify`,
          failure_return_url: `${API_BASE_URL}/api/payment/verify`,
          send_customer_receipt: true,
          enable_tabby: false,
          metadata: {
            orderNumber: order.orderNumber,
            serviceId: order.id.toString(),
          },
        },
      };

      const response = await fetch(`${API_BASE_URL}/api/payment/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentRequest),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || errorData.message || "Failed to create payment link");
      }

      const data = await response.json();

      if (data.success && data.payment_url) {
        window.location.href = data.payment_url;
      } else {
        alert(data.error || "Failed to create payment link. Please try again.");
      }
    } catch (error) {
      console.error("Payment error:", error);
      const errorMessage = error instanceof Error ? error.message : "An error occurred";
      alert(errorMessage + "\n\nPlease try again or contact support.");
    } finally {
      setProcessingPayment(false);
    }
  };

  if (loading) {
    return (
      <>
        <PublicHeader />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center pt-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ba9659] mx-auto mb-4"></div>
            <p className="text-gray-600">Loading order details...</p>
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
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Order Not Found</h1>
            <p className="text-gray-600 mb-8">{error || "The order you're looking for doesn't exist."}</p>
            <Link href="/client/orders">
              <button className="px-6 py-3 bg-[#ba9659] text-white rounded-lg font-semibold hover:bg-[#a38550] transition-colors">
                Back to Orders
              </button>
            </Link>
          </div>
        </div>
      </>
    );
  }

  const currentStep = getCurrentStep(order);

  return (
    <>
      <PublicHeader />
      <div className="min-h-screen bg-gray-50 pt-20 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Back Button */}
          <Link
            href="/client/orders"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Orders
          </Link>

          {/* Order Header */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6">
            <div className="p-6 border-b border-gray-200">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-2xl font-bold text-gray-900">
                      {getServiceName(order)}
                    </h1>
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full border ${getStatusColor(order.status)}`}
                    >
                      {order.status?.charAt(0).toUpperCase() + order.status?.slice(1) || "Pending"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <FileText className="w-4 h-4" />
                    <span className="font-medium">{order.orderNumber || "N/A"}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-gray-900">
                    {order.totalAmount || 0} <span className="text-lg text-gray-500">AED</span>
                  </p>
                  <p className={`text-sm font-medium ${getPaymentStatusColor(order.paymentStatus)}`}>
                    {getPaymentStatusText(order.paymentStatus)}
                  </p>
                </div>
              </div>
            </div>

            {/* Progress Steps */}
            <div className="p-6 bg-gray-50">
              <h3 className="text-sm font-semibold text-gray-700 mb-4">Order Progress</h3>
              <div className="relative">
                <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-200">
                  <div
                    className="h-full bg-[#ba9659] transition-all duration-500"
                    style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
                  />
                </div>
                <div className="grid grid-cols-5 gap-1">
                  {steps.map((step) => (
                    <div key={step.number} className="flex flex-col items-center relative z-10">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm mb-2 transition-colors ${
                          step.number <= currentStep
                            ? "bg-[#ba9659] text-white"
                            : "bg-gray-200 text-gray-500"
                        }`}
                      >
                        {step.number < currentStep ? (
                          <CheckCircle className="w-4 h-4" />
                        ) : (
                          step.number
                        )}
                      </div>
                      <span className="text-xs text-gray-600 text-center hidden sm:block">
                        {step.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Booking Details */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Booking Details</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-[#ba9659]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-5 h-5 text-[#ba9659]" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Appointment Date</p>
                      <p className="font-semibold text-gray-900">{formatDate(order.bookingDate)}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-[#ba9659]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-[#ba9659]" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Time</p>
                      <p className="font-semibold text-gray-900">{order.bookingTime || "N/A"}</p>
                    </div>
                  </div>
                </div>

                {order.serviceDuration && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Duration:</span> {order.serviceDuration}
                    </p>
                  </div>
                )}

                {order.notes && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-start gap-2 text-sm bg-amber-50 border border-amber-100 rounded-lg p-3">
                      <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-amber-800">Notes</p>
                        <p className="text-amber-700">{order.notes}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Google Meet Link Section */}
              {getMeetingLink(order) && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <ExternalLink className="w-5 h-5 text-[#ba9659]" />
                    Meeting Link
                  </h2>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-blue-900 mb-2">
                          Your Google Meet link is ready!
                        </p>
                        <p className="text-xs text-blue-700 mb-3">
                          Click the button below to join your scheduled consultation.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3">
                          <a
                            href={getMeetingLink(order) || ''}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                          >
                            <ExternalLink className="w-4 h-4" />
                            Join Google Meet
                          </a>
                          <button
                            onClick={() => {
                              const link = getMeetingLink(order);
                              if (link) {
                                navigator.clipboard.writeText(link);
                                alert('Meeting link copied to clipboard!');
                              }
                            }}
                            className="inline-flex items-center justify-center gap-2 px-4 py-2 border border-blue-300 text-blue-700 text-sm font-medium rounded-lg hover:bg-blue-100 transition-colors"
                          >
                            Copy Link
                          </button>
                        </div>
                        <p className="text-xs text-blue-600 mt-3 break-all">
                          {getMeetingLink(order)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Contact Information */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h2>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <User className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-700">{order.customerName || "N/A"}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-700">{order.customerEmail || "N/A"}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-700">{order.customerPhone || "N/A"}</span>
                  </div>
                </div>
              </div>

              {/* Payment Summary */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Payment Summary</h2>
                <div className="space-y-3">
                  <div className="flex justify-between text-gray-600">
                    <span>Service Price</span>
                    <span>AED {(order.servicePrice || 0).toLocaleString()}</span>
                  </div>
                  {order.platformFee > 0 && (
                    <div className="flex justify-between text-gray-600">
                      <span>Platform Fee</span>
                      <span>AED {order.platformFee.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-bold text-gray-900 pt-3 border-t border-gray-200">
                    <span>Total</span>
                    <span>AED {(order.totalAmount || 0).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Actions Card */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Actions</h2>
                <div className="space-y-3">
                  {getMeetingLink(order) && (
                    <a
                      href={getMeetingLink(order) || ''}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Join Google Meet
                    </a>
                  )}

                  {order.paymentStatus !== "completed" && (
                    <button
                      onClick={handleCompletePayment}
                      disabled={processingPayment}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
                    >
                      {processingPayment ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <CreditCard className="w-4 h-4" />
                          Pay Now
                        </>
                      )}
                    </button>
                  )}

                  <button className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                    <Upload className="w-4 h-4" />
                    Upload Documents
                  </button>

                  <button
                    onClick={() => window.print()}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                  >
                    <Download className="w-4 h-4" />
                    Download Receipt
                  </button>
                </div>
              </div>

              {/* Need Help Card */}
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-200 p-6">
                <h3 className="font-semibold text-amber-900 mb-2">Need Help?</h3>
                <p className="text-sm text-amber-700 mb-4">
                  Have questions about your order? Our support team is here to help.
                </p>
                <div className="space-y-2 text-sm">
                  <a
                    href="tel:+971564591060"
                    className="flex items-center gap-2 text-amber-800 hover:text-amber-900"
                  >
                    <Phone className="w-4 h-4" />
                    (+971) 56-459-1060
                  </a>
                  <a
                    href="mailto:info@ezlegalhire.com"
                    className="flex items-center gap-2 text-amber-800 hover:text-amber-900"
                  >
                    <Mail className="w-4 h-4" />
                    info@ezlegalhire.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
