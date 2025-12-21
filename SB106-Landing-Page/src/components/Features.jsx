import React from 'react';
import { Users, Eye, Truck, Award, Star } from 'lucide-react';

const Features = ({ stockLeft, viewers }) => {
  const totalStock = 50;
  const soldPercentage = Math.min(100, Math.max(0, ((totalStock - stockLeft) / totalStock) * 100));

  let progressColorClass = "from-orange-400 to-red-500"; 
  let urgencyTextClass = "text-orange-600";
  let stockMessage = "Selling Fast 🔥";

  if (stockLeft <= 5) {
    progressColorClass = "from-red-600 to-red-900 animate-pulse"; 
    urgencyTextClass = "text-red-600 animate-pulse";
    stockMessage = "Almost Gone! 😱";
  } else if (stockLeft <= 10) {
    progressColorClass = "from-red-500 to-red-700"; 
    urgencyTextClass = "text-red-500";
    stockMessage = "Hurry Up! ⚡";
  }

  return (
    <div className="px-4 space-y-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
       <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-3">
             <h3 className={`font-bold ${stockLeft <= 5 ? 'text-red-600' : 'text-gray-800'}`}>{stockMessage}</h3>
             <span className={`text-xs font-bold ${urgencyTextClass}`}>{stockLeft} items left</span>
          </div>
          
          <div className="w-full bg-gray-100 rounded-full h-2.5 mb-2 overflow-hidden border border-gray-100">
            <div 
              className={`h-full rounded-full transition-all duration-1000 ease-out bg-gradient-to-r ${progressColorClass}`}
              style={{ width: `${soldPercentage}%` }}
            ></div>
          </div>
          
          <div className="flex items-center gap-2 text-xs text-gray-500 mt-2">
            <Users className="w-3 h-3 text-green-500" />
            <span><span className="font-bold text-gray-800">{viewers}</span> people are viewing this right now.</span>
          </div>
       </div>

       {/* Trust Cards */}
       <div className="grid grid-cols-3 gap-3">
          <div className="bg-white p-3 rounded-2xl border border-green-100 flex flex-col items-center text-center gap-1 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-300 group cursor-default">
             <div className="p-2 bg-green-50 rounded-full group-hover:scale-110 transition-transform">
               <Eye className="w-5 h-5 text-[#228B22]" />
             </div>
             <div>
                <span className="block font-black text-gray-900 text-[10px] leading-tight">Open Box Delivery</span>
                <span className="block text-[8px] font-medium text-gray-500 mt-0.5">Check then Pay</span>
             </div>
          </div>
          <div className="bg-white p-3 rounded-2xl border border-blue-100 flex flex-col items-center text-center gap-1 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-300 group cursor-default">
             <div className="p-2 bg-blue-50 rounded-full group-hover:scale-110 transition-transform">
               <Truck className="w-5 h-5 text-[#1E90FF]" />
             </div>
             <div>
                <span className="block font-black text-gray-900 text-[10px] leading-tight">Fast Delivery</span>
                <span className="block text-[8px] font-medium text-gray-500 mt-0.5">Home delivery all Nepal</span>
             </div>
          </div>
          <div className="bg-white p-3 rounded-2xl border border-yellow-100 flex flex-col items-center text-center gap-1 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-300 group cursor-default">
             <div className="p-2 bg-yellow-50 rounded-full group-hover:scale-110 transition-transform">
               <Award className="w-5 h-5 text-[#DAA520]" />
             </div>
             <div>
                <span className="block font-black text-gray-900 text-[10px] leading-tight">Quality Guarantee</span>
                <span className="block text-[8px] font-medium text-gray-500 mt-0.5">Premium Product</span>
             </div>
          </div>
       </div>

       {/* Real Customer Reviews */}
       <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-900 mb-3 text-sm flex items-center gap-2">
             <Star className="w-4 h-4 text-yellow-400 fill-current" />
             Recent Customer Reviews
          </h3>
          <div className="space-y-3">
             <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                <div className="flex items-center justify-between mb-1">
                   <p className="text-xs font-bold text-gray-800">Sita G. <span className="font-normal text-gray-500">from Kathmandu</span></p>
                   <div className="flex text-yellow-400"><Star className="w-3 h-3 fill-current"/><Star className="w-3 h-3 fill-current"/><Star className="w-3 h-3 fill-current"/><Star className="w-3 h-3 fill-current"/><Star className="w-3 h-3 fill-current"/></div>
                </div>
                <p className="text-[11px] text-gray-600 italic">"Bag ekdam ramro cha. Photo vanda real ma jhan ramro lagyo. Delivery pani fast raicha."</p>
             </div>
             <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                <div className="flex items-center justify-between mb-1">
                   <p className="text-xs font-bold text-gray-800">Rabina M. <span className="font-normal text-gray-500">from Pokhara</span></p>
                   <div className="flex text-yellow-400"><Star className="w-3 h-3 fill-current"/><Star className="w-3 h-3 fill-current"/><Star className="w-3 h-3 fill-current"/><Star className="w-3 h-3 fill-current"/><Star className="w-3 h-3 fill-current"/></div>
                </div>
                <p className="text-[11px] text-gray-600 italic">"Golden chain quality is premium. Value for money!"</p>
             </div>
          </div>
       </div>
    </div>
  );
};

export default Features;

