// Google Sheets Integration Service
// This sends form data to Google Sheets via Google Apps Script Web App

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
}

/**
 * Sends order/inquiry data to Google Sheets
 */
export const sendToGoogleSheet = async (data: OrderData, scriptUrl?: string): Promise<boolean> => {
  if (!scriptUrl) {
    console.warn('Google Apps Script URL not configured');
    return false;
  }

  try {
    // Generate orderId for deduplication (same format as FB Pixel eventId)
    const orderId = data.orderId || `sb106_${data.phone}_${Date.now()}`;
    
    const sheetData = {
      orderId: orderId, // IMPORTANT: For Meta Pixel deduplication
      timestamp: new Date().toLocaleString('en-US', { timeZone: 'Asia/Kathmandu' }),
      orderType: data.orderType === 'buy' ? 'Purchase' : 'Inquiry',
      productSKU: data.sku || 'Seetara Viral Chain Bag',
      color: data.color,
      customerName: data.name,
      phone: data.phone,
      city: data.city || 'N/A',
      address: data.address || 'N/A',
      deliveryLocation: data.deliveryLocation || 'N/A',
      itemPrice: data.price,
      deliveryCharge: data.deliveryCharge || 0,
      grandTotal: data.grandTotal || data.price,
    };

    console.log('Sending to Google Sheets:', sheetData);

    const response = await fetch(scriptUrl, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sheetData),
    });

    console.log('Data sent to Google Sheets successfully');
    return true;
  } catch (error) {
    console.error('Error sending to Google Sheets:', error);
    return false;
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
• Product: Seetara Chain Bag
• Color: ${data.color}
• Address: ${data.address}, ${data.city}
• Total: Rs. ${data.grandTotal}

Delivery kahile huncha? Thank you!`;
  } else {
    message = `Namaste Seetara Team

Maile hajurko website ma ${data.color} color ko Seetara Chain Bag dekhe. Malai yo product barema janna cha.

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
• *Product:* Seetara Chain Bag
• *Color:* ${data.color}
• *Address:* ${data.address}, ${data.city}
• *Total Amount:* Rs. ${data.grandTotal}

Yo order kahile samma delivery huncha hola? Thank you!`;
  } else {
    message = `Namaste Seetara Team

Maile hajurko website ma *${data.color}* color ko *Seetara Chain Bag* dekhe. Malai yo product barema kehi janna thiyo.

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
    await sendToGoogleSheet(data, config.googleScriptUrl);
  }
};

