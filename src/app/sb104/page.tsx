import { Metadata } from 'next';
import { Suspense } from 'react';
import SB104LandingPage from '@/components/sb104/SB104LandingPage';

// Preload the first image (Olive) for faster initial load
const FIRST_IMAGE_URL = 'https://pub-618cb6a991114e6b97382558a5b2adea.r2.dev/SB104/olive-bag.webp';

export const metadata: Metadata = {
  metadataBase: new URL('https://seetara.com.np'),
  title: 'Seetara Multi-Functional Bag | 5-Compartment Work & Travel Bag | Nepal',
  description: 'Premium Multi-Functional Bag with 5-Compartment System, 2-in-1 Smart Pocket (Anti-theft + Luggage Sleeve), Laptop Compatible. Perfect for Office & Travel. Rs. 1799 only. Cash on Delivery across Nepal.',
  keywords: ['Multi-Functional Bag', 'Work Bag', 'Laptop Bag', 'Travel Bag', 'Office Bag', 'Ladies Bag Nepal', 'Seetara Bags', '5 Compartment Bag', 'Luggage Sleeve Bag', 'Anti-theft Bag'],
  openGraph: {
    title: 'Seetara Multi-Functional Bag | Office + Travel Ready',
    description: '5-Compartment System • 2-in-1 Smart Pocket • Laptop Compatible • Rs. 1799 Only • Cash on Delivery',
    type: 'website',
    locale: 'en_US',
    siteName: 'Seetara',
    url: 'https://seetara.com.np/sb104',
    images: [
      {
        url: '/OG-Imagev2.png',
        width: 1024,
        height: 1024,
        alt: 'Seetara Multi-Functional Bag - Premium Work & Travel Bag',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Seetara Multi-Functional Bag | 5-Compartment Work & Travel Bag',
    description: 'Premium Multi-Functional Bag with 2-in-1 Smart Pocket. Rs. 1799 only with Cash on Delivery.',
    images: ['/OG-Imagev2.png'],
  },
};

export default function SB104Page() {
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
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-emerald-50 to-white">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-emerald-600 font-medium">Loading...</p>
          </div>
        </div>
      }>
        <SB104LandingPage />
      </Suspense>
    </>
  );
}

