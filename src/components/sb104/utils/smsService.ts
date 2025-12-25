/**
 * Aakash SMS Service - Nepal's Leading Bulk SMS Provider
 * API Documentation: https://sms.aakashsms.com
 * API Version: v3
 */

const API_URL = 'https://sms.aakashsms.com/sms/v3/send';

interface OrderData {
  name: string;
  phone: string;
  color: string;
  orderType: string;
  grandTotal?: number;
}

interface SMSResult {
  customer: any;
  salesTeam: any;
  success: boolean;
  error?: string;
}

/**
 * Sends SMS using Aakash SMS v3 API
 */
const sendSMS = async (to: string, text: string, authToken: string): Promise<any> => {
  try {
    const cleanedTo = to.split(',').map(num => {
      let cleaned = num.trim().replace(/\s/g, '');
      if (cleaned.startsWith('+977')) {
        cleaned = cleaned.substring(4);
      } else if (cleaned.startsWith('977') && cleaned.length > 10) {
        cleaned = cleaned.substring(3);
      }
      return cleaned;
    }).join(',');

    const formData = new URLSearchParams();
    formData.append('auth_token', authToken);
    formData.append('to', cleanedTo);
    formData.append('text', text);

    console.log('📱 Sending SMS to:', cleanedTo);

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData,
    });

    const data = await response.json();
    
    if (data.error === false) {
      console.log('✅ SMS sent successfully!', data.message);
    } else {
      console.error('❌ SMS failed:', data.message);
    }
    
    return data;
  } catch (error) {
    console.error('❌ Failed to send SMS:', error);
    return { error: true, message: (error as Error).message, data: [] };
  }
};

/**
 * Creates customer order confirmation message - Nepali
 */
const createCustomerMessage = (orderData: OrderData): string => {
  const { name, color, grandTotal, orderType } = orderData;
  
  if (orderType === 'inquiry') {
    return `नमस्ते ${name} जी!

तपाईंको Inquiry हामीले पायौं।

Product: Multi-Functional Bag
Color: ${color}

हाम्रो Team ले छिट्टै Call गर्नेछ!

-Seetara Nepal`;
  }
  
  return `नमस्ते ${name} जी!

तपाईंको Order Confirm भयो!

Product: Multi-Functional Bag
Color: ${color}
Total: रु. ${grandTotal}/-

हाम्रो Team ले छिट्टै Call गर्नेछ। धन्यवाद!

-Seetara Nepal`;
};

/**
 * Creates sales team alert message
 */
const createSalesTeamMessage = (orderData: OrderData): string => {
  const { name, phone, color, orderType } = orderData;
  
  const productSKU = `SB104-${color}`;
  
  if (orderType === 'inquiry') {
    return `NEW INQUIRY - SB104!

Name: ${name}
Phone: ${phone}
Product: ${productSKU}

Chado call gara!`;
  }
  
  return `NEW ORDER - SB104!

Name: ${name}
Phone: ${phone}
Product: ${productSKU}

Chado call gara!`;
};

/**
 * Sends order notifications to both customer and sales team
 */
export const sendOrderNotifications = async (
  orderData: OrderData,
  authToken?: string,
  salesNumbers?: string[]
): Promise<SMSResult> => {
  const results: SMSResult = {
    customer: null,
    salesTeam: null,
    success: false,
  };

  if (!authToken) {
    console.warn('SMS Auth token not configured');
    return results;
  }

  try {
    const { phone, name } = orderData;
    
    console.log('🚀 Starting SMS notifications for:', name);

    const customerMessage = createCustomerMessage(orderData);
    results.customer = await sendSMS(phone, customerMessage, authToken);
    
    if (salesNumbers && salesNumbers.length > 0) {
      const salesMessage = createSalesTeamMessage(orderData);
      const salesNumbersStr = salesNumbers.join(',');
      results.salesTeam = await sendSMS(salesNumbersStr, salesMessage, authToken);
    }

    if (results.customer && results.customer.error === false) {
      results.success = true;
      console.log('✅ All SMS notifications sent successfully!');
    }

    return results;
    
  } catch (error) {
    console.error('❌ Error in sendOrderNotifications:', error);
    results.error = (error as Error).message;
    return results;
  }
};

