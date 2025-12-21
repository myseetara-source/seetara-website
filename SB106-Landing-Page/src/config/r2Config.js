// Cloudflare R2 Configuration - SB106 Product Images
// Bucket: seetara-assets | Folder: SB106

const R2_BASE_URL = 'https://pub-618cb6a991114e6b97382558a5b2adea.r2.dev/SB106';

// Product images by color - Cloudflare R2 URLs
export const R2_IMAGE_URLS = {
  'Brown': `${R2_BASE_URL}/brown-handbag.jpg`,
  'Black': `${R2_BASE_URL}/black-handbag.jpg`,
  'Maroon': `${R2_BASE_URL}/maroon-handbag.jpg`,
  'Coffee': `${R2_BASE_URL}/coffee-handbag.jpg`,
};

// Seetara Brand Logo - Cloudflare R2 URL
// Upload your logo to R2 and replace the URL below
// Recommended: PNG with transparent background, 200x200px or 512x512px
export const SEETARA_LOGO_URL = `${R2_BASE_URL}/seetara-logo.png`;

// Helper function to get image URL
export const getImageUrl = (color) => {
  return R2_IMAGE_URLS[color] || R2_IMAGE_URLS['Brown'];
};

// Helper function to get logo URL
export const getLogoUrl = () => {
  return SEETARA_LOGO_URL;
};

// R2 is configured
export const isR2Configured = () => true;

