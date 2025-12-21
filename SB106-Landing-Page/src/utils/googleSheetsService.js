// Google Sheets Integration Service
// This sends form data to Google Sheets via Google Apps Script Web App

// IMPORTANT: Replace this URL with your deployed Google Apps Script Web App URL
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyB7iaRGjJMkao7TEMOmVE90bfxSsHwlycxSRBwKGibqSS2zdoSY0wMMw15Zed8TG3mXw/exec';

/**
 * Sends order/inquiry data to Google Sheets
 * @param {Object} data - The form data to send
 * @returns {Promise<boolean>} - Success status
 */
export const sendToGoogleSheet = async (data) => {
  try {
    // Format the data for Google Sheets
    const sheetData = {
      timestamp: new Date().toLocaleString('en-US', { timeZone: 'Asia/Kathmandu' }),
      orderType: data.orderType === 'buy' ? 'Purchase' : 'Inquiry',
      productSKU: data.sku || 'Seetara Viral Chain Bag', // Product SKU
      color: data.color, // Color name only (Brown, Black, Maroon, Coffee)
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

    // Check if the script URL is configured
    if (GOOGLE_SCRIPT_URL === 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE') {
      console.warn('Google Apps Script URL not configured. Please update GOOGLE_SCRIPT_URL in googleSheetsService.js');
      return false;
    }

    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors', // Required for Google Apps Script
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
 * Opens WhatsApp with pre-filled order/inquiry details message
 * @param {Object} data - The order/inquiry data
 */
export const redirectToWhatsApp = (data) => {
  const whatsappNumber = '9779802359033'; // Seetara Business WhatsApp
  
  let message;
  
  if (data.orderType === 'buy') {
    // Message for Purchase orders
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
    // Message for Inquiry
    message = `Namaste Seetara Team

Maile hajurko website ma *${data.color}* color ko *Seetara Chain Bag* dekhe. Malai yo product barema kehi janna thiyo.

*Mero Details:*
• *Name:* ${data.name}
• *Phone:* ${data.phone}

Kripaya malai yo product ko barema thap janakari dinuhola. Thank you!`;
  }

  // Encode the message for URL
  const encodedMessage = encodeURIComponent(message);
  
  // Create WhatsApp URL
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
  
  // Open WhatsApp in new tab
  window.open(whatsappUrl, '_blank');
};

/**
 * Handles the complete submission flow:
 * 1. Sends data to Google Sheets
 * 2. Redirects to WhatsApp (for both buy and inquiry)
 * @param {Object} data - The complete order data
 */
export const handleOrderSubmission = async (data) => {
  // Always send to Google Sheets (both buy and inquiry)
  await sendToGoogleSheet(data);
  
  // Redirect to WhatsApp for both buy and inquiry
  redirectToWhatsApp(data);
};

