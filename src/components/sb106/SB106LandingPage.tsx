'use client';

import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Header from './components/Header';
import Notification from './components/Notification';
import Hero from './components/Hero';
import Features from './components/Features';
import VideoSection from './components/VideoSection';
import OrderForm from './components/OrderForm';
import BottomBar from './components/BottomBar';
import ProcessingOverlay from './components/ProcessingOverlay';
import { productColors, products, PRODUCT_SKU, fakeNames, fakeCities } from './utils/constants';
import { sendOrderNotifications } from './utils/smsService';
import { handleOrderSubmission } from './utils/googleSheetsService';

export default function SB106LandingPage() {
  const router = useRouter();
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [showVideo, setShowVideo] = useState(false);
  
  const [orderType, setOrderType] = useState('buy'); 
  const [deliveryLocation, setDeliveryLocation] = useState<string | null>(null);
  
  const [stockLeft, setStockLeft] = useState(12);
  const [viewers, setViewers] = useState(245);
  
  const [showNotification, setShowNotification] = useState(false);
  const [notificationData, setNotificationData] = useState({ name: '', city: '', time: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [processingStep, setProcessingStep] = useState(-1); // -1 = not processing, 0-3 = steps
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    city: ''
  });

  const currentColor = productColors[selectedColorIndex];
  const currentProduct = products[currentColor];

  const deliveryCharge = deliveryLocation === 'inside' ? 100 : (deliveryLocation === 'outside' ? 150 : 0);
  const grandTotal = orderType === 'buy' ? currentProduct.price + deliveryCharge : currentProduct.price;

  useEffect(() => {
    const viewerInterval = setInterval(() => {
      setViewers(prev => {
        const change = Math.floor(Math.random() * 5) - 1; 
        return Math.max(200, prev + change); 
      });
    }, 3000);

    const stockInterval = setInterval(() => {
      setStockLeft(prev => {
        if (prev <= 3) return prev; 
        return prev - 1;
      });
    }, 20000 + Math.random() * 20000);

    return () => {
      clearInterval(viewerInterval);
      clearInterval(stockInterval);
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
        const randomName = fakeNames[Math.floor(Math.random() * fakeNames.length)];
        const randomCity = fakeCities[Math.floor(Math.random() * fakeCities.length)];
        setNotificationData({ name: randomName, city: randomCity, time: `Just now` });
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 4000);
    }, 3000);

    const notifyLoop = setInterval(() => {
      const randomName = fakeNames[Math.floor(Math.random() * fakeNames.length)];
      const randomCity = fakeCities[Math.floor(Math.random() * fakeCities.length)];
      const randomTime = Math.floor(Math.random() * 5) + 1;
      setNotificationData({ name: randomName, city: randomCity, time: `${randomTime} min ago` });
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 4000);
    }, 15000);
    return () => clearInterval(notifyLoop);
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === 'name') {
      const capitalizedName = value
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      setFormData({ ...formData, [name]: capitalizedName });
      return;
    }
    
    if (name === 'phone') {
      const digitsOnly = value.replace(/\D/g, '');
      const limitedDigits = digitsOnly.slice(0, 10);
      setFormData({ ...formData, [name]: limitedDigits });
      return;
    }
    
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    const phoneRegex = /^(98|97)\d{8}$/;
    if (!phoneRegex.test(formData.phone)) {
      alert('कृपया सही Nepal Mobile Number हाल्नुहोस्!\n\nValid Format:\n• 98XXXXXXXX (10 digits)\n• 97XXXXXXXX (10 digits)\n\nExample: 9802200110, 9779802359033');
      return;
    }
    
    if (orderType === 'buy' && !deliveryLocation) {
        const element = document.getElementById('delivery-section');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            alert("Kripaya Delivery Location select garnu hos.");
        }
        return;
    }

    // Start processing with visual feedback immediately
    setIsSubmitting(true);
    setProcessingStep(0); // Step 0: Verifying order

    const orderData = { 
        ...formData, 
        product: PRODUCT_SKU,
        color: currentColor,
        sku: PRODUCT_SKU,
        price: currentProduct.price, 
        orderType: orderType,
        deliveryLocation: orderType === 'buy' ? (deliveryLocation || undefined) : undefined,
        deliveryCharge: orderType === 'buy' ? deliveryCharge : 0,
        grandTotal: orderType === 'buy' ? grandTotal : 0,
        date: new Date().toLocaleString() 
    };
    
    console.log('Form Submission:', orderData);

    try {
      // Helper function to ensure minimum step display time
      const minStepTime = async (promise: Promise<unknown>, minMs: number) => {
        const start = Date.now();
        const result = await promise;
        const elapsed = Date.now() - start;
        if (elapsed < minMs) {
          await new Promise(resolve => setTimeout(resolve, minMs - elapsed));
        }
        return result;
      };

      // Step 0: Show verification for at least 700ms
      await new Promise(resolve => setTimeout(resolve, 700));
      
      // Step 1: Sending SMS
      setProcessingStep(1);

      // Get environment variables
      const smsAuthToken = process.env.NEXT_PUBLIC_AAKASH_SMS_TOKEN;
      const salesNumbers = process.env.NEXT_PUBLIC_SALES_NUMBERS?.split(',');
      const googleScriptUrl = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;
      const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '9779802359033';
      const messengerPageId = process.env.NEXT_PUBLIC_MESSENGER_PAGE_ID || '368155539704608';

      // Send SMS notifications (show for at least 800ms)
      if (smsAuthToken && salesNumbers) {
        await minStepTime(sendOrderNotifications(orderData, smsAuthToken, salesNumbers), 800);
      } else {
        await new Promise(resolve => setTimeout(resolve, 800));
      }
      
      // Step 2: Saving to Google Sheets
      setProcessingStep(2);
      
      // Send to Google Sheets (show for at least 800ms)
      // Note: If user is in Facebook/Instagram/Messenger, redirects to Messenger instead of WhatsApp
      await minStepTime(handleOrderSubmission(orderData, {
        googleScriptUrl,
        whatsappNumber,
        messengerPageId
      }), 800);
      
      // Step 3: Redirecting
      setProcessingStep(3);
      
      // Show redirect step before actual redirect
      await new Promise(resolve => setTimeout(resolve, 600));
      
      // Success! Redirect to order-success page
      setIsSubmitting(false);
      setProcessingStep(-1);
      
      // Build query params for the success page
      const successParams = new URLSearchParams({
        type: orderType,
        phone: formData.phone,
        name: formData.name,
        color: currentColor,
        total: grandTotal.toString(),
        address: formData.address,
        city: formData.city,
        delivery: deliveryLocation || '',
      });
      
      router.push(`/sb106/order-success?${successParams.toString()}`);
    } catch (error) {
      console.error('Order submission error:', error);
      setIsSubmitting(false);
      setProcessingStep(-1);
      alert('केहि समस्या भयो। कृपया फेरि प्रयास गर्नुहोस्।');
    }
  };

  const scrollToOrder = () => {
    const element = document.getElementById('order-form');
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-gray-50 font-sans pb-20 md:pb-10 relative overflow-x-hidden selection:bg-yellow-200">
      {/* Processing Overlay - Shows during order submission */}
      <ProcessingOverlay 
        isVisible={isSubmitting && processingStep >= 0}
        currentStep={processingStep}
        orderType={orderType as 'buy' | 'inquiry'}
      />
      
      <Notification show={showNotification} data={notificationData} />
      
      <Header onClaimOffer={scrollToOrder} />

      <main className="max-w-7xl mx-auto md:px-6 md:py-8">
        <div className="md:grid md:grid-cols-12 md:gap-8 items-start">
          <div className="md:col-span-6 lg:col-span-5 space-y-6 sticky top-24">
            <Hero 
              selectedColorIndex={selectedColorIndex}
              setSelectedColorIndex={setSelectedColorIndex}
              showVideo={showVideo}
              setShowVideo={setShowVideo}
            />
            <div className="hidden md:block">
              <VideoSection />
            </div>
          </div>

          <div className="md:col-span-6 lg:col-span-7 space-y-6">
            <Features stockLeft={stockLeft} viewers={viewers} />
            
            <div className="md:hidden">
              <VideoSection />
            </div>

            <OrderForm 
              orderType={orderType}
              setOrderType={setOrderType}
              formData={formData}
              handleInputChange={handleInputChange}
              deliveryLocation={deliveryLocation}
              setDeliveryLocation={setDeliveryLocation}
              currentProduct={currentProduct}
              deliveryCharge={deliveryCharge}
              grandTotal={grandTotal}
              handleSubmit={handleSubmit}
              isSubmitting={isSubmitting}
            />
          </div>
        </div>
      </main>

      <BottomBar 
        orderType={orderType}
        currentProduct={currentProduct}
        grandTotal={grandTotal}
        handleSubmit={handleSubmit}
        scrollToOrder={scrollToOrder}
        formData={formData}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}

