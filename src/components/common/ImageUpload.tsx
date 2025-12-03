'use client';

import { useState, useRef, useCallback } from 'react';
import {
  Upload,
  X,
  Loader2,
  CheckCircle,
  AlertCircle,
  Image as ImageIcon,
  Video,
  Trash2,
} from 'lucide-react';
import { getPresignedUrl } from '@/actions/upload';

// Types
export interface ImageUploadProps {
  /** Current image URL (for editing existing images) */
  value?: string;
  /** Callback when upload completes with public URL */
  onChange: (url: string) => void;
  /** Callback when image is removed */
  onRemove?: () => void;
  /** Upload folder path (default: "products") */
  folder?: string;
  /** Placeholder text */
  placeholder?: string;
  /** Whether to accept video files */
  acceptVideo?: boolean;
  /** Aspect ratio hint for the preview (e.g., "1:1", "16:9") */
  aspectRatio?: string;
  /** Custom class name for the container */
  className?: string;
  /** Whether the field is disabled */
  disabled?: boolean;
  /** Whether to show file size info */
  showSizeInfo?: boolean;
  /** Label for the upload area */
  label?: string;
  /** Error message from parent form */
  error?: string;
}

type UploadStatus = 'idle' | 'uploading' | 'success' | 'error';

interface UploadState {
  status: UploadStatus;
  progress: number;
  error: string | null;
  fileName: string | null;
}

const initialState: UploadState = {
  status: 'idle',
  progress: 0,
  error: null,
  fileName: null,
};

/**
 * ImageUpload Component
 *
 * A reusable component for uploading images to Cloudflare R2.
 * Features:
 * - Drag and drop support
 * - Image preview
 * - Upload progress bar
 * - Direct client-to-storage upload via presigned URLs
 * - Support for images and videos
 */
export default function ImageUpload({
  value,
  onChange,
  onRemove,
  folder = 'products',
  placeholder = 'Click or drag to upload',
  acceptVideo = false,
  aspectRatio,
  className = '',
  disabled = false,
  showSizeInfo = true,
  label,
  error: externalError,
}: ImageUploadProps) {
  const [state, setState] = useState<UploadState>(initialState);
  const [isDragging, setIsDragging] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(value || null);
  const inputRef = useRef<HTMLInputElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // File type accept string
  const acceptTypes = acceptVideo
    ? 'image/jpeg,image/png,image/webp,video/mp4,video/webm,video/quicktime'
    : 'image/jpeg,image/png,image/webp';

  // Check if current value is a video
  const isVideo =
    previewUrl?.includes('.mp4') ||
    previewUrl?.includes('.webm') ||
    previewUrl?.includes('.mov');

  /**
   * Upload file to R2 using presigned URL
   */
  const uploadFile = useCallback(
    async (file: File) => {
      // Reset state
      setState({
        status: 'uploading',
        progress: 0,
        error: null,
        fileName: file.name,
      });

      // Create local preview
      const localPreview = URL.createObjectURL(file);
      setPreviewUrl(localPreview);

      try {
        // Get presigned URL from server action
        const result = await getPresignedUrl(
          file.name,
          file.type,
          file.size,
          folder
        );

        if (!result.success || !result.uploadUrl || !result.publicUrl) {
          throw new Error(result.error || 'Failed to get upload URL');
        }

        // Create abort controller for cancellation
        abortControllerRef.current = new AbortController();

        // Upload directly to R2 using XMLHttpRequest for progress tracking
        await new Promise<void>((resolve, reject) => {
          const xhr = new XMLHttpRequest();

          xhr.upload.addEventListener('progress', (e) => {
            if (e.lengthComputable) {
              const progress = Math.round((e.loaded / e.total) * 100);
              setState((prev) => ({ ...prev, progress }));
            }
          });

          xhr.addEventListener('load', () => {
            if (xhr.status >= 200 && xhr.status < 300) {
              resolve();
            } else {
              reject(new Error(`Upload failed with status ${xhr.status}`));
            }
          });

          xhr.addEventListener('error', () => {
            reject(new Error('Upload failed - network error'));
          });

          xhr.addEventListener('abort', () => {
            reject(new Error('Upload cancelled'));
          });

          xhr.open('PUT', result.uploadUrl!);
          xhr.setRequestHeader('Content-Type', file.type);
          xhr.send(file);

          // Store xhr for potential cancellation
          abortControllerRef.current!.signal.addEventListener('abort', () => {
            xhr.abort();
          });
        });

        // Success - update with public URL
        setPreviewUrl(result.publicUrl);
        onChange(result.publicUrl);
        setState({
          status: 'success',
          progress: 100,
          error: null,
          fileName: file.name,
        });

        // Clean up local preview URL
        URL.revokeObjectURL(localPreview);
      } catch (error) {
        console.error('Upload error:', error);
        setState({
          status: 'error',
          progress: 0,
          error:
            error instanceof Error ? error.message : 'Upload failed',
          fileName: file.name,
        });
        // Revert preview on error
        setPreviewUrl(value || null);
        URL.revokeObjectURL(localPreview);
      }
    },
    [folder, onChange, value]
  );

  /**
   * Handle file selection
   */
  const handleFileSelect = useCallback(
    (files: FileList | null) => {
      if (!files || files.length === 0 || disabled) return;
      const file = files[0];
      uploadFile(file);
    },
    [disabled, uploadFile]
  );

  /**
   * Handle drag events
   */
  const handleDragOver = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (!disabled) setIsDragging(true);
    },
    [disabled]
  );

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
      if (!disabled) handleFileSelect(e.dataTransfer.files);
    },
    [disabled, handleFileSelect]
  );

  /**
   * Handle remove
   */
  const handleRemove = useCallback(() => {
    // Cancel ongoing upload if any
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    setPreviewUrl(null);
    setState(initialState);
    if (inputRef.current) inputRef.current.value = '';
    onRemove?.();
    onChange('');
  }, [onChange, onRemove]);

  /**
   * Trigger file input click
   */
  const handleClick = useCallback(() => {
    if (!disabled && state.status !== 'uploading') {
      inputRef.current?.click();
    }
  }, [disabled, state.status]);

  // Display error (external or internal)
  const displayError = externalError || state.error;

  return (
    <div className={`w-full ${className}`}>
      {/* Label */}
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}

      {/* Upload Area */}
      <div
        className={`
          relative border-2 border-dashed rounded-lg transition-all duration-200 overflow-hidden
          ${
            isDragging
              ? 'border-orange-500 bg-orange-50'
              : displayError
                ? 'border-red-300 bg-red-50'
                : previewUrl
                  ? 'border-gray-200 bg-gray-50'
                  : 'border-gray-300 bg-white hover:border-orange-400 hover:bg-orange-50'
          }
          ${disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}
          ${aspectRatio === '1:1' ? 'aspect-square' : aspectRatio === '16:9' ? 'aspect-video' : 'min-h-[180px]'}
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        {/* Hidden Input */}
        <input
          ref={inputRef}
          type="file"
          accept={acceptTypes}
          onChange={(e) => handleFileSelect(e.target.files)}
          className="hidden"
          disabled={disabled}
        />

        {/* Preview */}
        {previewUrl ? (
          <div className="relative w-full h-full min-h-[180px] flex items-center justify-center">
            {isVideo ? (
              <video
                src={previewUrl}
                className="max-w-full max-h-full object-contain"
                controls={state.status === 'success'}
              />
            ) : (
              <img
                src={previewUrl}
                alt="Preview"
                className="max-w-full max-h-full object-contain"
              />
            )}

            {/* Overlay during upload */}
            {state.status === 'uploading' && (
              <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center">
                <Loader2 className="w-8 h-8 text-white animate-spin mb-2" />
                <span className="text-white font-medium">{state.progress}%</span>
              </div>
            )}

            {/* Success indicator */}
            {state.status === 'success' && (
              <div className="absolute top-2 right-2 bg-green-500 text-white p-1 rounded-full">
                <CheckCircle className="w-4 h-4" />
              </div>
            )}

            {/* Remove button */}
            {!disabled && state.status !== 'uploading' && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove();
                }}
                className="absolute top-2 left-2 bg-red-500 hover:bg-red-600 text-white p-1.5 rounded-full transition-colors"
                title="Remove image"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        ) : (
          /* Upload Placeholder */
          <div className="flex flex-col items-center justify-center py-8 px-4 h-full min-h-[180px]">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 ${
                isDragging ? 'bg-orange-200' : 'bg-gray-100'
              }`}
            >
              {acceptVideo ? (
                <div className="flex gap-1">
                  <ImageIcon className="w-5 h-5 text-gray-400" />
                  <Video className="w-5 h-5 text-gray-400" />
                </div>
              ) : (
                <Upload className="w-6 h-6 text-gray-400" />
              )}
            </div>

            <p className="text-sm font-medium text-gray-700 text-center mb-1">
              {placeholder}
            </p>

            {showSizeInfo && (
              <p className="text-xs text-gray-500 text-center">
                {acceptVideo
                  ? 'JPG, PNG, WebP (max 5MB) or MP4, WebM, MOV (max 50MB)'
                  : 'JPG, PNG, WebP up to 5MB'}
              </p>
            )}
          </div>
        )}

        {/* Progress Bar */}
        {state.status === 'uploading' && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
            <div
              className="h-full bg-orange-500 transition-all duration-300"
              style={{ width: `${state.progress}%` }}
            />
          </div>
        )}
      </div>

      {/* Error Message */}
      {displayError && (
        <div className="flex items-center gap-1.5 mt-2 text-red-600 text-sm">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{displayError}</span>
        </div>
      )}

      {/* Success Message */}
      {state.status === 'success' && state.fileName && (
        <div className="flex items-center gap-1.5 mt-2 text-green-600 text-sm">
          <CheckCircle className="w-4 h-4 flex-shrink-0" />
          <span>Uploaded: {state.fileName}</span>
        </div>
      )}
    </div>
  );
}

/**
 * Multi-Image Upload Component
 * For uploading multiple images (e.g., gallery)
 */
export interface MultiImageUploadProps {
  /** Current image URLs */
  value: string[];
  /** Callback when images change */
  onChange: (urls: string[]) => void;
  /** Maximum number of images */
  maxImages?: number;
  /** Upload folder path */
  folder?: string;
  /** Custom class name */
  className?: string;
  /** Label */
  label?: string;
  /** Error message */
  error?: string;
}

export function MultiImageUpload({
  value = [],
  onChange,
  maxImages = 5,
  folder = 'products/gallery',
  className = '',
  label,
  error,
}: MultiImageUploadProps) {
  const [uploadingCount, setUploadingCount] = useState(0);

  const handleSingleUpload = useCallback(
    (url: string, index: number) => {
      const newUrls = [...value];
      if (index < newUrls.length) {
        newUrls[index] = url;
      } else {
        newUrls.push(url);
      }
      onChange(newUrls);
    },
    [value, onChange]
  );

  const handleRemove = useCallback(
    (index: number) => {
      const newUrls = value.filter((_, i) => i !== index);
      onChange(newUrls);
    },
    [value, onChange]
  );

  const canAddMore = value.length < maxImages && uploadingCount === 0;

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label} ({value.length}/{maxImages})
        </label>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {/* Existing images */}
        {value.map((url, index) => (
          <div
            key={`${url}-${index}`}
            className="relative aspect-square rounded-lg overflow-hidden border border-gray-200 bg-gray-50"
          >
            <img
              src={url}
              alt={`Gallery ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <button
              type="button"
              onClick={() => handleRemove(index)}
              className="absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white p-1 rounded-full transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ))}

        {/* Add new image slot */}
        {canAddMore && (
          <div className="aspect-square">
            <ImageUpload
              onChange={(url) => {
                if (url) handleSingleUpload(url, value.length);
                setUploadingCount((c) => Math.max(0, c - 1));
              }}
              folder={folder}
              placeholder="Add image"
              showSizeInfo={false}
              aspectRatio="1:1"
            />
          </div>
        )}
      </div>

      {error && (
        <div className="flex items-center gap-1.5 mt-2 text-red-600 text-sm">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}

