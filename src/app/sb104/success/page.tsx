'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import SuccessMessage from '@/components/sb104/components/SuccessMessage';

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

