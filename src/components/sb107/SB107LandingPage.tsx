'use client';

import { useState, useEffect, useRef, FormEvent, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronDown, Mouse } from 'lucide-react';

// Components
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import VideoSection from './components/VideoSection';
import OrderForm from './components/OrderForm';
import BottomBar from './components/BottomBar';
import Notification from './components/Notification';
import ProcessingOverlay from './components/ProcessingOverlay';
import SuccessMessage from './components/SuccessMessage';

// Utils
import { productColors, products, fakeNames, fakeCities, fakeTimes, PRODUCT_SKU } from './utils/constants';
import { sendOrderNotifications } from './utils/smsService';
import { handleOrderSubmission } from './utils/googleSheetsService';

export default function SB107LandingPage() {
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
  const [showSuccess, setShowSuccess] = useState(false);
  const [currentOrderId, setCurrentOrderId] = useState<string>(''); // For Meta Pixel deduplication
  
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
    setStockLeft(Math.floor(Math.random() * 8) + 3);
    setViewers(Math.floor(Math.random() * 500) + 200);
  }, []);

  // Scroll progress tracking
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / scrollHeight) * 100;
      setScrollProgress(progress);
      
      // Hide scroll hint after user starts scrolling
      if (window.scrollY > 100) {
        setShowScrollHint(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Check if form is visible (to hide bottom bar)
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

    // Initial notification after 5 seconds
    const initialTimeout = setTimeout(showNotification, 5000);
    
    // Then every 20-30 seconds
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

  // Fluctuate viewers (min 50, max 800)
  useEffect(() => {
    const interval = setInterval(() => {
      setViewers(prev => {
        const change = Math.floor(Math.random() * 20) - 8; // -8 to +11
        const newValue = prev + change;
        return Math.max(50, Math.min(800, newValue)); // Keep between 50-800
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

    // Generate unique orderId BEFORE sending anywhere (for Meta Pixel deduplication)
    const orderId = `sb107_${formData.phone}_${Date.now()}`;
    setCurrentOrderId(orderId);

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

      // Step 3: Save to Google Sheets with orderId for deduplication
      const orderData = {
        name: formData.name,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        color: currentColor,
        price: currentProduct.price,
        deliveryCharge,
        grandTotal: grandTotal, // FIX: Was 'total', should be 'grandTotal' to match interface
        orderType,
        sku: PRODUCT_SKU, // FIX: Was 'productSKU', should be 'sku' to match interface
        deliveryLocation: deliveryLocation || undefined, // FIX: Added missing field
        orderId: orderId, // CRITICAL: For Meta Pixel deduplication
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
      setShowSuccess(true);
      
    } catch (error) {
      console.error('Order submission error:', error);
      setShowProcessing(false);
      setShowSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setShowSuccess(false);
    setFormData({ name: '', phone: '', address: '', city: '' });
    setDeliveryLocation(null);
    setOrderType('buy');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (showSuccess) {
    return (
      <SuccessMessage 
        orderType={orderType}
        formData={formData}
        onReset={handleReset}
        productColor={currentColor}
        grandTotal={grandTotal}
        orderId={currentOrderId} // CRITICAL: Same orderId for Meta Pixel deduplication
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 overflow-x-hidden">
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200 z-[70]">
        <div 
          className="h-full bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Header */}
      <Header onClaimOffer={scrollToOrder} />
      
      {/* Notification Popup - TOP POSITION */}
      <Notification show={notification.show} data={notification} />

      {/* Processing Overlay */}
      <ProcessingOverlay 
        isVisible={showProcessing} 
        currentStep={processingStep}
        orderType={orderType}
      />

      {/* Main Content */}
      <main className="relative">
        
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
          
          {/* Animated Scroll Indicator */}
          {showScrollHint && (
            <div className="flex flex-col items-center justify-center py-4 animate-fade-in">
              <p className="text-xs text-gray-400 mb-2 tracking-widest uppercase">Scroll to explore</p>
              <div className="w-7 h-12 border-2 border-gray-300 rounded-full flex items-start justify-center p-1.5 relative">
                <div className="w-2 h-3 bg-gradient-to-b from-green-500 to-emerald-600 rounded-full animate-scroll-mouse"></div>
              </div>
              <div className="flex flex-col items-center mt-1">
                <ChevronDown className="w-4 h-4 text-gray-400 animate-bounce" style={{ animationDelay: '0s' }} />
                <ChevronDown className="w-4 h-4 text-gray-300 -mt-2 animate-bounce" style={{ animationDelay: '0.1s' }} />
              </div>
            </div>
          )}
        </section>

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

        {/* ORDER FORM SECTION */}
        <section 
          ref={formRef}
          id="form-section"
          className={`transition-all duration-700 delay-300 ${
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

        {/* Bottom Spacing for Fixed Bar - only when bar is visible */}
        {!isFormVisible && <div className="h-20 md:hidden"></div>}
      </main>

      {/* Fixed Bottom Bar - HIDE when form is visible */}
      {!isFormVisible && (
        <BottomBar 
          orderType={orderType}
          currentProduct={currentProduct}
          grandTotal={grandTotal}
          handleSubmit={handleSubmit}
          scrollToOrder={scrollToOrder}
          formData={formData}
          isSubmitting={isSubmitting}
        />
      )}
    </div>
  );
}
