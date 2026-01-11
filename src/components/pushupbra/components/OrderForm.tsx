'use client';

import { FormEvent, ChangeEvent } from 'react';
import { User, Phone, MapPin, Home, Truck, ShoppingBag, Shield, Sparkles, Lock } from 'lucide-react';

interface OrderFormProps {
  orderType: 'buy' | 'inquiry';
  setOrderType: (type: 'buy' | 'inquiry') => void;
  formData: {
    name: string;
    phone: string;
    address: string;
    city: string;
  };
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  deliveryLocation: string | null;
  setDeliveryLocation: (location: string) => void;
  currentProduct: { name: string; price: number; originalPrice: number };
  deliveryCharge: number;
  grandTotal: number;
  handleSubmit: (e: FormEvent) => void;
  isSubmitting: boolean;
  selectedColor: string;
  selectedSize: string;
}

export default function OrderForm({
  orderType,
  setOrderType,
  formData,
  handleInputChange,
  deliveryLocation,
  setDeliveryLocation,
  currentProduct,
  deliveryCharge,
  grandTotal,
  handleSubmit,
  isSubmitting,
  selectedColor,
  selectedSize,
}: OrderFormProps) {
  return (
    <div id="order-form" className="px-4 py-6">
      <div className="bg-white rounded-3xl shadow-xl border border-rose-100 overflow-hidden">
        {/* Form Header */}
        <div className="bg-gradient-to-r from-rose-500 via-pink-500 to-rose-500 p-4 text-white text-center">
          <h2 className="text-xl font-black flex items-center justify-center gap-2">
            <Sparkles className="w-5 h-5" />
            Order Now
            <Sparkles className="w-5 h-5" />
          </h2>
          <p className="text-rose-100 text-xs mt-1">Cash on Delivery • Discrete Packaging</p>
        </div>

        <div className="p-5 space-y-5">
          {/* Order Type Toggle */}
          <div className="flex gap-2 p-1 bg-rose-50 rounded-xl">
            <button
              type="button"
              onClick={() => setOrderType('buy')}
              className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                orderType === 'buy'
                  ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-rose-100'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              अहिले किन्नुहोस्
            </button>
            <button
              type="button"
              onClick={() => setOrderType('inquiry')}
              className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                orderType === 'inquiry'
                  ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-rose-100'
              }`}
            >
              <Phone className="w-4 h-4" />
              सोधपुछ गर्नुहोस्
            </button>
          </div>

          {/* Selected Product Info */}
          <div className="bg-rose-50 rounded-xl p-3 border border-rose-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500">Selected</p>
                <p className="text-sm font-bold text-gray-800">
                  {selectedColor} {selectedSize && `• ${selectedSize}`}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500">Price</p>
                <p className="text-lg font-black text-rose-600">रु. {currentProduct.price}</p>
              </div>
            </div>
          </div>

          {/* Form Fields */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-rose-400" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="तपाईंको नाम *"
                required
                className="w-full pl-12 pr-4 py-4 bg-rose-50 border-2 border-transparent focus:border-rose-300 rounded-xl text-gray-800 placeholder-gray-400 outline-none transition-all font-medium"
              />
            </div>

            {/* Phone */}
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-rose-400" />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Phone Number (98XXXXXXXX) *"
                required
                pattern="[0-9]{10}"
                maxLength={10}
                className="w-full pl-12 pr-4 py-4 bg-rose-50 border-2 border-transparent focus:border-rose-300 rounded-xl text-gray-800 placeholder-gray-400 outline-none transition-all font-medium"
              />
            </div>

            {orderType === 'buy' && (
              <>
                {/* City */}
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-rose-400" />
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="शहर (Kathmandu, Pokhara, etc.)"
                    className="w-full pl-12 pr-4 py-4 bg-rose-50 border-2 border-transparent focus:border-rose-300 rounded-xl text-gray-800 placeholder-gray-400 outline-none transition-all font-medium"
                  />
                </div>

                {/* Address */}
                <div className="relative">
                  <Home className="absolute left-4 top-4 w-5 h-5 text-rose-400" />
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="पूरा ठेगाना *"
                    required
                    className="w-full pl-12 pr-4 py-4 bg-rose-50 border-2 border-transparent focus:border-rose-300 rounded-xl text-gray-800 placeholder-gray-400 outline-none transition-all font-medium"
                  />
                </div>

                {/* Delivery Location */}
                <div id="delivery-section" className="space-y-3">
                  <p className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <Truck className="w-4 h-4 text-rose-500" />
                    Delivery Location *
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setDeliveryLocation('inside')}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        deliveryLocation === 'inside'
                          ? 'border-rose-400 bg-rose-50'
                          : 'border-gray-200 bg-gray-50 hover:border-rose-200'
                      }`}
                    >
                      <p className="text-sm font-bold text-gray-800">काठमाडौं भित्र</p>
                      <p className="text-xs text-gray-500 mt-0.5">+रु. 100</p>
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeliveryLocation('outside')}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        deliveryLocation === 'outside'
                          ? 'border-rose-400 bg-rose-50'
                          : 'border-gray-200 bg-gray-50 hover:border-rose-200'
                      }`}
                    >
                      <p className="text-sm font-bold text-gray-800">काठमाडौं बाहिर</p>
                      <p className="text-xs text-gray-500 mt-0.5">+रु. 150</p>
                    </button>
                  </div>
                </div>

                {/* Price Summary */}
                {deliveryLocation && (
                  <div className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-xl p-4 space-y-2 border border-rose-100">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Product Price:</span>
                      <span className="font-semibold">रु. {currentProduct.price}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Delivery:</span>
                      <span className="font-semibold">रु. {deliveryCharge}</span>
                    </div>
                    <div className="h-px bg-rose-200 my-2" />
                    <div className="flex justify-between">
                      <span className="text-base font-bold text-gray-800">Total:</span>
                      <span className="text-xl font-black text-rose-600">रु. {grandTotal}</span>
                    </div>
                  </div>
                )}
              </>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-4 rounded-xl text-white font-bold text-lg shadow-xl transition-all flex items-center justify-center gap-2 ${
                isSubmitting
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-rose-500 via-pink-500 to-rose-500 hover:shadow-2xl active:scale-[0.98]'
              }`}
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Processing...
                </>
              ) : orderType === 'buy' ? (
                <>
                  <Lock className="w-5 h-5" />
                  Confirm Order • COD
                </>
              ) : (
                <>
                  <Phone className="w-5 h-5" />
                  Submit Inquiry
                </>
              )}
            </button>
          </form>

          {/* Privacy Notice */}
          <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
            <Shield className="w-4 h-4" />
            <span>Your information is 100% private & secure</span>
          </div>
        </div>
      </div>
    </div>
  );
}
