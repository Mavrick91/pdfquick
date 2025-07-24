import type { BasePdfFile, ProcessingStatus } from "@/types/pdf";

export type CompressionLevel = "balanced" | "high" | "maximum";

export type CompressStatus = ProcessingStatus;

export type PdfFile = {
  /** Compressed output details (available in success state) */
  result?: {
    blob: Blob;
    size: number;
    savedPercent: number;
  };
  /** 0-100 during processing */
  progress: number;
  /** Error message (if any) */
  error?: string;
} & BasePdfFile;
