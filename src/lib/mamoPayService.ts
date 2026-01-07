// src/lib/mamoPayService.ts
/**
 * Mamo Pay Payment Integration Service
 * Using Direct REST API Calls
 * Documentation: https://mamopay.readme.io/reference/
 */

const MAMO_API_KEY = process.env.MAMO_API_KEY || '';
const IS_SANDBOX = process.env.NODE_ENV !== 'production';
const MAMO_API_URL = IS_SANDBOX 
  ? 'https://sandbox.dev.business.mamopay.com/manage_api/v1'
  : 'https://business.mamopay.com/manage_api/v1';
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://onlinelegaluae.com';

export interface MamoPaymentRequest {
  amount: number;
  currency?: string;
  title: string;
  description?: string;
  return_url: string;
  failure_return_url: string;
  webhook_url?: string;
  customer_email?: string;
  customer_phone?: string;
  customer_name?: string;
  metadata?: {
    orderNumber: string;
    serviceId: string;
    clientId?: string;
  };
}

export interface MamoPaymentResponse {
  id: string;
  status: string;
  amount: number;
  currency: string;
  payment_url: string;
  created_at: string;
}

export interface MamoChargeStatus {
  id: string;
  status: 'pending' | 'captured' | 'paid' | 'failed' | 'cancelled';
  amount: number;
  currency: string;
  failure_reason?: string;
}

/**
 * Create a payment charge with Mamo Pay
 */
export async function createMamoPayment(
  paymentRequest: MamoPaymentRequest
): Promise<MamoPaymentResponse> {
  try {
    const response = await fetch(`${MAMO_API_URL}/charges`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${MAMO_API_KEY}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        amount: paymentRequest.amount,
        currency: paymentRequest.currency || 'AED',
        title: paymentRequest.title,
        description: paymentRequest.description,
        return_url: paymentRequest.return_url,
        failure_return_url: paymentRequest.failure_return_url,
        webhook_url: paymentRequest.webhook_url,
        customer: {
          email: paymentRequest.customer_email,
          phone: paymentRequest.customer_phone,
          name: paymentRequest.customer_name,
        },
        metadata: paymentRequest.metadata,
        enable_customer_details: true,
        enable_tips: false,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('Mamo Pay API Error:', error);
      throw new Error(error.message || `Payment creation failed: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Mamo Pay Error:', error);
    throw new Error(error instanceof Error ? error.message : 'Failed to create payment');
  }
}

/**
 * Get payment status
 */
export async function getMamoPaymentStatus(chargeId: string): Promise<MamoChargeStatus> {
  try {
    const response = await fetch(`${MAMO_API_URL}/charges/${chargeId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${MAMO_API_KEY}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('Mamo Pay Status Error:', error);
      throw new Error(error.message || `Failed to get payment status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Mamo Pay Status Error:', error);
    throw new Error(error instanceof Error ? error.message : 'Failed to get payment status');
  }
}

/**
 * Generate return URLs for payment flow
 */
export function generatePaymentUrls(orderNumber: string, email?: string) {
  const params = new URLSearchParams({ orderNumber });
  if (email) params.append('email', email);
  
  return {
    success_url: `${BASE_URL}/payment/callback?status=success&${params.toString()}`,
    failure_url: `${BASE_URL}/payment/callback?status=failed&${params.toString()}`,
    webhook_url: `${BASE_URL}/api/webhooks/mamopay`,
  };
}