//src/app/client/dashboard/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import PublicHeader from '@/components/layout/PublicHeader';
import DocumentUpload from '@/components/client/DocumentUpload';
import OrderDetailsModal from '@/components/client/OrderDetailsModal';
import {
  Clock,
  Upload,
  Calendar,
  FileText,
  CheckCircle,
  CreditCard,
  ExternalLink,
  Eye,
  AlertCircle,
  Loader2,
  Download,
  Folder,
  Scale,
  Settings,
  Mail,
  Phone,
  Briefcase,
  ArrowRight
} from 'lucide-react';

const API_BASE_URL = process.env.NEXT_PUBLIC_CMS_API_URL || 'https://cms.ezlegalhire.com';

interface Order {
  id: number;
  orderNumber: string;
  serviceName?: string;
  service_name?: string;
  service?: { name?: string; title?: string };
  serviceCategory: string;
  bookingDate: string;
  bookingTime: string;
  totalAmount: number;
  status: string;
  paymentStatus: string;
  paymentMethod: string | null;
  meetingLink?: string | null;
  meeting_link?: string | null;
  notes: string | null;
  createdAt: string;
}

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
  isVerified: boolean;
  createdAt?: string;
  provider?: string;
  avatarUrl?: string;
}

interface Document {
  id: number;
  filename: string;
  fileType: string;
  fileSize: number;
  documentType: string;
  description: string | null;
  fileUrl: string;
  uploadedAt: string;
}

export default function ClientDashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [processingPayment, setProcessingPayment] = useState<number | null>(null);
  const [clientData, setClientData] = useState<ClientData | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedOrderForUpload, setSelectedOrderForUpload] = useState<{ id: number; orderNumber: string } | null>(null);
  const [selectedOrderForDetails, setSelectedOrderForDetails] = useState<Order | null>(null);

  const steps = [
    { number: 1, label: 'Order Created' },
    { number: 2, label: 'Payment Confirmed' },
    { number: 3, label: 'First Interaction with Lawyer' },
    { number: 4, label: 'Legal Consultation Done' },
    { number: 5, label: 'Order Completed' },
  ];

  useEffect(() => {
    checkAuthAndLoadData();
  }, []);

  const checkAuthAndLoadData = async () => {
    const token = localStorage.getItem('clientToken');
    const storedData = localStorage.getItem('clientData');

    if (!token) {
      router.push('/client/login');
      return;
    }

    // Load from localStorage first for immediate display
    if (storedData) {
      try {
        const parsed = JSON.parse(storedData);
        setClientData(parsed);
      } catch (e) {
        console.error('Error parsing stored data:', e);
      }
    }

    try {
      const profileResponse = await fetch(`${API_BASE_URL}/api/public/client/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (profileResponse.ok) {
        const profileData = await profileResponse.json();
        if (profileData.client) {
          const mergedData = { ...clientData, ...profileData.client };
          setClientData(mergedData);
        }
      }

      // Fetch orders using email query param
      const storedClientData = localStorage.getItem('clientData');
      let clientEmail = '';
      if (storedClientData) {
        try {
          const parsed = JSON.parse(storedClientData);
          clientEmail = parsed.email || '';
        } catch (e) {
          console.error('Error parsing client data for email:', e);
        }
      }

      if (clientEmail) {
        const ordersParams = new URLSearchParams();
        ordersParams.append('email', clientEmail);
        ordersParams.append('limit', '10');

        const ordersResponse = await fetch(`${API_BASE_URL}/api/public/orders?${ordersParams.toString()}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (ordersResponse.ok) {
          const ordersData = await ordersResponse.json();
          console.log('Dashboard orders API response:', ordersData);

          // Handle both array and single order responses
          let ordersList: Order[] = [];
          if (Array.isArray(ordersData.orders)) {
            ordersList = ordersData.orders;
          } else if (Array.isArray(ordersData)) {
            ordersList = ordersData;
          } else if (ordersData.order) {
            ordersList = [ordersData.order];
          }
          setOrders(ordersList);
        }
      }

      // Fetch documents
      await fetchDocuments();
    } catch (error) {
      console.error('Error loading data:', error);
      if (error instanceof Error && error.message.includes('Unauthorized')) {
        localStorage.removeItem('clientToken');
        localStorage.removeItem('clientData');
        router.push('/client/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchDocuments = async () => {
    const token = localStorage.getItem('clientToken');
    if (!token) return;

    try {
      const response = await fetch(`${API_BASE_URL}/api/public/client/documents?limit=50`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setDocuments(data.documents || []);
      }
    } catch (error) {
      console.error('Error fetching documents:', error);
    }
  };

  const handleUploadDocuments = (order: Order) => {
    setSelectedOrderForUpload({ id: order.id, orderNumber: order.orderNumber });
    setShowUploadModal(true);
  };

  const handleUploadComplete = () => {
    fetchDocuments();
  };

  const handleCompletePayment = async (order: Order) => {
    try {
      setProcessingPayment(order.id);

      if (!clientData?.phone) {
        alert('Please update your phone number in your profile before making a payment');
        router.push('/client/profile');
        setProcessingPayment(null);
        return;
      }

      const paymentRequest = {
        orderNumber: order.orderNumber,
        paymentRequest: {
          title: getServiceName(order).length > 47 ? getServiceName(order).substring(0, 47) + '...' : getServiceName(order),
          amount: order.totalAmount,
          currency: 'AED',
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
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentRequest),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || errorData.message || 'Failed to create payment link');
      }

      const data = await response.json();

      if (data.success && data.payment_url) {
        window.location.href = data.payment_url;
      } else {
        setProcessingPayment(null);
        alert(data.error || 'Failed to create payment link. Please try again or contact support.');
      }
    } catch (error) {
      console.error('Payment error:', error);
      setProcessingPayment(null);
      const errorMessage = error instanceof Error ? error.message : 'An error occurred while processing payment';
      alert(errorMessage + '\n\nPlease try again or contact support.');
    }
  };

  const handleViewOrder = (order: Order) => {
    setSelectedOrderForDetails(order);
    setShowDetailsModal(true);
  };

  const handleDownloadDocument = (fileUrl: string, filename: string) => {
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = filename;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getOrderDocuments = (order: Order): Document[] => {
    return documents.filter(doc => {
      return (
        doc.fileUrl.includes(order.orderNumber) ||
        doc.filename.includes(order.orderNumber)
      );
    });
  };

  const getServiceName = (order: Order): string => {
    return order.serviceName || order.service_name || order.service?.name || order.service?.title || 'Unknown Service';
  };

  const getCurrentStep = (order: Order): number => {
    if (order.status === 'completed') return 5;
    if (order.status === 'confirmed') return 3;
    if (order.paymentStatus === 'completed') return 2;
    if (order.status === 'pending') return 1;
    return 1;
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'confirmed':
        return 'bg-violet-100 text-violet-800 border-violet-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'text-green-600';
      case 'failed':
        return 'text-red-600';
      case 'processing':
        return 'text-violet-600';
      default:
        return 'text-amber-600';
    }
  };

  const getPaymentStatusText = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return '✓ Paid';
      case 'failed':
        return '✗ Payment Failed';
      case 'processing':
        return '⋯ Processing';
      default:
        return '⏱ Payment Pending';
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const ongoingOrders = orders.filter(o => o.status !== 'completed' && o.status !== 'cancelled');

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!clientData) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <PublicHeader />

      <div className="pt-20">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 md:p-8 text-white">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold mb-2">
                    {getGreeting()}, {clientData.firstName}!
                  </h1>
                  <p className="text-indigo-100 text-sm md:text-base">
                    Welcome to your legal dashboard. Here you can track your cases, manage documents, and connect with your legal team.
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <Link href="/services">
                    <button className="inline-flex items-center gap-2 px-6 py-3 bg-white text-indigo-600 font-semibold rounded-lg hover:bg-indigo-50 transition-colors">
                      <Scale className="w-5 h-5" />
                      Browse Services
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content - Ongoing Cases */}
            <div className="lg:col-span-2 space-y-6">
              {/* Section Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Ongoing Cases</h2>
                  <p className="text-sm text-gray-500 mt-1">Track your active legal consultations</p>
                </div>
                {ongoingOrders.length > 0 && (
                  <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-sm font-semibold rounded-full">
                    {ongoingOrders.length} Active
                  </span>
                )}
              </div>

              {/* Orders List or Empty State */}
              {ongoingOrders.length > 0 ? (
                <div className="space-y-4">
                  {ongoingOrders.map((order) => {
                    const currentStep = getCurrentStep(order);
                    const orderDocuments = getOrderDocuments(order);

                    return (
                      <div
                        key={order.id}
                        className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                      >
                        <div className={`h-1.5 ${
                          order.status === 'completed'
                            ? 'bg-green-500'
                            : order.status === 'confirmed'
                            ? 'bg-violet-500'
                            : order.status === 'cancelled'
                            ? 'bg-red-500'
                            : 'bg-yellow-500'
                        }`}></div>

                        <div className="p-5">
                          {/* Top Section */}
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <h3 className="text-lg font-bold text-gray-900">
                                  {getServiceName(order)}
                                </h3>
                                <span className={`px-2.5 py-0.5 text-xs font-semibold rounded-full border ${getStatusColor(order.status)}`}>
                                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                </span>
                              </div>

                              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
                                <span className="flex items-center gap-1.5 font-medium">
                                  <FileText className="w-4 h-4 text-gray-400" />
                                  {order.orderNumber}
                                </span>
                                <span className="flex items-center gap-1.5">
                                  <Calendar className="w-4 h-4 text-gray-400" />
                                  {new Date(order.bookingDate).toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric'
                                  })}
                                </span>
                                <span className="flex items-center gap-1.5">
                                  <Clock className="w-4 h-4 text-gray-400" />
                                  {order.bookingTime}
                                </span>
                              </div>
                            </div>

                            <div className="text-right ml-4">
                              <p className="text-xl font-bold text-gray-900">{order.totalAmount} AED</p>
                              <p className={`text-xs font-semibold ${getPaymentStatusColor(order.paymentStatus)}`}>
                                {getPaymentStatusText(order.paymentStatus)}
                              </p>
                            </div>
                          </div>

                          {/* Notes */}
                          {order.notes && (
                            <div className="mb-4 flex items-start gap-2 text-sm text-gray-700 bg-violet-50 border border-violet-100 rounded-lg p-3">
                              <AlertCircle className="w-4 h-4 text-violet-600 mt-0.5 flex-shrink-0" />
                              <p className="text-violet-900">{order.notes}</p>
                            </div>
                          )}

                          {/* Documents Section */}
                          {orderDocuments.length > 0 && (
                            <div className="mb-4 bg-gray-50 rounded-lg p-3 border border-gray-200">
                              <div className="flex items-center gap-2 mb-2">
                                <Folder className="w-4 h-4 text-gray-600" />
                                <span className="text-sm font-medium text-gray-700">
                                  Documents ({orderDocuments.length})
                                </span>
                              </div>
                              <div className="space-y-1">
                                {orderDocuments.slice(0, 2).map((doc) => (
                                  <div key={doc.id} className="flex items-center justify-between text-xs">
                                    <span className="text-gray-600 truncate flex-1">{doc.filename}</span>
                                    <button
                                      onClick={() => handleDownloadDocument(doc.fileUrl, doc.filename)}
                                      className="ml-2 text-indigo-600 hover:text-indigo-800"
                                    >
                                      <Download className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                ))}
                                {orderDocuments.length > 2 && (
                                  <p className="text-xs text-gray-500">+{orderDocuments.length - 2} more</p>
                                )}
                              </div>
                            </div>
                          )}

                          {/* Progress Steps */}
                          <div className="mb-4 pb-4 border-b border-gray-100">
                            <div className="relative">
                              <div className="absolute top-3 left-0 right-0 h-0.5 bg-gray-200">
                                <div
                                  className="h-full bg-indigo-600 transition-all duration-500"
                                  style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
                                />
                              </div>

                              <div className="grid grid-cols-5 gap-1">
                                {steps.map((step) => (
                                  <div key={step.number} className="flex flex-col items-center relative z-10">
                                    <div
                                      className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[10px] mb-1 transition-colors ${
                                        step.number <= currentStep
                                          ? 'bg-indigo-600 text-white'
                                          : 'bg-gray-200 text-gray-500'
                                      }`}
                                    >
                                      {step.number < currentStep ? (
                                        <CheckCircle className="w-3 h-3" />
                                      ) : (
                                        step.number
                                      )}
                                    </div>
                                    <span className="text-[9px] text-gray-500 text-center leading-tight hidden sm:block">
                                      {step.label}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex flex-wrap gap-2">
                            {getMeetingLink(order) && (
                              <a
                                href={getMeetingLink(order) || ''}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium"
                              >
                                <ExternalLink className="w-4 h-4" />
                                Join Meeting
                              </a>
                            )}

                            {order.paymentStatus === 'pending' && (
                              <button
                                onClick={() => handleCompletePayment(order)}
                                disabled={processingPayment === order.id}
                                className="inline-flex items-center gap-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors text-sm font-medium"
                              >
                                {processingPayment === order.id ? (
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

                            <button
                              onClick={() => handleViewOrder(order)}
                              className="inline-flex items-center gap-2 px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                            >
                              <Eye className="w-4 h-4" />
                              Details
                            </button>

                            <button
                              onClick={() => handleUploadDocuments(order)}
                              className="inline-flex items-center gap-2 px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                            >
                              <Upload className="w-4 h-4" />
                              Upload
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                /* Empty State - No Ongoing Cases */
                <div className="bg-white rounded-xl border border-gray-200 p-8 md:p-12 text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Briefcase className="w-10 h-10 text-indigo-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    No Active Cases
                  </h3>
                  <p className="text-gray-600 mb-6 max-w-md mx-auto">
                    You don&apos;t have any ongoing legal consultations at the moment. Need legal assistance? Browse our services to get started.
                  </p>
                  <Link href="/services">
                    <button className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all shadow-lg hover:shadow-xl">
                      <Scale className="w-5 h-5" />
                      Find Legal Services
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </Link>
                </div>
              )}

              {/* Past Orders Section (if any completed) */}
              {orders.filter(o => o.status === 'completed').length > 0 && (
                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Completed Cases</h3>
                  <div className="space-y-3">
                    {orders.filter(o => o.status === 'completed').slice(0, 3).map((order) => (
                      <div key={order.id} className="bg-white rounded-lg border border-gray-200 p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{getServiceName(order)}</p>
                            <p className="text-sm text-gray-500">{order.orderNumber}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleViewOrder(order)}
                          className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
                        >
                          View Details
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Sidebar - Profile Card & Quick Actions */}
            <div className="space-y-6">
              {/* Profile Card */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-5 text-white text-center">
                  {clientData.avatarUrl ? (
                    <img
                      src={clientData.avatarUrl}
                      alt="Profile"
                      className="w-16 h-16 rounded-full mx-auto mb-3 border-3 border-white/30"
                    />
                  ) : (
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 border-3 border-white/30">
                      <span className="text-2xl font-bold">
                        {clientData.firstName?.[0]}{clientData.lastName?.[0]}
                      </span>
                    </div>
                  )}
                  <h3 className="font-bold text-lg">
                    {clientData.firstName} {clientData.lastName}
                  </h3>
                  <div className={`inline-flex items-center gap-1.5 mt-2 px-2.5 py-1 rounded-full text-xs font-medium ${
                    clientData.isVerified
                      ? 'bg-green-500/20 text-green-100'
                      : 'bg-yellow-500/20 text-yellow-100'
                  }`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${
                      clientData.isVerified ? 'bg-green-300' : 'bg-yellow-300'
                    }`}></div>
                    {clientData.isVerified ? 'Verified' : 'Pending Verification'}
                  </div>
                </div>

                <div className="p-4 space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600 truncate">{clientData.email}</span>
                  </div>
                  {clientData.phone && (
                    <div className="flex items-center gap-3 text-sm">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">{clientData.phone}</span>
                    </div>
                  )}

                  <Link href="/client/profile">
                    <button className="w-full mt-3 flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                      <Settings className="w-4 h-4" />
                      Edit Profile
                    </button>
                  </Link>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
                <h3 className="font-semibold text-gray-900 mb-4">Overview</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Total Cases</span>
                    <span className="font-bold text-gray-900">{orders.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Active</span>
                    <span className="font-bold text-indigo-600">{ongoingOrders.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Completed</span>
                    <span className="font-bold text-green-600">
                      {orders.filter(o => o.status === 'completed').length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                    <span className="text-sm text-gray-600">Documents</span>
                    <span className="font-bold text-gray-900">{documents.length}</span>
                  </div>
                </div>
              </div>

              {/* Need Help Card */}
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-200 p-5">
                <h3 className="font-semibold text-amber-900 mb-2">Need Legal Help?</h3>
                <p className="text-sm text-amber-700 mb-4">
                  Our team of expert lawyers is ready to assist you with any legal matter.
                </p>
                <Link href="/services">
                  <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors text-sm font-medium">
                    <Scale className="w-4 h-4" />
                    Browse Services
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && selectedOrderForUpload && (
        <DocumentUpload
          orderId={selectedOrderForUpload.id}
          orderNumber={selectedOrderForUpload.orderNumber}
          onUploadComplete={handleUploadComplete}
          onClose={() => {
            setShowUploadModal(false);
            setSelectedOrderForUpload(null);
          }}
        />
      )}

      {/* Order Details Modal */}
      {showDetailsModal && selectedOrderForDetails && (
        <OrderDetailsModal
          order={selectedOrderForDetails}
          documents={getOrderDocuments(selectedOrderForDetails)}
          onClose={() => {
            setShowDetailsModal(false);
            setSelectedOrderForDetails(null);
          }}
          onDownloadDocument={handleDownloadDocument}
        />
      )}
    </div>
  );
}
