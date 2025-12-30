'use client';

import { FormEvent, ChangeEvent } from 'react';
import { User, Phone, MapPin, Home, Truck, CheckCircle2, ShieldCheck, Loader2, Sparkles, ShoppingBag, MessageCircle, ChevronRight, Smartphone } from 'lucide-react';

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
  currentProduct: {
    price: number;
    originalPrice: number;
    label: string;
    labelNp: string;
  };
  deliveryCharge: number;
  grandTotal: number;
  handleSubmit: (e: FormEvent) => void;
  isSubmitting: boolean;
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
  isSubmitting
}: OrderFormProps) {

  return (
    <div id="order-form" className="px-4 py-4 scroll-mt-20">
      {/* Section Header - Smart Wallet Highlight */}
      <div className="text-center mb-4">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-100 to-orange-100 px-4 py-2 rounded-full shadow-md border border-amber-200 mb-2 animate-pulse">
          <Smartphone className="w-5 h-5 text-amber-600" />
          <span className="text-sm font-black text-amber-700">Smart Wallet Order 📱</span>
        </div>
        <p className="text-xs text-gray-600">Phone + Cash + Cards = एउटै Wallet मा!</p>
      </div>

      {/* Form Card */}
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        
        {/* Order Type Toggle */}
        <div className="p-3 bg-gradient-to-r from-gray-50 to-white border-b border-gray-100">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setOrderType('buy')}
              className={`flex-1 py-2.5 px-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                orderType === 'buy'
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg scale-[1.02]'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              किन्छु
            </button>
            <button
              type="button"
              onClick={() => setOrderType('inquiry')}
              className={`flex-1 py-2.5 px-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                orderType === 'inquiry'
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg scale-[1.02]'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <MessageCircle className="w-4 h-4" />
              सोध्छु
            </button>
          </div>
        </div>

        {/* Form Fields */}
        <div className="p-4 space-y-3">
          
          {/* Name Input */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-700 flex items-center gap-1">
              <User className="w-3.5 h-3.5 text-gray-400" />
              तपाईंको नाम <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="पुरा नाम"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition-all text-sm bg-gray-50"
            />
          </div>

          {/* Phone Input */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-700 flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 text-gray-400" />
              मोबाइल नम्बर <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              placeholder="98XXXXXXXX"
              value={formData.phone}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition-all text-sm bg-gray-50"
            />
          </div>

          {/* Delivery Details - Only for Buy */}
          {orderType === 'buy' && (
            <>
              {/* City & Address */}
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-700 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-gray-400" />
                    जिल्ला <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="city"
                    placeholder="काठमाडौं"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition-all text-sm bg-gray-50"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-700 flex items-center gap-1">
                    <Home className="w-3.5 h-3.5 text-gray-400" />
                    ठेगाना <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="address"
                    placeholder="टोल, वडा"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition-all text-sm bg-gray-50"
                  />
                </div>
              </div>

              {/* Delivery Location Selector */}
              <div id="delivery-section" className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-700 flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-gray-400" />
                  Delivery Location <span className="text-red-500">*</span>
                </label>
                <div className="space-y-2">
                  {/* Kathmandu Inside */}
                  <button
                    type="button"
                    onClick={() => setDeliveryLocation('inside')}
                    className={`relative w-full p-3 rounded-xl border-2 transition-all text-left flex items-center justify-between ${
                      deliveryLocation === 'inside'
                        ? 'border-amber-500 bg-amber-50 shadow-md'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <div>
                      <p className="font-bold text-sm text-gray-800">काठमाडौं भित्र</p>
                      <p className="text-[10px] text-gray-500">Ringroad & nearby areas</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-amber-600">+ रु. 100</span>
                      {deliveryLocation === 'inside' && (
                        <CheckCircle2 className="w-5 h-5 text-amber-500" />
                      )}
                    </div>
                  </button>
                  
                  {/* Kathmandu Outside */}
                  <button
                    type="button"
                    onClick={() => setDeliveryLocation('outside')}
                    className={`relative w-full p-3 rounded-xl border-2 transition-all text-left flex items-center justify-between ${
                      deliveryLocation === 'outside'
                        ? 'border-amber-500 bg-amber-50 shadow-md'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <div>
                      <p className="font-bold text-sm text-gray-800">काठमाडौं बाहिर</p>
                      <p className="text-[10px] text-gray-500">All major cities in Nepal</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-amber-600">+ रु. 150</span>
                      {deliveryLocation === 'outside' && (
                        <CheckCircle2 className="w-5 h-5 text-amber-500" />
                      )}
                    </div>
                  </button>
                </div>
              </div>

              {/* Order Summary */}
              {deliveryLocation && (
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-3 rounded-xl border border-amber-200 space-y-1.5 animate-fade-in">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Smart Wallet:</span>
                    <span className="font-bold text-gray-800">रु. {currentProduct.price}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Delivery:</span>
                    <span className="font-bold text-gray-800">रु. {deliveryCharge}</span>
                  </div>
                  <div className="h-px bg-amber-200"></div>
                  <div className="flex justify-between">
                    <span className="font-bold text-gray-800">जम्मा:</span>
                    <span className="font-black text-amber-600 text-lg">रु. {grandTotal}/-</span>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Submit Button */}
        <div className="p-4 pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3.5 rounded-xl font-bold text-base flex items-center justify-center gap-2 shadow-xl transition-all active:scale-[0.98] ${
              orderType === 'buy'
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white animate-cta-pulse'
                : 'bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white'
            } ${isSubmitting ? 'opacity-80 cursor-not-allowed animate-none' : ''}`}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                {orderType === 'buy' ? (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Confirm Order
                    <ChevronRight className="w-5 h-5" />
                  </>
                ) : (
                  <>
                    <MessageCircle className="w-5 h-5" />
                    Submit
                    <ChevronRight className="w-5 h-5" />
                  </>
                )}
              </>
            )}
          </button>
          
          {/* Trust Note */}
          <div className="flex items-center justify-center gap-2 mt-3 text-[10px] text-gray-500">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
            <span>Wallet आयेपछि हेरेर पैसा दिनुहोस्</span>
          </div>
        </div>
      </form>
    </div>
  );
}

