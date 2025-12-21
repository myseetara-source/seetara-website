'use client';

import { CheckCircle, MessageCircle } from 'lucide-react';

interface SuccessMessageProps {
  orderType: string;
  formData: {
    name: string;
    phone: string;
    address: string;
    city: string;
  };
  onReset: () => void;
  productColor?: string;
  grandTotal?: number;
}

// Function to open WhatsApp - handles mobile and desktop
const openWhatsApp = (formData: SuccessMessageProps['formData'], orderType: string, productColor?: string, grandTotal?: number) => {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '9779802359033';
  
  let message: string;
  
  if (orderType === 'buy') {
    message = `Namaste Seetara Team

Maile hajurko website bata bharkharai order place gareko chu. Please mero order confirm garidinus hola.

*Mero Order Details:*
• *Name:* ${formData.name}
• *Phone:* ${formData.phone}
• *Product:* Seetara Chain Bag
• *Color:* ${productColor || 'N/A'}
• *Address:* ${formData.address}, ${formData.city}
• *Total Amount:* Rs. ${grandTotal || 'N/A'}

Yo order kahile samma delivery huncha hola? Thank you!`;
  } else {
    message = `Namaste Seetara Team

Maile hajurko website ma *${productColor || 'Seetara Chain Bag'}* dekhe. Malai yo product barema kehi janna thiyo.

*Mero Details:*
• *Name:* ${formData.name}
• *Phone:* ${formData.phone}

Kripaya malai yo product ko barema thap janakari dinuhola. Thank you!`;
  }

  const encodedMessage = encodeURIComponent(message);
  
  // Detect mobile device
  const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini|mobile|tablet/i.test(
    navigator.userAgent.toLowerCase()
  );
  
  // Use api.whatsapp.com for better compatibility
  const whatsappApiUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodedMessage}`;
  
  if (isMobile) {
    const isAndroid = /android/i.test(navigator.userAgent);
    const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
    
    if (isAndroid) {
      // Try Android intent first
      const intentUrl = `intent://send?phone=${whatsappNumber}&text=${encodedMessage}#Intent;scheme=whatsapp;package=com.whatsapp;end`;
      window.location.href = intentUrl;
      setTimeout(() => {
        window.location.href = whatsappApiUrl;
      }, 1500);
    } else if (isIOS) {
      // iOS - use whatsapp:// scheme
      const whatsappSchemeUrl = `whatsapp://send?phone=${whatsappNumber}&text=${encodedMessage}`;
      window.location.href = whatsappSchemeUrl;
      setTimeout(() => {
        if (!document.hidden) {
          window.location.href = whatsappApiUrl;
        }
      }, 2000);
    } else {
      window.location.href = whatsappApiUrl;
    }
  } else {
    // Desktop - open in new tab
    window.open(whatsappApiUrl, '_blank');
  }
};

export default function SuccessMessage({ orderType, formData, onReset, productColor, grandTotal }: SuccessMessageProps) {
  const handleWhatsAppClick = () => {
    openWhatsApp(formData, orderType, productColor, grandTotal);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center overflow-hidden relative">
      <style jsx>{`
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
        
        {/* WhatsApp Connect Button - For customers who want to chat immediately */}
        <button 
          onClick={handleWhatsAppClick}
          className="w-full bg-green-500 hover:bg-green-600 text-white py-4 rounded-xl font-bold shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2 mb-3"
        >
          <MessageCircle className="w-5 h-5" />
          WhatsApp ma Chat Gara 💬
        </button>
        
        <button onClick={onReset} className="w-full bg-gray-900 text-white py-4 rounded-xl font-bold shadow-lg active:scale-95 transition-transform">Back to Shop</button>
      </div>
    </div>
  );
}

