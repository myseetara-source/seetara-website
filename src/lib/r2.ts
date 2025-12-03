/**
 * Cloudflare R2 Client Configuration
 *
 * This module initializes the S3Client for Cloudflare R2 storage.
 * R2 is S3-compatible, so we use the AWS SDK with custom endpoint.
 */

import { S3Client } from '@aws-sdk/client-s3';

// R2 Configuration from environment variables
const R2_ACCOUNT_ID = process.env.R2_ACCOUNT_ID!;
const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID!;
const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY!;

// Validate required environment variables
if (!R2_ACCOUNT_ID || !R2_ACCESS_KEY_ID || !R2_SECRET_ACCESS_KEY) {
  console.warn(
    'R2 configuration missing. Image uploads will not work. Required: R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY'
  );
}

/**
 * Cloudflare R2 S3 Client
 * Uses the S3-compatible API with Cloudflare's endpoint
 */
export const r2Client = new S3Client({
  region: 'auto',
  endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: R2_ACCESS_KEY_ID || '',
    secretAccessKey: R2_SECRET_ACCESS_KEY || '',
  },
});

// Export bucket configuration
export const R2_CONFIG = {
  bucketName: process.env.R2_BUCKET_NAME || 'seetara-assets',
  publicUrl: process.env.NEXT_PUBLIC_R2_PUBLIC_URL || '',
  accountId: R2_ACCOUNT_ID,
} as const;

// Allowed file types for uploads
export const ALLOWED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

export const ALLOWED_VIDEO_TYPES = [
  'video/mp4',
  'video/webm',
  'video/quicktime',
];

export const ALLOWED_FILE_TYPES = [...ALLOWED_IMAGE_TYPES, ...ALLOWED_VIDEO_TYPES];

// Maximum file sizes
export const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB for images
export const MAX_VIDEO_SIZE = 50 * 1024 * 1024; // 50MB for videos

/**
 * Get the maximum file size based on file type
 */
export function getMaxFileSize(mimeType: string): number {
  return ALLOWED_VIDEO_TYPES.includes(mimeType) ? MAX_VIDEO_SIZE : MAX_IMAGE_SIZE;
}

/**
 * Check if a file type is allowed
 */
export function isFileTypeAllowed(mimeType: string): boolean {
  return ALLOWED_FILE_TYPES.includes(mimeType);
}

/**
 * Check if a file type is an image
 */
export function isImageType(mimeType: string): boolean {
  return ALLOWED_IMAGE_TYPES.includes(mimeType);
}

/**
 * Check if a file type is a video
 */
export function isVideoType(mimeType: string): boolean {
  return ALLOWED_VIDEO_TYPES.includes(mimeType);
}

/**
 * Generate a unique file path for uploads
 * Organizes files by date and type for easy management
 */
export function generateFilePath(
  fileName: string,
  folder: string = 'products'
): string {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const timestamp = Date.now();
  const randomSuffix = Math.random().toString(36).substring(2, 8);

  // Extract file extension
  const ext = fileName.split('.').pop()?.toLowerCase() || 'jpg';
  // Sanitize original filename (remove special chars, keep alphanumeric and hyphens)
  const sanitizedName = fileName
    .split('.')[0]
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .substring(0, 50);

  return `${folder}/${year}/${month}/${sanitizedName}-${timestamp}-${randomSuffix}.${ext}`;
}

/**
 * Get the public URL for an uploaded file
 */
export function getPublicUrl(filePath: string): string {
  return `${R2_CONFIG.publicUrl}/${filePath}`;
}

