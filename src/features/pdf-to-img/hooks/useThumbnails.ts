"use client";

import { useState, useEffect, useCallback } from "react";

import { LIMITS } from "../constants";
import { generateThumbnail } from "../utils/pdf";

export const useThumbnails = (file: File | null, totalPages: number) => {
  const [thumbnails, setThumbnails] = useState<Map<number, string>>(new Map());
  const [loading, setLoading] = useState(false);

  const generateThumbnails = useCallback(async () => {
    if (!file || totalPages === 0) return;

    setLoading(true);
    const newThumbs = new Map<number, string>();

    try {
      // Dynamic import to avoid SSR issues
      const pdfjsLib = await import("pdfjs-dist");
      pdfjsLib.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@5.3.93/build/pdf.worker.min.mjs`;
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

      // Generate thumbnails progressively
      for (let i = 0; i < totalPages; i++) {
        const dataUrl = await generateThumbnail(pdf, i, LIMITS.THUMB_DPI);
        newThumbs.set(i, dataUrl);

        // Update state progressively
        setThumbnails(new Map(newThumbs));

        // Allow UI to update
        await new Promise((resolve) => requestAnimationFrame(resolve));
      }
    } catch (error) {
      console.error("Failed to generate thumbnails:", error);
    } finally {
      setLoading(false);
    }
  }, [file, totalPages]);

  useEffect(() => {
    generateThumbnails();
  }, [generateThumbnails]);

  return {
    thumbnails,
    loading,
  };
};
