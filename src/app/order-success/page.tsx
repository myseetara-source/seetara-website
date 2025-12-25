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

// Facebook Messenger icon component
const MessengerIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M12 2C6.36 2 2 6.13 2 11.7c0 2.91 1.19 5.44 3.14 7.17.16.13.26.35.27.57l.05 1.78c.04.57.61.94 1.13.71l1.98-.87c.17-.08.36-.1.55-.06.91.25 1.87.38 2.88.38 5.64 0 10-4.13 10-9.7C22 6.13 17.64 2 12 2zm5.89 7.58l-2.88 4.57c-.46.73-1.41.92-2.09.42l-2.29-1.72a.54.54 0 00-.65 0l-3.09 2.34c-.41.31-.95-.16-.68-.59l2.88-4.57c.46-.73 1.41-.92 2.09-.42l2.29 1.72c.2.15.46.15.65 0l3.09-2.34c.41-.31.95.16.68.59z"/>
  </svg>
);

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
  const deliveryLocation = searchParams.get('delivery') || ''; // 'inside' or 'outside'
  const productName = searchParams.get('product') || 'Seetara Chain Bag'; // Dynamic product name

  // Delivery message based on location
  const getDeliveryMessage = () => {
    if (deliveryLocation === 'inside') {
      return 'Delivery within 24 hours';
    } else if (deliveryLocation === 'outside') {
      return 'Delivery within 1-2 business days';
    }
    return 'Delivery within 3-5 business days';
  };

  // Fire Facebook Pixel Purchase event on page load
  useEffect(() => {
    if (typeof window !== 'undefined' && window.fbq && orderType === 'buy') {
      window.fbq('track', 'Purchase', {
        value: parseFloat(grandTotal),
        currency: 'NPR',
        content_name: `${productName} - ${productColor}`,
        content_type: 'product',
      });
    }
  }, [orderType, grandTotal, productColor, productName]);

  // WhatsApp handler - opens WhatsApp with pre-filled message
  const handleWhatsAppClick = () => {
    const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '9779802359033';
    
    let message: string;
    
    if (orderType === 'buy') {
      message = `Namaste Seetara Team

Maile hajurko website bata bharkharai order place gareko chu. Please mero order confirm garidinus hola.

*Mero Order Details:*
• *Name:* ${name}
• *Phone:* ${phone}
• *Product:* ${productName}
• *Color:* ${productColor || 'N/A'}
• *Address:* ${address}, ${city}
• *Total Amount:* Rs. ${grandTotal}

Yo order kahile samma delivery huncha hola? Thank you!`;
    } else {
      message = `Namaste Seetara Team

Maile hajurko website ma *${productName}* dekhe. Malai yo product barema kehi janna thiyo.

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

  // Messenger handler - opens Messenger with message copied to clipboard
  const handleMessengerClick = () => {
    const messengerPageId = process.env.NEXT_PUBLIC_MESSENGER_PAGE_ID || '368155539704608';
    
    let message: string;
    
    if (orderType === 'buy') {
      message = `Namaste Seetara Team

Maile hajurko website bata order place gareko chu. Please mero order confirm garidinus.

Order Details:
• Name: ${name}
• Phone: ${phone}
• Product: ${productName}
• Color: ${productColor || 'N/A'}
• Address: ${address}, ${city}
• Total: Rs. ${grandTotal}

Delivery kahile huncha? Thank you!`;
    } else {
      message = `Namaste Seetara Team

Maile hajurko website ma ${productName} dekhe. Malai yo product barema janna cha.

• Name: ${name}
• Phone: ${phone}

Kripaya details dinuhola. Thank you!`;
    }

    // Copy message to clipboard for user to paste
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(message).catch(() => {
        // Clipboard write failed silently
      });
    }
    
    // Open Messenger
    const messengerUrl = `https://m.me/${messengerPageId}`;
    window.location.href = messengerUrl;
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
                content_name: '${productName} - ${productColor}',
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
                <span>{getDeliveryMessage()}</span>
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
          
          {/* WhatsApp Button */}
          <button 
            onClick={handleWhatsAppClick}
            className="w-full bg-green-500 hover:bg-green-600 text-white py-4 rounded-xl font-bold shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2 mb-3"
          >
            <MessageCircle className="w-5 h-5" />
            WhatsApp ma Chat Gara 💬
          </button>
          
          {/* Messenger Button */}
          <button 
            onClick={handleMessengerClick}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-4 rounded-xl font-bold shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2 mb-3"
          >
            <MessengerIcon />
            Messenger ma Chat Gara 💬
          </button>
          
          <Link 
            href="/"
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
