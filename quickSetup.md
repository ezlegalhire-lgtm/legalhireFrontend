# Order System Setup Instructions

## 📋 Overview
This guide will help you set up the complete order/booking system for your legal services platform.

## 🗄️ Step 1: Update Database Schema

### 1.1 Update your Prisma schema
Add the `Order` model to your `schema.prisma` file (see the artifact with the schema).

### 1.2 Update the Service model
Add the `orders Order[]` relation to your existing Service model.

### 1.3 Run migrations
```bash
# Generate Prisma client
npx prisma generate

# Create and apply migration
npx prisma migrate dev --name add_order_system

# Or push changes to database directly
npx prisma db push
```

## 📁 Step 2: Create API Routes

### 2.1 Create the orders API route
Create file: `src/app/api/public/orders/route.ts`

Copy the code from the "API Route - Create Order" artifact.

### 2.2 Test the API
```bash
# Test creating an order (using curl or Postman)
curl -X POST http://localhost:3000/api/public/orders \
  -H "Content-Type: application/json" \
  -d '{
    "serviceId": 1,
    "customerName": "John Doe",
    "customerEmail": "john@example.com",
    "customerPhone": "+971501234567",
    "bookingDate": "2025-10-20",
    "bookingTime": "10:00 AM",
    "notes": "Need advice on employment contract"
  }'
```

## 📄 Step 3: Create Success Page

### 3.1 Create success page
Create file: `src/app/order/success/page.tsx`

Copy the code from the "Order Success Page" artifact.

## 🔗 Step 4: Integrate with Service Detail Page

### 4.1 Create booking handler
Create file: `src/lib/bookingHandler.ts`

Copy the code from the "Booking Handler" artifact.

### 4.2 Update your service detail page
Add the customer information form and booking handler to your existing service detail page. See the example usage in the booking handler file.

**Key additions to service detail page:**

```typescript
import { completeBooking } from '@/lib/bookingHandler';
import { useRouter } from 'next/navigation';

// Add state
const [customerInfo, setCustomerInfo] = useState({
  name: '',
  email: '',
  phone: '',
  notes: ''
});
const [isBooking, setIsBooking] = useState(false);

// Add booking handler function
const handleBooking = async () => {
  // See full implementation in booking handler artifact
};
```

## 💳 Step 5: Payment Integration (Optional but Recommended)

### 5.1 Choose a payment gateway
- **Stripe**: Most popular, easy integration
- **PayPal**: Global acceptance
- **Telr**: Popular in UAE
- **Network International**: UAE-specific

### 5.2 Install payment SDK
```bash
# For Stripe
npm install @stripe/stripe-js stripe
```

### 5.3 Update payment function
Replace the mock `processPayment` function in `bookingHandler.ts` with actual payment gateway integration.

**Example Stripe integration:**
```typescript
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY!);

export async function processPayment(orderData: any) {
  const stripe = await stripePromise;
  
  // Create payment intent on your backend
  const response = await fetch('/api/create-payment-intent', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      amount: orderData.amount,
      currency: orderData.currency,
      orderNumber: orderData.orderNumber,
    }),
  });
  
  const { clientSecret } = await response.json();
  
  // Confirm payment
  const result = await stripe!.confirmCardPayment(clientSecret);
  
  return {
    success: !result.error,
    reference: result.paymentIntent?.id,
  };
}
```

## 📧 Step 6: Email Notifications (Recommended)

### 6.1 Choose email service
- **Resend**: Modern, developer-friendly
- **SendGrid**: Enterprise-grade
- **AWS SES**: Cost-effective

### 6.2 Install email SDK
```bash
npm install resend
```

### 6.3 Create email templates
Create folder: `src/emails/`

**Confirmation email example:**
```typescript
// src/emails/orderConfirmation.ts
export function getOrderConfirmationEmail(order: any) {
  return {
    to: order.customerEmail,
    subject: `Booking Confirmation - ${order.orderNumber}`,
    html: `
      <h1>Booking Confirmed!</h1>
      <p>Dear ${order.customerName},</p>
      <p>Your booking has been confirmed.</p>
      <p><strong>Service:</strong> ${order.serviceName}</p>
      <p><strong>Date:</strong> ${order.bookingDate}</p>
      <p><strong>Time:</strong> ${order.bookingTime}</p>
      <p><strong>Order Number:</strong> ${order.orderNumber}</p>
    `,
  };
}
```

### 6.4 Send email after order creation
Update your API route to send emails:

```typescript
import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);

// After creating order
await resend.emails.send(getOrderConfirmationEmail(order));
```

## 🔐 Step 7: Environment Variables

Add to your `.env` file:

```env
# Database (already configured)
DATABASE_URL="your_database_url"

# Payment Gateway
NEXT_PUBLIC_STRIPE_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."

# Email Service
RESEND_API_KEY="re_..."

# API Base URL
NEXT_PUBLIC_CMS_API_URL="http://localhost:3000"
```

## 🧪 Step 8: Testing

### 8.1 Test order creation
1. Navigate to a service detail page
2. Fill in customer information
3. Select date and time
4. Click "Proceed to Payment"
5. Verify redirection to success page

### 8.2 Test order retrieval
1. Visit: `/order/success?orderNumber=ORD-XXX&email=customer@email.com`
2. Verify order details display correctly

### 8.3 Test API endpoints
```bash
# Create order
curl -X POST http://localhost:3000/api/public/orders -H "Content-Type: application/json" -d '...'

# Get order
curl http://localhost:3000/api/public/orders?orderNumber=ORD-XXX
```

## 📊 Step 9: Admin Dashboard (Optional)

Create admin routes to manage orders:
- `src/app/admin/orders/page.tsx` - List all orders
- `src/app/admin/orders/[id]/page.tsx` - View order details
- Add filters (status, date range, payment status)
- Add actions (confirm, cancel, refund)

## 🔔 Step 10: Webhooks (For Payment Gateway)

Create webhook endpoint to handle payment confirmations:

```typescript
// src/app/api/webhooks/payment/route.ts
export async function POST(request: Request) {
  const payload = await request.json();
  
  // Verify webhook signature
  // Update order payment status
  // Send confirmation email
  
  return Response.json({ received: true });
}
```

## ✅ Checklist

- [ ] Database schema updated and migrated
- [ ] API routes created and tested
- [ ] Success page created
- [ ] Service detail page updated with booking form
- [ ] Payment gateway integrated (optional)
- [ ] Email notifications configured (optional)
- [ ] Environment variables configured
- [ ] Order system tested end-to-end
- [ ] Admin dashboard created (optional)
- [ ] Webhook endpoint created (optional)

## 🚀 Going Live

Before launching to production:

1. **Security**
   - Enable CORS restrictions
   - Add rate limiting
   - Validate all inputs
   - Use HTTPS only

2. **Payment**
   - Switch to production keys
   - Test with real small amounts
   - Set up webhook endpoints

3. **Monitoring**
   - Set up error tracking (Sentry)
   - Monitor order creation success rate
   - Track payment failures

4. **Backup**
   - Regular database backups
   - Order data retention policy

## 📚 Resources

- [Prisma Documentation](https://www.prisma.io/docs)
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [Stripe Integration](https://stripe.com/docs)
- [Resend Email](https://resend.com/docs)

## 🆘 Troubleshooting

**Order creation fails:**
- Check database connection
- Verify service exists and is active
- Check required fields validation

**Payment not processing:**
- Verify payment gateway credentials
- Check webhook configuration
- Review payment gateway logs

**Emails not sending:**
- Verify email service credentials
- Check spam folders
- Review email service logs

---

Need help? Contact your development team or refer to the documentation.