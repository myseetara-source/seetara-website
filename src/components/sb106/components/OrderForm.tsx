'use client';

import { ShoppingBag, HelpCircle, CheckCircle, Phone, AlertCircle, ShieldCheck, ArrowRight, Loader2 } from 'lucide-react';
import { Product } from '../utils/constants';
import { ChangeEvent, FormEvent } from 'react';

interface OrderFormProps {
  orderType: string;
  setOrderType: (type: string) => void;
  formData: {
    name: string;
    phone: string;
    address: string;
    city: string;
  };
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  deliveryLocation: string | null;
  setDeliveryLocation: (location: string | null) => void;
  currentProduct: Product;
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
    <div id="order-form" className="px-4 py-8 bg-white rounded-t-[2.5rem] shadow-[0_-10px_40px_rgba(0,0,0,0.05)] mt-4 animate-slide-up md:rounded-[2.5rem] md:mt-0 md:shadow-2xl md:border md:border-gray-100 transition-all hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)]" style={{ animationDelay: '0.3s' }}>
      <div className="w-12 h-1 bg-gray-200 rounded-full mx-auto mb-6 md:hidden"></div>
      
      <div className="text-center mb-8">
         <h2 className="text-3xl font-black text-gray-900 mb-2">Checkout</h2>
         <p className="text-gray-500 text-sm">Fill details to confirm delivery.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
         
         <div className="flex bg-gray-100 p-1 rounded-2xl mb-6">
            <button
              type="button"
              onClick={() => {
                  setOrderType('buy');
                  setDeliveryLocation(null);
              }}
              className={`flex-1 py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                  orderType === 'buy' 
                  ? 'bg-white text-black shadow-md' 
                  : 'text-gray-500 hover:bg-gray-200'
              }`}
            >
              <ShoppingBag className="w-4 h-4" /> I want to Buy
            </button>
            <button
              type="button"
              onClick={() => setOrderType('inquiry')}
              className={`flex-1 py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                  orderType === 'inquiry' 
                  ? 'bg-white text-black shadow-md' 
                  : 'text-gray-500 hover:bg-gray-200'
              }`}
            >
              <HelpCircle className="w-4 h-4" /> I have a Question
            </button>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
           <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                 <div className="bg-gray-100 p-1.5 rounded-lg"><CheckCircle className="w-4 h-4 text-gray-400" /></div>
              </div>
              <input required type="text" name="name" placeholder="Full Name" 
                className="w-full pl-14 pr-4 py-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:bg-white focus:border-yellow-400 outline-none transition-all font-medium text-[16px]" 
                value={formData.name} onChange={handleInputChange} />
           </div>

           <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                 <div className="bg-gray-100 p-1.5 rounded-lg"><Phone className="w-4 h-4 text-gray-400" /></div>
              </div>
              <input 
                required 
                type="tel" 
                name="phone" 
                placeholder="98XXXXXXXX (Nepal)" 
                pattern="(98|97)\d{8}"
                maxLength={10}
                inputMode="numeric"
                title="Please enter valid Nepal mobile number (10 digits starting with 98 or 97)"
                className="w-full pl-14 pr-4 py-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:bg-white focus:border-yellow-400 outline-none transition-all font-medium text-[16px]"
                value={formData.phone} 
                onChange={handleInputChange} 
              />
           </div>
         </div>

         {orderType === 'buy' && (
           <div className="space-y-5 animate-slide-up">
             <div className="flex gap-3">
                <input required type="text" name="city" placeholder="District" 
                  className="w-1/2 px-5 py-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:bg-white focus:border-yellow-400 outline-none transition-all font-medium text-[16px]"
                  value={formData.city} onChange={handleInputChange} />
                <input required type="text" name="address" placeholder="Address" 
                  className="w-1/2 px-5 py-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:bg-white focus:border-yellow-400 outline-none transition-all font-medium text-[16px]"
                  value={formData.address} onChange={handleInputChange} />
             </div>

             <div id="delivery-section" className="space-y-3">
                <label className="text-xs font-bold text-gray-500 uppercase ml-1 flex items-center gap-1">
                  Delivery Location <AlertCircle className="w-3 h-3 text-red-500" />
                </label>
                <div className="grid grid-cols-1 gap-3">
                  <button
                      type="button"
                      onClick={() => setDeliveryLocation('inside')}
                      className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all ${
                          deliveryLocation === 'inside' ? 'border-black bg-gray-50 ring-1 ring-black' : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                  >
                      <div className="flex items-center gap-3">
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${deliveryLocation === 'inside' ? 'border-black' : 'border-gray-300'}`}>
                              {deliveryLocation === 'inside' && <div className="w-2.5 h-2.5 rounded-full bg-black" />}
                          </div>
                          <div className="text-left">
                              <p className="font-bold text-sm text-gray-900">Inside Kathmandu Valley</p>
                              <p className="text-xs text-gray-500">Ringroad & close areas</p>
                          </div>
                      </div>
                      <span className="font-bold text-sm">+ Rs. 100</span>
                  </button>

                  <button
                      type="button"
                      onClick={() => setDeliveryLocation('outside')}
                      className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all ${
                          deliveryLocation === 'outside' ? 'border-black bg-gray-50 ring-1 ring-black' : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                  >
                      <div className="flex items-center gap-3">
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${deliveryLocation === 'outside' ? 'border-black' : 'border-gray-300'}`}>
                              {deliveryLocation === 'outside' && <div className="w-2.5 h-2.5 rounded-full bg-black" />}
                          </div>
                          <div className="text-left">
                              <p className="font-bold text-sm text-gray-900">Outside Valley</p>
                              <p className="text-xs text-gray-500">All major cities in Nepal</p>
                          </div>
                      </div>
                      <span className="font-bold text-sm">+ Rs. 150</span>
                  </button>
                </div>
             </div>

             <div className="bg-yellow-50 p-5 rounded-2xl border border-yellow-100 space-y-2">
                <div className="flex justify-between text-sm text-gray-600">
                    <span>Item Price:</span>
                    <span>Rs. {currentProduct.price}</span>
                </div>
                {deliveryLocation && (
                    <div className="flex justify-between text-sm text-gray-600 animate-fade-in">
                        <span>Delivery Charge:</span>
                        <span>Rs. {deliveryCharge}</span>
                    </div>
                )}
                <div className="h-px bg-yellow-200 my-1"></div>
                <div className="flex justify-between text-lg font-black text-gray-900">
                    <span>Grand Total:</span>
                    <span>Rs. {grandTotal}</span>
                </div>
             </div>
           </div>
         )}

         <button type="submit" disabled={isSubmitting} className={`hidden md:flex w-full bg-black text-white py-4 rounded-xl font-bold justify-center items-center gap-2 transition-all shadow-lg ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-gray-800 hover:scale-[1.02] active:scale-[0.98] hover:shadow-xl'}`}>
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Processing your order...
              </>
            ) : (
              <>
                {orderType === 'buy' ? 'Confirm Order' : 'Send Inquiry'} 
                <ArrowRight className="w-5 h-5"/>
              </>
            )}
         </button>
         
         <div className="flex flex-col items-center justify-center gap-2 text-xs text-gray-400 mt-4">
            <div className="flex items-center gap-1">
               <ShieldCheck className="w-4 h-4 text-green-600" /> 
               <span className="font-medium text-gray-600">Secure Cash on Delivery</span>
            </div>
            <div className="flex items-center gap-1.5 opacity-80">
               <ShieldCheck className="w-3.5 h-3.5 text-gray-500" />
               <span className="font-medium text-gray-500">Data is secured & encrypted</span>
            </div>
         </div>
      </form>
    </div>
  );
}

