import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Notification from './components/Notification';
import Hero from './components/Hero';
import Features from './components/Features';
import VideoSection from './components/VideoSection';
import OrderForm from './components/OrderForm';
import SuccessMessage from './components/SuccessMessage';
import BottomBar from './components/BottomBar';
import { productColors, products, PRODUCT_SKU, fakeNames, fakeCities } from './utils/constants';
import { sendOrderNotifications } from './utils/smsService';
import { handleOrderSubmission } from './utils/googleSheetsService';

const App = () => {
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [showVideo, setShowVideo] = useState(false);
  
  const [orderType, setOrderType] = useState('buy'); 
  const [deliveryLocation, setDeliveryLocation] = useState(null); 
  
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  
  const [stockLeft, setStockLeft] = useState(12);
  const [viewers, setViewers] = useState(245);
  
  const [showNotification, setShowNotification] = useState(false);
  const [notificationData, setNotificationData] = useState({ name: '', city: '', time: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Auto-capitalize name (each word's first letter)
    if (name === 'name') {
      const capitalizedName = value
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      setFormData({ ...formData, [name]: capitalizedName });
      return;
    }
    
    // Phone number validation - only allow Nepal format
    if (name === 'phone') {
      // Remove any non-digit characters
      const digitsOnly = value.replace(/\D/g, '');
      
      // Limit to 10 digits max
      const limitedDigits = digitsOnly.slice(0, 10);
      
      setFormData({ ...formData, [name]: limitedDigits });
      return;
    }
    
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Strong Nepal phone number validation
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

    setIsSubmitting(true);
    const orderData = { 
        ...formData, 
        product: PRODUCT_SKU, // "Seetara Viral Chain Bag"
        color: currentColor, // Selected color (Brown, Black, Maroon, Coffee)
        sku: PRODUCT_SKU, // "Seetara Viral Chain Bag"
        price: currentProduct.price, 
        orderType: orderType,
        deliveryLocation: orderType === 'buy' ? deliveryLocation : 'N/A',
        deliveryCharge: orderType === 'buy' ? deliveryCharge : 0,
        grandTotal: orderType === 'buy' ? grandTotal : 0,
        date: new Date().toLocaleString() 
    };
    
    console.log('Form Submission:', orderData);

    // Call the new SMS service
    await sendOrderNotifications(orderData);
    
    // Send to Google Sheets and redirect to WhatsApp (for buy orders)
    await handleOrderSubmission(orderData);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setOrderPlaced(true);
      setShowConfetti(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1500);
  };

  const scrollToOrder = () => {
    const element = document.getElementById('order-form');
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  const handleReset = () => {
    setOrderPlaced(false);
    setShowConfetti(false);
    setFormData({ name: '', phone: '', address: '', city: '' });
    setOrderType('buy');
    setDeliveryLocation(null);
  };

  if (orderPlaced) {
    return <SuccessMessage orderType={orderType} formData={formData} onReset={handleReset} />;
  }

  return (
    <div className="bg-gray-50 font-sans pb-20 md:pb-10 relative overflow-x-hidden selection:bg-yellow-200">
      <Notification show={showNotification} data={notificationData} />
      
      <Header onClaimOffer={scrollToOrder} />

      <main className="max-w-7xl mx-auto md:px-6 md:py-8">
        <div className="md:grid md:grid-cols-12 md:gap-8 items-start">
          {/* Left Column: Product Visuals */}
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

          {/* Right Column: Product Details & Form */}
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
      />
    </div>
  );
};

export default App;
