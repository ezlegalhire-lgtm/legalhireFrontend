// src/app/payment/callback/page.tsx
'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';
import PublicHeader from '@/components/layout/PublicHeader';

function PaymentCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<'processing' | 'success' | 'failed'>('processing');
  const [message, setMessage] = useState('Processing your payment...');
  
  useEffect(() => {
    const processCallback = async () => {
      try {
        // Get parameters from URL - these are set by the API verification endpoint
        const statusParam = searchParams.get('status');
        const orderNumber = searchParams.get('orderNumber');
        const transactionId = searchParams.get('transactionId');
        const errorParam = searchParams.get('error');

        console.log('Payment callback received:', { 
          status: statusParam, 
          orderNumber, 
          transactionId,
          error: errorParam 
        });

        // The API has already verified the payment and updated the database
        // We just need to display the result and redirect accordingly

        if (statusParam === 'success' && orderNumber) {
          // Payment successful
          setStatus('success');
          setMessage('Payment successful! Redirecting to your order...');
          
          // Get email from localStorage or URL for redirect
          let email = searchParams.get('email');
          if (!email) {
            const clientData = localStorage.getItem('clientData');
            if (clientData) {
              try {
                const userData = JSON.parse(clientData);
                email = userData.email;
              } catch (e) {
                console.error('Error parsing client data:', e);
              }
            }
          }

          // Redirect to success page after 2 seconds
          setTimeout(() => {
            const successUrl = email 
              ? `/order/success?orderNumber=${orderNumber}&email=${email}`
              : `/order/success?orderNumber=${orderNumber}`;
            router.push(successUrl);
          }, 2000);

        } else if (statusParam === 'failed' || errorParam) {
          // Payment failed
          setStatus('failed');
          const errorMessage = errorParam 
            ? decodeURIComponent(errorParam)
            : 'Payment was not completed';
          setMessage(errorMessage);
          
          // Redirect to services after 3 seconds
          setTimeout(() => {
            router.push('/services');
          }, 3000);
        } else {
          // No valid status parameter - something went wrong
          setStatus('failed');
          setMessage('Invalid payment callback. Please contact support if you were charged.');
          
          setTimeout(() => {
            router.push('/services');
          }, 3000);
        }

      } catch (error) {
        console.error('Payment callback error:', error);
        setStatus('failed');
        setMessage('An error occurred while processing your payment callback');
        
        setTimeout(() => {
          router.push('/services');
        }, 3000);
      }
    };

    processCallback();
  }, [searchParams, router]);

  return (
    <>
      <PublicHeader />
      <div className="min-h-screen bg-gray-50 flex items-center justify-center pt-20">
        <div className="max-w-md w-full mx-auto px-6">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            {/* Processing State */}
            {status === 'processing' && (
              <>
                <div className="w-20 h-20 bg-violet-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Loader2 className="w-10 h-10 text-violet-600 animate-spin" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                  Processing Payment
                </h2>
                <p className="text-gray-600 mb-6">
                  {message}
                </p>
                <div className="flex items-center justify-center gap-2">
                  <div className="w-2 h-2 bg-violet-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-violet-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-violet-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </>
            )}

            {/* Success State */}
            {status === 'success' && (
              <>
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                  Payment Successful!
                </h2>
                <p className="text-gray-600 mb-6">
                  {message}
                </p>
                <div className="flex items-center justify-center gap-2">
                  <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse" style={{ animationDelay: '300ms' }}></div>
                </div>
              </>
            )}

            {/* Failed State */}
            {status === 'failed' && (
              <>
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <XCircle className="w-10 h-10 text-red-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                  Payment Failed
                </h2>
                <p className="text-gray-600 mb-6">
                  {message}
                </p>
                <p className="text-sm text-gray-500">
                  Redirecting you back to services...
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

// Loading component for Suspense fallback
function PaymentCallbackLoading() {
  return (
    <>
      <PublicHeader />
      <div className="min-h-screen bg-gray-50 flex items-center justify-center pt-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading payment status...</p>
        </div>
      </div>
    </>
  );
}

// Main component with Suspense boundary
export default function PaymentCallbackPage() {
  return (
    <Suspense fallback={<PaymentCallbackLoading />}>
      <PaymentCallbackContent />
    </Suspense>
  );
}