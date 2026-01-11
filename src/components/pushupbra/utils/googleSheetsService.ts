// Google Sheets Integration Service for Push Up Bra
// Sends form data to Google Sheets via secure server-side API

interface OrderData {
  sku?: string;
  color: string;
  size?: string;
  name: string;
  phone: string;
  city?: string;
  address?: string;
  orderType: string;
  deliveryLocation?: string;
  price: number;
  deliveryCharge?: number;
  grandTotal?: number;
  orderId?: string;
  ip?: string;
  userAgent?: string;
  fbp?: string;
  fbc?: string;
}

// Cookie helper
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

// Get Facebook Browser ID
export const getFbp = (): string => {
  return getCookie('_fbp');
};

// Get Facebook Click ID
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
    
    return sessionStorage.getItem('fbc_fallback') || '';
  } catch {
    return '';
  }
};

// Send to Google Sheets via secure API
export const sendToGoogleSheet = async (data: OrderData): Promise<boolean> => {
  try {
    const orderId = data.orderId || `pushupbra_${data.phone}_${Date.now()}`;
    
    const response = await fetch('/api/notifications/sheets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        orderId: orderId,
        orderType: data.orderType === 'buy' ? 'Purchase' : 'Inquiry',
        productSKU: data.sku || 'Seetara Push Up Bra',
        productColor: `${data.color}${data.size ? ` - ${data.size}` : ''}`,
        customerName: data.name,
        customerPhone: data.phone,
        city: data.city || 'N/A',
        address: data.address || 'N/A',
        deliveryLocation: data.deliveryLocation || 'N/A',
        itemPrice: data.price,
        deliveryCharge: data.deliveryCharge || 0,
        grandTotal: data.grandTotal || data.price,
        fbp: data.fbp || getFbp(),
        fbc: data.fbc || getFbc(),
      }),
    });
    
    return response.ok;
  } catch (error) {
    console.error('Error sending to Google Sheets:', error);
    return false;
  }
};

// WhatsApp redirect with pre-filled message
export const redirectToWhatsApp = (data: OrderData, whatsappNumber: string): void => {
  let message: string;
  
  if (data.orderType === 'buy') {
    message = `Namaste Seetara Team 🙏

Maile hajurko website bata order place gareko chu.

*Order Details:*
• *Name:* ${data.name}
• *Phone:* ${data.phone}
• *Product:* Seetara Push Up Bra
• *Color:* ${data.color}
• *Size:* ${data.size || 'N/A'}
• *Address:* ${data.address}, ${data.city}
• *Total:* Rs. ${data.grandTotal}

Please confirm my order. Thank you!`;
  } else {
    message = `Namaste Seetara Team 🙏

Maile website ma Push Up Bra dekhe. Malai details chahiyo.

• *Name:* ${data.name}
• *Phone:* ${data.phone}

Please contact me. Thank you!`;
  }

  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodedMessage}`;
  
  window.open(whatsappUrl, '_blank');
};
