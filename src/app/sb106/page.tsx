'use client';

import { Suspense } from 'react';
import SB106LandingPage from '@/components/sb106/SB106LandingPage';

export default function SB106Page() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <SB106LandingPage />
    </Suspense>
  );
}

