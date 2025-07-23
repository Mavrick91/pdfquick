import { PDFDocument } from "pdf-lib";
import type { PdfFile } from "../types";

export const mergePdfs = async (
  files: PdfFile[],
  onProgress?: (progress: number) => void
): Promise<Blob> => {
  const merged = await PDFDocument.create();
  const totalFiles = files.length;

  for (let i = 0; i < files.length; i++) {
    const { file } = files[i];
    const bytes = await file.arrayBuffer();
    const srcDoc = await PDFDocument.load(bytes);
    const copiedPages = await merged.copyPages(srcDoc, srcDoc.getPageIndices());

    copiedPages.forEach((page) => merged.addPage(page));

    if (onProgress) {
      const progress = ((i + 1) / totalFiles) * 100;
      onProgress(progress);
    }
  }

  const mergedBytes = await merged.save();
  return new Blob([mergedBytes], { type: "application/pdf" });
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

export const downloadFile = (blob: Blob, filename: string): void => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
