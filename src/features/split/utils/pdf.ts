import { PDFDocument } from "pdf-lib";
import type { SelectedPages, SplitMode } from "../types";

/**
 * Core PDF splitter function
 */
export const splitPdf = async (
  file: File,
  mode: SplitMode,
  selected: SelectedPages,
  onProgress?: (progress: number) => void
): Promise<Blob | Blob[]> => {
  const srcBytes = await file.arrayBuffer();
  const srcDoc = await PDFDocument.load(srcBytes);
  const pageIndices = srcDoc.getPageIndices(); // [0, 1, 2, ..., n-1]

  // Normalize selection to sorted array
  const selArray = [...selected].sort((a, b) => a - b);

  // Handle different split modes
  if (mode === "extract") {
    const out = await PDFDocument.create();
    const pages = await out.copyPages(srcDoc, selArray);
    pages.forEach((page, idx) => {
      out.addPage(page);
      if (onProgress) {
        onProgress(((idx + 1) / selArray.length) * 100);
      }
    });
    return new Blob([await out.save()], { type: "application/pdf" });
  }

  if (mode === "remove") {
    const keep = pageIndices.filter((idx) => !selected.has(idx));
    const out = await PDFDocument.create();
    const pages = await out.copyPages(srcDoc, keep);
    pages.forEach((page, idx) => {
      out.addPage(page);
      if (onProgress) {
        onProgress(((idx + 1) / keep.length) * 100);
      }
    });
    return new Blob([await out.save()], { type: "application/pdf" });
  }

  // mode === "individual"
  const blobs: Blob[] = [];
  for (let i = 0; i < pageIndices.length; i++) {
    const out = await PDFDocument.create();
    const [page] = await out.copyPages(srcDoc, [pageIndices[i]]);
    out.addPage(page);
    blobs.push(new Blob([await out.save()], { type: "application/pdf" }));
    if (onProgress) {
      onProgress(((i + 1) / pageIndices.length) * 100);
    }
  }
  return blobs;
};

/**
 * Parse page range string into set of page indices
 * e.g., "1-3, 5, 8-10" => Set([0, 1, 2, 4, 7, 8, 9])
 */
export const parsePageRange = (input: string, totalPages: number): SelectedPages => {
  const selected = new Set<number>();
  const ranges = input
    .split(",")
    .map((r) => r.trim())
    .filter((r) => r);

  for (const range of ranges) {
    if (range.includes("-")) {
      // Handle range like "1-3"
      const [start, end] = range.split("-").map((n) => parseInt(n.trim()));
      if (!isNaN(start) && !isNaN(end)) {
        for (let i = Math.max(1, start); i <= Math.min(totalPages, end); i++) {
          selected.add(i - 1); // Convert to 0-indexed
        }
      }
    } else {
      // Handle single page like "5"
      const page = parseInt(range);
      if (!isNaN(page) && page >= 1 && page <= totalPages) {
        selected.add(page - 1); // Convert to 0-indexed
      }
    }
  }

  return selected;
};

/**
 * Validate page range string
 */
export const validatePageRange = (
  input: string,
  totalPages: number
): { valid: boolean; error?: string } => {
  if (!input.trim()) {
    return { valid: false, error: "Page range cannot be empty" };
  }

  const ranges = input
    .split(",")
    .map((r) => r.trim())
    .filter((r) => r);

  for (const range of ranges) {
    if (range.includes("-")) {
      const parts = range.split("-");
      if (parts.length !== 2) {
        return { valid: false, error: `Invalid range format: ${range}` };
      }

      const [start, end] = parts.map((n) => parseInt(n.trim()));
      if (isNaN(start) || isNaN(end)) {
        return { valid: false, error: `Invalid numbers in range: ${range}` };
      }

      if (start < 1 || end < 1 || start > totalPages || end > totalPages) {
        return { valid: false, error: `Page numbers must be between 1 and ${totalPages}` };
      }

      if (start > end) {
        return { valid: false, error: `Invalid range: ${start} is greater than ${end}` };
      }
    } else {
      const page = parseInt(range);
      if (isNaN(page)) {
        return { valid: false, error: `Invalid page number: ${range}` };
      }

      if (page < 1 || page > totalPages) {
        return { valid: false, error: `Page ${page} is out of range (1-${totalPages})` };
      }
    }
  }

  return { valid: true };
};

/**
 * Download single file
 */
export const downloadFile = (blob: Blob, fileName: string): void => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

/**
 * Download multiple files as a zip
 */
export const downloadMultipleFiles = async (blobs: Blob[], baseFileName: string): Promise<void> => {
  // For now, download files individually
  // In production, you might want to use a library like JSZip
  blobs.forEach((blob, index) => {
    const fileName = `${baseFileName}_page_${index + 1}.pdf`;
    downloadFile(blob, fileName);
  });
};

/**
 * Get PDF page count without loading full document
 */
export const getPdfPageCount = async (file: File): Promise<number> => {
  const bytes = await file.arrayBuffer();
  const doc = await PDFDocument.load(bytes);
  return doc.getPageCount();
};
