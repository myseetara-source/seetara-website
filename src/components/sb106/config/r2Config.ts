// Cloudflare R2 Configuration - SB106 Product Images
// Bucket: seetara-assets | Folder: SB106

const R2_BASE_URL = 'https://pub-618cb6a991114e6b97382558a5b2adea.r2.dev/SB106';

// Product images by color - Cloudflare R2 URLs (Compressed versions for faster loading)
export const R2_IMAGE_URLS: Record<string, string> = {
  'Brown': 'https://pub-618cb6a991114e6b97382558a5b2adea.r2.dev/SB106/brown-handbag.jpg',
  'Coffee': 'https://pub-618cb6a991114e6b97382558a5b2adea.r2.dev/SB106/coffee-handbag.jpg',
  'Maroon': 'https://pub-618cb6a991114e6b97382558a5b2adea.r2.dev/SB106/maroon-handbag.jpg',
  'Black': 'https://pub-618cb6a991114e6b97382558a5b2adea.r2.dev/SB106/black-handbag.jpg',
};

// Seetara Brand Logo - Cloudflare R2 URL
export const SEETARA_LOGO_URL = `${R2_BASE_URL}/seetara-logo.png`;

// Product video URL
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

