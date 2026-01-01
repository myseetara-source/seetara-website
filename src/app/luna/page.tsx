import { Metadata } from 'next';
import { Suspense } from 'react';
import LunaLandingPage from '@/components/luna/LunaLandingPage';

// Preload the first image (Black) for faster initial load
const FIRST_IMAGE_URL = 'https://pub-618cb6a991114e6b97382558a5b2adea.r2.dev/luna/black-luna.webp';

export const metadata: Metadata = {
  metadataBase: new URL('https://seetara.com.np'),
  title: 'The Luna - Space for Your Universe | Seetara Nepal',
  description: 'The Luna by Seetara - Premium laptop tote bag that fits 15.6" laptop, water bottle & all your essentials. Comes with matching pouch. One Bag. All Day.',
  keywords: ['Luna bag', 'Seetara Luna', 'Laptop bag Nepal', 'Tote bag Nepal', 'Ladies laptop bag', 'Premium bag Nepal', 'Online shopping Nepal'],
  openGraph: {
    title: 'The Luna - Space for Your Universe | Seetara Nepal',
    description: 'Premium laptop tote bag that fits 15.6" laptop, water bottle & all your essentials. Comes with matching pouch.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Seetara',
    url: 'https://seetara.com.np/luna',
    images: [
      {
        url: '/OG-Imagev2.png',
        width: 1024,
        height: 1024,
        alt: 'Seetara Luna - Premium Laptop Tote Bag',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Luna - Space for Your Universe | Seetara Nepal',
    description: 'Premium laptop tote bag that fits 15.6" laptop, water bottle & all your essentials.',
    images: ['/OG-Imagev2.png'],
  },
};

export default function LunaPage() {
  return (
    <>
      {/* Preload the first product image for faster initial load */}
      <link
        rel="preload"
        href={FIRST_IMAGE_URL}
        as="image"
        type="image/webp"
      />
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-900 to-slate-800 text-white">Loading...</div>}>
        <LunaLandingPage />
      </Suspense>
    </>
  );
}

