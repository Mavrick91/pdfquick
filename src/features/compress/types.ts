export type CompressionLevel = "balanced" | "high" | "maximum";

export type CompressStatus = "idle" | "ready" | "processing" | "success" | "error";

export type PdfFile = {
  id: string;
  file: File;
  name: string;
  size: number; // original bytes
  result?: {
    blob: Blob; // compressed file
    size: number; // compressed bytes
    savedPercent: number; // percentage saved
  };
  progress: number; // 0-100 during processing
  error?: string;
};
