'use client';

import { ArrowRight, Loader2 } from 'lucide-react';
import { Product } from '../utils/constants';
import { FormEvent } from 'react';

interface BottomBarProps {
  orderType: string;
  currentProduct: Product;
  grandTotal: number;
  handleSubmit: (e: FormEvent) => void;
  scrollToOrder: () => void;
  formData: {
    name: string;
    phone: string;
    address: string;
    city: string;
  };
  isSubmitting: boolean;
}

export default function BottomBar({
  orderType,
  currentProduct,
  grandTotal,
  handleSubmit,
  scrollToOrder,
  formData,
  isSubmitting
}: BottomBarProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 glass-nav border-t border-gray-100 p-3 pb-safe z-50 md:hidden animate-slide-up">
       <div className="flex gap-3 items-center justify-between">
          <div className="flex flex-col">
             {orderType === 'buy' ? (
                 <>
                  <div className="flex items-center gap-2">
                      <span className="text-gray-400 text-sm font-medium line-through decoration-red-500 decoration-2">Rs. {currentProduct.originalPrice}</span>
                      <span className="bg-red-100 text-red-600 text-[10px] font-bold px-1.5 py-0.5 rounded-md">-30% OFF</span>
                  </div>
                  <span className="text-xl font-black text-gray-900 leading-none">Rs. {grandTotal}</span>
                 </>
             ) : (
                 <span className="text-lg font-black text-gray-900 leading-none">Have Questions?</span>
             )}
          </div>
          <button 
             onClick={formData.name && formData.phone ? handleSubmit : scrollToOrder}
             disabled={isSubmitting}
             className={`${orderType === 'buy' ? 'bg-black' : 'bg-blue-600'} text-white px-6 py-3 rounded-2xl font-bold text-lg shadow-xl shadow-black/20 flex items-center gap-2 active:scale-95 transition-transform ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'animate-pulse-btn'}`}
          >
             {isSubmitting ? (
               <>
                 <Loader2 className="w-5 h-5 animate-spin" />
                 Processing...
               </>
             ) : (
               <>
                 {orderType === 'buy' ? 'Order Now' : 'Ask Now'} <ArrowRight className="w-5 h-5" />
               </>
             )}
          </button>
       </div>
    </div>
  );
}

