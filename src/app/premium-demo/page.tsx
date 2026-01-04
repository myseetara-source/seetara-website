'use client';

import { useState } from 'react';
import { ShoppingBag } from 'lucide-react';
import ColorSplitSlider, { mockColorVariants } from '@/components/premium/ColorSplitSlider';
import ShoppableReels, { mockReels } from '@/components/premium/ShoppableReels';
import CheckoutDrawer, { mockCartItems } from '@/components/premium/CheckoutDrawer';

export default function PremiumDemoPage() {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-serif font-bold text-[#1a1a1a]">
            Seetara
          </h1>
          <button
            onClick={() => setIsCheckoutOpen(true)}
            className="relative w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors"
          >
            <ShoppingBag className="w-5 h-5 text-[#1a1a1a]" />
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#C9A227] text-white text-xs rounded-full flex items-center justify-center font-bold">
              1
            </span>
          </button>
        </div>
      </header>

      {/* Hero Section with Color Split Slider */}
      <section className="py-8">
        <ColorSplitSlider
          leftVariant={mockColorVariants.left}
          rightVariant={mockColorVariants.right}
          title="SLIDE TO SWITCH"
        />
      </section>

      {/* Shoppable Reels Section */}
      <ShoppableReels
        reels={mockReels}
        title="THE STYLE EDIT"
      />

      {/* Color Split Slider with Different Colors */}
      <ColorSplitSlider
        leftVariant={{
          id: 'coffee-bag',
          name: 'COFFEE',
          image: 'https://pub-618cb6a991114e6b97382558a5b2adea.r2.dev/SB106/coffee-handbag.webp',
          productUrl: '/products/chain-bag-coffee',
        }}
        rightVariant={{
          id: 'brown-bag',
          name: 'BROWN',
          image: 'https://pub-618cb6a991114e6b97382558a5b2adea.r2.dev/SB106/brown-handbag.webp',
          productUrl: '/products/chain-bag-brown',
        }}
        title="EXPLORE COLORS"
      />

      {/* CTA Section */}
      <section className="py-16 px-4 bg-[#F5F5F5]">
        <div className="max-w-lg mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#1a1a1a] mb-4">
            Ready to Shop?
          </h2>
          <p className="text-gray-600 mb-8">
            Experience premium quality bags with our fast checkout process.
          </p>
          <button
            onClick={() => setIsCheckoutOpen(true)}
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#1a1a1a] text-white font-semibold rounded-full hover:bg-[#333] transition-colors"
          >
            <ShoppingBag className="w-5 h-5" />
            Open Checkout
          </button>
        </div>
      </section>

      {/* Checkout Drawer */}
      <CheckoutDrawer
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={mockCartItems}
      />
    </main>
  );
}




