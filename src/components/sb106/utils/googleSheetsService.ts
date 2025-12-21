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
 * Specifically detects Facebook/Messenger in-app browser which blocks WhatsApp
 */
const isFacebookInAppBrowser = (): boolean => {
  if (typeof navigator === 'undefined') return false;
  
  const userAgent = navigator.userAgent || '';
  const ua = userAgent.toUpperCase();
  
  return ua.includes('FBAN') || 
         ua.includes('FBAV') || 
         ua.includes('FB_IAB') || 
         ua.includes('MESSENGER') ||
         ua.includes('INSTAGRAM');
};

/**
 * Shows a modal for Facebook in-app browser users with options to open WhatsApp
 */
const showFacebookBrowserModal = (whatsappUrl: string, message: string): void => {
  // Create modal overlay
  const overlay = document.createElement('div');
  overlay.id = 'whatsapp-modal-overlay';
  overlay.style.cssText = `
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.7);
    backdrop-filter: blur(4px);
    z-index: 10000;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    animation: fadeIn 0.3s ease;
  `;

  const modal = document.createElement('div');
  modal.style.cssText = `
    background: white;
    border-radius: 20px;
    padding: 24px;
    max-width: 340px;
    width: 100%;
    text-align: center;
    box-shadow: 0 20px 60px rgba(0,0,0,0.3);
    animation: slideUp 0.3s ease;
  `;

  modal.innerHTML = `
    <div style="width: 60px; height: 60px; background: #25D366; border-radius: 50%; margin: 0 auto 16px; display: flex; align-items: center; justify-content: center;">
      <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    </div>
    <h3 style="margin: 0 0 8px; font-size: 20px; font-weight: 700; color: #1a1a1a;">WhatsApp मा Open गर्नुहोस्</h3>
    <p style="margin: 0 0 20px; font-size: 14px; color: #666; line-height: 1.5;">
      Facebook browser ले WhatsApp direct open गर्न सक्दैन। तल को button click गर्नुहोस्।
    </p>
    
    <a href="${whatsappUrl}" target="_blank" rel="noopener noreferrer" style="
      display: block;
      background: #25D366;
      color: white;
      padding: 14px 20px;
      border-radius: 12px;
      text-decoration: none;
      font-weight: 600;
      font-size: 16px;
      margin-bottom: 12px;
    ">
      📱 WhatsApp Open गर्नुहोस्
    </a>
    
    <button id="copy-msg-btn" style="
      width: 100%;
      background: #f5f5f5;
      color: #333;
      padding: 14px 20px;
      border-radius: 12px;
      border: none;
      font-weight: 600;
      font-size: 14px;
      cursor: pointer;
      margin-bottom: 12px;
    ">
      📋 Message Copy गर्नुहोस्
    </button>
    
    <button id="close-modal-btn" style="
      width: 100%;
      background: transparent;
      color: #999;
      padding: 10px;
      border: none;
      font-size: 14px;
      cursor: pointer;
    ">
      Close
    </button>
    
    <p style="margin: 16px 0 0; font-size: 12px; color: #999;">
      💡 Tip: Browser को menu बाट "Open in Safari/Chrome" मा click गर्नुहोस्
    </p>
  `;

  overlay.appendChild(modal);
  document.body.appendChild(overlay);

  // Add event listeners
  const copyBtn = document.getElementById('copy-msg-btn');
  const closeBtn = document.getElementById('close-modal-btn');

  copyBtn?.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(message);
      copyBtn.textContent = '✅ Copied!';
      copyBtn.style.background = '#d4edda';
      copyBtn.style.color = '#155724';
      setTimeout(() => {
        copyBtn.textContent = '📋 Message Copy गर्नुहोस्';
        copyBtn.style.background = '#f5f5f5';
        copyBtn.style.color = '#333';
      }, 2000);
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = message;
      textArea.style.position = 'fixed';
      textArea.style.left = '-9999px';
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      copyBtn.textContent = '✅ Copied!';
    }
  });

  closeBtn?.addEventListener('click', () => {
    overlay.remove();
  });

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      overlay.remove();
    }
  });
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
  
  // Special handling for Facebook/Messenger in-app browser
  // These browsers block WhatsApp redirects, so show a modal with options
  if (isFacebookInAppBrowser()) {
    showFacebookBrowserModal(whatsappApiUrl, message);
    return;
  }
  
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
 */
export const handleOrderSubmission = async (
  data: OrderData,
  config: {
    googleScriptUrl?: string;
    whatsappNumber: string;
  }
): Promise<void> => {
  // Send to Google Sheets
  if (config.googleScriptUrl) {
    await sendToGoogleSheet(data, config.googleScriptUrl);
  }
  
  // Redirect to WhatsApp
  redirectToWhatsApp(data, config.whatsappNumber);
};

