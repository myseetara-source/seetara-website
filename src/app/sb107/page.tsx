import { Metadata } from 'next';
import { Suspense } from 'react';
import SB107LandingPage from '@/components/sb107/SB107LandingPage';

// Preload the first image (Maroon) for faster initial load
const FIRST_IMAGE_URL = 'https://pub-618cb6a991114e6b97382558a5b2adea.r2.dev/SB107/maroon-handbag.webp';

export const metadata: Metadata = {
  metadataBase: new URL('https://seetara.com.np'),
  title: 'SB107 - New Product Landing Page | Seetara Nepal',
  description: 'SB107 product landing page - Coming soon with amazing new products from Seetara Nepal.',
  keywords: ['SB107', 'Seetara bags', 'Ladies bag Nepal', 'Online shopping Nepal'],
  openGraph: {
    title: 'SB107 - New Product Landing Page | Seetara Nepal',
    description: 'SB107 product landing page - Coming soon with amazing new products from Seetara Nepal.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Seetara',
    url: 'https://seetara.com.np/sb107',
    images: [
      {
        url: '/OG-Imagev2.png',
        width: 1024,
        height: 1024,
        alt: 'Seetara SB107 Product',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SB107 - New Product Landing Page | Seetara Nepal',
    description: 'SB107 product landing page - Coming soon with amazing new products from Seetara Nepal.',
    images: ['/OG-Imagev2.png'],
  },
};

export default function SB107Page() {
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
        <SB107LandingPage />
      </Suspense>
    </>
  );
}

