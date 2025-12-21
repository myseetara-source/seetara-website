/**
 * Aakash SMS Service - Nepal's Leading Bulk SMS Provider
 * API Documentation: https://sms.aakashsms.com
 * API Version: v3
 * 
 * Setup Instructions:
 * 1. Login to https://sms.aakashsms.com/user/dashboard
 * 2. Go to API Service > Token > + Add Token
 * 3. Set "Follow ip rule?" to "No" (important for frontend apps)
 * 4. Set Status to "Active"
 * 5. Click Submit - you'll get your Auth Token
 * 6. Replace AUTH_TOKEN below with your actual token
 */

// ============================================
// CONFIGURATION - Replace with your actual token
// ============================================
const AUTH_TOKEN = '933b1e683e02d6786c6f48adaf59b3a81726736953c2ae0143fd27961ffcd032';
const API_URL = 'https://sms.aakashsms.com/sms/v3/send'; // v3 API (latest)

// Sales Team Phone Numbers (Nepal format - 10 digits without +977)
const SALES_TEAM_NUMBERS = [
  '9802359033',  // Sales Team 1
  '9802359035',  // Sales Team 2
  '9802200110',  // Sales Team 3
];

// ============================================
// SMS SENDING FUNCTION (v3 API)
// ============================================
/**
 * Sends SMS using Aakash SMS v3 API
 * v3 API only needs: auth_token, to, text
 * @param {string} to - Comma separated 10-digit mobile numbers (Nepal)
 * @param {string} text - Message content
 * @returns {Promise<object>} API response
 */
const sendSMS = async (to, text) => {
  try {
    // Clean phone numbers (remove +977 if present, keep 10 digits)
    const cleanedTo = to.split(',').map(num => {
      let cleaned = num.trim().replace(/\s/g, '');
      // Remove +977 or 977 prefix
      if (cleaned.startsWith('+977')) {
        cleaned = cleaned.substring(4);
      } else if (cleaned.startsWith('977') && cleaned.length > 10) {
        cleaned = cleaned.substring(3);
      }
      return cleaned;
    }).join(',');

    // v3 API parameters: auth_token, to, text (no 'from' needed!)
    const formData = new URLSearchParams();
    formData.append('auth_token', AUTH_TOKEN);
    formData.append('to', cleanedTo);
    formData.append('text', text);

    console.log('📱 Sending SMS to:', cleanedTo);
    console.log('📝 Message:', text.substring(0, 50) + '...');

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData,
    });

    const data = await response.json();
    
    // v3 API response format: { error: false/true, message: "...", data: {...} }
    if (data.error === false) {
      console.log('✅ SMS sent successfully!', data.message);
      if (data.data?.valid) {
        console.log('📊 Valid:', data.data.valid.length, '| Invalid:', data.data.invalid?.length || 0);
      }
    } else {
      console.error('❌ SMS failed:', data.message);
    }
    
    return data;
  } catch (error) {
    console.error('❌ Failed to send SMS:', error);
    return { error: true, message: error.message, data: [] };
  }
};

// ============================================
// MESSAGE TEMPLATES
// ============================================

/**
 * Creates customer order confirmation message
 */
const createCustomerMessage = (orderData) => {
  const { name, color, grandTotal, orderType } = orderData;
  
  if (orderType === 'inquiry') {
    return `Dear ${name} Ji,

Your inquiry has been successfully received.

Product: Seetara Chain Bag
Color- ${color}

Our team will contact you soon.

- Seetara`;
  }
  
  // Order confirmation message
  return `Dear ${name} Ji, Your order has been successfully received.

Product: Seetara Chain Bag
Color- ${color}
COD: Rs. ${grandTotal}/-

-Seetara`;
};

/**
 * Creates sales team alert message
 */
const createSalesTeamMessage = (orderData) => {
  const { name, phone, color, orderType } = orderData;
  
  // Product format: SB106-[Color] (e.g., SB106-Black, SB106-Maroon)
  const productSKU = `SB106-${color}`;
  
  if (orderType === 'inquiry') {
    return `A new inquiry has been placed on website.

Name: ${name}
Number: ${phone}
Product: ${productSKU}

Call the customer immediately!`;
  }
  
  // Order message
  return `A new order has been placed on website.

Name: ${name}
Number: ${phone}
Product: ${productSKU}

Call the customer immediately!`;
};

// ============================================
// MAIN NOTIFICATION FUNCTION
// ============================================
/**
 * Sends order notifications to both customer and sales team
 * @param {object} orderData - Order details from form
 * @returns {Promise<object>} Result of SMS operations
 */
export const sendOrderNotifications = async (orderData) => {
  const results = {
    customer: null,
    salesTeam: null,
    success: false,
  };

  try {
    const { phone, name } = orderData;
    
    console.log('🚀 Starting SMS notifications for:', name);

    // ============================================
    // 1. Send SMS to Customer
    // ============================================
    const customerMessage = createCustomerMessage(orderData);
    console.log('📤 Sending to customer:', phone);
    results.customer = await sendSMS(phone, customerMessage);
    
    // ============================================
    // 2. Send SMS to Sales Team (all 3 numbers)
    // ============================================
    const salesMessage = createSalesTeamMessage(orderData);
    const salesNumbers = SALES_TEAM_NUMBERS.join(',');
    console.log('📤 Sending to sales team:', salesNumbers);
    results.salesTeam = await sendSMS(salesNumbers, salesMessage);

    // Check success
    if (results.customer && results.customer.error === false) {
      results.success = true;
      console.log('✅ All SMS notifications sent successfully!');
    } else {
      console.warn('⚠️ Customer SMS may have failed:', results.customer?.message);
    }

    return results;
    
  } catch (error) {
    console.error('❌ Error in sendOrderNotifications:', error);
    results.error = error.message;
    return results;
  }
};

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Check SMS credit balance (v4 API)
 * @returns {Promise<object>} Credit information
 */
export const checkSMSCredit = async () => {
  try {
    const response = await fetch('https://sms.aakashsms.com/sms/v4/available-credit', {
      method: 'GET',
      headers: {
        'auth-token': AUTH_TOKEN,
      },
    });

    const data = await response.json();
    console.log('💰 SMS Credit:', data);
    return data;
  } catch (error) {
    console.error('Error checking SMS credit:', error);
    return { error: true, message: error.message };
  }
};

/**
 * Send custom SMS (for testing)
 * @param {string} to - Phone number(s)
 * @param {string} message - Custom message
 */
export const sendCustomSMS = async (to, message) => {
  return await sendSMS(to, message);
};

/**
 * Test SMS function - sends a test message
 * @param {string} testNumber - Phone number to test
 */
export const sendTestSMS = async (testNumber) => {
  const testMessage = 'Seetara SMS Test - Yo test message ho. Yedi tapai le yo message paunubhayo bhane SMS API working cha!';
  console.log('🧪 Sending test SMS to:', testNumber);
  return await sendSMS(testNumber, testMessage);
};

// ============================================
// API RESPONSE REFERENCE (v3)
// ============================================
/*
 * SUCCESS Response:
 * {
 *   "error": false,
 *   "message": "1 messages has been queued for delivery.",
 *   "data": {
 *     "valid": [{ "id": 123, "mobile": "9779800000000", "status": "queued" }],
 *     "invalid": []
 *   }
 * }
 * 
 * FAILURE Responses:
 * - "The provided Auth Token is not valid." (invalid token)
 * - "The auth token field is required." (missing token)
 * - "The to field is required." (missing number)
 * - "The text field is required." (missing message)
 * - "Not enough balance." (insufficient credits)
 */
