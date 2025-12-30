// Cloudflare R2 Configuration - SB107 Product Images
// Bucket: seetara-assets | Uses SB106 images (same product)

const R2_BASE_URL = 'https://pub-618cb6a991114e6b97382558a5b2adea.r2.dev/SB106';

// Product images by color - Using SB106 images (same product)
export const R2_IMAGE_URLS: Record<string, string> = {
  'Brown': 'https://pub-618cb6a991114e6b97382558a5b2adea.r2.dev/SB106/brown-handbag.webp',
  'Coffee': 'https://pub-618cb6a991114e6b97382558a5b2adea.r2.dev/SB106/coffee-handbag.webp',
  'Maroon': 'https://pub-618cb6a991114e6b97382558a5b2adea.r2.dev/SB106/maroon-handbag.webp',
  'Black': 'https://pub-618cb6a991114e6b97382558a5b2adea.r2.dev/SB106/black-handbag.webp',
};

// Thumbnail image for initial page load (Maroon color showcase)
// Save as: maroon-thumbnail.webp in SB106 folder
export const THUMBNAIL_IMAGE_URL = `${R2_BASE_URL}/maroon-thumbnail.webp`;

// Seetara Brand Logo - Cloudflare R2 URL
export const SEETARA_LOGO_URL = `${R2_BASE_URL}/seetara-logo.png`;

// Product video URL - Using SB106 video (same product)
export const PRODUCT_VIDEO_URL = `${R2_BASE_URL}/sb106-video.mp4`;

// Helper function to get image URL
export const getImageUrl = (color: string): string => {
  return R2_IMAGE_URLS[color] || R2_IMAGE_URLS['Brown'];
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

