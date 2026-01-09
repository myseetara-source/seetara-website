import { NextRequest, NextResponse } from 'next/server';

/**
 * SECURE Google Sheets API Endpoint
 * 
 * This endpoint handles Google Sheets submission server-side.
 * The Script URL is NEVER exposed to the browser.
 * 
 * Rate Limited: 10 requests per minute per IP
 */

// Simple in-memory rate limiting
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

// Validate phone number (Nepal format)
function isValidNepalPhone(phone: string): boolean {
  const cleaned = phone.trim().replace(/\s/g, '').replace(/^\+977/, '').replace(/^977/, '');
  return /^(98|97|96)\d{8}$/.test(cleaned);
}

interface SheetRequestBody {
  orderId: string;
  orderType: 'buy' | 'inquiry';
  productSKU: string;
  productColor: string;
  customerName: string;
  customerPhone: string;
  city?: string;
  address?: string;
  deliveryLocation?: string;
  itemPrice: number;
  deliveryCharge?: number;
  grandTotal: number;
  // Meta tracking params (optional)
  fbp?: string;
  fbc?: string;
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

    // Get Google Script URL from server-side env (NOT exposed to browser)
    const googleScriptUrl = process.env.GOOGLE_SCRIPT_URL;

    if (!googleScriptUrl) {
      console.error('Google Script URL not configured');
      return NextResponse.json(
        { success: false, error: 'Sheets service not configured' },
        { status: 500 }
      );
    }

    const body: SheetRequestBody = await request.json();
    const { 
      orderId, 
      orderType, 
      productSKU, 
      productColor, 
      customerName, 
      customerPhone,
      city,
      address,
      deliveryLocation,
      itemPrice,
      deliveryCharge,
      grandTotal,
      fbp,
      fbc
    } = body;

    // Validate required fields
    if (!orderId || !customerName || !customerPhone || !productColor) {
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

    // Prepare data for Google Sheets
    const sheetData = {
      orderId: orderId,
      eventId: orderId, // For Meta CAPI deduplication
      timestamp: new Date().toLocaleString('en-US', { timeZone: 'Asia/Kathmandu' }),
      orderType: orderType === 'buy' ? 'Purchase' : 'Inquiry',
      productSKU: productSKU,
      color: productColor,
      customerName: customerName,
      phone: customerPhone,
      city: city || 'N/A',
      address: address || 'N/A',
      deliveryLocation: deliveryLocation || 'N/A',
      itemPrice: itemPrice,
      deliveryCharge: deliveryCharge || 0,
      grandTotal: grandTotal,
      // Meta CAPI params
      ip: clientIP,
      userAgent: request.headers.get('user-agent') || '',
      fbp: fbp || '',
      fbc: fbc || '',
    };

    // Send to Google Sheets
    const response = await fetch(googleScriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(sheetData),
      redirect: 'follow',
    });

    if (!response.ok) {
      console.error('Google Sheets request failed:', response.status);
      return NextResponse.json(
        { success: false, error: 'Failed to save to sheets' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Order saved to sheets',
      orderId: orderId,
    });

  } catch (error) {
    console.error('Sheets API error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to save order' },
      { status: 500 }
    );
  }
}

