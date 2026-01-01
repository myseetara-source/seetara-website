'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface ColorVariant {
  id: string;
  name: string;
  image: string;
  productUrl: string;
}

interface ColorSplitSliderProps {
  leftVariant: ColorVariant;
  rightVariant: ColorVariant;
  title?: string;
}

// Mock data for the slider
export const mockColorVariants = {
  left: {
    id: 'black-chain-bag',
    name: 'BLACK',
    image: 'https://pub-618cb6a991114e6b97382558a5b2adea.r2.dev/SB106/black-handbag.webp',
    productUrl: '/products/chain-bag-black',
  },
  right: {
    id: 'maroon-chain-bag',
    name: 'MAROON',
    image: 'https://pub-618cb6a991114e6b97382558a5b2adea.r2.dev/SB106/maroon-handbag.webp',
    productUrl: '/products/chain-bag-maroon',
  },
};

export default function ColorSplitSlider({
  leftVariant = mockColorVariants.left,
  rightVariant = mockColorVariants.right,
  title = "SLIDE TO SWITCH",
}: ColorSplitSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  // Slider position (0 to 1, 0.5 = center)
  const sliderX = useMotionValue(0.5);
  
  // Transform for clip-path percentage
  const clipPercent = useTransform(sliderX, [0, 1], [0, 100]);
  
  // Label opacities based on slider position
  const leftLabelOpacity = useTransform(sliderX, [0, 0.3, 0.5], [1, 0.8, 0.5]);
  const rightLabelOpacity = useTransform(sliderX, [0.5, 0.7, 1], [0.5, 0.8, 1]);

  // Update container width on resize
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  // Handle drag
  const handleDrag = (event: MouseEvent | TouchEvent | PointerEvent, info: { point: { x: number } }) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = info.point.x - rect.left;
    const percentage = Math.max(0.05, Math.min(0.95, x / rect.width));
    sliderX.set(percentage);
  };

  // Animate to center on double click
  const handleDoubleClick = () => {
    animate(sliderX, 0.5, { type: 'spring', stiffness: 300, damping: 30 });
  };

  return (
    <section className="py-12 md:py-20 px-4 md:px-8 bg-[#F5F5F5]">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <h2 className="text-2xl md:text-3xl font-bold text-[#1a1a1a] mb-8 tracking-wide">
          {title}
        </h2>

        {/* Slider Container */}
        <div
          ref={containerRef}
          className="relative w-full aspect-[4/3] md:aspect-[16/9] rounded-2xl overflow-hidden cursor-ew-resize select-none bg-[#E8E8E8]"
          onDoubleClick={handleDoubleClick}
        >
          {/* Right Image (Bottom Layer) */}
          <div className="absolute inset-0">
            <Image
              src={rightVariant.image}
              alt={rightVariant.name}
              fill
              className="object-contain"
              priority
              draggable={false}
            />
          </div>

          {/* Left Image (Top Layer with Clip) */}
          <motion.div
            className="absolute inset-0"
            style={{
              clipPath: useTransform(clipPercent, (v) => `inset(0 ${100 - v}% 0 0)`),
            }}
          >
            <Image
              src={leftVariant.image}
              alt={leftVariant.name}
              fill
              className="object-contain"
              priority
              draggable={false}
            />
          </motion.div>

          {/* Divider Line */}
          <motion.div
            className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg z-20"
            style={{
              left: useTransform(sliderX, (v) => `${v * 100}%`),
              x: '-50%',
            }}
          />

          {/* Drag Handle */}
          <motion.div
            drag="x"
            dragMomentum={false}
            dragElastic={0}
            dragConstraints={containerRef}
            onDrag={handleDrag}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={() => setIsDragging(false)}
            className="absolute top-1/2 z-30 cursor-grab active:cursor-grabbing"
            style={{
              left: useTransform(sliderX, (v) => `${v * 100}%`),
              x: '-50%',
              y: '-50%',
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <div
              className={`w-12 h-12 md:w-14 md:h-14 bg-white rounded-full shadow-xl flex items-center justify-center gap-0.5 transition-all duration-200 ${
                isDragging ? 'ring-4 ring-[#C9A227]/30 scale-110' : ''
              }`}
            >
              <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 text-[#1a1a1a]" />
              <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-[#1a1a1a]" />
            </div>
          </motion.div>

          {/* Left Label */}
          <motion.div
            className="absolute bottom-6 left-6 md:bottom-8 md:left-8 z-10"
            style={{ opacity: leftLabelOpacity }}
          >
            <h3 className="text-xl md:text-2xl font-bold text-[#1a1a1a] mb-1">
              {leftVariant.name}
            </h3>
            <Link
              href={leftVariant.productUrl}
              className="text-sm md:text-base text-[#1a1a1a] underline underline-offset-4 hover:text-[#C9A227] transition-colors font-medium"
            >
              SHOP NOW
            </Link>
          </motion.div>

          {/* Right Label */}
          <motion.div
            className="absolute bottom-6 right-6 md:bottom-8 md:right-8 z-10 text-right"
            style={{ opacity: rightLabelOpacity }}
          >
            <h3 className="text-xl md:text-2xl font-bold text-[#1a1a1a] mb-1">
              {rightVariant.name}
            </h3>
            <Link
              href={rightVariant.productUrl}
              className="text-sm md:text-base text-[#1a1a1a] underline underline-offset-4 hover:text-[#C9A227] transition-colors font-medium"
            >
              SHOP NOW
            </Link>
          </motion.div>

          {/* Touch Hint for Mobile */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 md:hidden">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: isDragging ? 0 : 0.6 }}
              className="text-xs text-[#666] bg-white/80 px-3 py-1 rounded-full"
            >
              ← Drag to compare →
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}

