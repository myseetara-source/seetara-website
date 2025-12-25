// Cloudflare R2 Configuration - SB104 Multi-Functional Bag
// Bucket: seetara-assets | Folder: SB104

const R2_BASE_URL = 'https://pub-618cb6a991114e6b97382558a5b2adea.r2.dev/SB104';

// Product images by color - Cloudflare R2 URLs
// Colors: Olive, Brown, Coffee, Black, Maroon
export const R2_IMAGE_URLS: Record<string, string> = {
  'Olive': `${R2_BASE_URL}/olive-bag.webp`,
  'Brown': `${R2_BASE_URL}/brown-bag.webp`,
  'Coffee': `${R2_BASE_URL}/coffee-bag.webp`,
  'Black': `${R2_BASE_URL}/black-bag.webp`,
  'Maroon': `${R2_BASE_URL}/maroon-bag.webp`,
};

// Feature Videos - Showing bag functionality (MP4 format for better quality)
// These demonstrate the key selling points through looping video clips
export const FEATURE_GIFS: Record<string, { url: string; placeholder: string }> = {
  // Video 1: Travel Ready - Luggage Sleeve (1:1 ratio - square)
  // Show: Unzip bottom compartment → Slide bag onto suitcase handle → Walk hands-free
  // File: luggage-sleeve.mp4
  'luggage-sleeve': {
    url: `${R2_BASE_URL}/luggage-sleeve.mp4`,
    placeholder: `${R2_BASE_URL}/luggage-sleeve-poster.webp`
  },
  // Video 2: 5 Compartments (1:1 ratio - square)
  // Show: Quick tour opening all 5 pockets/sections one by one
  // File: compartments.mp4
  'compartments': {
    url: `${R2_BASE_URL}/compartments.mp4`,
    placeholder: `${R2_BASE_URL}/compartments-poster.webp`
  },
  // Video 3: Premium Style - Lifestyle Shot (3:4 ratio - portrait/vertical)
  // Show: Model walking with confidence carrying the bag in lifestyle setting
  // Showcase: Elegance, premium look, versatile style
  // File: lifestyle.mp4
  'lifestyle': {
    url: `${R2_BASE_URL}/lifestyle.mp4`,
    placeholder: `${R2_BASE_URL}/lifestyle-poster.webp`
  },
};

// Seetara Brand Logo - Cloudflare R2 URL
export const SEETARA_LOGO_URL = `${R2_BASE_URL}/seetara-logo.png`;

// Product video URL
export const PRODUCT_VIDEO_URL = `${R2_BASE_URL}/sb104-video.mp4`;

// Helper function to get image URL
export const getImageUrl = (color: string): string => {
  return R2_IMAGE_URLS[color] || R2_IMAGE_URLS['Olive'];
};

// Helper function to get GIF URL
export const getFeatureGif = (featureId: string): { url: string; placeholder: string } => {
  return FEATURE_GIFS[featureId] || { url: '', placeholder: '' };
};

// Helper function to get logo URL
export const getLogoUrl = (): string => {
  return SEETARA_LOGO_URL;
};

// Helper function to get video URL
export const getVideoUrl = (): string => {
  return PRODUCT_VIDEO_URL;
};

// R2 is configured
export const isR2Configured = (): boolean => true;
