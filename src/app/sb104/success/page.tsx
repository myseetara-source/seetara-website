'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import SuccessMessage from '@/components/sb104/components/SuccessMessage';

// Declare fbq for TypeScript - Facebook Pixel
declare global {
  interface Window {
    fbq?: (action: string, event: string, params?: Record<string, unknown>) => void;
  }
}

interface OrderData {
  orderType: string;
  formData: {
    name: string;
    phone: string;
    address: string;
    city: string;
  };
  productColor: string;
  grandTotal: number;
}

export default function SB104SuccessPage() {
  const router = useRouter();
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [pixelFired, setPixelFired] = useState(false);

  useEffect(() => {
    // Get order data from sessionStorage
    const storedData = sessionStorage.getItem('sb104_order_data');
    
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        setOrderData(parsedData);
      } catch (error) {
        console.error('Error parsing order data:', error);
        router.push('/sb104');
      }
    } else {
      // No order data found, redirect to main page
      router.push('/sb104');
    }
    
    setIsLoading(false);
  }, [router]);

  // Fire Facebook Pixel Purchase event when order data is loaded
  useEffect(() => {
    if (orderData && !pixelFired && orderData.orderType === 'buy') {
      // Fire FB Pixel Purchase event
      if (typeof window !== 'undefined' && window.fbq) {
        window.fbq('track', 'Purchase', {
          value: orderData.grandTotal,
          currency: 'NPR',
          content_name: `SB104 Multi-Functional Bag - ${orderData.productColor}`,
          content_type: 'product',
          content_ids: ['SB104'],
        });
        setPixelFired(true);
        console.log('FB Pixel Purchase event fired for SB104:', orderData.grandTotal);
      }
    }
  }, [orderData, pixelFired]);

  const handleReset = () => {
    // Clear stored order data
    sessionStorage.removeItem('sb104_order_data');
    // Redirect to main page
    router.push('/sb104');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!orderData) {
    return null;
  }

  return (
    <SuccessMessage 
      orderType={orderData.orderType}
      formData={orderData.formData}
      onReset={handleReset}
      productColor={orderData.productColor}
      grandTotal={orderData.grandTotal}
    />
  );
}

