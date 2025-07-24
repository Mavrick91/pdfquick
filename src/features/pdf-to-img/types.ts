import type { BasePdfContext, ProcessingStatus } from "@/types/pdf";

export type ImageFormat = "jpg" | "png" | "webp";
export type DpiOption = 72 | 150 | 300 | 600;
export type OutputMode = "separate" | "combined";

export type ConvertStatus = ProcessingStatus;

export type PdfContext = {
  totalPages: number; // required for conversion
} & BasePdfContext;

export type PageThumb = {
  idx: number;
  dataUrl: string;
};

export type ConvertResult = {
  pageIdx: number;
  blob: Blob;
  size: number;
};

export type ConvertOptions = {
  pages: number[];
  format: ImageFormat;
  dpi: DpiOption;
  quality: number; // 1-100 (jpg only)
  output: OutputMode;
  downloadAsZip?: boolean;
  onPage?: (idx: number, pct: number) => void;
};
