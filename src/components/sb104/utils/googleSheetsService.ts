// Google Sheets Integration Service
// This sends form data to Google Sheets via Google Apps Script Web App
// Includes advanced Meta CAPI tracking parameters for improved Event Match Quality

interface OrderData {
  sku?: string;
  color: string;
  name: string;
  phone: string;
  city?: string;
  address?: string;
  orderType: string;
  deliveryLocation?: string;
  price: number;
  deliveryCharge?: number;
  grandTotal?: number;
  orderId?: string; // For deduplication with Meta Pixel
  // Advanced Meta CAPI tracking parameters
  ip?: string;
  userAgent?: string;
  fbp?: string; // Browser ID from _fbp cookie
  fbc?: string; // Click ID from _fbc cookie or URL fbclid
}

// ============================================
// META CAPI TRACKING HELPER FUNCTIONS
// ============================================

/**
 * Reads a cookie value by name
 * Used to extract _fbp and _fbc cookies for Meta CAPI
 */
export const getCookie = (name: string): string => {
  if (typeof document === 'undefined') return '';
  
  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.trim().split('=');
    if (cookieName === name) {
      return decodeURIComponent(cookieValue || '');
    }
  }
  return '';
};

/**
 * Fetches the user's IP address from ipify API
 * Returns empty string if fetch fails (non-blocking)
 * Includes 2-second timeout to prevent order from hanging
 */
export const getIpAddress = async (): Promise<string> => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);
    
    const response = await fetch('https://api.ipify.org?format=json', {
      method: 'GET',
      signal: controller.signal,
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) return '';
    
    const data = await response.json();
    return data.ip || '';
  } catch {
    return '';
  }
};

/**
 * Gets the user agent string
 */
export const getUserAgent = (): string => {
  if (typeof navigator === 'undefined') return '';
  return navigator.userAgent || '';
};

/**
 * Gets the Facebook Browser ID (_fbp cookie)
 */
export const getFbp = (): string => {
  return getCookie('_fbp');
};

/**
 * Gets the Facebook Click ID (_fbc cookie or constructed from URL fbclid)
 * Includes sessionStorage fallback for page navigation
 */
export const getFbc = (): string => {
  const fbcCookie = getCookie('_fbc');
  if (fbcCookie) return fbcCookie;
  
  if (typeof window === 'undefined') return '';
  
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const fbclid = urlParams.get('fbclid');
    
    if (fbclid) {
      const fbcValue = `fb.1.${Date.now()}.${fbclid}`;
      sessionStorage.setItem('fbc_fallback', fbcValue);
      return fbcValue;
    }
    
    // Fallback: check sessionStorage
    return sessionStorage.getItem('fbc_fallback') || '';
  } catch {
    return '';
  }
};

/**
 * Gathers all Meta CAPI tracking parameters
 */
export const gatherMetaTrackingParams = async (): Promise<{
  ip: string;
  userAgent: string;
  fbp: string;
  fbc: string;
}> => {
  const [ip] = await Promise.all([getIpAddress()]);
  
  return {
    ip,
    userAgent: getUserAgent(),
    fbp: getFbp(),
    fbc: getFbc(),
  };
};

// ============================================
// GOOGLE SHEETS INTEGRATION
// ============================================

/**
 * Sends order/inquiry data to Google Sheets
 * Includes advanced Meta CAPI tracking parameters
 * 
 * ⚠️ CRITICAL FOR DEDUPLICATION:
 * The orderId sent here MUST be stored in BOTH Column A (Order ID) AND Column N (Event ID)
 * This same orderId is used by Browser Pixel's eventID for deduplication
 */
export const sendToGoogleSheet = async (data: OrderData, scriptUrl?: string): Promise<boolean> => {
  if (!scriptUrl) {
    console.warn('Google Apps Script URL not configured');
    return false;
  }

  try {
    // CRITICAL: orderId should be passed from the calling component for proper deduplication
    let orderId = data.orderId;
    if (!orderId) {
      orderId = `sb104_${data.phone}_${Date.now()}`;
      console.warn('⚠️ DEDUPLICATION WARNING: orderId was not passed! Generated fallback:', orderId);
    }
    
    // ⚠️ FIX: Send BOTH orderId AND eventId explicitly
    // This ensures Column N (Event ID) gets the correct value for CAPI deduplication
    const sheetData = {
      orderId: orderId, // For Column A (Order ID)
      eventId: orderId, // ⚠️ NEW: Explicitly send for Column N (Event ID) - MUST match browser pixel's eventID!
      timestamp: new Date().toLocaleString('en-US', { timeZone: 'Asia/Kathmandu' }),
      orderType: data.orderType === 'buy' ? 'Purchase' : 'Inquiry',
      productSKU: data.sku || 'Seetara SB104 Multi-Functional Bag',
      color: data.color,
      customerName: data.name,
      phone: data.phone,
      city: data.city || 'N/A',
      address: data.address || 'N/A',
      deliveryLocation: data.deliveryLocation || 'N/A',
      itemPrice: data.price,
      deliveryCharge: data.deliveryCharge || 0,
      grandTotal: data.grandTotal || data.price,
      // Advanced Meta CAPI tracking parameters
      ip: data.ip || '',
      userAgent: data.userAgent || '',
      fbp: data.fbp || '',
      fbc: data.fbc || '',
    };
    
    console.log('📤 SB104 Order - EventID for deduplication:', orderId);

    console.log('Sending to Google Sheets:', sheetData);

    // FIX: Use text/plain to avoid CORS preflight issues
    const response = await fetch(scriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(sheetData),
      redirect: 'follow',
    });

    console.log('Data sent to Google Sheets, status:', response.status);
    return true;
  } catch (error) {
    console.error('Error sending to Google Sheets:', error);
    
    // Fallback: Try with sendBeacon
    try {
      const orderId = data.orderId || `sb104_${data.phone}_${Date.now()}`;
      const sheetData = {
        orderId, 
        eventId: orderId, // ⚠️ FIX: Include eventId for deduplication
        timestamp: new Date().toLocaleString('en-US', { timeZone: 'Asia/Kathmandu' }),
        orderType: data.orderType === 'buy' ? 'Purchase' : 'Inquiry',
        productSKU: data.sku || 'Seetara SB104 Multi-Functional Bag', color: data.color,
        customerName: data.name, phone: data.phone, city: data.city || 'N/A',
        grandTotal: data.grandTotal || data.price,
        ip: data.ip || '', userAgent: data.userAgent || '',
        fbp: data.fbp || '', fbc: data.fbc || '',
      };
      navigator.sendBeacon(scriptUrl, JSON.stringify(sheetData));
      console.log('Fallback: Data sent via sendBeacon with eventId:', orderId);
      return true;
    } catch {
      return false;
    }
  }
};

/**
 * Detects if the user is on a mobile device
 */
const isMobileDevice = (): boolean => {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') return false;
  
  const userAgent = navigator.userAgent || navigator.vendor || (window as unknown as { opera?: string }).opera || '';
  
  const mobileRegex = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini|mobile|tablet/i;
  
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  const isSmallScreen = window.innerWidth <= 768;
  
  return mobileRegex.test(userAgent.toLowerCase()) || (isTouchDevice && isSmallScreen);
};

/**
 * Opens WhatsApp with pre-filled order/inquiry details message
 */
export const redirectToWhatsApp = (data: OrderData, whatsappNumber: string): void => {
  let message: string;
  
  if (data.orderType === 'buy') {
    message = `Namaste Seetara Team

Maile hajurko website bata bharkharai order place gareko chu. Please mero order confirm garidinus hola.

*Mero Order Details:*
• *Name:* ${data.name}
• *Phone:* ${data.phone}
• *Product:* Seetara Multi-Functional Bag (SB104)
• *Color:* ${data.color}
• *Address:* ${data.address}, ${data.city}
• *Total Amount:* Rs. ${data.grandTotal}

Yo order kahile samma delivery huncha hola? Thank you!`;
  } else {
    message = `Namaste Seetara Team

Maile hajurko website ma *${data.color}* color ko *Seetara Multi-Functional Bag* dekhe. Malai yo product barema kehi janna thiyo.

*Mero Details:*
• *Name:* ${data.name}
• *Phone:* ${data.phone}

Kripaya malai yo product ko barema thap janakari dinuhola. Thank you!`;
  }

  const encodedMessage = encodeURIComponent(message);
  
  const whatsappApiUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodedMessage}`;
  const whatsappWaUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
  
  if (isMobileDevice()) {
    const isAndroid = /android/i.test(navigator.userAgent);
    const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
    
    if (isAndroid) {
      const intentUrl = `intent://send?phone=${whatsappNumber}&text=${encodedMessage}#Intent;scheme=whatsapp;package=com.whatsapp;end`;
      
      try {
        window.location.href = intentUrl;
        setTimeout(() => {
          window.location.href = whatsappApiUrl;
        }, 1500);
      } catch {
        window.location.href = whatsappApiUrl;
      }
    } else if (isIOS) {
      const whatsappSchemeUrl = `whatsapp://send?phone=${whatsappNumber}&text=${encodedMessage}`;
      
      window.location.href = whatsappSchemeUrl;
      
      setTimeout(() => {
        if (!document.hidden) {
          window.location.href = whatsappApiUrl;
        }
      }, 2000);
    } else {
      window.location.href = whatsappApiUrl;
    }
  } else {
    const newWindow = window.open(whatsappWaUrl, '_blank');
    
    if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
      window.location.href = whatsappWaUrl;
    }
  }
};

/**
 * Handles the complete submission flow
 * Automatically gathers Meta CAPI tracking parameters before submission
 */
export const handleOrderSubmission = async (
  data: OrderData,
  config: {
    googleScriptUrl?: string;
    whatsappNumber?: string;
    messengerPageId?: string;
  }
): Promise<void> => {
  if (config.googleScriptUrl) {
    const trackingParams = await gatherMetaTrackingParams();
    
    const enrichedData: OrderData = {
      ...data,
      ip: trackingParams.ip,
      userAgent: trackingParams.userAgent,
      fbp: trackingParams.fbp,
      fbc: trackingParams.fbc,
    };
    
    console.log('Meta CAPI tracking params gathered:', {
      ip: trackingParams.ip ? '✓' : '✗',
      userAgent: trackingParams.userAgent ? '✓' : '✗',
      fbp: trackingParams.fbp ? '✓' : '✗',
      fbc: trackingParams.fbc ? '✓' : '✗',
    });
    
    await sendToGoogleSheet(enrichedData, config.googleScriptUrl);
  }
};

