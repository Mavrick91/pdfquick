/**
 * Shared PDF primitives used across multiple features.
 * Keeping the base shapes in one place avoids type duplication.
 */

export type ProcessingStatus = "idle" | "ready" | "processing" | "success" | "error";

/**
 * Base file shape every feature uses.
 */
export type BasePdfFile = {
  /** Stable, feature-local identifier */
  id: string;
  /** The native File object */
  file: File;
  /** Display name (usually file.name) */
  name: string;
  /** File size in bytes */
  size: number;
};

/**
 * Variant that knows total page count – used by Split, Pdf-to-Img, etc.
 */
export type BasePdfContext = BasePdfFile & {
  /** Total pages contained in the document (optional for features that don't care) */
  totalPages?: number;
};

/* Convenient aliases for common naming patterns */
export type PdfFile = BasePdfFile;
export type PdfContext = BasePdfContext;
