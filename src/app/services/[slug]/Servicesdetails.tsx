// src/app/services/[slug]/page.tsx
"use client";

import PublicHeader from "@/components/layout/PublicHeader";
import { Service } from "@/types/service";
import {
  ArrowLeft,
  Calendar,
  Check,
  Clock,
  CreditCard,
  FileText,
  Mail,
  Phone,
  Shield,
  Star,
  User,
  UserCheck,
  Video,
} from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import TabView from "../TabsView";
import { log } from "console";
import ConformationModal from "./ConformationModal";
import OTPVerificationModal from "./OTPVerificationModal";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_CMS_API_URL || "https://cms.ezlegalhire.com";

interface BookingPayload {
  serviceId: number;
  bookingDate: string;
  bookingTime: string;
  notes: string | null;
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  clientId?: number;
}

export default function ServiceDetailPage({ serviceSlug, serviceData }: any) {
  const params = useParams();
  const router = useRouter();
  //   const serviceSlug = params.slug as string;

  //   console.log(serviceData);

  const [service, setService] = useState<Service | null>(null);
  const [relatedServices, setRelatedServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [activeTab, setActiveTab] = useState("description");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [isBooking, setIsBooking] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<{
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
  } | null>(null);

  // Guest user info (only used if not logged in)
  const [guestInfo, setGuestInfo] = useState({
    name: "",
    email: "",
    phone: "",
    notes: "",
  });

  // Check authentication status
  useEffect(() => {
    const checkAuth = () => {
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("clientToken");
        const userData = localStorage.getItem("clientData");

        if (token && userData) {
          setIsLoggedIn(true);
          try {
            const user = JSON.parse(userData);
            setCurrentUser(user);
          } catch (e) {
            console.error("Error parsing user data:", e);
          }
        }
      }
    };

    checkAuth();
  }, []);

  useEffect(() => {
    const fetchServiceData = async () => {
      try {
        setLoading(true);
        setError(null);

        const serviceResponse = await fetch(
          `${API_BASE_URL}/api/public/services?slug=${serviceSlug}`
        );

        if (!serviceResponse.ok) {
          throw new Error("Service not found");
        }

        const serviceData = await serviceResponse.json();
        setService(serviceData);

        if (serviceData.category_slug) {
          const relatedResponse = await fetch(
            `${API_BASE_URL}/api/public/services?category=${serviceData.category_slug}`
          );

          if (relatedResponse.ok) {
            const relatedData = await relatedResponse.json();
            const filtered = relatedData.services
              .filter((s: Service) => s.slug !== serviceSlug)
              .slice(0, 3);
            setRelatedServices(filtered);
          }
        }
      } catch (err) {
        console.error("Error fetching service:", err);
        setError(err instanceof Error ? err.message : "Failed to load service");
      } finally {
        setLoading(false);
      }
    };

    if (serviceSlug) {
      fetchServiceData();
    }
  }, [serviceSlug]);

  // BOOKING HANDLER
  const handleBooking = async () => {
    // Basic validation
    if (!selectedDate || !selectedTime) {
      alert("Please select both date and time for your appointment");
      return;
    }

    if (!service) return;

    // For guest users, validate required fields
    if (!isLoggedIn) {
      if (!guestInfo.name || guestInfo.name.trim().length < 2) {
        alert("Please enter your full name (at least 2 characters)");
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!guestInfo.email || !emailRegex.test(guestInfo.email)) {
        alert("Please enter a valid email address");
        return;
      }

      if (!guestInfo.phone || guestInfo.phone.trim().length < 8) {
        alert("Please enter a valid phone number");
        return;
      }
    }

    // Check if logged-in user has phone
    if (isLoggedIn && currentUser && !currentUser.phone) {
      alert("Please update your phone number in your profile before booking");
      router.push("/client/profile");
      return;
    }

    setIsBooking(true);

    try {
      // Step 1: Prepare booking data
      const bookingPayload: BookingPayload = {
        serviceId: service.id,
        bookingDate: selectedDate,
        bookingTime: selectedTime,
        notes: guestInfo.notes || null,
      };

      // Include customer info for both guest and logged-in users
      if (!isLoggedIn) {
        bookingPayload.customerName = guestInfo.name.trim();
        bookingPayload.customerEmail = guestInfo.email.trim().toLowerCase();
        bookingPayload.customerPhone = guestInfo.phone.trim();
      } else if (currentUser) {
        bookingPayload.customerName = `${currentUser.firstName} ${currentUser.lastName}`;
        bookingPayload.customerEmail = currentUser.email.toLowerCase();
        bookingPayload.customerPhone = currentUser.phone || "";
        bookingPayload.clientId = currentUser.id;
      }

      // Get token if user is logged in
      const token = isLoggedIn ? localStorage.getItem("clientToken") : null;

      const headers: HeadersInit = {
        "Content-Type": "application/json",
      };

      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      // Step 2: Create order in CMS backend
      console.log("Creating order...");
      const orderResponse = await fetch(`${API_BASE_URL}/api/public/orders`, {
        method: "POST",
        headers,
        body: JSON.stringify(bookingPayload),
      });

      const orderData = await orderResponse.json();

      if (!orderResponse.ok) {
        throw new Error(
          orderData.error || orderData.message || "Failed to create order"
        );
      }

      if (!orderData.success || !orderData.order) {
        throw new Error("Order creation failed");
      }

      const order = orderData.order;
      console.log("Order created:", order.orderNumber);

      // Step 3: Create MamoPay payment link using CMS BACKEND API
      console.log("Creating MamoPay payment link...");

      const cmsBackendUrl = API_BASE_URL;

      const paymentRequest = {
        amount: service.price,
        currency: "AED",
        title:
          service.name.length > 47
            ? service.name.substring(0, 47) + "..."
            : service.name,
        description: `Legal consultation: ${service.name}`,
        return_url: `${cmsBackendUrl}/api/payment/verify`,
        failure_return_url: `${cmsBackendUrl}/api/payment/verify`,
        customer_email: bookingPayload.customerEmail,
        customer_phone: bookingPayload.customerPhone,
        customer_name: bookingPayload.customerName,
        send_customer_receipt: true,
        enable_tabby: false,
        metadata: {
          orderNumber: order.orderNumber,
          serviceId: service.id.toString(),
        },
      };

      const mamoResponse = await fetch(`${API_BASE_URL}/api/payment/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderNumber: order.orderNumber,
          paymentRequest: paymentRequest,
        }),
      });

      const contentType = mamoResponse.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        console.error("Payment API returned non-JSON response");
        const text = await mamoResponse.text();
        console.error("Response body:", text);
        throw new Error(
          "Payment gateway returned invalid response. Please try again or contact support."
        );
      }

      const mamoData = await mamoResponse.json();
      console.log("MamoPay response:", mamoData);

      if (!mamoResponse.ok || !mamoData.success) {
        throw new Error(
          mamoData.error || mamoData.message || "Failed to create payment link"
        );
      }

      if (!mamoData.payment_url) {
        throw new Error("No payment URL returned from payment gateway");
      }

      console.log("Redirecting to MamoPay payment page...");

      if (!isLoggedIn) {
        localStorage.setItem(
          "pendingOrder",
          JSON.stringify({
            orderNumber: order.orderNumber,
            email: bookingPayload.customerEmail,
            timestamp: new Date().toISOString(),
          })
        );
      }

      window.location.href = mamoData.payment_url;
    } catch (error) {
      console.error("Booking error:", error);

      let errorMessage =
        "An error occurred while processing your booking. Please try again.";

      if (error instanceof Error) {
        errorMessage = error.message;
      }

      if (errorMessage.includes("Failed to fetch")) {
        errorMessage =
          "Unable to connect to the server. Please check your internet connection and try again.";
      }

      alert(errorMessage);
      setIsBooking(false);
    }
  };

  const timeSlots = [
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
    "05:00 PM",
  ];

  const features = [
    { icon: Video, text: "Secure video consultation" },
    { icon: Shield, text: "Verified UAE lawyer" },
    { icon: FileText, text: "Document sharing enabled" },
    { icon: Clock, text: "Flexible scheduling" },
  ];

  const [isOpen, setIsOpen] = useState(false);
  // 2. State for checkbox agreement
  const [agreed, setAgreed] = useState(false);
  // OTP verification state
  const [isOTPModalOpen, setIsOTPModalOpen] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (agreed) {
      // In a real application, you would handle form submission logic here.
      handleBooking();
      setIsOpen(false); // Close modal on success
    }
  };

  // Handle the Confirm & Pay button click
  const handleConfirmClick = () => {
    // For guest users who haven't verified email yet, show OTP modal
    if (!isLoggedIn && !isEmailVerified) {
      setIsOTPModalOpen(true);
    } else {
      // For logged-in users or verified guests, go directly to confirmation modal
      setIsOpen(true);
    }
  };

  // Handle successful OTP verification
  const handleOTPVerified = () => {
    setIsEmailVerified(true);
    setIsOTPModalOpen(false);
    // After OTP verification, open the confirmation modal
    setIsOpen(true);
  };

  if (loading) {
    return (
      <>
        <PublicHeader />
        <div className="min-h-screen bg-slate-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p className="text-slate-600">Loading service details...</p>
          </div>
        </div>
      </>
    );
  }

  if (error || !service) {
    return (
      <>
        <PublicHeader />
        <div className="min-h-screen bg-slate-50 flex items-center justify-center">
          <div className="text-center">
            <div className="text-red-600 mb-4">
              <svg
                className="w-16 h-16 mx-auto"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-4">
              Service Not Found
            </h1>
            <p className="text-slate-600 mb-8">
              {error || "The service you're looking for doesn't exist."}
            </p>
            <Link href="/services">
              <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-violet-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all">
                Browse All Services
              </button>
            </Link>
          </div>
        </div>
      </>
    );
  }

  const faqs = service.metadata?.faqs || [];
  const whatsIncluded = service.metadata?.whatsIncluded || [];
  const howItWorks = service.metadata?.howItWorks || [];

  const isFormComplete =
    selectedDate &&
    selectedTime &&
    (isLoggedIn || (guestInfo.name && guestInfo.email && guestInfo.phone));

  return (
    <>
      <PublicHeader />
      <div className="min-h-screen bg-slate-50 pt-16">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-slate-200">
          <div className="max-w-[1400px] mx-auto px-6 py-3">
            <div className="flex items-center gap-2 text-sm">
              <Link
                href="/home"
                className="text-slate-600 hover:text-purple-600 transition-colors"
              >
                Home
              </Link>
              <span className="text-slate-400">/</span>
              <Link
                href="/services"
                className="text-slate-600 hover:text-purple-600 transition-colors"
              >
                Services
              </Link>
              <span className="text-slate-400">/</span>
              <span className="text-slate-900 font-medium">
                {service.category_name}
              </span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-[1400px] mx-auto px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Service Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Header */}
              <div>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 mb-4 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span className="font-medium">Back to Services</span>
                </Link>

                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="inline-block px-3 py-1 bg-purple-50 text-purple-700 text-xs font-semibold rounded-full uppercase border border-purple-200">
                        {service.category_name}
                      </span>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                      {service.name}
                    </h1>
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 text-yellow-500 fill-yellow-500"
                      />
                    ))}
                  </div>
                  {/* <span className="text-slate-600">4.9 (127 reviews)</span> */}
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  <div className="text-4xl font-bold text-purple-600">
                    {service.price}{" "}
                    <span className="text-2xl text-slate-600">AED</span>
                  </div>
                  {service.duration && (
                    <div className="flex items-center gap-2 px-4 py-2 bg-violet-50 text-violet-700 rounded-lg border border-violet-200">
                      <Clock className="w-5 h-5" />
                      <span className="font-medium">{service.duration}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Tabs */}
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                <div className="border-b border-slate-200">
                  <div className="flex overflow-x-auto">
                    <button
                      onClick={() => setActiveTab("description")}
                      className={`px-6 py-4 font-medium text-sm transition-colors whitespace-nowrap ${
                        activeTab === "description"
                          ? "text-purple-600 border-b-2 border-purple-600"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      Description
                    </button>
                    <button
                      onClick={() => setActiveTab("how-it-works")}
                      className={`px-6 py-4 font-medium text-sm transition-colors whitespace-nowrap ${
                        activeTab === "how-it-works"
                          ? "text-purple-600 border-b-2 border-purple-600"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      How It Works
                    </button>
                    <button
                      onClick={() => setActiveTab("faq")}
                      className={`px-6 py-4 font-medium text-sm transition-colors whitespace-nowrap ${
                        activeTab === "faq"
                          ? "text-purple-600 border-b-2 border-purple-600"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      FAQ
                    </button>
                    <button
                      onClick={() => setActiveTab("terms")}
                      className={`px-6 py-4 font-medium text-sm transition-colors whitespace-nowrap ${
                        activeTab === "terms"
                          ? "text-purple-600 border-b-2 border-purple-600"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      Terms & Policy
                    </button>
                  </div>
                </div>

                <div className="p-8">
                  {/* Description Tab */}

                  <TabView
                    activeTab={activeTab}
                    howItWorks={howItWorks}
                    faqs={faqs}
                    service={service}
                    setExpandedFaq={setExpandedFaq}
                    expandedFaq={expandedFaq}
                    features={features}
                    whatsIncluded={whatsIncluded}
                  />
                </div>
              </div>
            </div>

            {/* Right Column - Booking Card */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl border border-slate-200 p-6 sticky top-20 shadow-lg">
                <h3 className="text-xl font-bold text-slate-900 mb-6">
                  Book This Service
                </h3>

                {/* Customer Information Form */}
                <div className="mb-6 space-y-4">
                  {isLoggedIn && currentUser ? (
                    <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                      <div className="flex items-center gap-2 text-green-800 mb-1">
                        <UserCheck className="w-5 h-5" />
                        <span className="font-semibold">
                          Booking as {currentUser.firstName}{" "}
                          {currentUser.lastName}
                        </span>
                      </div>
                      <p className="text-sm text-green-700 mt-1">
                        {currentUser.email}
                      </p>
                      {currentUser.phone && (
                        <p className="text-sm text-green-700">
                          {currentUser.phone}
                        </p>
                      )}
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-slate-900 text-sm">
                          Your Information
                        </h4>
                        <Link
                          href="/client/login"
                          className="text-xs text-purple-600 hover:text-purple-700 font-medium"
                        >
                          Have an account? Login
                        </Link>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                          <User className="w-4 h-4" />
                          Full Name *
                        </label>
                        <input
                          type="text"
                          placeholder="John Doe"
                          value={guestInfo.name}
                          onChange={(e) =>
                            setGuestInfo({ ...guestInfo, name: e.target.value })
                          }
                          className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-600 outline-none transition-all"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                          <Mail className="w-4 h-4" />
                          Email Address *
                          {isEmailVerified && (
                            <span className="text-green-600 text-xs font-semibold flex items-center gap-1">
                              <Check className="w-3 h-3" /> Verified
                            </span>
                          )}
                        </label>
                        <input
                          type="email"
                          placeholder="john@example.com"
                          value={guestInfo.email}
                          onChange={(e) => {
                            setGuestInfo({
                              ...guestInfo,
                              email: e.target.value,
                            });
                            // Reset verification if email changes
                            if (isEmailVerified) {
                              setIsEmailVerified(false);
                            }
                          }}
                          className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-600 outline-none transition-all ${
                            isEmailVerified
                              ? "border-green-300 bg-green-50"
                              : "border-slate-200"
                          }`}
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                          <Phone className="w-4 h-4" />
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          placeholder="+971 50 123 4567"
                          value={guestInfo.phone}
                          onChange={(e) =>
                            setGuestInfo({
                              ...guestInfo,
                              phone: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-600 outline-none transition-all"
                          required
                        />
                      </div>
                    </>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      Additional Notes (Optional)
                    </label>
                    <textarea
                      placeholder="Any specific details about your case..."
                      value={guestInfo.notes}
                      onChange={(e) =>
                        setGuestInfo({ ...guestInfo, notes: e.target.value })
                      }
                      rows={3}
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-600 resize-none outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Date Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Select Date
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-600 outline-none transition-all"
                  />
                </div>

                {/* Time Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Select Time
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`py-2 px-3 rounded-xl text-sm font-medium transition-all ${
                          selectedTime === time
                            ? "bg-gradient-to-r from-purple-600 to-violet-600 text-white shadow-md"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Summary */}
                <div className="border-t border-slate-200 pt-4 mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-slate-600">Service Fee</span>
                    <span className="font-semibold text-slate-900">
                      {service.price} AED
                    </span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-slate-600">Platform Fee</span>
                    <span className="font-semibold text-slate-900">0 AED</span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-slate-200">
                    <span className="font-semibold text-slate-900">Total</span>
                    <span className="text-2xl font-bold text-purple-600">
                      {service.price} AED
                    </span>
                  </div>
                </div>

                {/* Book Button */}
                <button
                  onClick={handleConfirmClick}
                  disabled={!isFormComplete || isBooking}
                  className={`w-full py-4 rounded-xl font-semibold text-white transition-all ${
                    isFormComplete && !isBooking
                      ? "bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 shadow-lg hover:shadow-xl transform hover:scale-105"
                      : "bg-slate-300 cursor-not-allowed"
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    {isBooking ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        Processing Booking...
                      </>
                    ) : (
                      <>
                        <CreditCard className="w-5 h-5" />
                        {isFormComplete
                          ? "Confirm & Pay"
                          : "Complete All Fields"}
                      </>
                    )}
                  </div>
                </button>

                {!isLoggedIn && (
                  <p className="text-center text-xs text-slate-600 mt-4">
                    Want faster checkout next time?{" "}
                    <Link
                      href="/client/register"
                      className="text-purple-600 hover:text-purple-700 font-semibold"
                    >
                      Create a free account
                    </Link>
                  </p>
                )}

                {/* Trust Badges */}
                <div className="mt-6 pt-6 border-t border-slate-200 space-y-3">
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <span>Secure payment processing</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <span>100% confidential service</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <span>Licensed UAE lawyers</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <span>Instant confirmation</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Related Services Section */}
          {relatedServices.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                You May Also Like
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedServices.map((relatedService) => (
                  <Link
                    key={relatedService.id}
                    href={`/services/${relatedService.slug}`}
                  >
                    <div className="bg-white rounded-2xl p-6 border border-slate-200 hover:shadow-lg transition-all group cursor-pointer h-full">
                      <span className="inline-block px-3 py-1 bg-purple-50 text-purple-700 text-xs font-semibold rounded-full uppercase mb-3 border border-purple-200">
                        {relatedService.category_name}
                      </span>
                      <h3 className="font-semibold text-slate-900 mb-2 group-hover:text-purple-600 transition-colors line-clamp-2">
                        {relatedService.name}
                      </h3>
                      <p className="text-sm text-slate-600 mb-4 line-clamp-2">
                        {relatedService.description ||
                          "Professional legal consultation service"}
                      </p>
                      <div className="flex items-center justify-between mt-auto">
                        <div className="text-2xl font-bold text-slate-900">
                          {relatedService.price}{" "}
                          <span className="text-sm font-normal text-slate-500">
                            AED
                          </span>
                        </div>
                        {relatedService.duration && (
                          <div className="flex items-center gap-1 text-sm text-slate-600">
                            <Clock className="w-4 h-4" />
                            {relatedService.duration}
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        <ConformationModal
          isOpen={isOpen}
          handleSubmit={handleSubmit}
          setIsOpen={setIsOpen}
          agreed={agreed}
          setAgreed={setAgreed}
        />

        {/* OTP Verification Modal */}
        <OTPVerificationModal
          isOpen={isOTPModalOpen}
          email={guestInfo.email}
          name={guestInfo.name}
          onClose={() => setIsOTPModalOpen(false)}
          onVerified={handleOTPVerified}
        />
      </div>
    </>
  );
}
