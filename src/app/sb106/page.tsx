import { Metadata } from 'next';
import { Suspense } from 'react';
import SB106LandingPage from '@/components/sb106/SB106LandingPage';

export const metadata: Metadata = {
  metadataBase: new URL('https://seetara.com.np'),
  title: '🔥 Limited Offer: Chain Bag @ Rs. 1499/- Only!',
  description: 'High quality, stylish and perfect for daily use. Available in Black, Maroon & Coffee colors. Tap to order now before stock ends! 🛍️',
  openGraph: {
    title: '🔥 Limited Offer: Chain Bag @ Rs. 1499/- Only!',
    description: 'High quality, stylish and perfect for daily use. Available in Black, Maroon & Coffee colors. Tap to order now before stock ends! 🛍️',
    type: 'website',
    locale: 'en_US',
    siteName: 'Seetara',
    url: 'https://seetara.com.np/sb106',
    images: [
      {
        url: '/OG-Imagev2.png',
        width: 1024,
        height: 1024,
        alt: 'Seetara Viral Chain Bag - Limited Offer Rs. 1499/-',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '🔥 Limited Offer: Chain Bag @ Rs. 1499/- Only!',
    description: 'High quality, stylish and perfect for daily use. Available in Black, Maroon & Coffee colors. Tap to order now before stock ends! 🛍️',
    images: ['/OG-Imagev2.png'],
  },
};

export default function SB106Page() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <SB106LandingPage />
    </Suspense>
  );
}
