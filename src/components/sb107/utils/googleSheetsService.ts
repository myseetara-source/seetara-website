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
      orderId = `sb107_${data.phone}_${Date.now()}`;
      console.warn('⚠️ DEDUPLICATION WARNING: orderId was not passed! Generated fallback:', orderId);
    }
    
    // ⚠️ FIX: Send BOTH orderId AND eventId explicitly
    // This ensures Column N (Event ID) gets the correct value for CAPI deduplication
    const sheetData = {
      orderId: orderId, // For Column A (Order ID)
      eventId: orderId, // ⚠️ Explicitly send for Column N (Event ID) - MUST match browser pixel's eventID!
      timestamp: new Date().toLocaleString('en-US', { timeZone: 'Asia/Kathmandu' }),
      orderType: data.orderType === 'buy' ? 'Purchase' : 'Inquiry',
      productSKU: data.sku || 'Seetara SB107 Product',
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
    
    console.log('📤 SB107 Order - EventID for deduplication:', orderId);

    console.log('Sending to Google Sheets:', sheetData);

    // FIX: Use text/plain to avoid CORS preflight issues
    // Google Apps Script can still parse JSON from text/plain body
    const response = await fetch(scriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(sheetData),
      redirect: 'follow', // Important for Google Apps Script redirects
    });

    console.log('Data sent to Google Sheets, status:', response.status);
    return true;
  } catch (error) {
    console.error('Error sending to Google Sheets:', error);
    
    // Fallback: Try with sendBeacon for reliability
    try {
      const orderId = data.orderId || `sb107_${data.phone}_${Date.now()}`;
      const sheetData = {
        orderId, 
        eventId: orderId, // ⚠️ FIX: Include eventId for deduplication
        timestamp: new Date().toLocaleString('en-US', { timeZone: 'Asia/Kathmandu' }),
        orderType: data.orderType === 'buy' ? 'Purchase' : 'Inquiry',
        productSKU: data.sku || 'Seetara SB107 Product', color: data.color,
        customerName: data.name, phone: data.phone, city: data.city || 'N/A',
        grandTotal: data.grandTotal || data.price,
        ip: data.ip || '', userAgent: data.userAgent || '',
        fbp: data.fbp || '', fbc: data.fbc || '',
      };
      navigator.sendBeacon(scriptUrl, JSON.stringify(sheetData));
      console.log('Fallback: Data sent via sendBeacon with eventId:', orderId);
      return true;
    } catch (beaconError) {
      console.error('Beacon also failed:', beaconError);
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
  
  // Check for common mobile indicators
  const mobileRegex = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini|mobile|tablet/i;
  
  // Also check for touch capability and screen size
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  const isSmallScreen = window.innerWidth <= 768;
  
  return mobileRegex.test(userAgent.toLowerCase()) || (isTouchDevice && isSmallScreen);
};

/**
 * Detects if running inside an in-app browser (Facebook, Instagram, Messenger, etc.)
 */
const isInAppBrowser = (): boolean => {
  if (typeof navigator === 'undefined') return false;
  
  const userAgent = navigator.userAgent || '';
  
  // Common in-app browser identifiers
  const inAppBrowserPatterns = [
    'FBAN',      // Facebook App
    'FBAV',      // Facebook App Version
    'FB_IAB',    // Facebook In-App Browser
    'MESSENGER', // Facebook Messenger
    'Instagram', // Instagram
    'Twitter',   // Twitter
    'Line',      // Line App
    'KAKAOTALK', // KakaoTalk
    'Snapchat',  // Snapchat
    'WebView',   // Generic WebView
  ];
  
  return inAppBrowserPatterns.some(pattern => 
    userAgent.toUpperCase().includes(pattern.toUpperCase())
  );
};

/**
 * Detects if running inside Facebook ecosystem (Facebook, Messenger, Instagram)
 */
const isInFacebookEcosystem = (): boolean => {
  if (typeof navigator === 'undefined') return false;
  
  const userAgent = navigator.userAgent || '';
  
  // Facebook ecosystem identifiers - WhatsApp links are often blocked here
  const facebookPatterns = [
    'FBAN',      // Facebook App
    'FBAV',      // Facebook App Version  
    'FB_IAB',    // Facebook In-App Browser
    'MESSENGER', // Facebook Messenger
    'Instagram', // Instagram (owned by Meta/Facebook)
  ];
  
  return facebookPatterns.some(pattern => 
    userAgent.toUpperCase().includes(pattern.toUpperCase())
  );
};

/**
 * Opens Facebook Messenger with pre-filled order/inquiry details
 * Uses m.me link format
 */
export const redirectToMessenger = (data: OrderData, messengerPageId: string): void => {
  let message: string;
  
  if (data.orderType === 'buy') {
    message = `Namaste Seetara Team

Maile hajurko website bata order place gareko chu. Please mero order confirm garidinus.

*Order Details:*
• Name: ${data.name}
• Phone: ${data.phone}
• Product: Seetara SB107
• Color: ${data.color}
• Address: ${data.address}, ${data.city}
• Total: Rs. ${data.grandTotal}

Delivery kahile huncha? Thank you!`;
  } else {
    message = `Namaste Seetara Team

Maile hajurko website ma ${data.color} color ko Seetara SB107 dekhe. Malai yo product barema janna cha.

• Name: ${data.name}
• Phone: ${data.phone}

Kripaya details dinuhola. Thank you!`;
  }

  const encodedMessage = encodeURIComponent(message);
  
  // m.me link with ref parameter for pre-filled message context
  // Note: Messenger doesn't support pre-filled text directly like WhatsApp
  // But we can use ref parameter for tracking and the user will see the page
  const messengerUrl = `https://m.me/${messengerPageId}`;
  
  // For better UX, we also store the message to clipboard
  if (typeof navigator !== 'undefined' && navigator.clipboard) {
    navigator.clipboard.writeText(message).catch(() => {
      // Clipboard write failed silently
    });
  }
  
  // Open Messenger
  window.location.href = messengerUrl;
};

/**
 * Opens WhatsApp with pre-filled order/inquiry details message
 * Uses different strategies for mobile vs desktop and handles in-app browsers
 */
export const redirectToWhatsApp = (data: OrderData, whatsappNumber: string): void => {
  let message: string;
  
  if (data.orderType === 'buy') {
    message = `Namaste Seetara Team

Maile hajurko website bata bharkharai order place gareko chu. Please mero order confirm garidinus hola.

*Mero Order Details:*
• *Name:* ${data.name}
• *Phone:* ${data.phone}
• *Product:* Seetara SB107
• *Color:* ${data.color}
• *Address:* ${data.address}, ${data.city}
• *Total Amount:* Rs. ${data.grandTotal}

Yo order kahile samma delivery huncha hola? Thank you!`;
  } else {
    message = `Namaste Seetara Team

Maile hajurko website ma *${data.color}* color ko *Seetara SB107* dekhe. Malai yo product barema kehi janna thiyo.

*Mero Details:*
• *Name:* ${data.name}
• *Phone:* ${data.phone}

Kripaya malai yo product ko barema thap janakari dinuhola. Thank you!`;
  }

  const encodedMessage = encodeURIComponent(message);
  
  // Use api.whatsapp.com for better mobile compatibility
  const whatsappApiUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodedMessage}`;
  const whatsappWaUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
  
  // For mobile devices or in-app browsers, use location.href for direct navigation
  // This works better than window.open which gets blocked by popup blockers
  if (isMobileDevice() || isInAppBrowser()) {
    // Try intent URL first for Android (opens WhatsApp app directly)
    const isAndroid = /android/i.test(navigator.userAgent);
    const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
    
    if (isAndroid) {
      // Use intent URL for Android - this forces the app to open
      const intentUrl = `intent://send?phone=${whatsappNumber}&text=${encodedMessage}#Intent;scheme=whatsapp;package=com.whatsapp;end`;
      
      // Try to open via intent, fallback to API URL
      try {
        window.location.href = intentUrl;
        // Set a fallback in case intent doesn't work
        setTimeout(() => {
          window.location.href = whatsappApiUrl;
        }, 1500);
      } catch {
        window.location.href = whatsappApiUrl;
      }
    } else if (isIOS) {
      // For iOS, use the universal link which opens WhatsApp directly
      // whatsapp:// scheme works best on iOS
      const whatsappSchemeUrl = `whatsapp://send?phone=${whatsappNumber}&text=${encodedMessage}`;
      
      // Try the app scheme first
      window.location.href = whatsappSchemeUrl;
      
      // Fallback to web URL after short delay if app doesn't open
      setTimeout(() => {
        // Check if page is still visible (app didn't open)
        if (!document.hidden) {
          window.location.href = whatsappApiUrl;
        }
      }, 2000);
    } else {
      // For other mobile devices, use direct navigation
      window.location.href = whatsappApiUrl;
    }
  } else {
    // Desktop: Use window.open for new tab
    const newWindow = window.open(whatsappWaUrl, '_blank');
    
    // Fallback if popup was blocked
    if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
      window.location.href = whatsappWaUrl;
    }
  }
};

/**
 * Handles the complete submission flow
 * Only saves to Google Sheets - no auto-redirect (customer chooses WhatsApp or Messenger on success page)
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
  // Send to Google Sheets only - no auto-redirect
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

