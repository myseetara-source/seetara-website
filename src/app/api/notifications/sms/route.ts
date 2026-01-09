import { NextRequest, NextResponse } from 'next/server';

/**
 * SECURE SMS API Endpoint
 * 
 * This endpoint handles SMS sending server-side to protect the API token.
 * The token is NEVER exposed to the browser.
 * 
 * Rate Limited: 10 requests per minute per IP
 */

const SMS_API_URL = 'https://sms.aakashsms.com/sms/v3/send';

// Simple in-memory rate limiting (use Redis in production for multiple instances)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 10; // Max 10 requests per minute

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  
  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }
  
  if (record.count >= RATE_LIMIT_MAX) {
    return false;
  }
  
  record.count++;
  return true;
}

function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  
  if (realIp) {
    return realIp;
  }
  
  return 'unknown';
}

// Clean phone number
function cleanPhoneNumber(phone: string): string {
  let cleaned = phone.trim().replace(/\s/g, '');
  if (cleaned.startsWith('+977')) {
    cleaned = cleaned.substring(4);
  } else if (cleaned.startsWith('977') && cleaned.length > 10) {
    cleaned = cleaned.substring(3);
  }
  return cleaned;
}

// Validate phone number (Nepal format)
function isValidNepalPhone(phone: string): boolean {
  const cleaned = cleanPhoneNumber(phone);
  return /^(98|97|96)\d{8}$/.test(cleaned);
}

interface SMSRequestBody {
  customerPhone: string;
  customerName: string;
  orderType: 'buy' | 'inquiry';
  productName: string;
  productColor: string;
  grandTotal?: number;
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const clientIP = getClientIP(request);
    if (!checkRateLimit(clientIP)) {
      return NextResponse.json(
        { success: false, error: 'Too many requests. Please wait a moment.' },
        { status: 429 }
      );
    }

    // Get SMS token from server-side env (NOT exposed to browser)
    const smsAuthToken = process.env.AAKASH_SMS_TOKEN;
    const salesNumbers = process.env.SALES_NUMBERS?.split(',') || [];

    if (!smsAuthToken) {
      console.error('SMS token not configured');
      return NextResponse.json(
        { success: false, error: 'SMS service not configured' },
        { status: 500 }
      );
    }

    const body: SMSRequestBody = await request.json();
    const { customerPhone, customerName, orderType, productName, productColor, grandTotal } = body;

    // Validate required fields
    if (!customerPhone || !customerName || !productColor) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate phone number
    if (!isValidNepalPhone(customerPhone)) {
      return NextResponse.json(
        { success: false, error: 'Invalid phone number format' },
        { status: 400 }
      );
    }

    const cleanedCustomerPhone = cleanPhoneNumber(customerPhone);

    // Create messages
    let customerMessage: string;
    let salesMessage: string;

    if (orderType === 'inquiry') {
      customerMessage = `Dear ${customerName} Ji,

Your inquiry has been successfully received.

Product: ${productName}
Color- ${productColor}

Our team will contact you soon.

- Seetara`;

      salesMessage = `A new inquiry has been placed on website.

Name: ${customerName}
Number: ${customerPhone}
Product: ${productName} - ${productColor}

Call the customer immediately!`;
    } else {
      customerMessage = `Dear ${customerName} Ji, Your order has been successfully received.

Product: ${productName}
Color- ${productColor}
COD: Rs. ${grandTotal}/-

-Seetara`;

      salesMessage = `A new order has been placed on website.

Name: ${customerName}
Number: ${customerPhone}
Product: ${productName} - ${productColor}
Amount: Rs. ${grandTotal}

Call the customer immediately!`;
    }

    const results = {
      customer: null as unknown,
      salesTeam: null as unknown,
      success: false,
    };

    // Send SMS to customer
    try {
      const formData = new URLSearchParams();
      formData.append('auth_token', smsAuthToken);
      formData.append('to', cleanedCustomerPhone);
      formData.append('text', customerMessage);

      const customerResponse = await fetch(SMS_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formData,
      });

      results.customer = await customerResponse.json();
    } catch (err) {
      console.error('Customer SMS failed:', err);
    }

    // Send SMS to sales team
    if (salesNumbers.length > 0) {
      try {
        const cleanedSalesNumbers = salesNumbers.map(cleanPhoneNumber).join(',');
        
        const formData = new URLSearchParams();
        formData.append('auth_token', smsAuthToken);
        formData.append('to', cleanedSalesNumbers);
        formData.append('text', salesMessage);

        const salesResponse = await fetch(SMS_API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: formData,
        });

        results.salesTeam = await salesResponse.json();
      } catch (err) {
        console.error('Sales team SMS failed:', err);
      }
    }

    results.success = true;

    return NextResponse.json({
      success: true,
      message: 'Notifications sent',
    });

  } catch (error) {
    console.error('SMS API error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to send notifications' },
      { status: 500 }
    );
  }
}

