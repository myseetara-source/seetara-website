import { Metadata } from 'next';
import { Suspense } from 'react';
import SB106LandingPage from '@/components/sb106/SB106LandingPage';

// Preload the first image (Maroon) for faster initial load
const FIRST_IMAGE_URL = 'https://pub-618cb6a991114e6b97382558a5b2adea.r2.dev/SB106/maroon-handbag.webp';

export const metadata: Metadata = {
  metadataBase: new URL('https://seetara.com.np'),
  title: 'Viral Seetara Golden Chain Bag For Ladies In Nepal Rs. 1499/- Only! - Order Now!',
  description: 'Looking for a bag that looks expensive but fits your budget? The Seetara Chain Shoulder Bag is the perfect choice for you. It has a beautiful design with a shining gold chain that makes you look stylish instantly.',
  keywords: ['Ladies bag price in Nepal', 'Fancy side bag for girls', 'Party wear purse', 'Seetara bags', 'Online shopping Nepal ladies bag', 'Sasto ra ramro bag', 'Chain wala bag', 'Gift for girlfriend Nepal', 'Ladies Side Bag', 'Seetara Viral Chain Bag', 'Seetara','Made In Nepal Bag','Ladies Side Bag In Nepal'],
  openGraph: {
    title: 'Viral Seetara Golden Chain Bag For Ladies In Nepal Rs. 1499/- Only! - Order Now!',
    description: 'Looking for a bag that looks expensive but fits your budget? The Seetara Chain Shoulder Bag is the perfect choice for you. It has a beautiful design with a shining gold chain that makes you look stylish instantly.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Seetara',
    url: 'https://seetara.com.np/sb106',
    images: [
      {
        url: '/OG-Imagev2.png',
        width: 1024,
        height: 1024,
        alt: 'Seetara Viral Golden Chain Bag - Limited Time Offer Rs. 1499/-',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Viral Seetara Golden Chain Bag For Ladies In Nepal Rs. 1499/- Only! - Order Now!',
    description: 'Looking for a bag that looks expensive but fits your budget? The Seetara Chain Shoulder Bag is the perfect choice for you. It has a beautiful design with a shining gold chain that makes you look stylish instantly.',
    images: ['/OG-Imagev2.png'],
  },
};

export default function SB106Page() {
  return (
    <>
      {/* Preload the first product image for faster initial load */}
      <link
        rel="preload"
        href={FIRST_IMAGE_URL}
        as="image"
        type="image/webp"
      />
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
        <SB106LandingPage />
      </Suspense>
    </>
  );
}
