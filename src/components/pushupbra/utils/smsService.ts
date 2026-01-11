// SMS Service for Push Up Bra Orders
// Uses secure server-side API endpoint

interface OrderDetails {
  customerPhone: string;
  customerName: string;
  orderType: 'buy' | 'inquiry';
  productName: string;
  productColor: string;
  productSize?: string;
  grandTotal?: number;
}

// Create customer confirmation message
export const createCustomerMessage = (details: OrderDetails): string => {
  if (details.orderType === 'buy') {
    return `Namaste ${details.customerName}! Tapai ko Seetara Push Up Bra (${details.productColor}${details.productSize ? `, ${details.productSize}` : ''}) ko order confirm vayo. Rs.${details.grandTotal} Cash on Delivery. Delivery 2-3 din ma. Questions? 9802359033 -Seetara`;
  } else {
    return `Namaste ${details.customerName}! Tapai ko inquiry payau. Hamro team le chhittai contact garnecha. Questions? 9802359033 -Seetara`;
  }
};

// Create sales team notification message
export const createSalesTeamMessage = (details: OrderDetails): string => {
  if (details.orderType === 'buy') {
    return `🛍️ NEW ORDER: Seetara Push Up Bra (${details.productColor}${details.productSize ? `, ${details.productSize}` : ''}) | ${details.customerName} | ${details.customerPhone} | Rs.${details.grandTotal}`;
  } else {
    return `📨 INQUIRY: Seetara Push Up Bra | ${details.customerName} | ${details.customerPhone}`;
  }
};

// Send SMS via secure server-side API
export const sendOrderSMS = async (details: OrderDetails): Promise<boolean> => {
  try {
    const response = await fetch('/api/notifications/sms', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(details),
    });
    
    return response.ok;
  } catch (error) {
    console.error('SMS sending failed:', error);
    return false;
  }
};
