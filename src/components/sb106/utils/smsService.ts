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
    // Clean phone numbers (remove +977 if present, keep 10 digits)
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
 * Creates customer order confirmation message
 */
const createCustomerMessage = (orderData: OrderData): string => {
  const { name, color, grandTotal, orderType } = orderData;
  
  if (orderType === 'inquiry') {
    return `Dear ${name} Ji,

Your inquiry has been successfully received.

Product: Seetara Chain Bag
Color- ${color}

Our team will contact you soon.

- Seetara`;
  }
  
  return `Dear ${name} Ji, Your order has been successfully received.

Product: Seetara Chain Bag
Color- ${color}
COD: Rs. ${grandTotal}/-

-Seetara`;
};

/**
 * Creates sales team alert message
 */
const createSalesTeamMessage = (orderData: OrderData): string => {
  const { name, phone, color, orderType } = orderData;
  
  const productSKU = `SB106-${color}`;
  
  if (orderType === 'inquiry') {
    return `A new inquiry has been placed on website.

Name: ${name}
Number: ${phone}
Product: ${productSKU}

Call the customer immediately!`;
  }
  
  return `A new order has been placed on website.

Name: ${name}
Number: ${phone}
Product: ${productSKU}

Call the customer immediately!`;
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

    // Send SMS to Customer
    const customerMessage = createCustomerMessage(orderData);
    results.customer = await sendSMS(phone, customerMessage, authToken);
    
    // Send SMS to Sales Team
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

