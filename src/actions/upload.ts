'use server';

import { PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import {
  r2Client,
  R2_CONFIG,
  ALLOWED_FILE_TYPES,
  ALLOWED_IMAGE_TYPES,
  ALLOWED_VIDEO_TYPES,
  MAX_IMAGE_SIZE,
  MAX_VIDEO_SIZE,
  generateFilePath,
  getPublicUrl,
} from '@/lib/r2';

// Types
export interface PresignedUrlResponse {
  success: boolean;
  uploadUrl?: string;
  publicUrl?: string;
  filePath?: string;
  error?: string;
}

export interface UploadValidation {
  valid: boolean;
  error?: string;
}

/**
 * Validate file before generating presigned URL
 */
function validateFile(
  fileName: string,
  fileType: string,
  fileSize: number
): UploadValidation {
  // Check file type
  if (!ALLOWED_FILE_TYPES.includes(fileType)) {
    return {
      valid: false,
      error: `Invalid file type: ${fileType}. Allowed: JPG, PNG, WebP images and MP4, WebM, MOV videos.`,
    };
  }

  // Check file size based on type
  const isVideo = ALLOWED_VIDEO_TYPES.includes(fileType);
  const maxSize = isVideo ? MAX_VIDEO_SIZE : MAX_IMAGE_SIZE;
  const maxSizeLabel = isVideo ? '50MB' : '5MB';

  if (fileSize > maxSize) {
    const currentSize = (fileSize / (1024 * 1024)).toFixed(2);
    return {
      valid: false,
      error: `File too large: ${currentSize}MB. Maximum size: ${maxSizeLabel}`,
    };
  }

  // Check file name
  if (!fileName || fileName.trim().length === 0) {
    return {
      valid: false,
      error: 'File name is required',
    };
  }

  return { valid: true };
}

/**
 * Generate a presigned URL for uploading a file directly to R2
 *
 * This is a Server Action that:
 * 1. Validates the file type and size
 * 2. Generates a unique file path
 * 3. Creates a presigned PUT URL valid for 5 minutes
 * 4. Returns both the upload URL and the final public URL
 *
 * @param fileName - Original file name (e.g., "product-image.jpg")
 * @param fileType - MIME type (e.g., "image/jpeg")
 * @param fileSize - File size in bytes
 * @param folder - Upload folder (default: "products")
 */
export async function getPresignedUrl(
  fileName: string,
  fileType: string,
  fileSize: number,
  folder: string = 'products'
): Promise<PresignedUrlResponse> {
  try {
    // Validate the file
    const validation = validateFile(fileName, fileType, fileSize);
    if (!validation.valid) {
      return { success: false, error: validation.error };
    }

    // Generate unique file path
    const filePath = generateFilePath(fileName, folder);

    // Create PutObject command
    const command = new PutObjectCommand({
      Bucket: R2_CONFIG.bucketName,
      Key: filePath,
      ContentType: fileType,
      ContentLength: fileSize,
      // Add metadata
      Metadata: {
        'original-name': fileName,
        'upload-date': new Date().toISOString(),
      },
    });

    // Generate presigned URL (valid for 5 minutes)
    const uploadUrl = await getSignedUrl(r2Client, command, {
      expiresIn: 300, // 5 minutes
    });

    // Get the public URL for accessing the file after upload
    const publicUrl = getPublicUrl(filePath);

    return {
      success: true,
      uploadUrl,
      publicUrl,
      filePath,
    };
  } catch (error) {
    console.error('Error generating presigned URL:', error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : 'Failed to generate upload URL',
    };
  }
}

/**
 * Generate presigned URLs for multiple files at once
 * Useful for gallery uploads
 *
 * @param files - Array of file info objects
 * @param folder - Upload folder (default: "products")
 */
export async function getPresignedUrls(
  files: Array<{ fileName: string; fileType: string; fileSize: number }>,
  folder: string = 'products'
): Promise<{
  success: boolean;
  results?: Array<PresignedUrlResponse & { index: number }>;
  error?: string;
}> {
  try {
    const results = await Promise.all(
      files.map(async (file, index) => {
        const result = await getPresignedUrl(
          file.fileName,
          file.fileType,
          file.fileSize,
          folder
        );
        return { ...result, index };
      })
    );

    const hasErrors = results.some((r) => !r.success);

    return {
      success: !hasErrors,
      results,
      error: hasErrors
        ? 'Some files failed validation'
        : undefined,
    };
  } catch (error) {
    console.error('Error generating presigned URLs:', error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : 'Failed to generate upload URLs',
    };
  }
}

/**
 * Get file type category info
 */
export async function getFileTypeInfo(fileType: string): Promise<{
  isAllowed: boolean;
  isImage: boolean;
  isVideo: boolean;
  maxSize: number;
  maxSizeLabel: string;
}> {
  const isImage = ALLOWED_IMAGE_TYPES.includes(fileType);
  const isVideo = ALLOWED_VIDEO_TYPES.includes(fileType);
  const isAllowed = isImage || isVideo;

  return {
    isAllowed,
    isImage,
    isVideo,
    maxSize: isVideo ? MAX_VIDEO_SIZE : MAX_IMAGE_SIZE,
    maxSizeLabel: isVideo ? '50MB' : '5MB',
  };
}

