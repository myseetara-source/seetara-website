"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, MapPin, Phone, Mail, User, Package, Truck, CheckCircle, CreditCard, Banknote } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { OrderAddress, PaymentMethod } from "@/types";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getCartTotal, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cod");
  
  const [formData, setFormData] = useState<OrderAddress>({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    district: "",
    landmark: "",
  });

  const [errors, setErrors] = useState<Partial<OrderAddress>>({});

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

  const validateForm = () => {
    const newErrors: Partial<OrderAddress> = {};
    
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (formData.phone && !/^(98|97|96)\d{8}$/.test(formData.phone.replace(/\s/g, ""))) {
      newErrors.phone = "Enter a valid Nepali phone number";
    }
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.district.trim()) newErrors.district = "District is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    if (items.length === 0) return;
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items,
          address: formData,
          paymentMethod,
          notes: "",
        }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setOrderNumber(data.data.orderNumber);
        setOrderComplete(true);
        clearCart();
      } else {
        alert("Failed to place order. Please try again.");
      }
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0 && !orderComplete) {
    return (
      <div className="min-h-screen bg-[#FFFBF7] flex items-center justify-center">
        <div className="text-center p-8">
          <Package className="w-16 h-16 text-[#E8DDD4] mx-auto mb-4" />
          <h1 className="text-2xl font-serif text-[#2C1810] mb-2">Your cart is empty</h1>
          <p className="text-[#7A6252] mb-6">Add some beautiful bags to your cart first</p>
          <Link
            href="/#collection"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#8B5A2B] text-white rounded-full font-medium hover:bg-[#5D3A1A] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Browse Collection
          </Link>
        </div>
      </div>
    );
  }

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-[#FFFBF7] flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle className="w-10 h-10 text-green-600" />
          </motion.div>
          
          <h1 className="text-2xl font-serif text-[#2C1810] mb-2">Order Confirmed!</h1>
          <p className="text-[#7A6252] mb-6">
            Thank you for your order. We&apos;ll contact you soon to confirm delivery.
          </p>
          
          <div className="bg-[#F5EDE6] rounded-2xl p-4 mb-6">
            <p className="text-sm text-[#7A6252] mb-1">Order Number</p>
            <p className="text-xl font-mono font-semibold text-[#2C1810]">{orderNumber}</p>
          </div>
          
          <div className="space-y-3 text-sm text-left mb-8">
            <div className="flex items-center gap-3 text-[#7A6252]">
              <Truck className="w-5 h-5 text-[#C9A227]" />
              <span>We&apos;ll deliver within 3-5 business days</span>
            </div>
            <div className="flex items-center gap-3 text-[#7A6252]">
              <Phone className="w-5 h-5 text-[#C9A227]" />
              <span>Our team will call you to confirm</span>
            </div>
            <div className="flex items-center gap-3 text-[#7A6252]">
              <Banknote className="w-5 h-5 text-[#C9A227]" />
              <span>Payment on delivery (COD)</span>
            </div>
          </div>
          
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#8B5A2B] text-white rounded-full font-medium hover:bg-[#5D3A1A] transition-colors"
          >
            Continue Shopping
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFFBF7]">
      {/* Header */}
      <header className="bg-white border-b border-[#E8DDD4] sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft className="w-5 h-5 text-[#5D3A1A]" />
              <span className="text-sm text-[#5D3A1A]">Back to Shop</span>
            </Link>
            <h1 className="text-xl font-serif text-[#2C1810]">Checkout</h1>
            <div className="w-24" />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Form Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Contact Information */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="text-lg font-serif text-[#2C1810] mb-4 flex items-center gap-2">
                  <User className="w-5 h-5 text-[#C9A227]" />
                  Contact Information
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[#5D3A1A] mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl border ${
                        errors.fullName ? "border-red-500" : "border-[#E8DDD4]"
                      } focus:outline-none focus:border-[#C9A227] transition-colors`}
                      placeholder="Enter your full name"
                    />
                    {errors.fullName && (
                      <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#5D3A1A] mb-1">
                        Phone Number *
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7A6252]" />
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className={`w-full pl-10 pr-4 py-3 rounded-xl border ${
                            errors.phone ? "border-red-500" : "border-[#E8DDD4]"
                          } focus:outline-none focus:border-[#C9A227] transition-colors`}
                          placeholder="98XXXXXXXX"
                        />
                      </div>
                      {errors.phone && (
                        <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-[#5D3A1A] mb-1">
                        Email *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7A6252]" />
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className={`w-full pl-10 pr-4 py-3 rounded-xl border ${
                            errors.email ? "border-red-500" : "border-[#E8DDD4]"
                          } focus:outline-none focus:border-[#C9A227] transition-colors`}
                          placeholder="you@email.com"
                        />
                      </div>
                      {errors.email && (
                        <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Delivery Address */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="text-lg font-serif text-[#2C1810] mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-[#C9A227]" />
                  Delivery Address
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[#5D3A1A] mb-1">
                      Street Address *
                    </label>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl border ${
                        errors.address ? "border-red-500" : "border-[#E8DDD4]"
                      } focus:outline-none focus:border-[#C9A227] transition-colors`}
                      placeholder="House no., Street, Ward"
                    />
                    {errors.address && (
                      <p className="text-red-500 text-xs mt-1">{errors.address}</p>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#5D3A1A] mb-1">
                        City *
                      </label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className={`w-full px-4 py-3 rounded-xl border ${
                          errors.city ? "border-red-500" : "border-[#E8DDD4]"
                        } focus:outline-none focus:border-[#C9A227] transition-colors`}
                        placeholder="Kathmandu"
                      />
                      {errors.city && (
                        <p className="text-red-500 text-xs mt-1">{errors.city}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-[#5D3A1A] mb-1">
                        District *
                      </label>
                      <input
                        type="text"
                        value={formData.district}
                        onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                        className={`w-full px-4 py-3 rounded-xl border ${
                          errors.district ? "border-red-500" : "border-[#E8DDD4]"
                        } focus:outline-none focus:border-[#C9A227] transition-colors`}
                        placeholder="Kathmandu"
                      />
                      {errors.district && (
                        <p className="text-red-500 text-xs mt-1">{errors.district}</p>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-[#5D3A1A] mb-1">
                      Landmark (Optional)
                    </label>
                    <input
                      type="text"
                      value={formData.landmark || ""}
                      onChange={(e) => setFormData({ ...formData, landmark: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-[#E8DDD4] focus:outline-none focus:border-[#C9A227] transition-colors"
                      placeholder="Near hospital, school, etc."
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="text-lg font-serif text-[#2C1810] mb-4 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-[#C9A227]" />
                  Payment Method
                </h2>
                
                <div className="space-y-3">
                  <label
                    className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      paymentMethod === "cod"
                        ? "border-[#C9A227] bg-[#C9A227]/5"
                        : "border-[#E8DDD4] hover:border-[#C9A227]/50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      checked={paymentMethod === "cod"}
                      onChange={() => setPaymentMethod("cod")}
                      className="sr-only"
                    />
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      paymentMethod === "cod" ? "border-[#C9A227]" : "border-[#E8DDD4]"
                    }`}>
                      {paymentMethod === "cod" && (
                        <div className="w-3 h-3 rounded-full bg-[#C9A227]" />
                      )}
                    </div>
                    <Banknote className="w-6 h-6 text-green-600" />
                    <div className="flex-1">
                      <p className="font-medium text-[#2C1810]">Cash on Delivery</p>
                      <p className="text-xs text-[#7A6252]">Pay when you receive your order</p>
                    </div>
                    <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">
                      Recommended
                    </span>
                  </label>
                  
                  <label
                    className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-not-allowed opacity-50 ${
                      paymentMethod === "esewa"
                        ? "border-[#C9A227] bg-[#C9A227]/5"
                        : "border-[#E8DDD4]"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="esewa"
                      disabled
                      className="sr-only"
                    />
                    <div className="w-5 h-5 rounded-full border-2 border-[#E8DDD4]" />
                    <div className="w-6 h-6 bg-green-500 rounded text-white text-xs font-bold flex items-center justify-center">
                      e
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-[#2C1810]">eSewa</p>
                      <p className="text-xs text-[#7A6252]">Coming soon</p>
                    </div>
                  </label>
                  
                  <label
                    className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-not-allowed opacity-50 ${
                      paymentMethod === "khalti"
                        ? "border-[#C9A227] bg-[#C9A227]/5"
                        : "border-[#E8DDD4]"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="khalti"
                      disabled
                      className="sr-only"
                    />
                    <div className="w-5 h-5 rounded-full border-2 border-[#E8DDD4]" />
                    <div className="w-6 h-6 bg-purple-600 rounded text-white text-xs font-bold flex items-center justify-center">
                      K
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-[#2C1810]">Khalti</p>
                      <p className="text-xs text-[#7A6252]">Coming soon</p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Submit Button - Mobile */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="lg:hidden w-full py-4 bg-gradient-to-r from-[#2C1810] to-[#5D3A1A] text-white rounded-xl font-medium hover:from-[#5D3A1A] hover:to-[#8B5A2B] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Placing Order..." : `Place Order • ${formatPrice(total)}`}
              </button>
            </form>
          </motion.div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:sticky lg:top-24 h-fit"
          >
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-lg font-serif text-[#2C1810] mb-6 flex items-center gap-2">
                <Package className="w-5 h-5 text-[#C9A227]" />
                Order Summary ({items.length} items)
              </h2>

              {/* Cart Items */}
              <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto">
                {items.map((item) => (
                  <div key={item.product.id} className="flex gap-4">
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-[#F5EDE6]">
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#5D3A1A] text-white text-xs rounded-full flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-[#2C1810] text-sm truncate">
                        {item.product.name}
                      </h3>
                      <p className="text-xs text-[#7A6252]">{item.product.category}</p>
                      <p className="text-sm font-semibold text-[#5D3A1A] mt-1">
                        {formatPrice(item.product.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pricing */}
              <div className="border-t border-[#E8DDD4] pt-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-[#7A6252]">Subtotal</span>
                  <span className="text-[#2C1810]">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#7A6252]">Shipping</span>
                  <span className="text-[#2C1810]">
                    {shippingCost === 0 ? (
                      <span className="text-green-600">Free</span>
                    ) : (
                      formatPrice(shippingCost)
                    )}
                  </span>
                </div>
                {shippingCost > 0 && (
                  <p className="text-xs text-[#7A6252] bg-[#F5EDE6] p-2 rounded-lg">
                    💡 Add {formatPrice(3000 - subtotal)} more for free shipping
                  </p>
                )}
                <div className="flex justify-between pt-3 border-t border-[#E8DDD4]">
                  <span className="font-serif text-lg text-[#2C1810]">Total</span>
                  <span className="font-serif text-xl text-[#2C1810]">{formatPrice(total)}</span>
                </div>
              </div>

              {/* Submit Button - Desktop */}
              <button
                type="submit"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="hidden lg:block w-full py-4 mt-6 bg-gradient-to-r from-[#2C1810] to-[#5D3A1A] text-white rounded-xl font-medium hover:from-[#5D3A1A] hover:to-[#8B5A2B] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Placing Order..." : "Place Order"}
              </button>

              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t border-[#E8DDD4]">
                <div className="flex items-center gap-4 text-xs text-[#7A6252]">
                  <div className="flex items-center gap-1">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Secure Checkout</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Truck className="w-4 h-4 text-[#C9A227]" />
                    <span>3-5 Days Delivery</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}

