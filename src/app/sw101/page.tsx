import { Metadata } from 'next';
import { Suspense } from 'react';
import SW101LandingPage from '@/components/sw101/SW101LandingPage';

// Preload the first image (Terracotta) for faster initial load
const FIRST_IMAGE_URL = 'https://pub-618cb6a991114e6b97382558a5b2adea.r2.dev/SW101/terracotta-wallet.webp';

export const metadata: Metadata = {
  metadataBase: new URL('https://seetara.com.np'),
  title: 'Smart Wallet - Pull-Tab Magic! | Seetara Nepal',
  description: 'Seetara Smart Wallet - Phone + Cards + Cash सबै एकैमा! Smart Pull-Tab ले तान्नुहोस्, Phone निस्कन्छ। Premium PU Leather, 5 Card Slots, Zipper Pocket। Nepal मा पहिलो पटक!',
  keywords: ['Smart Wallet', 'Ladies Wallet Nepal', 'Phone Wallet', 'Pull Tab Wallet', 'Seetara Wallet', 'Card Holder Nepal', 'Women Wallet Nepal', 'Premium Wallet'],
  openGraph: {
    title: 'Smart Wallet - Pull-Tab Magic! | Seetara Nepal',
    description: 'Seetara Smart Wallet - Phone + Cards + Cash सबै एकैमा! Smart Pull-Tab ले तान्नुहोस्, Phone निस्कन्छ।',
    type: 'website',
    locale: 'en_US',
    siteName: 'Seetara',
    url: 'https://seetara.com.np/sw101',
    images: [
      {
        url: '/OG-Imagev2.png',
        width: 1024,
        height: 1024,
        alt: 'Seetara Smart Wallet - Pull Tab Phone Wallet',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Smart Wallet - Pull-Tab Magic! | Seetara Nepal',
    description: 'Seetara Smart Wallet - Phone + Cards + Cash सबै एकैमा! Smart Pull-Tab ले तान्नुहोस्, Phone निस्कन्छ।',
    images: ['/OG-Imagev2.png'],
  },
};

export default function SW101Page() {
  return (
    <>
      {/* Preload the first product image for faster initial load */}
      <link
        rel="preload"
        href={FIRST_IMAGE_URL}
        as="image"
        type="image/webp"
      />
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-amber-50 to-white">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-amber-600 font-medium">Loading Smart Wallet...</p>
          </div>
        </div>
      }>
        <SW101LandingPage />
      </Suspense>
    </>
  );
}

