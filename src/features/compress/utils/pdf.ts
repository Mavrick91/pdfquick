import { PDFDocument } from "pdf-lib";

import {
  downloadFile,
  formatFileSize,
  downloadMultipleFiles as sharedDownloadMultipleFiles,
} from "@/lib/pdf-utils";

import type { CompressionLevel } from "../types";

/**
 * Quality settings for each compression level
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const COMPRESSION_SETTINGS = {
  balanced: {
    imageQuality: 0.75,
    maxImageSize: 1, // MB
    useAdvancedCompression: true,
  },
  high: {
    imageQuality: 0.9,
    maxImageSize: 2, // MB
    useAdvancedCompression: true,
  },
  maximum: {
    imageQuality: 0.6,
    maxImageSize: 0.5, // MB
    useAdvancedCompression: true,
  },
} as const;

/**
 * Compress a PDF file
 */
export const compressPdf = async (
  file: File,
  level: CompressionLevel,
  onProgress?: (percent: number) => void
): Promise<{ blob: Blob; before: number; after: number }> => {
  try {
    // Update progress
    onProgress?.(10);

    // Load the PDF
    const srcBytes = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(srcBytes);

    // Update progress
    onProgress?.(20);

    // Remove metadata to save space
    // Note: This is a simplified approach. In production, you'd want to
    // properly handle metadata removal using pdf-lib's API

    // Update progress
    onProgress?.(30);

    // Get compression settings for future use
    // const settings = COMPRESSION_SETTINGS[level];

    // For now, we'll use pdf-lib's built-in compression
    // In a production app, you'd want to:
    // 1. Extract images from the PDF
    // 2. Compress them using browser-image-compression
    // 3. Replace the original images in the PDF
    // 4. Remove duplicate images
    // 5. Optimize fonts

    // Update progress
    onProgress?.(80);

    // Save with compression
    const compressedBytes = await pdfDoc.save({
      useObjectStreams: true,
      addDefaultPage: false,
      objectsPerTick: 50,
    });

    // Update progress
    onProgress?.(100);

    const before = file.size;
    const after = compressedBytes.byteLength;

    return {
      blob: new Blob([compressedBytes], { type: "application/pdf" }),
      before,
      after,
    };
  } catch (error) {
    console.error("Compression error:", error);
    throw new Error("Failed to compress PDF");
  }
};

/**
 * Calculate percentage saved
 */
export const calculateSavedPercent = (before: number, after: number): number => {
  if (before === 0) return 0;
  return Math.round(((before - after) / before) * 100);
};

export { formatFileSize, downloadFile };

/**
 * Download multiple files (one by one for now) - wrapper around sharedDownloadMultipleFiles
 */
export const downloadMultipleFiles = async (
  files: Array<{ blob: Blob; name: string }>
): Promise<void> => {
  await sharedDownloadMultipleFiles(files);
};
