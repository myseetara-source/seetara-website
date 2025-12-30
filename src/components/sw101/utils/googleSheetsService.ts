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
    const sheetData = {
      timestamp: new Date().toLocaleString('en-US', { timeZone: 'Asia/Kathmandu' }),
      orderType: data.orderType === 'buy' ? 'Purchase' : 'Inquiry',
      productSKU: data.sku || 'Seetara SW101 Smart Wallet',
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

    await fetch(scriptUrl, {
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
  
  const mobileRegex = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini|mobile|tablet/i;
  
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
  
  const inAppBrowserPatterns = [
    'FBAN', 'FBAV', 'FB_IAB', 'MESSENGER', 'Instagram', 
    'Twitter', 'Line', 'KAKAOTALK', 'Snapchat', 'WebView',
  ];
  
  return inAppBrowserPatterns.some(pattern => 
    userAgent.toUpperCase().includes(pattern.toUpperCase())
  );
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
• *Product:* Seetara Smart Wallet (SW101)
• *Color:* ${data.color}
• *Address:* ${data.address}, ${data.city}
• *Total Amount:* Rs. ${data.grandTotal}

Yo order kahile samma delivery huncha hola? Thank you!`;
  } else {
    message = `Namaste Seetara Team

Maile hajurko website ma *${data.color}* color ko *Seetara Smart Wallet* dekhe. Malai yo product barema kehi janna thiyo.

*Mero Details:*
• *Name:* ${data.name}
• *Phone:* ${data.phone}

Kripaya malai yo product ko barema thap janakari dinuhola. Thank you!`;
  }

  const encodedMessage = encodeURIComponent(message);
  const whatsappApiUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodedMessage}`;
  const whatsappWaUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
  
  if (isMobileDevice() || isInAppBrowser()) {
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
    await sendToGoogleSheet(data, config.googleScriptUrl);
  }
};

