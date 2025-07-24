import { saveAs } from "file-saver";
import JSZip from "jszip";

import type { ConvertOptions } from "../types";

/**
 * Render a single PDF page to canvas
 */
export const renderPage = async (
  pdf: unknown, // pdfjs PDFDocumentProxy
  idx: number,
  dpi: number
): Promise<HTMLCanvasElement> => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const pdfDoc = pdf as any;
  const page = await pdfDoc.getPage(idx + 1);
  const scale = dpi / 72;
  const viewport = page.getViewport({ scale });

  const canvas = document.createElement("canvas");
  canvas.width = viewport.width;
  canvas.height = viewport.height;

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("Failed to get canvas context");
  }
  await page.render({
    canvasContext: ctx,
    viewport,
  }).promise;

  return canvas;
};

/**
 * Convert canvas to blob with specified format and quality
 */
const canvasToBlob = async (
  canvas: HTMLCanvasElement,
  format: string,
  quality?: number
): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error("Failed to convert canvas to blob"));
        }
      },
      `image/${format}`,
      quality
    );
  });
};

/**
 * Combine multiple canvases into a single tall canvas
 */
const combineCanvases = async (canvases: HTMLCanvasElement[]): Promise<HTMLCanvasElement> => {
  const totalHeight = canvases.reduce((sum, c) => sum + c.height, 0);
  const maxWidth = Math.max(...canvases.map((c) => c.width));

  const combined = document.createElement("canvas");
  combined.width = maxWidth;
  combined.height = totalHeight;

  const ctx = combined.getContext("2d");
  if (!ctx) {
    throw new Error("Failed to get canvas context");
  }
  let y = 0;

  for (const canvas of canvases) {
    const x = (maxWidth - canvas.width) / 2; // Center horizontally
    ctx.drawImage(canvas, x, y);
    y += canvas.height;
  }

  return combined;
};

/**
 * Convert PDF pages to images
 */
export const convertPdf = async (file: File, opts: ConvertOptions): Promise<Blob | Blob[]> => {
  // Dynamic import to avoid SSR issues
  const pdfjsLib = await import("pdfjs-dist");

  // Set worker
  pdfjsLib.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@5.3.93/build/pdf.worker.min.mjs`;

  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

  const blobs: Blob[] = [];
  const canvases: HTMLCanvasElement[] = [];
  const total = opts.pages.length;

  for (let i = 0; i < total; i++) {
    const pageIdx = opts.pages[i];
    const canvas = await renderPage(pdf, pageIdx, opts.dpi);

    // Keep canvas for combined mode
    if (opts.output === "combined") {
      canvases.push(canvas);
    }

    // Convert to blob
    let blob: Blob;
    if (opts.format === "jpg") {
      blob = await canvasToBlob(canvas, "jpeg", opts.quality / 100);
    } else if (opts.format === "png") {
      blob = await canvasToBlob(canvas, "png");
    } else {
      blob = await canvasToBlob(canvas, "webp");
    }

    blobs.push(blob);
    opts.onPage?.(pageIdx, ((i + 1) / total) * 100);

    // Allow UI to update
    await new Promise((resolve) => requestAnimationFrame(resolve));
  }

  // Handle combined mode
  if (opts.output === "combined") {
    const combined = await combineCanvases(canvases);

    let combinedBlob: Blob;
    if (opts.format === "jpg") {
      combinedBlob = await canvasToBlob(combined, "jpeg", opts.quality / 100);
    } else if (opts.format === "png") {
      combinedBlob = await canvasToBlob(combined, "png");
    } else {
      combinedBlob = await canvasToBlob(combined, "webp");
    }

    return combinedBlob;
  }

  // Handle ZIP mode
  if (opts.downloadAsZip || blobs.length > 1) {
    const zip = new JSZip();
    blobs.forEach((blob, i) => {
      const pageNum = opts.pages[i] + 1;
      const filename = `page-${pageNum.toString().padStart(3, "0")}.${opts.format}`;
      zip.file(filename, blob);
    });

    const zipped = await zip.generateAsync({ type: "blob" });
    return zipped;
  }

  // Single page
  return blobs[0];
};

/**
 * Generate thumbnail for a PDF page
 */
export const generateThumbnail = async (
  pdf: unknown,
  pageIdx: number,
  dpi: number = 30
): Promise<string> => {
  const canvas = await renderPage(pdf, pageIdx, dpi);
  return canvas.toDataURL("image/jpeg", 0.8);
};

/**
 * Download a blob with specified filename
 */
export const downloadBlob = (blob: Blob, filename: string): void => {
  saveAs(blob, filename);
};

/**
 * Get appropriate filename for download
 */
export const getDownloadFilename = (
  originalName: string,
  format: string,
  isCombined: boolean,
  isZip: boolean
): string => {
  const baseName = originalName.replace(/\.pdf$/i, "");

  if (isZip) {
    return `${baseName}_images.zip`;
  }

  if (isCombined) {
    return `${baseName}_combined.${format}`;
  }

  return `${baseName}_page.${format}`;
};
