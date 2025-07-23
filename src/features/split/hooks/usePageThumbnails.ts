"use client";

import { useState, useEffect } from "react";

// Set worker path for Next.js
const workerSrc = `//unpkg.com/pdfjs-dist@5.3.93/build/pdf.worker.min.mjs`;

export const usePageThumbnails = (file: File | null) => {
  const [thumbnails, setThumbnails] = useState<Map<number, string>>(new Map());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!file) {
      setThumbnails(new Map());
      return;
    }

    let cancelled = false;

    const loadThumbnails = async () => {
      setLoading(true);
      setError(null);

      try {
        // Dynamically import pdfjs to reduce bundle size
        const pdfjs = await import("pdfjs-dist");

        // Set worker
        pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

        // Load the PDF
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
        const numPages = pdf.numPages;

        const newThumbnails = new Map<number, string>();

        // Generate thumbnails for each page
        for (let i = 1; i <= numPages; i++) {
          if (cancelled) break;

          const page = await pdf.getPage(i);
          const viewport = page.getViewport({ scale: 0.2 }); // Smaller scale for compact thumbnails

          // Create canvas
          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");

          if (!context) {
            throw new Error("Failed to get canvas context");
          }

          canvas.width = viewport.width;
          canvas.height = viewport.height;

          // Render page
          await page.render({
            canvasContext: context,
            viewport: viewport,
          }).promise;

          // Convert to data URL
          const dataUrl = canvas.toDataURL("image/jpeg", 0.8);
          newThumbnails.set(i - 1, dataUrl); // Store as 0-indexed

          // Update state progressively
          if (!cancelled) {
            setThumbnails(new Map(newThumbnails));
          }
        }

        // Cleanup
        pdf.destroy();
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to generate thumbnails");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadThumbnails();

    return () => {
      cancelled = true;
    };
  }, [file]);

  return { thumbnails, loading, error };
};
