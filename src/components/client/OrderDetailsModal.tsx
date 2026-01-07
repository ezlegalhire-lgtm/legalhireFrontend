// src/components/client/OrderDetailsModal.tsx
'use client';

import React from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  FileText, 
  CreditCard, 
  Package, 
  CheckCircle,
  AlertCircle,
  ExternalLink,
  Download,
  Folder
} from 'lucide-react';

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

// Helper to get service name from various field names
const getServiceName = (order: Order): string => {
  return order.serviceName || order.service_name || order.service?.name || order.service?.title || 'Unknown Service';
};

// Helper to get meeting link from various field names
const getMeetingLink = (order: Order): string | null => {
  return order.meetingLink || order.meeting_link || null;
};

interface Document {
  id: number;
  filename: string;
  fileType: string;
  fileSize: number;
  documentType: string;
  fileUrl: string;
  uploadedAt: string;
}

interface OrderDetailsModalProps {
  order: Order;
  documents: Document[];
  onClose: () => void;
  onDownloadDocument: (fileUrl: string, filename: string) => void;
}

export default function OrderDetailsModal({ 
  order, 
  documents, 
  onClose, 
  onDownloadDocument 
}: OrderDetailsModalProps) {
  
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
        return 'text-green-600 bg-green-50';
      case 'failed':
        return 'text-red-600 bg-red-50';
      case 'processing':
        return 'text-violet-600 bg-violet-50';
      default:
        return 'text-amber-600 bg-amber-50';
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{getServiceName(order)}</h2>
              <p className="text-sm text-gray-600 mt-1">Order #{order.orderNumber}</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={24} />
            </button>
          </div>
          
          {/* Status Badges */}
          <div className="flex gap-3 mt-4">
            <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${getStatusColor(order.status)}`}>
              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </span>
            <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getPaymentStatusColor(order.paymentStatus)}`}>
              Payment: {order.paymentStatus}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* Service Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Package className="w-5 h-5 text-indigo-600" />
              Service Details
            </h3>
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Service:</span>
                <span className="text-sm font-medium text-gray-900">{getServiceName(order)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Category:</span>
                <span className="text-sm font-medium text-gray-900">{order.serviceCategory}</span>
              </div>
              <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                <span className="text-sm text-gray-600">Total Amount:</span>
                <span className="text-lg font-bold text-gray-900">{order.totalAmount} AED</span>
              </div>
            </div>
          </div>

          {/* Booking Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-indigo-600" />
              Booking Information
            </h3>
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">Date:</span>
                <span className="text-sm font-medium text-gray-900">
                  {new Date(order.bookingDate).toLocaleDateString('en-US', { 
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">Time:</span>
                <span className="text-sm font-medium text-gray-900">{order.bookingTime}</span>
              </div>
              <div className="flex items-center gap-3">
                <FileText className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">Created:</span>
                <span className="text-sm font-medium text-gray-900">
                  {new Date(order.createdAt).toLocaleDateString('en-US', { 
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>
            </div>
          </div>

          {/* Payment Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-indigo-600" />
              Payment Information
            </h3>
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Status:</span>
                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getPaymentStatusColor(order.paymentStatus)}`}>
                  {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                </span>
              </div>
              {order.paymentMethod && (
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Method:</span>
                  <span className="text-sm font-medium text-gray-900 capitalize">
                    {order.paymentMethod.replace('_', ' ')}
                  </span>
                </div>
              )}
              <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                <span className="text-sm text-gray-600">Amount Paid:</span>
                <span className="text-base font-bold text-gray-900">
                  {order.paymentStatus === 'completed' ? `${order.totalAmount} AED` : 'Pending'}
                </span>
              </div>
            </div>
          </div>

          {/* Meeting Link */}
          {getMeetingLink(order) && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <ExternalLink className="w-5 h-5 text-indigo-600" />
                Meeting Details
              </h3>
              <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-indigo-600 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-indigo-900 mb-2">
                      Your meeting link is ready!
                    </p>
                    <a
                      href={getMeetingLink(order) || ''}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Join Meeting
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Notes */}
          {order.notes && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-indigo-600" />
                Additional Notes
              </h3>
              <div className="bg-violet-50 border border-violet-200 rounded-lg p-4">
                <p className="text-sm text-violet-900">{order.notes}</p>
              </div>
            </div>
          )}

          {/* Documents */}
          {documents.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Folder className="w-5 h-5 text-indigo-600" />
                Uploaded Documents ({documents.length})
              </h3>
              <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                {documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200 hover:shadow-sm transition-shadow"
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <FileText className="w-5 h-5 text-gray-400 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {doc.filename}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-gray-500">{formatFileSize(doc.fileSize)}</span>
                          <span className="text-xs text-gray-400">•</span>
                          <span className="text-xs text-gray-500 capitalize">{doc.documentType}</span>
                          <span className="text-xs text-gray-400">•</span>
                          <span className="text-xs text-gray-500">
                            {new Date(doc.uploadedAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => onDownloadDocument(doc.fileUrl, doc.filename)}
                      className="ml-3 p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors flex-shrink-0"
                      title="Download"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-white transition-colors font-medium"
          >
            Close
          </button>
          {getMeetingLink(order) && (
            <a
              href={getMeetingLink(order) || ''}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
            >
              <ExternalLink className="w-4 h-4" />
              Join Meeting
            </a>
          )}
        </div>
      </div>
    </div>
  );
}