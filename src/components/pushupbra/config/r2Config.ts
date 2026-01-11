// Cloudflare R2 Configuration for Push Up Bra Product
// Base URL for R2 bucket

export const R2_BASE_URL = 'https://pub-8c11c8c04c304f42ae5a15cda596f542.r2.dev';

// Product images - organized by color
// Format: pushupbra/{color}-pushupbra-{number}.webp
export const R2_IMAGE_URLS: Record<string, string[]> = {
  'Nude': [
    `${R2_BASE_URL}/pushupbra/nude-pushupbra-1.webp`,
    `${R2_BASE_URL}/pushupbra/nude-pushupbra-2.webp`,
    `${R2_BASE_URL}/pushupbra/nude-pushupbra-3.webp`,
  ],
  'Black': [
    `${R2_BASE_URL}/pushupbra/black-pushupbra-1.webp`,
    `${R2_BASE_URL}/pushupbra/black-pushupbra-2.webp`,
    `${R2_BASE_URL}/pushupbra/black-pushupbra-3.webp`,
  ],
  'White': [
    `${R2_BASE_URL}/pushupbra/white-pushupbra-1.webp`,
    `${R2_BASE_URL}/pushupbra/white-pushupbra-2.webp`,
    `${R2_BASE_URL}/pushupbra/white-pushupbra-3.webp`,
  ],
  'Pink': [
    `${R2_BASE_URL}/pushupbra/pink-pushupbra-1.webp`,
    `${R2_BASE_URL}/pushupbra/pink-pushupbra-2.webp`,
    `${R2_BASE_URL}/pushupbra/pink-pushupbra-3.webp`,
  ],
};

// Thumbnail image for initial load (before color selection)
export const THUMBNAIL_IMAGE_URL = `${R2_BASE_URL}/pushupbra/nude-pushupbra-thumbnail.webp`;

// Logo
export const LOGO_URL = `${R2_BASE_URL}/logo/seetara-logo.webp`;

// Video URL (if available)
export const VIDEO_URL = `${R2_BASE_URL}/pushupbra/pushupbra-video.mp4`;

// Fallback/placeholder
export const PLACEHOLDER_IMAGE = `${R2_BASE_URL}/placeholder.webp`;
