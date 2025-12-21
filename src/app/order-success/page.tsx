'use client';

import { useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Script from 'next/script';
import { CheckCircle, MessageCircle, Truck, Phone, Banknote } from 'lucide-react';

// Declare fbq for TypeScript
declare global {
  interface Window {
    fbq?: (action: string, event: string, params?: Record<string, unknown>) => void;
  }
}

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  
  // Get order details from URL params
  const orderType = searchParams.get('type') || 'buy';
  const phone = searchParams.get('phone') || '';
  const name = searchParams.get('name') || '';
  const productColor = searchParams.get('color') || '';
  const grandTotal = searchParams.get('total') || '0';
  const address = searchParams.get('address') || '';
  const city = searchParams.get('city') || '';

  // Fire Facebook Pixel Purchase event on page load
  useEffect(() => {
    if (typeof window !== 'undefined' && window.fbq && orderType === 'buy') {
      window.fbq('track', 'Purchase', {
        value: parseFloat(grandTotal),
        currency: 'NPR',
        content_name: `Seetara Chain Bag - ${productColor}`,
        content_type: 'product',
      });
    }
  }, [orderType, grandTotal, productColor]);

  // WhatsApp handler
  const handleWhatsAppClick = () => {
    const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '9779802359033';
    
    let message: string;
    
    if (orderType === 'buy') {
      message = `Namaste Seetara Team

Maile hajurko website bata bharkharai order place gareko chu. Please mero order confirm garidinus hola.

*Mero Order Details:*
• *Name:* ${name}
• *Phone:* ${phone}
• *Product:* Seetara Chain Bag
• *Color:* ${productColor || 'N/A'}
• *Address:* ${address}, ${city}
• *Total Amount:* Rs. ${grandTotal}

Yo order kahile samma delivery huncha hola? Thank you!`;
    } else {
      message = `Namaste Seetara Team

Maile hajurko website ma *${productColor || 'Seetara Chain Bag'}* dekhe. Malai yo product barema kehi janna thiyo.

*Mero Details:*
• *Name:* ${name}
• *Phone:* ${phone}

Kripaya malai yo product ko barema thap janakari dinuhola. Thank you!`;
    }

    const encodedMessage = encodeURIComponent(message);
    
    // Detect mobile device
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

  return (
    <>
      {/* Facebook Pixel Purchase Event Script */}
      <Script
        id="fb-pixel-purchase"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            if (typeof fbq !== 'undefined' && '${orderType}' === 'buy') {
              fbq('track', 'Purchase', {
                value: ${parseFloat(grandTotal) || 0},
                currency: 'NPR',
                content_name: 'Seetara Chain Bag - ${productColor}',
                content_type: 'product'
              });
            }
          `,
        }}
      />
      
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center overflow-hidden relative">
        <style jsx>{`
          @keyframes confetti-fall { 0% { transform: translateY(-100vh) rotate(0deg); opacity: 1; } 100% { transform: translateY(100vh) rotate(720deg); opacity: 0; } }
          .confetti { position: absolute; width: 10px; height: 10px; animation: confetti-fall 3s linear infinite; }
          .animate-pop-in { animation: popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
          @keyframes popIn { 0% { transform: scale(0.5); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
        `}</style>
        
        {/* Confetti Animation */}
        {Array.from({ length: 50 }).map((_, i) => (
          <div 
            key={i} 
            className="confetti" 
            style={{ 
              left: `${Math.random() * 100}vw`, 
              animationDelay: `${Math.random() * 2}s`, 
              backgroundColor: ['#FFD700', '#FF0000', '#00FF00', '#0000FF'][Math.floor(Math.random() * 4)] 
            }}
          />
        ))}
        
        <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-sm border border-green-50 animate-pop-in z-10">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          
          <h1 className="text-2xl font-black text-gray-900 mb-2">
            {orderType === 'buy' ? 'Order Successful! 🎉' : 'Inquiry Sent! 📨'}
          </h1>
          
          <p className="text-gray-600 mb-6">
            {orderType === 'buy' 
              ? 'Tapai ko order confirm vayo. Hamro team le call garnecha.' 
              : 'Tapai ko inquiry hamile payau. Hamro team le call garnecha.'}
          </p>
          
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 mb-6">
            <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Confirmation sent to</p>
            <p className="font-bold text-lg text-gray-800 tracking-wide">{phone}</p>
          </div>
          
          {orderType === 'buy' && (
            <div className="space-y-3 text-sm text-left mb-6">
              <div className="flex items-center gap-3 text-gray-600">
                <Truck className="w-5 h-5 text-yellow-500" />
                <span>Delivery within 3-5 business days</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <Phone className="w-5 h-5 text-yellow-500" />
                <span>We&apos;ll call you to confirm</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <Banknote className="w-5 h-5 text-yellow-500" />
                <span>Payment on delivery (COD)</span>
              </div>
            </div>
          )}
          
          {/* WhatsApp Connect Button */}
          <button 
            onClick={handleWhatsAppClick}
            className="w-full bg-green-500 hover:bg-green-600 text-white py-4 rounded-xl font-bold shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2 mb-3"
          >
            <MessageCircle className="w-5 h-5" />
            WhatsApp ma Chat Gara 💬
          </button>
          
          <Link 
            href="/sb106"
            className="block w-full bg-gray-900 text-white py-4 rounded-xl font-bold shadow-lg active:scale-95 transition-transform text-center"
          >
            Back to Shop
          </Link>
        </div>
      </div>
    </>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    }>
      <OrderSuccessContent />
    </Suspense>
  );
}

