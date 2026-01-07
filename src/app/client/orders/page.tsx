"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import PublicHeader from "@/components/layout/PublicHeader";

const API_BASE_URL = process.env.NEXT_PUBLIC_CMS_API_URL || 'https://cms.ezlegalhire.com';

// API response interface matching CMS structure
interface ApiOrder {
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
  meetingLink: string | null;
  meeting_link?: string | null;
  notes: string | null;
  isAuthenticated: boolean;
  createdAt: string;
}

// Helper to get service name from various field names
const getApiServiceName = (order: ApiOrder): string => {
  return order.serviceName || order.service_name || order.service?.name || order.service?.title || 'Unknown Service';
};

// Transformed order for display
interface Order {
  id: string;
  orderNumber: string;
  serviceName: string;
  serviceCategory: string;
  date: string;
  time: string;
  amount: number;
  paymentStatus: "paid" | "pending" | "partial";
  status: "pending" | "confirmed" | "in_progress" | "completed" | "cancelled";
  currentStep: number;
  totalSteps: number;
  meetingLink?: string;
  documentsRequired?: boolean;
}

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  provider?: string;
}

const statusColors: Record<string, { bg: string; text: string }> = {
  pending: { bg: "bg-yellow-100", text: "text-yellow-800" },
  confirmed: { bg: "bg-blue-100", text: "text-blue-800" },
  in_progress: { bg: "bg-purple-100", text: "text-purple-800" },
  completed: { bg: "bg-green-100", text: "text-green-800" },
  cancelled: { bg: "bg-red-100", text: "text-red-800" },
};

const paymentColors: Record<string, { bg: string; text: string }> = {
  paid: { bg: "bg-green-100", text: "text-green-800" },
  pending: { bg: "bg-yellow-100", text: "text-yellow-800" },
  partial: { bg: "bg-orange-100", text: "text-orange-800" },
};

export default function ClientOrdersPage() {
  const router = useRouter();
  const [, setCurrentUser] = useState<UserData | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  useEffect(() => {
    const checkAuth = () => {
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("clientToken");
        const userData = localStorage.getItem("clientData");

        if (!token || !userData) {
          router.push("/client/login");
          return;
        }

        try {
          const parsedUser = JSON.parse(userData);
          setCurrentUser(parsedUser);
        } catch (e) {
          console.error("Error parsing user data:", e);
          router.push("/client/login");
        }
      }
    };

    checkAuth();
    fetchOrders();
  }, [router]);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("clientToken");
      const userData = localStorage.getItem("clientData");

      if (!token || !userData) {
        setOrders([]);
        return;
      }

      const parsedUser = JSON.parse(userData);
      const email = parsedUser.email;

      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      };

      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      // Fetch orders from CMS API using email query param
      const params = new URLSearchParams();
      params.append('email', email);
      params.append('limit', '50');

      const response = await fetch(
        `${API_BASE_URL}/api/public/orders?${params.toString()}`,
        { headers }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }

      const data = await response.json();
      console.log('API Response:', data);

      // Handle both array and single order responses
      let apiOrders: ApiOrder[] = [];
      if (Array.isArray(data.orders)) {
        apiOrders = data.orders;
      } else if (Array.isArray(data)) {
        apiOrders = data;
      } else if (data.order) {
        apiOrders = [data.order];
      }

      // Transform API orders to display format
      const transformedOrders: Order[] = apiOrders.map((apiOrder: ApiOrder) => {
        // Map payment status
        let paymentStatus: "paid" | "pending" | "partial" = "pending";
        if (apiOrder.paymentStatus === "completed" || apiOrder.paymentStatus === "paid") {
          paymentStatus = "paid";
        } else if (apiOrder.paymentStatus === "partial") {
          paymentStatus = "partial";
        }

        // Map order status
        let status: "pending" | "confirmed" | "in_progress" | "completed" | "cancelled" = "pending";
        const apiStatus = apiOrder.status?.toLowerCase();
        if (apiStatus === "confirmed") status = "confirmed";
        else if (apiStatus === "in_progress" || apiStatus === "processing") status = "in_progress";
        else if (apiStatus === "completed" || apiStatus === "done") status = "completed";
        else if (apiStatus === "cancelled" || apiStatus === "canceled") status = "cancelled";

        // Calculate progress steps based on status
        let currentStep = 0;
        const totalSteps = 4;
        if (status === "pending") currentStep = 0;
        else if (status === "confirmed") currentStep = 1;
        else if (status === "in_progress") currentStep = 2;
        else if (status === "completed") currentStep = 4;
        else if (status === "cancelled") currentStep = 0;

        return {
          id: String(apiOrder.id || ""),
          orderNumber: apiOrder.orderNumber || "",
          serviceName: getApiServiceName(apiOrder),
          serviceCategory: apiOrder.serviceCategory || "",
          date: apiOrder.bookingDate || "",
          time: apiOrder.bookingTime || "",
          amount: apiOrder.totalAmount || 0,
          paymentStatus,
          status,
          currentStep,
          totalSteps,
          meetingLink: apiOrder.meetingLink || apiOrder.meeting_link || undefined,
          documentsRequired: status === "in_progress" || status === "confirmed",
        };
      });

      setOrders(transformedOrders);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.serviceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "N/A";
      return date.toLocaleDateString("en-AE", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    } catch {
      return "N/A";
    }
  };

  const formatStatus = (status: string) => {
    return status
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  if (loading) {
    return (
      <>
        <PublicHeader />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center pt-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ba9659]"></div>
        </div>
      </>
    );
  }

  return (
    <>
      <PublicHeader />
      <div className="min-h-screen bg-gray-50 pt-20">
        {/* Page Title */}
        <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">My Orders</h1>
              <p className="text-gray-600 mt-1">
                Track and manage your service orders
              </p>
            </div>
            <Link
              href="/services"
              className="inline-flex items-center justify-center px-4 py-2 bg-[#ba9659] text-white rounded-lg hover:bg-[#a38550] transition-colors"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              New Order
            </Link>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Search by service name or order number..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ba9659] focus:border-transparent"
                />
              </div>
            </div>

            {/* Status Filters */}
            <div className="flex flex-wrap gap-2">
              {[
                { value: "all", label: "All" },
                { value: "pending", label: "Pending" },
                { value: "confirmed", label: "Confirmed" },
                { value: "in_progress", label: "In Progress" },
                { value: "completed", label: "Completed" },
                { value: "cancelled", label: "Cancelled" },
              ].map((filter) => (
                <button
                  key={filter.value}
                  onClick={() => setStatusFilter(filter.value)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    statusFilter === filter.value
                      ? "bg-[#ba9659] text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-10 h-10 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {searchQuery || statusFilter !== "all"
                ? "No orders found"
                : "No orders yet"}
            </h3>
            <p className="text-gray-600 mb-6">
              {searchQuery || statusFilter !== "all"
                ? "Try adjusting your search or filters"
                : "Start by exploring our legal services"}
            </p>
            {!searchQuery && statusFilter === "all" && (
              <Link
                href="/services"
                className="inline-flex items-center justify-center px-6 py-3 bg-[#ba9659] text-white rounded-lg hover:bg-[#a38550] transition-colors"
              >
                Browse Services
              </Link>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                    {/* Service Image */}
                    <div className="w-full lg:w-32 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      <div className="w-full h-full flex items-center justify-center">
                        <svg
                          className="w-12 h-12 text-gray-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                          />
                        </svg>
                      </div>
                    </div>

                    {/* Order Details */}
                    <div className="flex-1">
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {order.serviceName}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {order.orderNumber}
                          </p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              statusColors[order.status]?.bg || "bg-gray-100"
                            } ${statusColors[order.status]?.text || "text-gray-800"}`}
                          >
                            {formatStatus(order.status)}
                          </span>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              paymentColors[order.paymentStatus]?.bg || "bg-gray-100"
                            } ${paymentColors[order.paymentStatus]?.text || "text-gray-800"}`}
                          >
                            {order.paymentStatus === "paid"
                              ? "Paid"
                              : order.paymentStatus === "pending"
                              ? "Payment Pending"
                              : "Partially Paid"}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                        <div className="flex items-center gap-1">
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          <span>{formatDate(order.date)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          <span>{order.time || "N/A"}</span>
                        </div>
                        <div className="flex items-center gap-1 font-medium text-gray-900">
                          <span>AED {(order.amount || 0).toLocaleString()}</span>
                        </div>
                      </div>

                      {/* Progress Steps */}
                      <div className="mb-4">
                        <div className="flex items-center gap-1">
                          {Array.from({ length: order.totalSteps }).map(
                            (_, index) => (
                              <React.Fragment key={index}>
                                <div
                                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                                    index < order.currentStep
                                      ? "bg-green-500 text-white"
                                      : index === order.currentStep
                                      ? "bg-[#ba9659] text-white"
                                      : "bg-gray-200 text-gray-500"
                                  }`}
                                >
                                  {index < order.currentStep ? (
                                    <svg
                                      className="w-4 h-4"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M5 13l4 4L19 7"
                                      />
                                    </svg>
                                  ) : (
                                    index + 1
                                  )}
                                </div>
                                {index < order.totalSteps - 1 && (
                                  <div
                                    className={`flex-1 h-1 ${
                                      index < order.currentStep
                                        ? "bg-green-500"
                                        : "bg-gray-200"
                                    }`}
                                  />
                                )}
                              </React.Fragment>
                            )
                          )}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-wrap gap-2">
                        {order.meetingLink && (
                          <a
                            href={order.meetingLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                          >
                            <svg
                              className="w-4 h-4 mr-2"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                              />
                            </svg>
                            Join Google Meet
                          </a>
                        )}
                        {order.paymentStatus === "pending" && (
                          <button className="inline-flex items-center px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors">
                            <svg
                              className="w-4 h-4 mr-2"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                              />
                            </svg>
                            Pay Now
                          </button>
                        )}
                        {order.documentsRequired &&
                          order.status !== "completed" && (
                            <button className="inline-flex items-center px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 transition-colors">
                              <svg
                                className="w-4 h-4 mr-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                                />
                              </svg>
                              Upload Documents
                            </button>
                          )}
                        <Link
                          href={`/client/orders/${order.id}`}
                          className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          View Details
                          <svg
                            className="w-4 h-4 ml-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination placeholder */}
        {filteredOrders.length > 0 && (
          <div className="mt-8 flex justify-center">
            <nav className="flex items-center gap-2">
              <button
                disabled
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-400 cursor-not-allowed"
              >
                Previous
              </button>
              <button className="px-4 py-2 bg-[#ba9659] text-white rounded-lg">
                1
              </button>
              <button
                disabled
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-400 cursor-not-allowed"
              >
                Next
              </button>
            </nav>
          </div>
        )}
      </div>
    </div>
    </>
  );
}
