import type { Metadata } from 'next';
import PushUpBraLandingPage from '@/components/pushupbra/PushUpBraLandingPage';

export const metadata: Metadata = {
  title: 'Seetara Push Up Bra - Comfortable & Stylish | सितारा',
  description: 'Premium Push Up Bra with wire-free comfort, breathable fabric & perfect lift. Nepal मा Free Delivery. Cash on Delivery Available.',
  keywords: 'push up bra nepal, comfortable bra, wire free bra, padded bra, seetara bra',
  openGraph: {
    title: 'Seetara Push Up Bra - Confidence Starts Here',
    description: 'Wire-free comfort with perfect lift. Breathable fabric. Discrete packaging. Cash on Delivery.',
    type: 'website',
    locale: 'ne_NP',
  },
};

export default function PushUpBraPage() {
  return <PushUpBraLandingPage />;
}
