"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  X,
  Phone,
  MapPin,
  CreditCard,
  ChevronRight,
  ChevronLeft,
  CheckCircle,
  Banknote,
  Truck,
  Shield,
  Loader2,
} from "lucide-react";
import { useCart } from "@/context/CartContext";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Step = 1 | 2 | 3;

interface FormData {
  phone: string;
  fullName: string;
  address: string;
  city: string;
  landmark: string;
  paymentMethod: "cod" | "esewa" | "khalti";
}

export default function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const { items, getCartTotal, clearCart } = useCart();
  const [step, setStep] = useState<Step>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const [formData, setFormData] = useState<FormData>({
    phone: "",
    fullName: "",
    address: "",
    city: "",
    landmark: "",
    paymentMethod: "cod",
  });

  // Reset on close
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setStep(1);
        setOrderComplete(false);
        setErrors({});
      }, 300);
    }
  }, [isOpen]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-NP", {
      style: "currency",
      currency: "NPR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const subtotal = getCartTotal();
  const shippingCost = subtotal >= 3000 ? 0 : 150;
  const total = subtotal + shippingCost;

  const validateStep1 = () => {
    const newErrors: Partial<FormData> = {};
    const phone = formData.phone.replace(/\s/g, "");
    
    if (!phone) {
      newErrors.phone = "Phone number is required";
    } else if (!/^(98|97|96)\d{8}$/.test(phone)) {
      newErrors.phone = "Enter a valid Nepali phone number (98/97/96...)";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: Partial<FormData> = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }
    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }
    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    } else if (step === 2 && validateStep2()) {
      setStep(3);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep((step - 1) as Step);
    }
  };

  const handleSubmit = async () => {
    if (items.length === 0) return;
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items,
          address: {
            fullName: formData.fullName,
            phone: formData.phone,
            email: "",
            address: formData.address,
            city: formData.city,
            district: formData.city,
            landmark: formData.landmark,
          },
          paymentMethod: formData.paymentMethod,
          notes: "",
        }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setOrderNumber(data.data.orderNumber);
        setOrderComplete(true);
        clearCart();
      }
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const stepTitles = {
    1: "Mobile Number",
    2: "Delivery Address",
    3: "Payment & Confirm",
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-lg max-h-[90vh] bg-white rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-[#F5EDE6] text-[#5D3A1A] hover:bg-[#E8DDD4] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Content */}
            <div className="overflow-y-auto max-h-[90vh]">
              {/* Order Complete View */}
              {orderComplete ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-6 sm:p-8 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.2 }}
                    className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
                  >
                    <CheckCircle className="w-10 h-10 text-green-600" />
                  </motion.div>

                  <h2 className="text-2xl font-serif text-[#2C1810] mb-2">
                    Order Confirmed! 🎉
                  </h2>
                  <p className="text-[#7A6252] mb-6">
                    Thank you for your order. We&apos;ll contact you soon!
                  </p>

                  <div className="bg-[#F5EDE6] rounded-2xl p-4 mb-6">
                    <p className="text-sm text-[#7A6252] mb-1">Order Number</p>
                    <p className="text-xl font-mono font-semibold text-[#2C1810]">
                      {orderNumber}
                    </p>
                  </div>

                  <div className="space-y-3 text-sm text-left mb-6">
                    <div className="flex items-center gap-3 text-[#7A6252]">
                      <Truck className="w-5 h-5 text-[#C9A227]" />
                      <span>Delivery within 3-5 business days</span>
                    </div>
                    <div className="flex items-center gap-3 text-[#7A6252]">
                      <Phone className="w-5 h-5 text-[#C9A227]" />
                      <span>We&apos;ll call you to confirm</span>
                    </div>
                  </div>

                  <button
                    onClick={onClose}
                    className="w-full py-3 bg-[#8B5A2B] text-white rounded-xl font-medium hover:bg-[#5D3A1A] transition-colors"
                  >
                    Continue Shopping
                  </button>
                </motion.div>
              ) : (
                <>
                  {/* Header */}
                  <div className="p-4 sm:p-6 border-b border-[#E8DDD4]">
                    <h2 className="text-lg sm:text-xl font-serif text-[#2C1810] pr-8">
                      Quick Checkout
                    </h2>

                    {/* Progress Steps */}
                    <div className="flex items-center justify-between mt-4">
                      {[1, 2, 3].map((s) => (
                        <div key={s} className="flex items-center">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                              s < step
                                ? "bg-green-500 text-white"
                                : s === step
                                ? "bg-[#C9A227] text-white"
                                : "bg-[#E8DDD4] text-[#7A6252]"
                            }`}
                          >
                            {s < step ? <CheckCircle className="w-4 h-4" /> : s}
                          </div>
                          {s < 3 && (
                            <div
                              className={`w-16 sm:w-24 h-1 mx-2 rounded-full transition-all ${
                                s < step ? "bg-green-500" : "bg-[#E8DDD4]"
                              }`}
                            />
                          )}
                        </div>
                      ))}
                    </div>
                    <p className="text-sm text-[#7A6252] mt-3">
                      Step {step}: {stepTitles[step]}
                    </p>
                  </div>

                  {/* Step Content */}
                  <div className="p-4 sm:p-6">
                    <AnimatePresence mode="wait">
                      {/* Step 1: Mobile Number */}
                      {step === 1 && (
                        <motion.div
                          key="step1"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                        >
                          <div className="flex items-center gap-3 mb-6 p-4 bg-[#F5EDE6] rounded-xl">
                            <Phone className="w-6 h-6 text-[#C9A227]" />
                            <div>
                              <p className="font-medium text-[#2C1810]">
                                Enter your mobile number
                              </p>
                              <p className="text-xs text-[#7A6252]">
                                We&apos;ll send order updates via SMS
                              </p>
                            </div>
                          </div>

                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-[#5D3A1A] mb-2">
                                Mobile Number *
                              </label>
                              <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7A6252]">
                                  +977
                                </span>
                                <input
                                  type="tel"
                                  value={formData.phone}
                                  onChange={(e) =>
                                    setFormData({ ...formData, phone: e.target.value })
                                  }
                                  className={`w-full pl-16 pr-4 py-3.5 rounded-xl border-2 ${
                                    errors.phone
                                      ? "border-red-500"
                                      : "border-[#E8DDD4] focus:border-[#C9A227]"
                                  } focus:outline-none transition-colors text-lg`}
                                  placeholder="98XXXXXXXX"
                                  maxLength={10}
                                />
                              </div>
                              {errors.phone && (
                                <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {/* Step 2: Address */}
                      {step === 2 && (
                        <motion.div
                          key="step2"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                        >
                          <div className="flex items-center gap-3 mb-6 p-4 bg-[#F5EDE6] rounded-xl">
                            <MapPin className="w-6 h-6 text-[#C9A227]" />
                            <div>
                              <p className="font-medium text-[#2C1810]">
                                Delivery Address
                              </p>
                              <p className="text-xs text-[#7A6252]">
                                Where should we deliver your order?
                              </p>
                            </div>
                          </div>

                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-[#5D3A1A] mb-1.5">
                                Full Name *
                              </label>
                              <input
                                type="text"
                                value={formData.fullName}
                                onChange={(e) =>
                                  setFormData({ ...formData, fullName: e.target.value })
                                }
                                className={`w-full px-4 py-3 rounded-xl border-2 ${
                                  errors.fullName
                                    ? "border-red-500"
                                    : "border-[#E8DDD4] focus:border-[#C9A227]"
                                } focus:outline-none transition-colors`}
                                placeholder="Your full name"
                              />
                              {errors.fullName && (
                                <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
                              )}
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-[#5D3A1A] mb-1.5">
                                City *
                              </label>
                              <input
                                type="text"
                                value={formData.city}
                                onChange={(e) =>
                                  setFormData({ ...formData, city: e.target.value })
                                }
                                className={`w-full px-4 py-3 rounded-xl border-2 ${
                                  errors.city
                                    ? "border-red-500"
                                    : "border-[#E8DDD4] focus:border-[#C9A227]"
                                } focus:outline-none transition-colors`}
                                placeholder="Kathmandu"
                              />
                              {errors.city && (
                                <p className="text-red-500 text-xs mt-1">{errors.city}</p>
                              )}
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-[#5D3A1A] mb-1.5">
                                Full Address *
                              </label>
                              <input
                                type="text"
                                value={formData.address}
                                onChange={(e) =>
                                  setFormData({ ...formData, address: e.target.value })
                                }
                                className={`w-full px-4 py-3 rounded-xl border-2 ${
                                  errors.address
                                    ? "border-red-500"
                                    : "border-[#E8DDD4] focus:border-[#C9A227]"
                                } focus:outline-none transition-colors`}
                                placeholder="House no., Street, Ward"
                              />
                              {errors.address && (
                                <p className="text-red-500 text-xs mt-1">{errors.address}</p>
                              )}
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-[#5D3A1A] mb-1.5">
                                Landmark (Optional)
                              </label>
                              <input
                                type="text"
                                value={formData.landmark}
                                onChange={(e) =>
                                  setFormData({ ...formData, landmark: e.target.value })
                                }
                                className="w-full px-4 py-3 rounded-xl border-2 border-[#E8DDD4] focus:border-[#C9A227] focus:outline-none transition-colors"
                                placeholder="Near hospital, school, etc."
                              />
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {/* Step 3: Payment */}
                      {step === 3 && (
                        <motion.div
                          key="step3"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                        >
                          <div className="flex items-center gap-3 mb-6 p-4 bg-[#F5EDE6] rounded-xl">
                            <CreditCard className="w-6 h-6 text-[#C9A227]" />
                            <div>
                              <p className="font-medium text-[#2C1810]">
                                Payment Method
                              </p>
                              <p className="text-xs text-[#7A6252]">
                                Choose how you want to pay
                              </p>
                            </div>
                          </div>

                          {/* Payment Options */}
                          <div className="space-y-3 mb-6">
                            <label
                              className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                                formData.paymentMethod === "cod"
                                  ? "border-[#C9A227] bg-[#C9A227]/5"
                                  : "border-[#E8DDD4] hover:border-[#C9A227]/50"
                              }`}
                            >
                              <input
                                type="radio"
                                name="payment"
                                value="cod"
                                checked={formData.paymentMethod === "cod"}
                                onChange={() =>
                                  setFormData({ ...formData, paymentMethod: "cod" })
                                }
                                className="sr-only"
                              />
                              <div
                                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                  formData.paymentMethod === "cod"
                                    ? "border-[#C9A227]"
                                    : "border-[#E8DDD4]"
                                }`}
                              >
                                {formData.paymentMethod === "cod" && (
                                  <div className="w-3 h-3 rounded-full bg-[#C9A227]" />
                                )}
                              </div>
                              <Banknote className="w-6 h-6 text-green-600" />
                              <div className="flex-1">
                                <p className="font-medium text-[#2C1810]">
                                  Cash on Delivery
                                </p>
                                <p className="text-xs text-[#7A6252]">
                                  Pay when you receive
                                </p>
                              </div>
                              <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">
                                Recommended
                              </span>
                            </label>
                          </div>

                          {/* Order Summary */}
                          <div className="bg-[#F5EDE6] rounded-xl p-4 space-y-3">
                            <h4 className="font-medium text-[#2C1810]">Order Summary</h4>
                            
                            {/* Items */}
                            <div className="space-y-2 max-h-32 overflow-y-auto">
                              {items.map((item) => (
                                <div key={item.product.id} className="flex items-center gap-3">
                                  <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-white flex-shrink-0">
                                    <Image
                                      src={item.product.image}
                                      alt={item.product.name}
                                      fill
                                      className="object-cover"
                                    />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm text-[#2C1810] truncate">
                                      {item.product.name} × {item.quantity}
                                    </p>
                                  </div>
                                  <p className="text-sm font-medium text-[#5D3A1A]">
                                    {formatPrice(item.product.price * item.quantity)}
                                  </p>
                                </div>
                              ))}
                            </div>

                            <div className="border-t border-[#E8DDD4] pt-3 space-y-2">
                              <div className="flex justify-between text-sm">
                                <span className="text-[#7A6252]">Subtotal</span>
                                <span>{formatPrice(subtotal)}</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-[#7A6252]">Shipping</span>
                                <span className={shippingCost === 0 ? "text-green-600" : ""}>
                                  {shippingCost === 0 ? "Free" : formatPrice(shippingCost)}
                                </span>
                              </div>
                              <div className="flex justify-between font-semibold text-[#2C1810] pt-2 border-t border-[#E8DDD4]">
                                <span>Total</span>
                                <span className="text-lg">{formatPrice(total)}</span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Footer Actions */}
                  <div className="p-4 sm:p-6 border-t border-[#E8DDD4] bg-white">
                    <div className="flex gap-3">
                      {step > 1 && (
                        <button
                          onClick={handleBack}
                          className="flex-1 py-3.5 border-2 border-[#E8DDD4] text-[#5D3A1A] rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-[#F5EDE6] transition-colors"
                        >
                          <ChevronLeft className="w-4 h-4" />
                          Back
                        </button>
                      )}

                      {step < 3 ? (
                        <button
                          onClick={handleNext}
                          className="flex-1 py-3.5 bg-gradient-to-r from-[#8B5A2B] to-[#5D3A1A] text-white rounded-xl font-medium flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
                        >
                          Continue
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      ) : (
                        <button
                          onClick={handleSubmit}
                          disabled={isSubmitting}
                          className="flex-1 py-3.5 bg-gradient-to-r from-[#2C1810] to-[#5D3A1A] text-white rounded-xl font-medium flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all disabled:opacity-50"
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" />
                              Processing...
                            </>
                          ) : (
                            <>
                              <Shield className="w-4 h-4" />
                              Place Order • {formatPrice(total)}
                            </>
                          )}
                        </button>
                      )}
                    </div>

                    {/* Trust Badge */}
                    <div className="flex items-center justify-center gap-4 mt-4 text-xs text-[#7A6252]">
                      <div className="flex items-center gap-1">
                        <Shield className="w-3.5 h-3.5 text-green-600" />
                        <span>Secure</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Truck className="w-3.5 h-3.5 text-[#C9A227]" />
                        <span>3-5 Days</span>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

