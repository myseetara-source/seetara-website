'use client';

import { CheckCircle, MessageCircle, Phone, Briefcase, Sparkles } from 'lucide-react';

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

const openWhatsApp = (formData: SuccessMessageProps['formData'], orderType: string, productColor?: string, grandTotal?: number) => {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '9779802359033';
  
  let message: string;
  
  if (orderType === 'buy') {
    message = `नमस्ते Seetara Team 🙏

मैले भर्खरै अर्डर गरेको छु। कृपया Confirm गरिदिनुहोस्।

*मेरो अर्डर:*
• *नाम:* ${formData.name}
• *Phone:* ${formData.phone}
• *Product:* Multi-Functional Bag
• *Color:* ${productColor || 'N/A'}
• *ठेगाना:* ${formData.address}, ${formData.city}
• *Total:* रु. ${grandTotal || 'N/A'}

कहिलेसम्म आउँछ? धन्यवाद! 🙏`;
  } else {
    message = `नमस्ते Seetara Team 🙏

मैले Website मा *Multi-Functional Bag* देखें। मलाई यो Product बारेमा केहि जान्न थियो।

*मेरो Details:*
• *नाम:* ${formData.name}
• *Phone:* ${formData.phone}

कृपया Details दिनुहोला। धन्यवाद! 🙏`;
  }

  const encodedMessage = encodeURIComponent(message);
  
  const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini|mobile|tablet/i.test(
    navigator.userAgent.toLowerCase()
  );
  
  const whatsappApiUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodedMessage}`;
  
  if (isMobile) {
    const isAndroid = /android/i.test(navigator.userAgent);
    const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
    
    if (isAndroid) {
      const intentUrl = `intent://send?phone=${whatsappNumber}&text=${encodedMessage}#Intent;scheme=whatsapp;package=com.whatsapp;end`;
      window.location.href = intentUrl;
      setTimeout(() => {
        window.location.href = whatsappApiUrl;
      }, 1500);
    } else if (isIOS) {
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
    window.open(whatsappApiUrl, '_blank');
  }
};

export default function SuccessMessage({ orderType, formData, onReset, productColor, grandTotal }: SuccessMessageProps) {
  const handleWhatsAppClick = () => {
    openWhatsApp(formData, orderType, productColor, grandTotal);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white flex flex-col items-center justify-center p-6 text-center overflow-hidden relative">
      <style jsx>{`
        @keyframes confetti-fall { 0% { transform: translateY(-100vh) rotate(0deg); opacity: 1; } 100% { transform: translateY(100vh) rotate(720deg); opacity: 0; } }
        .confetti { position: absolute; width: 10px; height: 10px; animation: confetti-fall 3s linear infinite; }
        .animate-pop-in { animation: popIn 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
        @keyframes popIn { 0% { transform: scale(0.5); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
      `}</style>
      
      {/* Confetti */}
      {Array.from({ length: 50 }).map((_, i) => (
        <div 
          key={i} 
          className="confetti" 
          style={{ 
            left: `${Math.random() * 100}vw`, 
            animationDelay: `${Math.random() * 2}s`, 
            backgroundColor: ['#10B981', '#14B8A6', '#F59E0B', '#3B82F6', '#8B5CF6'][Math.floor(Math.random() * 5)] 
          }}
        />
      ))}
      
      <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-sm border border-emerald-100 animate-pop-in relative">
        <Sparkles className="absolute top-3 right-3 w-5 h-5 text-yellow-400 animate-pulse" />
        <Sparkles className="absolute top-3 left-3 w-5 h-5 text-yellow-400 animate-pulse" />
        
        <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-5 shadow-lg animate-bounce">
          <CheckCircle className="w-10 h-10 text-white" />
        </div>
        
        <h2 className="text-xl font-black text-gray-900 mb-1.5">
          {orderType === 'buy' ? '🎉 अर्डर सफल भयो!' : '📨 Message पठाइयो!'}
        </h2>
        <p className="text-gray-600 mb-5 text-sm">
          {orderType === 'buy' 
              ? 'बधाई छ! तपाईंको Work Bag अर्डर Confirm भयो। हाम्रो Team ले छिट्टै Call गर्नेछ!' 
              : 'धन्यवाद! तपाईंको Message पाएँ। हाम्रो Team ले छिट्टै Contact गर्नेछ!'}
        </p>
        
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-3 rounded-xl border border-emerald-100 mb-4">
           <div className="flex items-center justify-center gap-1.5 mb-0.5">
             <Phone className="w-3.5 h-3.5 text-emerald-600" />
             <p className="text-[10px] text-emerald-600 font-bold">Confirmation SMS पठाइएको:</p>
           </div>
           <p className="font-black text-lg text-gray-800">{formData.phone}</p>
        </div>
        
        {orderType === 'buy' && (
          <div className="bg-amber-50 p-2.5 rounded-lg border border-amber-200 mb-4 flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-amber-600 shrink-0" />
            <p className="text-[11px] text-amber-700 font-medium text-left">
              💼 Premium Work Bag छिट्टै आइपुग्छ!
            </p>
          </div>
        )}
        
        <button 
          onClick={handleWhatsAppClick}
          className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white py-3.5 rounded-xl font-bold shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2 mb-2.5 text-sm"
        >
          <MessageCircle className="w-4 h-4" />
          WhatsApp मा कुरा गर्नुहोस् 💬
        </button>
        
        <button 
          onClick={onReset} 
          className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-xl font-bold transition-all text-sm"
        >
          ← फेरि Shopping गर्नुहोस्
        </button>
        
        <p className="text-[10px] text-gray-400 mt-3">
          🔒 तपाईंको पैसा सुरक्षित छ • Cash on Delivery
        </p>
      </div>
    </div>
  );
}

