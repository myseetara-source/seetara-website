'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Minus, 
  Plus, 
  Trash2, 
  ChevronRight, 
  Check, 
  Phone, 
  MapPin, 
  CreditCard,
  Ticket,
  ShieldCheck,
  Gift,
  Truck
} from 'lucide-react';
import Image from 'next/image';

interface CartItem {
  id: string;
  name: string;
  color: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  image: string;
}

interface CheckoutDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items?: CartItem[];
}

// Mock cart items
export const mockCartItems: CartItem[] = [
  {
    id: '1',
    name: 'Golden Chain Bag',
    color: 'Maroon',
    price: 1499,
    originalPrice: 2100,
    quantity: 1,
    image: 'https://pub-618cb6a991114e6b97382558a5b2adea.r2.dev/SB106/maroon-handbag.webp',
  },
];

type CheckoutStep = 'mobile' | 'address' | 'payment';

export default function CheckoutDrawer({
  isOpen,
  onClose,
  items = mockCartItems,
}: CheckoutDrawerProps) {
  const [currentStep, setCurrentStep] = useState<CheckoutStep>('mobile');
  const [cartItems, setCartItems] = useState<CartItem[]>(items);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [isCouponApplied, setIsCouponApplied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Address fields
  const [address, setAddress] = useState({
    fullName: '',
    city: '',
    district: '',
    fullAddress: '',
    landmark: '',
  });

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const mrpTotal = cartItems.reduce((sum, item) => sum + (item.originalPrice || item.price) * item.quantity, 0);
  const discount = mrpTotal - subtotal;
  const couponDiscount = isCouponApplied ? Math.min(100, subtotal * 0.05) : 0;
  const shipping = 100; // Free above 1500
  const total = subtotal - couponDiscount + (subtotal >= 1500 ? 0 : shipping);
  const prepayDiscount = Math.round(total * 0.05);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setCurrentStep('mobile');
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const updateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const applyCoupon = () => {
    if (couponCode.toLowerCase() === 'seetara10') {
      setIsCouponApplied(true);
    }
  };

  const handlePhoneSubmit = () => {
    if (phoneNumber.length === 10) {
      setCurrentStep('address');
    }
  };

  const handleAddressSubmit = () => {
    if (address.fullName && address.city && address.fullAddress) {
      setCurrentStep('payment');
    }
  };

  const handlePlaceOrder = async (paymentMethod: 'prepay' | 'cod') => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    // Handle order placement
    alert(`Order placed with ${paymentMethod === 'prepay' ? 'Prepay' : 'COD'}!`);
    onClose();
  };

  const steps: { key: CheckoutStep; label: string; icon: typeof Phone }[] = [
    { key: 'mobile', label: 'Mobile', icon: Phone },
    { key: 'address', label: 'Address', icon: MapPin },
    { key: 'payment', label: 'Pay', icon: CreditCard },
  ];

  const currentStepIndex = steps.findIndex((s) => s.key === currentStep);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-[9998]"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white z-[9999] flex flex-col shadow-2xl"
          >
            {/* Header with Progress */}
            <div className="flex-shrink-0 border-b border-gray-100">
              {/* Close Button Row */}
              <div className="flex items-center justify-between px-4 py-3">
                <h2 className="font-bold text-lg text-[#1a1a1a]">Checkout</h2>
                <button
                  onClick={onClose}
                  className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Progress Steps */}
              <div className="flex items-center justify-between px-6 pb-4">
                {steps.map((step, index) => (
                  <div key={step.key} className="flex items-center">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                          index < currentStepIndex
                            ? 'bg-green-500 text-white'
                            : index === currentStepIndex
                            ? 'bg-[#1a1a1a] text-white'
                            : 'bg-gray-100 text-gray-400'
                        }`}
                      >
                        {index < currentStepIndex ? (
                          <Check className="w-4 h-4" />
                        ) : (
                          <step.icon className="w-4 h-4" />
                        )}
                      </div>
                      <span
                        className={`text-xs mt-1 ${
                          index <= currentStepIndex ? 'text-[#1a1a1a]' : 'text-gray-400'
                        }`}
                      >
                        {step.label}
                      </span>
                    </div>
                    {index < steps.length - 1 && (
                      <div
                        className={`w-16 h-0.5 mx-2 ${
                          index < currentStepIndex ? 'bg-green-500' : 'bg-gray-200'
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* Discount Banner */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-4 py-2 flex items-center justify-center gap-2 text-sm">
                <Ticket className="w-4 h-4 text-green-600" />
                <span className="text-green-700 font-medium">
                  Extra <span className="font-bold text-green-600">5% Discount</span> on Prepay
                </span>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto">
              {/* Order Summary - Always Visible */}
              <div className="px-4 py-4 border-b border-gray-100">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-[#1a1a1a] flex items-center gap-2">
                    🛒 Order Summary
                  </h3>
                  <span className="text-sm text-gray-500">{cartItems.length} item(s)</span>
                </div>

                {/* Cart Items */}
                <div className="space-y-3">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-3 bg-gray-50 rounded-xl p-3">
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm text-[#1a1a1a] truncate">
                          {item.name}
                        </h4>
                        <p className="text-xs text-gray-500">{item.color}</p>
                        <div className="flex items-center justify-between mt-1">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-[#1a1a1a]">
                              ₹{item.price.toLocaleString()}
                            </span>
                            {item.originalPrice && (
                              <span className="text-xs text-gray-400 line-through">
                                ₹{item.originalPrice.toLocaleString()}
                              </span>
                            )}
                          </div>
                          {/* Quantity Controls */}
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="w-6 h-6 rounded bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-6 text-center text-sm font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="w-6 h-6 rounded bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="w-6 h-6 rounded flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Coupon Code */}
                <div className="mt-4">
                  <div className="flex gap-2">
                    <div className="flex-1 relative">
                      <Ticket className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Enter coupon code"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                        disabled={isCouponApplied}
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A227] focus:border-transparent disabled:opacity-50"
                      />
                    </div>
                    <button
                      onClick={applyCoupon}
                      disabled={!couponCode || isCouponApplied}
                      className="px-4 py-2.5 bg-[#1a1a1a] text-white text-sm font-medium rounded-lg hover:bg-[#333] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isCouponApplied ? 'Applied ✓' : 'Apply'}
                    </button>
                  </div>
                  {isCouponApplied && (
                    <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                      <Check className="w-3 h-3" /> Coupon applied! You save ₹{couponDiscount}
                    </p>
                  )}
                </div>

                {/* Price Breakdown */}
                <div className="mt-4 pt-4 border-t border-gray-100 space-y-2 text-sm">
                  <div className="flex justify-between text-gray-600">
                    <span>MRP Total</span>
                    <span className="line-through">₹{mrpTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-₹{discount.toLocaleString()}</span>
                  </div>
                  {isCouponApplied && (
                    <div className="flex justify-between text-green-600">
                      <span>Coupon Discount</span>
                      <span>-₹{couponDiscount}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className={subtotal >= 1500 ? 'text-green-600' : ''}>
                      {subtotal >= 1500 ? 'FREE' : `₹${shipping}`}
                    </span>
                  </div>
                  <div className="flex justify-between font-bold text-lg text-[#1a1a1a] pt-2 border-t">
                    <span>Total</span>
                    <span>₹{total.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Step Content */}
              <div className="px-4 py-4">
                <AnimatePresence mode="wait">
                  {/* Mobile Step */}
                  {currentStep === 'mobile' && (
                    <motion.div
                      key="mobile"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                    >
                      <h3 className="font-semibold text-[#1a1a1a] mb-4">
                        Enter Mobile Number
                      </h3>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 font-medium">
                          +977
                        </span>
                        <input
                          type="tel"
                          placeholder="98XXXXXXXX"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                          className="w-full pl-16 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-[#C9A227] focus:border-transparent"
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        We&apos;ll send order updates via SMS
                      </p>

                      <button
                        onClick={handlePhoneSubmit}
                        disabled={phoneNumber.length !== 10}
                        className="w-full mt-6 py-4 bg-[#1a1a1a] text-white font-semibold rounded-xl flex items-center justify-center gap-2 hover:bg-[#333] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Continue
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </motion.div>
                  )}

                  {/* Address Step */}
                  {currentStep === 'address' && (
                    <motion.div
                      key="address"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-4"
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-[#1a1a1a]">
                          Delivery Address
                        </h3>
                        <span className="text-sm text-green-600 flex items-center gap-1">
                          <Phone className="w-3 h-3" />
                          +977 {phoneNumber}
                        </span>
                      </div>

                      <input
                        type="text"
                        placeholder="Full Name *"
                        value={address.fullName}
                        onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C9A227]"
                      />

                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="text"
                          placeholder="City *"
                          value={address.city}
                          onChange={(e) => setAddress({ ...address, city: e.target.value })}
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C9A227]"
                        />
                        <input
                          type="text"
                          placeholder="District *"
                          value={address.district}
                          onChange={(e) => setAddress({ ...address, district: e.target.value })}
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C9A227]"
                        />
                      </div>

                      <input
                        type="text"
                        placeholder="Full Address (Tole, Ward) *"
                        value={address.fullAddress}
                        onChange={(e) => setAddress({ ...address, fullAddress: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C9A227]"
                      />

                      <input
                        type="text"
                        placeholder="Landmark (Optional)"
                        value={address.landmark}
                        onChange={(e) => setAddress({ ...address, landmark: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C9A227]"
                      />

                      {/* Shipping Info */}
                      <div className="bg-green-50 rounded-xl p-3 flex items-center gap-3">
                        <Truck className="w-5 h-5 text-green-600" />
                        <div>
                          <p className="text-sm font-medium text-green-700">Free Shipping</p>
                          <p className="text-xs text-green-600">2-4 business days delivery</p>
                        </div>
                      </div>

                      <button
                        onClick={handleAddressSubmit}
                        disabled={!address.fullName || !address.city || !address.fullAddress}
                        className="w-full py-4 bg-[#1a1a1a] text-white font-semibold rounded-xl flex items-center justify-center gap-2 hover:bg-[#333] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Continue to Payment
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </motion.div>
                  )}

                  {/* Payment Step */}
                  {currentStep === 'payment' && (
                    <motion.div
                      key="payment"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                    >
                      <h3 className="font-semibold text-[#1a1a1a] mb-4">
                        Choose Payment Method
                      </h3>

                      {/* Prepay Option - Primary */}
                      <button
                        onClick={() => handlePlaceOrder('prepay')}
                        disabled={isLoading}
                        className="w-full mb-3 p-4 bg-[#1a1a1a] text-white rounded-xl flex items-center justify-between hover:bg-[#333] transition-colors disabled:opacity-70"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-[#C9A227] rounded-lg flex items-center justify-center">
                            <CreditCard className="w-5 h-5 text-[#1a1a1a]" />
                          </div>
                          <div className="text-left">
                            <p className="font-semibold">Pre-Pay for 5% Discount</p>
                            <p className="text-xs text-gray-400">
                              Pay ₹{(total - prepayDiscount).toLocaleString()} (Save ₹{prepayDiscount})
                            </p>
                          </div>
                        </div>
                        <div className="bg-green-500 text-[10px] font-bold px-2 py-1 rounded">
                          SAVE 5%
                        </div>
                      </button>

                      {/* COD Option - Secondary */}
                      <button
                        onClick={() => handlePlaceOrder('cod')}
                        disabled={isLoading}
                        className="w-full p-4 bg-white border-2 border-gray-200 rounded-xl flex items-center justify-between hover:border-gray-300 transition-colors disabled:opacity-70"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                            <span className="text-lg">💵</span>
                          </div>
                          <div className="text-left">
                            <p className="font-semibold text-[#1a1a1a]">Cash on Delivery</p>
                            <p className="text-xs text-gray-500">
                              Pay ₹{total.toLocaleString()} when delivered
                            </p>
                          </div>
                        </div>
                      </button>

                      {/* Trust Badges */}
                      <div className="mt-6 flex items-center justify-center gap-4 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <ShieldCheck className="w-4 h-4 text-green-500" />
                          <span>100% Secure</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Gift className="w-4 h-4 text-pink-500" />
                          <span>Free Gift</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Truck className="w-4 h-4 text-blue-500" />
                          <span>Fast Delivery</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Bottom Safe Area */}
            <div className="h-safe-area-bottom" />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// Hook to manage checkout drawer state
export function useCheckoutDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState<CartItem[]>([]);

  const openCheckout = (cartItems?: CartItem[]) => {
    if (cartItems) setItems(cartItems);
    setIsOpen(true);
  };

  const closeCheckout = () => {
    setIsOpen(false);
  };

  return {
    isOpen,
    items,
    openCheckout,
    closeCheckout,
  };
}




