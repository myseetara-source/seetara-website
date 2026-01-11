'use client';

import { useState, useEffect, useRef, FormEvent, ChangeEvent } from 'react';
import { ChevronDown } from 'lucide-react';

// Components
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import OrderForm from './components/OrderForm';
import BottomBar from './components/BottomBar';
import Notification from './components/Notification';
import ProcessingOverlay from './components/ProcessingOverlay';
import SuccessMessage from './components/SuccessMessage';

// Utils
import { productColors, products, productSizes, fakeNames, fakeCities, fakeTimes, PRODUCT_SKU } from './utils/constants';
import { getFbp, getFbc } from './utils/googleSheetsService';

export default function PushUpBraLandingPage() {
  // Product State
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  
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
  const [currentOrderId, setCurrentOrderId] = useState<string>('');
  
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
  const formRef = useRef<HTMLDivElement>(null);

  // Current product
  const currentColor = productColors[selectedColorIndex];
  const currentProduct = products[currentColor];
  const deliveryCharge = deliveryLocation === 'inside' ? 100 : deliveryLocation === 'outside' ? 150 : 0;
  const grandTotal = currentProduct.price + deliveryCharge;

  // Initialize stock and viewers
  useEffect(() => {
    setStockLeft(Math.floor(Math.random() * 15) + 8);
    setViewers(Math.floor(Math.random() * 300) + 180);
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
      { 
        threshold: 0.1,
        rootMargin: '-50px 0px 0px 0px'
      }
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

    const sections = [heroRef, featuresRef, formRef];
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
      setStockLeft(prev => Math.max(3, prev - 1));
    }, 45000);
    return () => clearInterval(interval);
  }, []);

  // Fluctuate viewers
  useEffect(() => {
    const interval = setInterval(() => {
      setViewers(prev => {
        const change = Math.floor(Math.random() * 15) - 5;
        const newValue = prev + change;
        return Math.max(80, Math.min(500, newValue));
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === 'name') {
      const capitalizedName = value
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      setFormData(prev => ({ ...prev, [name]: capitalizedName }));
      return;
    }
    
    if (name === 'phone') {
      const digitsOnly = value.replace(/\D/g, '').slice(0, 10);
      setFormData(prev => ({ ...prev, [name]: digitsOnly }));
      return;
    }
    
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
    
    // Validate phone number
    const phoneRegex = /^(98|97|96)\d{8}$/;
    if (!phoneRegex.test(formData.phone)) {
      alert('कृपया सही Nepal Mobile Number हाल्नुहोस्!\n\nValid Format: 98XXXXXXXX (10 digits)');
      return;
    }
    
    if (orderType === 'buy') {
      if (!selectedSize) {
        alert('कृपया Size select गर्नुहोस्!');
        return;
      }
      if (!deliveryLocation) {
        const deliverySection = document.getElementById('delivery-section');
        if (deliverySection) {
          deliverySection.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return;
      }
    }

    // Generate unique orderId
    const orderId = `pushupbra_${formData.phone}_${Date.now()}`;
    setCurrentOrderId(orderId);

    setIsSubmitting(true);
    setShowProcessing(true);
    setProcessingStep(0);

    try {
      // Step 1: Verify order
      await new Promise(resolve => setTimeout(resolve, 800));
      setProcessingStep(1);

      // Step 2: Send SMS
      await fetch('/api/notifications/sms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerPhone: formData.phone,
          customerName: formData.name,
          orderType: orderType,
          productName: PRODUCT_SKU,
          productColor: `${currentColor} - ${selectedSize}`,
          grandTotal: orderType === 'buy' ? grandTotal : undefined,
        }),
      });
      
      await new Promise(resolve => setTimeout(resolve, 600));
      setProcessingStep(2);

      // Step 3: Save to Google Sheets
      const fbp = getFbp();
      const fbc = getFbc();
      
      await fetch('/api/notifications/sheets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: orderId,
          orderType: orderType,
          productSKU: PRODUCT_SKU,
          productColor: `${currentColor} - ${selectedSize}`,
          customerName: formData.name,
          customerPhone: formData.phone,
          city: formData.city,
          address: formData.address,
          deliveryLocation: deliveryLocation,
          itemPrice: currentProduct.price,
          deliveryCharge: deliveryCharge,
          grandTotal: grandTotal,
          fbp: fbp,
          fbc: fbc,
        }),
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
    setSelectedSize('');
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
        productSize={selectedSize}
        grandTotal={grandTotal}
        orderId={currentOrderId}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 via-white to-pink-50 overflow-x-hidden">
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-rose-100 z-[70]">
        <div 
          className="h-full bg-gradient-to-r from-rose-500 via-pink-500 to-rose-500 transition-all duration-150 ease-out"
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
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
          />
          
          {/* Animated Scroll Indicator */}
          {showScrollHint && (
            <div className="flex flex-col items-center justify-center py-4 animate-fade-in">
              <p className="text-xs text-rose-400 mb-2 tracking-widest uppercase">Scroll to explore</p>
              <div className="w-7 h-12 border-2 border-rose-200 rounded-full flex items-start justify-center p-1.5 relative">
                <div className="w-2 h-3 bg-gradient-to-b from-rose-400 to-pink-500 rounded-full animate-scroll-mouse"></div>
              </div>
              <div className="flex flex-col items-center mt-1">
                <ChevronDown className="w-4 h-4 text-rose-300 animate-bounce" style={{ animationDelay: '0s' }} />
                <ChevronDown className="w-4 h-4 text-rose-200 -mt-2 animate-bounce" style={{ animationDelay: '0.1s' }} />
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

        {/* ORDER FORM SECTION */}
        <section 
          ref={formRef}
          id="form-section"
          className={`transition-all duration-700 delay-200 ${
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
            selectedColor={currentColor}
            selectedSize={selectedSize}
          />
        </section>

        {/* Bottom Spacing for Fixed Bar */}
        {!isFormVisible && <div className="h-24 md:hidden"></div>}
      </main>

      {/* Fixed Bottom Bar */}
      {!isFormVisible && (
        <BottomBar 
          currentProduct={currentProduct}
          grandTotal={grandTotal}
          scrollToOrder={scrollToOrder}
          isSubmitting={isSubmitting}
          selectedSize={selectedSize}
        />
      )}
    </div>
  );
}
