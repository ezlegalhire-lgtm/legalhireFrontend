// src/lib/bookingHandler.ts
// This function handles the booking submission and payment flow with client authentication

interface BookingData {
  serviceId: number;
  guestName?: string;      // Only required for guest users
  guestEmail?: string;     // Only required for guest users
  guestPhone?: string;     // Only required for guest users
  bookingDate: string;
  bookingTime: string;
  notes?: string;
}

interface CreateOrderResponse {
  success: boolean;
  message: string;
  order: {
    id: number;
    orderNumber: string;
    serviceId: number;
    serviceName: string;
    serviceCategory: string;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    bookingDate: string;
    bookingTime: string;
    totalAmount: number;
    status: string;
    paymentStatus: string;
    isAuthenticated: boolean;
    createdAt: string;
  };
  error?: string;
  details?: string[];
}

const API_BASE_URL = process.env.NEXT_PUBLIC_CMS_API_URL || 'https://cms.ezlegalhire.com';

// Check if user is logged in
export function isUserLoggedIn(): boolean {
  if (typeof window === 'undefined') return false;
  return !!localStorage.getItem('clientToken');
}

// Get current user data
export function getCurrentUser() {
  if (typeof window === 'undefined') return null;
  const data = localStorage.getItem('clientData');
  return data ? JSON.parse(data) : null;
}

// Get auth headers
function getAuthHeaders(): HeadersInit {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('clientToken');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }
  
  return headers;
}

export async function createOrder(bookingData: BookingData): Promise<CreateOrderResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/public/orders`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(bookingData),
    });

    const data = await response.json();

    if (!response.ok) {
      // Handle validation errors
      if (data.details && Array.isArray(data.details)) {
        throw new Error(data.details.join(', '));
      }
      throw new Error(data.error || 'Failed to create order');
    }

    return data;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
}

interface PaymentData {
  amount: number;
  currency: string;
  orderNumber: string;
  customerEmail: string;
}

// Mock payment processing function - Replace with actual payment gateway integration
export async function processPayment(paymentData: PaymentData): Promise<{ 
  success: boolean; 
  reference?: string;
  error?: string;
}> {
  // TODO: Integrate with actual payment gateway (Stripe, PayPal, Tabby, etc.)
  // For now, return mock success
  console.log('Mock payment processing for order:', paymentData.orderNumber, 'Amount:', paymentData.amount, paymentData.currency);
  
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        reference: `PAY-${Date.now()}`,
      });
    }, 1500);
  });
}

// Complete booking flow: create order + process payment
export async function completeBooking(bookingData: BookingData): Promise<{
  success: boolean;
  orderNumber?: string;
  customerEmail?: string;
  isAuthenticated?: boolean;
  error?: string;
}> {
  try {
    // Step 1: Create the order
    const orderResponse = await createOrder(bookingData);

    if (!orderResponse.success) {
      throw new Error(orderResponse.error || 'Failed to create order');
    }

    // Step 2: Process payment (integrate with your payment gateway)
    const paymentResult = await processPayment({
      amount: orderResponse.order.totalAmount,
      currency: 'AED',
      orderNumber: orderResponse.order.orderNumber,
      customerEmail: orderResponse.order.customerEmail,
    });

    if (!paymentResult.success) {
      throw new Error(paymentResult.error || 'Payment failed');
    }

    // Step 3: Update order with payment info (optional - can be done via webhook)
    // await updateOrderPaymentStatus(orderResponse.order.id, paymentResult.reference);

    return {
      success: true,
      orderNumber: orderResponse.order.orderNumber,
      customerEmail: orderResponse.order.customerEmail,
      isAuthenticated: orderResponse.order.isAuthenticated,
    };
  } catch (error) {
    console.error('Booking error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Booking failed',
    };
  }
}

// Validate booking data before submission
export function validateBookingData(
  bookingData: BookingData,
  isLoggedIn: boolean
): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!bookingData.serviceId) {
    errors.push('Service is required');
  }

  if (!bookingData.bookingDate) {
    errors.push('Booking date is required');
  }

  if (!bookingData.bookingTime) {
    errors.push('Booking time is required');
  }

  // Only validate guest info if not logged in
  if (!isLoggedIn) {
    if (!bookingData.guestName || bookingData.guestName.trim().length < 2) {
      errors.push('Name is required (minimum 2 characters)');
    }

    if (!bookingData.guestEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(bookingData.guestEmail)) {
      errors.push('Valid email is required');
    }

    if (!bookingData.guestPhone || bookingData.guestPhone.trim().length < 10) {
      errors.push('Valid phone number is required');
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}


// ============================================================
// EXAMPLE USAGE IN SERVICE DETAIL PAGE
// ============================================================

/*
// Add this to your service detail page (src/app/services/[slug]/page.tsx)

import { completeBooking, isUserLoggedIn, getCurrentUser, validateBookingData } from '@/lib/bookingHandler';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

// Inside your component:
const router = useRouter();
const [isBooking, setIsBooking] = useState(false);
const [isLoggedIn, setIsLoggedIn] = useState(false);
const [currentUser, setCurrentUser] = useState<any>(null);

// Check authentication status
useEffect(() => {
  const loggedIn = isUserLoggedIn();
  setIsLoggedIn(loggedIn);
  
  if (loggedIn) {
    const user = getCurrentUser();
    setCurrentUser(user);
  }
}, []);

// Guest user info state (only needed if not logged in)
const [guestInfo, setGuestInfo] = useState({
  name: '',
  email: '',
  phone: '',
  notes: ''
});

const handleBooking = async () => {
  if (!selectedDate || !selectedTime) {
    alert('Please select date and time');
    return;
  }

  // Prepare booking data
  const bookingData = {
    serviceId: service.id,
    bookingDate: selectedDate,
    bookingTime: selectedTime,
    notes: isLoggedIn ? guestInfo.notes : guestInfo.notes,
    // Only include guest info if not logged in
    ...((!isLoggedIn) && {
      guestName: guestInfo.name,
      guestEmail: guestInfo.email,
      guestPhone: guestInfo.phone,
    }),
  };

  // Validate before submission
  const validation = validateBookingData(bookingData, isLoggedIn);
  if (!validation.valid) {
    alert(validation.errors.join('\n'));
    return;
  }

  setIsBooking(true);

  try {
    const result = await completeBooking(bookingData);

    if (result.success) {
      // Redirect to success page
      const params = new URLSearchParams({
        orderNumber: result.orderNumber || '',
      });
      
      // Add email param for guest users (for order retrieval)
      if (!result.isAuthenticated && result.customerEmail) {
        params.append('email', result.customerEmail);
      }
      
      router.push(`/order/success?${params.toString()}`);
    } else {
      alert(result.error || 'Booking failed. Please try again.');
    }
  } catch (error) {
    console.error('Booking error:', error);
    alert('An error occurred. Please try again.');
  } finally {
    setIsBooking(false);
  }
};

// RENDER: Customer Information Form
// Only show for guest users, authenticated users don't need to fill this
<div className="mb-6 space-y-4">
  {isLoggedIn && currentUser ? (
    // Show welcome message for logged-in users
    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
      <div className="flex items-center gap-2 text-green-800">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
        <span className="font-semibold">Booking as {currentUser.firstName} {currentUser.lastName}</span>
      </div>
      <p className="text-sm text-green-700 mt-1">
        {currentUser.email} • {currentUser.phone}
      </p>
    </div>
  ) : (
    // Show form for guest users
    <>
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-semibold text-gray-900">Your Information</h4>
        <Link href="/client/login" className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
          Already have an account? Login
        </Link>
      </div>
      
      <input
        type="text"
        placeholder="Full Name *"
        value={guestInfo.name}
        onChange={(e) => setGuestInfo({...guestInfo, name: e.target.value})}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        required
      />
      
      <input
        type="email"
        placeholder="Email Address *"
        value={guestInfo.email}
        onChange={(e) => setGuestInfo({...guestInfo, email: e.target.value})}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        required
      />
      
      <input
        type="tel"
        placeholder="Phone Number (e.g., +971 50 123 4567) *"
        value={guestInfo.phone}
        onChange={(e) => setGuestInfo({...guestInfo, phone: e.target.value})}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        required
      />
    </>
  )}
  
  {/* Notes field for both logged-in and guest users *\/}
  <textarea
    placeholder="Additional notes or questions (optional)"
    value={guestInfo.notes}
    onChange={(e) => setGuestInfo({...guestInfo, notes: e.target.value})}
    rows={3}
    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
  />
</div>

// Update your booking button:
<button
  onClick={handleBooking}
  disabled={!selectedDate || !selectedTime || isBooking}
  className={`w-full py-4 rounded-xl font-semibold text-white transition-all ${
    selectedDate && selectedTime && !isBooking
      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl'
      : 'bg-gray-300 cursor-not-allowed'
  }`}
>
  <div className="flex items-center justify-center gap-2">
    {isBooking ? (
      <>
        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
        Processing...
      </>
    ) : (
      <>
        <CreditCard className="w-5 h-5" />
        {selectedDate && selectedTime ? 'Proceed to Payment' : 'Select Date & Time'}
      </>
    )}
  </div>
</button>

// Optional: Add login prompt for guests
{!isLoggedIn && (
  <p className="text-center text-sm text-gray-600 mt-4">
    Want faster checkout next time?{' '}
    <Link href="/client/register" className="text-indigo-600 hover:text-indigo-700 font-semibold">
      Create a free account
    </Link>
  </p>
)}
*/