// Cloudflare R2 Configuration - SW101 Smart Wallet Product Images
// Bucket: seetara-assets | Folder: SW101

const R2_BASE_URL = 'https://pub-618cb6a991114e6b97382558a5b2adea.r2.dev/SW101';

// Product images by color - Cloudflare R2 URLs
// TODO: Upload actual SW101 product images to R2 bucket
export const R2_IMAGE_URLS: Record<string, string> = {
  'Terracotta': `${R2_BASE_URL}/terracotta-wallet.webp`,
  'Black': `${R2_BASE_URL}/black-wallet.webp`,
  'Coffee': `${R2_BASE_URL}/coffee-wallet.webp`,
};

// Seetara Brand Logo - Cloudflare R2 URL
export const SEETARA_LOGO_URL = 'https://pub-618cb6a991114e6b97382558a5b2adea.r2.dev/website/logo/logo.png';

// Product video URL
// TODO: Upload actual SW101 video to R2 bucket
export const PRODUCT_VIDEO_URL = `${R2_BASE_URL}/sw101-video.mp4`;

// Helper function to get image URL
export const getImageUrl = (color: string): string => {
  return R2_IMAGE_URLS[color] || R2_IMAGE_URLS['Terracotta'];
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

