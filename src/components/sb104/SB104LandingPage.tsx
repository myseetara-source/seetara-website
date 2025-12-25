'use client';

import { useState, useEffect, useRef, FormEvent, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronDown } from 'lucide-react';

// Components
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import VideoSection from './components/VideoSection';
import OrderForm from './components/OrderForm';
import BottomBar from './components/BottomBar';
import Notification from './components/Notification';
import ProcessingOverlay from './components/ProcessingOverlay';

// Utils
import { productColors, products, fakeNames, fakeCities, fakeTimes, PRODUCT_SKU } from './utils/constants';
import { sendOrderNotifications } from './utils/smsService';
import { handleOrderSubmission } from './utils/googleSheetsService';

export default function SB104LandingPage() {
  const router = useRouter();
  
  // Product State
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [showVideo, setShowVideo] = useState(false);
  
  // Form State
  const [orderType, setOrderType] = useState<'buy' | 'inquiry'>('buy');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    city: ''
  });
  const [deliveryLocation, setDeliveryLocation] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Processing Overlay State
  const [showProcessing, setShowProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState(0);
  
  // UI State
  const [stockLeft, setStockLeft] = useState(0);
  const [viewers, setViewers] = useState(0);
  const [notification, setNotification] = useState({ show: false, name: '', city: '', time: '' });
  
  // Scroll State
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollHint, setShowScrollHint] = useState(true);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const [isFormVisible, setIsFormVisible] = useState(false);
  
  // Refs for scroll animations
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  // Current product
  const currentColor = productColors[selectedColorIndex];
  const currentProduct = products[currentColor];
  const deliveryCharge = deliveryLocation === 'inside' ? 100 : deliveryLocation === 'outside' ? 150 : 0;
  const grandTotal = currentProduct.price + deliveryCharge;

  // Initialize stock and viewers
  useEffect(() => {
    setStockLeft(Math.floor(Math.random() * 10) + 5);
    setViewers(Math.floor(Math.random() * 400) + 150);
  }, []);

  // Scroll progress tracking
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / scrollHeight) * 100;
      setScrollProgress(progress);
      
      if (window.scrollY > 100) {
        setShowScrollHint(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Check if form is visible
  useEffect(() => {
    const formElement = document.getElementById('order-form');
    if (!formElement) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          setIsFormVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(formElement);
    return () => observer.disconnect();
  }, []);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setVisibleSections(prev => new Set([...prev, entry.target.id]));
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    const sections = [heroRef, featuresRef, videoRef, formRef];
    sections.forEach(ref => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  // Fake notification system
  useEffect(() => {
    const showNotification = () => {
      const randomName = fakeNames[Math.floor(Math.random() * fakeNames.length)];
      const randomCity = fakeCities[Math.floor(Math.random() * fakeCities.length)];
      const randomTime = fakeTimes[Math.floor(Math.random() * fakeTimes.length)];
      
      setNotification({ show: true, name: randomName, city: randomCity, time: randomTime });
      
      setTimeout(() => {
        setNotification(prev => ({ ...prev, show: false }));
      }, 4000);
    };

    const initialTimeout = setTimeout(showNotification, 5000);
    
    const interval = setInterval(() => {
      showNotification();
    }, Math.random() * 10000 + 20000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  // Decrease stock periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setStockLeft(prev => Math.max(1, prev - 1));
    }, 45000);
    return () => clearInterval(interval);
  }, []);

  // Fluctuate viewers
  useEffect(() => {
    const interval = setInterval(() => {
      setViewers(prev => {
        const change = Math.floor(Math.random() * 20) - 8;
        const newValue = prev + change;
        return Math.max(50, Math.min(600, newValue));
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const scrollToOrder = () => {
    const element = document.getElementById('order-form');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone) {
      scrollToOrder();
      return;
    }
    
    if (orderType === 'buy' && !deliveryLocation) {
      const deliverySection = document.getElementById('delivery-section');
      if (deliverySection) {
        deliverySection.scrollIntoView({ behavior: 'smooth', block: 'center' });
        deliverySection.classList.add('animate-wiggle');
        setTimeout(() => deliverySection.classList.remove('animate-wiggle'), 500);
      }
      return;
    }

    setIsSubmitting(true);
    setShowProcessing(true);
    setProcessingStep(0);

    try {
      // Step 1: Verify order
      await new Promise(resolve => setTimeout(resolve, 800));
      setProcessingStep(1);

      // Step 2: Send SMS
      const smsToken = process.env.NEXT_PUBLIC_AAKASH_SMS_TOKEN;
      const salesNumbers = process.env.NEXT_PUBLIC_SALES_NUMBERS?.split(',') || [];
      
      await sendOrderNotifications({
        name: formData.name,
        phone: formData.phone,
        color: currentColor,
        orderType,
        grandTotal: orderType === 'buy' ? grandTotal : undefined
      }, smsToken, salesNumbers);
      
      await new Promise(resolve => setTimeout(resolve, 600));
      setProcessingStep(2);

      // Step 3: Save to Google Sheets
      const orderData = {
        name: formData.name,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        color: currentColor,
        price: currentProduct.price,
        deliveryCharge,
        total: grandTotal,
        orderType,
        productSKU: PRODUCT_SKU,
        source: 'SB104'
      };

      await handleOrderSubmission(orderData, {
        googleScriptUrl: process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL,
        whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER,
        messengerPageId: process.env.NEXT_PUBLIC_MESSENGER_PAGE_ID
      });
      
      await new Promise(resolve => setTimeout(resolve, 600));
      setProcessingStep(3);

      // Step 4: Complete
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setShowProcessing(false);
      
      // Store order data in sessionStorage and redirect to success page
      const successData = {
        orderType,
        formData,
        productColor: currentColor,
        grandTotal
      };
      sessionStorage.setItem('sb104_order_data', JSON.stringify(successData));
      router.push('/sb104/success');
      
    } catch (error) {
      console.error('Order submission error:', error);
      setShowProcessing(false);
      
      // Still redirect to success page on error (order was likely submitted)
      const successData = {
        orderType,
        formData,
        productColor: currentColor,
        grandTotal
      };
      sessionStorage.setItem('sb104_order_data', JSON.stringify(successData));
      router.push('/sb104/success');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 overflow-x-hidden">
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200 z-[70]">
        <div 
          className="h-full bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-500 transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Header */}
      <Header onClaimOffer={scrollToOrder} />
      
      {/* Notification Popup */}
      <Notification show={notification.show} data={notification} />

      {/* Processing Overlay */}
      <ProcessingOverlay 
        isVisible={showProcessing} 
        currentStep={processingStep}
        orderType={orderType}
      />

      {/* Main Content - Centered container for desktop */}
      <main className="relative max-w-md mx-auto lg:max-w-6xl lg:px-8">
        
        {/* Desktop: Two Column Layout */}
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-start">
          
          {/* Left Column - Hero (Product) */}
          <div className="lg:sticky lg:top-20">
            {/* HERO SECTION */}
            <section 
              ref={heroRef}
              id="hero-section"
              className={`transition-all duration-700 ${
                visibleSections.has('hero-section') 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-10'
              }`}
            >
              <Hero 
                selectedColorIndex={selectedColorIndex}
                setSelectedColorIndex={setSelectedColorIndex}
                showVideo={showVideo}
                setShowVideo={setShowVideo}
              />
              
              {/* Animated Scroll Indicator - Hide on desktop */}
              {showScrollHint && (
                <div className="flex flex-col items-center justify-center py-4 animate-fade-in lg:hidden">
                  <p className="text-xs text-gray-400 mb-2 tracking-widest uppercase">Scroll to explore</p>
                  <div className="w-7 h-12 border-2 border-gray-300 rounded-full flex items-start justify-center p-1.5 relative">
                    <div className="w-2 h-3 bg-gradient-to-b from-emerald-500 to-teal-600 rounded-full animate-scroll-mouse"></div>
                  </div>
                  <div className="flex flex-col items-center mt-1">
                    <ChevronDown className="w-4 h-4 text-gray-400 animate-bounce" style={{ animationDelay: '0s' }} />
                    <ChevronDown className="w-4 h-4 text-gray-300 -mt-2 animate-bounce" style={{ animationDelay: '0.1s' }} />
                  </div>
                </div>
              )}
            </section>
          </div>

          {/* Right Column - Order Form (Desktop) */}
          <div className="hidden lg:block">
            <section 
              id="form-section-desktop"
              className="transition-all duration-700 opacity-100"
            >
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
            </section>
          </div>
        </div>

        {/* FEATURES SECTION */}
        <section 
          ref={featuresRef}
          id="features-section"
          className={`transition-all duration-700 delay-100 ${
            visibleSections.has('features-section') 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'
          }`}
        >
          <Features stockLeft={stockLeft} viewers={viewers} />
        </section>

        {/* VIDEO SECTION */}
        <section 
          ref={videoRef}
          id="video-section"
          className={`transition-all duration-700 delay-200 ${
            visibleSections.has('video-section') 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'
          }`}
        >
          <VideoSection />
        </section>

        {/* ORDER FORM SECTION - Mobile Only */}
        <section 
          ref={formRef}
          id="form-section"
          className={`lg:hidden transition-all duration-700 delay-300 ${
            visibleSections.has('form-section') 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'
          }`}
        >
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
        </section>

        {/* Bottom Spacing for Fixed Bar */}
        {!isFormVisible && <div className="h-20 lg:hidden"></div>}
      </main>

      {/* Fixed Bottom Bar - HIDE when form is visible, HIDE on desktop */}
      {!isFormVisible && (
        <div className="lg:hidden">
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
      )}
    </div>
  );
}

