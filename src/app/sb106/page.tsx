import { Metadata } from 'next';
import { Suspense } from 'react';
import SB106LandingPage from '@/components/sb106/SB106LandingPage';

export const metadata: Metadata = {
  metadataBase: new URL('https://seetara.com.np'),
  title: 'Viral Seetara Golden Chain Bag For Ladies In Nepal Rs. 1499/- Only! - Order Now!',
  description: 'Looking for a bag that looks expensive but fits your budget? The Seetara Chain Shoulder Bag is the perfect choice for you. It has a beautiful design with a shining gold chain that makes you look stylish instantly.',
  keywords: ['Ladies bag price in Nepal', 'Fancy side bag for girls', 'Party wear purse', 'Seetara bags', 'Online shopping Nepal ladies bag', 'Sasto ra ramro bag', 'Chain wala bag', 'Gift for girlfriend Nepal', 'Ladies Side Bag', 'Seetara Viral Chain Bag', 'Seetara','Made In Nepal Bag','Ladies Side Bag In Nepal'],
  openGraph: {
  title: 'Viral Seetara Golden Chain Bag For Ladies In Nepal Rs. 1499/- Only! - Order Now!',
    title: '🔥 Limited Offer: Chain Bag @ Rs. 1499/- Only!',
  description: 'Looking for a bag that looks expensive but fits your budget? The Seetara Chain Shoulder Bag is the perfect choice for you. It has a beautiful design with a shining gold chain that makes you look stylish instantly.',
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
        alt: 'Seetara Viral GoldenChain Bag - Limited Time Offer Rs. 1499/-',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
  title: 'Viral Seetara Golden Chain Bag For Ladies In Nepal Rs. 1499/- Only! - Order Now!',
  title: 'Viral Seetara Golden Chain Bag For Ladies In Nepal Rs. 1499/- Only! - Order Now!',
    title: '🔥 Limited Offer: Chain Bag @ Rs. 1499/- Only!',
  description: 'Looking for a bag that looks expensive but fits your budget? The Seetara Chain Shoulder Bag is the perfect choice for you. It has a beautiful design with a shining gold chain that makes you look stylish instantly.',
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
