import { PDFDocument } from "pdf-lib";

import { downloadFile, formatFileSize } from "@/lib/pdf-utils";

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

export { formatFileSize, downloadFile };
