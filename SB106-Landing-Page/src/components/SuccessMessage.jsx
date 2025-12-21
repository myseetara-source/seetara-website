import React from 'react';
import { CheckCircle } from 'lucide-react';

const SuccessMessage = ({ orderType, formData, onReset }) => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center overflow-hidden relative">
      <style>{`
        @keyframes confetti-fall { 0% { transform: translateY(-100vh) rotate(0deg); opacity: 1; } 100% { transform: translateY(100vh) rotate(720deg); opacity: 0; } }
        .confetti { position: absolute; width: 10px; height: 10px; animation: confetti-fall 3s linear infinite; }
        .animate-pop-in { animation: popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
        @keyframes popIn { 0% { transform: scale(0.5); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
      `}</style>
      {Array.from({ length: 50 }).map((_, i) => (
        <div key={i} className="confetti" style={{ left: `${Math.random() * 100}vw`, animationDelay: `${Math.random() * 2}s`, backgroundColor: ['#FFD700', '#FF0000', '#00FF00', '#0000FF'][Math.floor(Math.random() * 4)] }}></div>
      ))}
      <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-sm border border-green-50 animate-pop-in">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        <h2 className="text-2xl font-black text-gray-900 mb-2">
          {orderType === 'buy' ? 'Order Successful! 🎉' : 'Inquiry Sent! 📨'}
        </h2>
        <p className="text-gray-600 mb-6">
          {orderType === 'buy' 
              ? 'Tapai ko order confirm vayo. Hamro team le call garnecha.' 
              : 'Tapai ko inquiry hamile payau. Hamro team le call garnecha.'}
        </p>
        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 mb-6">
           <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Confirmation sent to</p>
           <p className="font-bold text-lg text-gray-800 tracking-wide">{formData.phone}</p>
        </div>
        <button onClick={onReset} className="w-full bg-gray-900 text-white py-4 rounded-xl font-bold shadow-lg active:scale-95 transition-transform">Back to Shop</button>
      </div>
    </div>
  );
};

export default SuccessMessage;

