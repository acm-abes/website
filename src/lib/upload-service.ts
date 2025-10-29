/**
 * UploadThing Service Utilities
 *
 * This file provides reusable utilities for working with UploadThing
 * across the application. Use these helpers for consistent upload handling.
 */

import { uploadFiles } from "@/lib/uploadthing";
import { toast } from "sonner";

/**
 * Upload a single image file with error handling
 *
 * @param file - The image file to upload
 * @param onProgress - Optional callback for upload progress
 * @returns Promise with the uploaded file URL or null on error
 *
 * @example
 * const url = await uploadImage(file, (progress) => {
 *   console.log(`Upload progress: ${progress}%`);
 * });
 */
export async function uploadImage(
  file: File,
  onProgress?: (progress: number) => void,
): Promise<string | null> {
  try {
    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return null;
    }

    // Validate file size (4MB max)
    const maxSize = 4 * 1024 * 1024; // 4MB in bytes
    if (file.size > maxSize) {
      toast.error("Image must be less than 4MB");
      return null;
    }

    // Upload the file
    const res = await uploadFiles("imageUploader", {
      files: [file],
      onUploadProgress: ({ progress }) => {
        onProgress?.(progress);
      },
    });

    if (res && res[0]) {
      return res[0].url;
    }

    return null;
  } catch (error) {
    console.error("Upload error:", error);
    toast.error("Failed to upload image");
    return null;
  }
}

/**
 * Upload multiple images at once
 *
 * @param files - Array of image files to upload
 * @param onProgress - Optional callback for overall upload progress
 * @returns Promise with array of uploaded file URLs
 *
 * @example
 * const urls = await uploadMultipleImages([file1, file2]);
 */
export async function uploadMultipleImages(
  files: File[],
  onProgress?: (progress: number) => void,
): Promise<string[]> {
  try {
    // Validate all files are images
    const invalidFiles = files.filter((f) => !f.type.startsWith("image/"));
    if (invalidFiles.length > 0) {
      toast.error("All files must be images");
      return [];
    }

    // Validate file sizes
    const maxSize = 4 * 1024 * 1024; // 4MB in bytes
    const oversizedFiles = files.filter((f) => f.size > maxSize);
    if (oversizedFiles.length > 0) {
      toast.error("All images must be less than 4MB");
      return [];
    }

    // Upload all files
    const res = await uploadFiles("imageUploader", {
      files,
      onUploadProgress: ({ progress }) => {
        onProgress?.(progress);
      },
    });

    return res?.map((r) => r.url) || [];
  } catch (error) {
    console.error("Upload error:", error);
    toast.error("Failed to upload images");
    return [];
  }
}

/**
 * Get a preview URL for a file before uploading
 *
 * @param file - The file to preview
 * @returns A blob URL for preview, or null if invalid
 *
 * @example
 * const previewUrl = getFilePreview(file);
 * // Use previewUrl in <img src={previewUrl} />
 * // Remember to call URL.revokeObjectURL(previewUrl) when done
 */
export function getFilePreview(file: File): string | null {
  if (!file.type.startsWith("image/")) {
    return null;
  }

  return URL.createObjectURL(file);
}

/**
 * Format file size in human-readable format
 *
 * @param bytes - File size in bytes
 * @returns Formatted string (e.g., "2.5 MB")
 *
 * @example
 * formatFileSize(2500000) // "2.38 MB"
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

/**
 * Validate image dimensions
 *
 * @param file - The image file to validate
 * @param maxWidth - Maximum width in pixels
 * @param maxHeight - Maximum height in pixels
 * @returns Promise<boolean> indicating if dimensions are valid
 *
 * @example
 * const isValid = await validateImageDimensions(file, 1920, 1080);
 */
export async function validateImageDimensions(
  file: File,
  maxWidth: number,
  maxHeight: number,
): Promise<boolean> {
  return new Promise((resolve) => {
    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(url);
      const isValid = img.width <= maxWidth && img.height <= maxHeight;

      if (!isValid) {
        toast.error(
          `Image dimensions must be ${maxWidth}x${maxHeight} or smaller`,
        );
      }

      resolve(isValid);
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      toast.error("Failed to load image");
      resolve(false);
    };

    img.src = url;
  });
}
