//src/app/lawyer/dashboard/page.tsx

'use client';
import React, { useState } from 'react';
import { 
  Clock,
  Calendar,
  CheckCircle,
  MessageSquare,
  Bell,
  CreditCard,
  AlertCircle,
  User,
  Phone,
  Mail,
  Search,
  RotateCcw,
  FileSignature,
  Users,
  ArrowLeft,
  ArrowRight,
  Video
} from 'lucide-react';
import LawyerHeader from '@/components/layout/LawyerHeader';

// TypeScript Interfaces
interface Client {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

interface Order {
  id: number;
  orderNumber: string;
  serviceName: string;
  serviceCategory: string;
  bookingDate: string;
  bookingTime: string;
  totalAmount: number;
  status: string;
  paymentStatus: string;
  currentStep: number;
  expectedCompletion: string;
  client: Client;
  notes: string | null;
  meetingLink: string | null;
}

interface ChatMessage {
  from: 'lawyer' | 'client';
  text: string;
  at: string;
  sender: string;
}

interface WorkflowStep {
  number: number;
  label: string;
}

// Mock data for demonstration
const mockOrders: Order[] = [
  {
    id: 1,
    orderNumber: '2025-010',
    serviceName: 'Legal Consultation Service',
    serviceCategory: 'Corporate Law',
    bookingDate: '2025-10-15',
    bookingTime: '10:00 AM',
    totalAmount: 500,
    status: 'pending',
    paymentStatus: 'pending',
    currentStep: 1,
    expectedCompletion: '2025-10-23',
    client: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '+971 50 123 4567'
    },
    notes: 'Client requires consultation regarding company formation',
    meetingLink: null
  },
  {
    id: 2,
    orderNumber: '2025-009',
    serviceName: 'Contract Review',
    serviceCategory: 'Commercial Law',
    bookingDate: '2025-10-14',
    bookingTime: '2:00 PM',
    totalAmount: 750,
    status: 'confirmed',
    paymentStatus: 'completed',
    currentStep: 3,
    expectedCompletion: '2025-10-20',
    client: {
      firstName: 'Sarah',
      lastName: 'Smith',
      email: 'sarah.smith@example.com',
      phone: '+971 55 987 6543'
    },
    notes: 'Employment contract review needed',
    meetingLink: 'https://meet.google.com/abc-defg-hij'
  }
];

export default function LawyerDashboard() {
  const [orders] = useState<Order[]>(mockOrders);
  const [selectedOrder, setSelectedOrder] = useState<Order>(mockOrders[0]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatDraft, setChatDraft] = useState<string>('');
  const [notifications, setNotifications] = useState<string[]>([
    'Expected completion set to 2025-10-23',
    'Order created and confirmation sent to client.'
  ]);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const workflowSteps: WorkflowStep[] = [
    { number: 1, label: 'Order Created' },
    { number: 2, label: 'Payment Confirmed' },
    { number: 3, label: 'First Interaction with Lawyer' },
    { number: 4, label: 'Legal Consultation Done' },
    { number: 5, label: 'Order Completed' }
  ];

  const handleMoveToNextStep = () => {
    if (selectedOrder.currentStep < 5) {
      const updatedOrder = {
        ...selectedOrder,
        currentStep: selectedOrder.currentStep + 1
      };
      setSelectedOrder(updatedOrder);
      setNotifications(prev => [
        `Order moved to: ${workflowSteps[updatedOrder.currentStep - 1].label}`,
        ...prev
      ]);
    }
  };

  const handleMoveBack = () => {
    if (selectedOrder.currentStep > 1) {
      const updatedOrder = {
        ...selectedOrder,
        currentStep: selectedOrder.currentStep - 1
      };
      setSelectedOrder(updatedOrder);
      setNotifications(prev => [
        `Order moved back to: ${workflowSteps[updatedOrder.currentStep - 1].label}`,
        ...prev
      ]);
    }
  };

  const handleSendMessage = () => {
    if (!chatDraft.trim()) return;
    
    const newMessage: ChatMessage = {
      from: 'lawyer',
      text: chatDraft,
      at: new Date().toLocaleTimeString(),
      sender: 'You'
    };
    
    setChatMessages(prev => [...prev, newMessage]);
    setChatDraft('');
    setNotifications(prev => ['Message sent to client', ...prev]);
  };

  const handleMarkAsPaid = () => {
    const updatedOrder = {
      ...selectedOrder,
      paymentStatus: 'completed'
    };
    setSelectedOrder(updatedOrder);
    setNotifications(prev => ['Payment marked as completed', ...prev]);
  };

  const handleReturnToClient = () => {
    setNotifications(prev => ['Order returned to client for review', ...prev]);
  };

  const handleRequestSignature = () => {
    setNotifications(prev => ['E-signature request sent to client', ...prev]);
  };

  const getStatusColor = (status: string): string => {
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

  const filteredOrders: Order[] = orders.filter(order => {
    const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
    const matchesSearch = order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.client.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.client.lastName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <LawyerHeader />

      {/* Expected Completion Banner */}
      <div className="pt-16">
        {selectedOrder && (
          <div className="bg-violet-50 border-b border-violet-100">
            <div className="max-w-7xl mx-auto px-6 py-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-violet-600" />
                  <span className="font-medium text-violet-900">
                    Expected Completion: {selectedOrder.expectedCompletion}
                  </span>
                </div>
                <input
                  type="date"
                  defaultValue={selectedOrder.expectedCompletion}
                  className="px-3 py-1 text-sm border border-violet-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
              </div>
            </div>
          </div>
        )}

        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Sidebar - Order List */}
            <div className="lg:col-span-1 space-y-4">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="p-4 border-b border-gray-200">
                  <h2 className="font-semibold text-gray-900 flex items-center gap-2 mb-4">
                    <Users className="w-5 h-5" />
                    Client Orders
                  </h2>
                  
                  <div className="relative mb-3">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search orders..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => setFilterStatus('all')}
                      className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${
                        filterStatus === 'all' 
                          ? 'bg-indigo-600 text-white' 
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      All
                    </button>
                    <button
                      onClick={() => setFilterStatus('pending')}
                      className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${
                        filterStatus === 'pending' 
                          ? 'bg-indigo-600 text-white' 
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      Pending
                    </button>
                    <button
                      onClick={() => setFilterStatus('confirmed')}
                      className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${
                        filterStatus === 'confirmed' 
                          ? 'bg-indigo-600 text-white' 
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      Active
                    </button>
                  </div>
                </div>

                <div className="divide-y divide-gray-200 max-h-[600px] overflow-y-auto">
                  {filteredOrders.map((order) => (
                    <button
                      key={order.id}
                      onClick={() => setSelectedOrder(order)}
                      className={`w-full p-4 text-left hover:bg-gray-50 transition-colors ${
                        selectedOrder?.id === order.id ? 'bg-indigo-50 border-l-4 border-indigo-600' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-semibold text-gray-900 text-sm">
                            Order #{order.orderNumber}
                          </p>
                          <p className="text-xs text-gray-600 mt-0.5">{order.serviceName}</p>
                        </div>
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-600 mb-2">
                        <User className="w-3 h-3" />
                        <span>{order.client.firstName} {order.client.lastName}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-500">{order.bookingDate}</span>
                        <span className="font-semibold text-gray-900">{order.totalAmount} AED</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Content - Order Details */}
            <div className="lg:col-span-2 space-y-6">
              {selectedOrder && (
                <>
                  <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h2 className="text-2xl font-bold text-gray-900">
                            Order #{selectedOrder.orderNumber} — {selectedOrder.serviceName}
                          </h2>
                          <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${getStatusColor(selectedOrder.status)}`}>
                            Active
                          </span>
                        </div>
                        
                        <div className="bg-gray-50 rounded-lg p-4 mb-4">
                          <h3 className="text-sm font-semibold text-gray-900 mb-3">Client Information</h3>
                          <div className="grid grid-cols-2 gap-3 text-sm">
                            <div className="flex items-center gap-2">
                              <User className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-700">
                                {selectedOrder.client.firstName} {selectedOrder.client.lastName}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Mail className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-700">{selectedOrder.client.email}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Phone className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-700">{selectedOrder.client.phone}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-700">{selectedOrder.bookingDate} at {selectedOrder.bookingTime}</span>
                            </div>
                          </div>
                        </div>

                        {selectedOrder.notes && (
                          <div className="flex items-start gap-2 text-sm text-gray-700 bg-violet-50 border border-violet-100 rounded-lg p-3 mb-4">
                            <AlertCircle className="w-4 h-4 text-violet-600 mt-0.5 flex-shrink-0" />
                            <p className="text-violet-900">{selectedOrder.notes}</p>
                          </div>
                        )}

                        <div className="mb-6">
                          <div className="relative mb-2">
                            <div className="absolute top-6 left-0 right-0 h-0.5 bg-gray-200">
                              <div 
                                className="h-full bg-indigo-600 transition-all duration-500"
                                style={{ width: `${((selectedOrder.currentStep - 1) / (workflowSteps.length - 1)) * 100}%` }}
                              />
                            </div>

                            <div className="grid grid-cols-5 gap-2 relative">
                              {workflowSteps.map((step) => (
                                <div key={step.number} className="flex flex-col items-center">
                                  <div
                                    className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm mb-2 transition-colors relative z-10 ${
                                      step.number <= selectedOrder.currentStep
                                        ? 'bg-indigo-600 text-white'
                                        : 'bg-gray-200 text-gray-500'
                                    }`}
                                  >
                                    {step.number < selectedOrder.currentStep ? (
                                      <CheckCircle className="w-6 h-6" />
                                    ) : (
                                      step.number
                                    )}
                                  </div>
                                  <span className="text-[10px] text-gray-600 text-center leading-tight">
                                    {step.label}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <div className="mt-4 text-center">
                            <p className="text-sm font-medium text-gray-700">
                              Current Status: <span className="text-indigo-600 font-semibold">
                                {workflowSteps[selectedOrder.currentStep - 1]?.label}
                              </span>
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-3">
                          <button
                            onClick={handleMoveToNextStep}
                            disabled={selectedOrder.currentStep >= 5}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
                          >
                            Move to Next Step
                            <ArrowRight className="w-4 h-4" />
                          </button>

                          <button
                            onClick={handleMoveBack}
                            disabled={selectedOrder.currentStep <= 1}
                            className="inline-flex items-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors font-medium"
                          >
                            <ArrowLeft className="w-4 h-4" />
                            Move Back
                          </button>

                          <button
                            onClick={handleReturnToClient}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                          >
                            <RotateCcw className="w-4 h-4" />
                            Return to Client
                          </button>

                          {selectedOrder.meetingLink && (
                            <a
                              href={selectedOrder.meetingLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                            >
                              <Video className="w-4 h-4" />
                              Connect Calendar
                            </a>
                          )}

                          <button
                            onClick={handleRequestSignature}
                            className="inline-flex items-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                          >
                            <FileSignature className="w-4 h-4" />
                            Request e-Signature
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                      <div className="p-4 border-b border-gray-200">
                        <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                          <MessageSquare className="w-5 h-5" />
                          Secure Chat
                        </h3>
                      </div>
                      
                      <div className="p-4">
                        <div className="h-64 mb-4 overflow-auto">
                          {chatMessages.length === 0 ? (
                            <p className="text-sm text-gray-500 text-center py-20">
                              No messages yet. Start the conversation.
                            </p>
                          ) : (
                            <div className="space-y-3">
                              {chatMessages.map((message, index) => (
                                <div
                                  key={index}
                                  className={`text-sm ${
                                    message.from === 'lawyer' ? 'text-right' : 'text-left'
                                  }`}
                                >
                                  <div
                                    className={`inline-block px-4 py-2 rounded-lg ${
                                      message.from === 'lawyer'
                                        ? 'bg-indigo-600 text-white'
                                        : 'bg-gray-100 text-gray-900'
                                    }`}
                                  >
                                    {message.text}
                                  </div>
                                  <p className="text-xs text-gray-400 mt-1">
                                    {message.sender} - {message.at}
                                  </p>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                        
                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="Type a message"
                            value={chatDraft}
                            onChange={(e) => setChatDraft(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                          />
                          <button
                            onClick={handleSendMessage}
                            className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
                          >
                            Send
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                      <div className="p-4 border-b border-gray-200">
                        <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                          <Bell className="w-5 h-5" />
                          Notifications
                        </h3>
                      </div>
                      
                      <div className="p-4 max-h-[350px] overflow-y-auto">
                        <ul className="space-y-3">
                          {notifications.map((notification, index) => (
                            <li key={index} className="text-sm text-gray-700 flex items-start gap-2 p-2 hover:bg-gray-50 rounded">
                              <span className="text-indigo-600 mt-1">•</span>
                              <span>{notification}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900 flex items-center gap-2 mb-2">
                          <CreditCard className="w-5 h-5" />
                          Payment
                        </h3>
                        <p className="text-sm text-gray-600">
                          Status: <span className={`font-semibold ${
                            selectedOrder.paymentStatus === 'completed' 
                              ? 'text-green-600' 
                              : 'text-yellow-600'
                          }`}>
                            {selectedOrder.paymentStatus === 'completed' ? 'Paid' : 'Pending'}
                          </span>
                        </p>
                      </div>
                      {selectedOrder.paymentStatus !== 'completed' && (
                        <button
                          onClick={handleMarkAsPaid}
                          className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
                        >
                          Mark as Paid
                        </button>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}