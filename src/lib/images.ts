/**
 * Centralized Image URLs - All website images served from Cloudflare R2
 * 
 * BEST PRACTICES:
 * 1. All static images are stored in Cloudflare R2 for better CDN performance
 * 2. Import images from this file instead of using local paths
 * 3. Use getR2ImageUrl() for dynamic image paths
 * 4. Fallback images are provided for graceful degradation
 * 
 * Generated: 2025-12-03T21:08:16.236Z
 */

// R2 Base URL from environment
const R2_PUBLIC_URL = process.env.NEXT_PUBLIC_R2_PUBLIC_URL || 'https://pub-618cb6a991114e6b97382558a5b2adea.r2.dev';

/**
 * Helper to get R2 URL for an image path
 * Converts local paths like /images/products/bag.jpg to R2 URLs
 */
export function getR2ImageUrl(path: string): string {
  // If already a full URL, return as-is
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  // Convert images/ to website/ for R2 structure
  const r2Path = cleanPath.replace('images/', 'website/');
  return `${R2_PUBLIC_URL}/${r2Path}`;
}

/**
 * Fallback image for products when no image is available
 */
export function getProductImageWithFallback(imageUrl: string | null | undefined): string {
  if (!imageUrl) {
    return PRODUCTS.PLACEHOLDER;
  }
  return getR2ImageUrl(imageUrl);
}

// =====================================================
// LOGO
// =====================================================
export const LOGO = 'https://pub-618cb6a991114e6b97382558a5b2adea.r2.dev/website/logo/logo.png';

// =====================================================
// HERO SECTION
// =====================================================
export const HERO_BAG = 'https://pub-618cb6a991114e6b97382558a5b2adea.r2.dev/website/hero-bag.jpg';

// =====================================================
// PRODUCTS
// =====================================================
export const PRODUCTS = {
  TOTE_BLACK: 'https://pub-618cb6a991114e6b97382558a5b2adea.r2.dev/website/products/tote-black.jpg',
  TOTE_COGNAC: 'https://pub-618cb6a991114e6b97382558a5b2adea.r2.dev/website/products/tote-cognac.jpg',
  TOTE_OLIVE: 'https://pub-618cb6a991114e6b97382558a5b2adea.r2.dev/website/products/tote-olive.jpg',
  TOTE_BLACK_DETAIL: 'https://pub-618cb6a991114e6b97382558a5b2adea.r2.dev/website/products/tote-black-detail.jpg',
  TOTE_COGNAC_DETAIL: 'https://pub-618cb6a991114e6b97382558a5b2adea.r2.dev/website/products/tote-cognac-detail.jpg',
  SHOULDER_BLACK: 'https://pub-618cb6a991114e6b97382558a5b2adea.r2.dev/website/products/shoulder-black.jpg',
  SHOULDER_MAROON: 'https://pub-618cb6a991114e6b97382558a5b2adea.r2.dev/website/products/shoulder-maroon.jpg',
  HOBO_BROWN: 'https://pub-618cb6a991114e6b97382558a5b2adea.r2.dev/website/products/hobo-brown.jpg',
  MAKE_PURSE: 'https://pub-618cb6a991114e6b97382558a5b2adea.r2.dev/website/products/Added Make Purse (3).png',
  PLACEHOLDER: 'https://pub-618cb6a991114e6b97382558a5b2adea.r2.dev/website/products/tote-black.jpg',
} as const;

// =====================================================
// ABOUT & FOUNDER SECTION
// =====================================================
export const ABOUT = {
  CRAFTSMANSHIP: 'https://pub-618cb6a991114e6b97382558a5b2adea.r2.dev/website/craftsmanship.png',
  CRAFTSMANSHIP_JPG: 'https://pub-618cb6a991114e6b97382558a5b2adea.r2.dev/website/craftsmanship.jpg',
  DETAIL: 'https://pub-618cb6a991114e6b97382558a5b2adea.r2.dev/website/detail.jpg',
} as const;

export const FOUNDER = {
  MAIN: 'https://pub-618cb6a991114e6b97382558a5b2adea.r2.dev/website/founder.jpg',
  WORKING: 'https://pub-618cb6a991114e6b97382558a5b2adea.r2.dev/website/founder-working.jpg',
  ARTISANS: 'https://pub-618cb6a991114e6b97382558a5b2adea.r2.dev/website/founder-artisans.jpg',
  SIGNATURE: 'https://pub-618cb6a991114e6b97382558a5b2adea.r2.dev/website/signature.png',
} as const;

// =====================================================
// TESTIMONIALS / CUSTOMERS
// =====================================================
export const TESTIMONIALS = {
  CUSTOMER_1: 'https://pub-618cb6a991114e6b97382558a5b2adea.r2.dev/website/testimonials/customer-1.jpg',
  CUSTOMER_2: 'https://pub-618cb6a991114e6b97382558a5b2adea.r2.dev/website/testimonials/customer-2.jpg',
  CUSTOMER_3: 'https://pub-618cb6a991114e6b97382558a5b2adea.r2.dev/website/testimonials/customer-3.jpg',
} as const;

// =====================================================
// TRUST & CERTIFICATES
// =====================================================
export const CERTIFICATES = {
  REGISTRATION: 'https://pub-618cb6a991114e6b97382558a5b2adea.r2.dev/website/certificates/registration.jpg',
  PAN: 'https://pub-618cb6a991114e6b97382558a5b2adea.r2.dev/website/certificates/pan.jpg',
} as const;

// =====================================================
// ALL IMAGES EXPORT (for programmatic access)
// =====================================================
export const IMAGES = {
  LOGO,
  HERO_BAG,
  ...PRODUCTS,
  ...ABOUT,
  ...FOUNDER,
  ...TESTIMONIALS,
  ...CERTIFICATES,
} as const;

// Type exports
export type ImageKey = keyof typeof IMAGES;
export type ProductImageKey = keyof typeof PRODUCTS;
export type TestimonialImageKey = keyof typeof TESTIMONIALS;
export type CertificateImageKey = keyof typeof CERTIFICATES;
