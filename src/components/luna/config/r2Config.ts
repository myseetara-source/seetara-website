// Cloudflare R2 Configuration - Luna Product Images
// Bucket: seetara-assets

const R2_BASE_URL = 'https://pub-618cb6a991114e6b97382558a5b2adea.r2.dev/luna';

// Product images by color - Luna Bag
export const R2_IMAGE_URLS: Record<string, string> = {
  'Maroon': `${R2_BASE_URL}/maroon-luna.webp`,
  'Black': `${R2_BASE_URL}/black-luna.webp`,
  'Coffee': `${R2_BASE_URL}/coffee-luna.webp`,
};

// Thumbnail image for initial page load (Maroon color showcase)
export const THUMBNAIL_IMAGE_URL = `${R2_BASE_URL}/maroon-luna-thumbnail.webp`;

// Seetara Brand Logo - Cloudflare R2 URL
export const SEETARA_LOGO_URL = 'https://pub-618cb6a991114e6b97382558a5b2adea.r2.dev/SB106/seetara-logo.png';

// Product video URL - Luna showcase video
export const PRODUCT_VIDEO_URL = `${R2_BASE_URL}/luna-video.mp4`;

// Helper function to get image URL
export const getImageUrl = (color: string): string => {
  return R2_IMAGE_URLS[color] || R2_IMAGE_URLS['Maroon'];
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

