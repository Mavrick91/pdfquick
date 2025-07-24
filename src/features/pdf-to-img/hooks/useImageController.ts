"use client";

import { useState, useCallback, useMemo } from "react";
import { v4 as uuidv4 } from "uuid";

import { useAnalytics } from "@/features/merge/hooks/useAnalytics";
import { useToaster } from "@/hooks/useToaster";
import { ERROR_MESSAGES } from "@/lib/constants";
import { validatePdfFile } from "@/lib/validation";

import { UI_TEXT, LIMITS, ANALYTICS_EVENTS } from "../constants";
import type {
  ConvertStatus,
  PdfContext,
  ImageFormat,
  DpiOption,
  OutputMode,
  ConvertOptions,
} from "../types";
import { convertPdf, downloadBlob, getDownloadFilename } from "../utils/pdf";

import { useThumbnails } from "./useThumbnails";

export const useImageController = () => {
  const [pdfCtx, setPdfCtx] = useState<PdfContext | null>(null);
  const [status, setStatus] = useState<ConvertStatus>("idle");
  const [selectedPages, setSelectedPages] = useState<Set<number>>(new Set());
  const [format, setFormat] = useState<ImageFormat>("jpg");
  const [dpi, setDpi] = useState<DpiOption>(72);
  const [quality, setQuality] = useState(80); // JPG quality
  const [outputMode, setOutputMode] = useState<OutputMode>("separate");
  const [downloadAsZip, setDownloadAsZip] = useState(false);
  const [progressPerPage, setProgressPerPage] = useState<Record<number, number>>({});
  const [batchProgress, setBatchProgress] = useState(0);
  const [showMonetization, setShowMonetization] = useState(false);
  const [lastResult, setLastResult] = useState<Blob | null>(null);

  const { track } = useAnalytics();
  const { showError, showSuccess, showInfo } = useToaster();

  // Stub for Pro status - will be replaced with actual auth
  const isPro = useMemo(() => false, []);

  // Get thumbnails
  const { thumbnails, loading: thumbsLoading } = useThumbnails(
    pdfCtx?.file || null,
    pdfCtx?.totalPages || 0
  );

  // Handle file upload
  const handleUpload = useCallback(
    async (files: File[]) => {
      if (files.length === 0) return;

      const file = files[0]; // Only take the first file
      const validation = validatePdfFile(file);

      if (!validation.valid || !validation.file) {
        showError("Invalid File", validation.error);
        return;
      }

      try {
        // Get page count
        const pdfjsLib = await import("pdfjs-dist");
        pdfjsLib.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@5.3.93/build/pdf.worker.min.mjs`;
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        const totalPages = pdf.numPages;

        const context: PdfContext = {
          id: uuidv4(),
          file,
          name: file.name,
          size: file.size,
          totalPages,
        };

        setPdfCtx(context);
        setStatus("ready");
        // Select all pages by default
        setSelectedPages(new Set(Array.from({ length: totalPages }, (_, i) => i)));

        track(ANALYTICS_EVENTS.P2I_FILES_UPLOADED, {
          totalPages,
        });
      } catch {
        showError("Failed to load PDF", "Could not read PDF file");
      }
    },
    [track, showError]
  );

  // Handle page selection
  const handleSelectPage = useCallback((pageIdx: number) => {
    setSelectedPages((prev) => {
      const next = new Set(prev);
      if (next.has(pageIdx)) {
        next.delete(pageIdx);
      } else {
        next.add(pageIdx);
      }
      return next;
    });
  }, []);

  // Select all pages
  const selectAllPages = useCallback(() => {
    if (!pdfCtx) return;
    setSelectedPages(new Set(Array.from({ length: pdfCtx.totalPages }, (_, i) => i)));
  }, [pdfCtx]);

  // Clear selection
  const clearSelection = useCallback(() => {
    setSelectedPages(new Set());
  }, []);

  // Parse range string (e.g., "1-3, 5, 7-10")
  const parseRangeString = useCallback(
    (rangeStr: string): number[] => {
      if (!pdfCtx) return [];
      const pages = new Set<number>();
      const parts = rangeStr.split(",");

      for (const part of parts) {
        const trimmed = part.trim();
        if (!trimmed) continue;

        if (trimmed.includes("-")) {
          const [start, end] = trimmed.split("-").map((n) => parseInt(n.trim()));
          if (!isNaN(start) && !isNaN(end)) {
            for (let i = Math.max(1, start); i <= Math.min(pdfCtx.totalPages, end); i++) {
              pages.add(i - 1); // Convert to 0-based
            }
          }
        } else {
          const pageNum = parseInt(trimmed);
          if (!isNaN(pageNum) && pageNum > 0 && pageNum <= pdfCtx.totalPages) {
            pages.add(pageNum - 1); // Convert to 0-based
          }
        }
      }

      return Array.from(pages).sort((a, b) => a - b);
    },
    [pdfCtx]
  );

  // Handle range input
  const handleRangeInput = useCallback(
    (rangeStr: string) => {
      const pages = parseRangeString(rangeStr);
      setSelectedPages(new Set(pages));
    },
    [parseRangeString]
  );

  // Handle format change
  const handleFormatChange = useCallback(
    (newFormat: ImageFormat) => {
      if (newFormat !== "jpg" && !isPro) {
        showInfo("Pro Feature", UI_TEXT.PRO_FEATURE_WARNING);
        setShowMonetization(true);
        return;
      }

      setFormat(newFormat);
      track(ANALYTICS_EVENTS.P2I_FORMAT_CHANGED, { format: newFormat });
    },
    [isPro, showInfo, track]
  );

  // Handle DPI change
  const handleDpiChange = useCallback(
    (newDpi: DpiOption) => {
      if (newDpi > LIMITS.FREE_MAX_DPI && !isPro) {
        showInfo("Pro Feature", UI_TEXT.HIGH_DPI_WARNING);
        setShowMonetization(true);
        return;
      }

      setDpi(newDpi);
      track(ANALYTICS_EVENTS.P2I_DPI_CHANGED, { dpi: newDpi });
    },
    [isPro, showInfo, track]
  );

  // Handle output mode change
  const handleOutputChange = useCallback(
    (newMode: OutputMode) => {
      if (newMode === "combined" && !isPro) {
        showInfo("Pro Feature", UI_TEXT.PRO_FEATURE_WARNING);
        setShowMonetization(true);
        return;
      }

      setOutputMode(newMode);
      track(ANALYTICS_EVENTS.P2I_OUTPUT_CHANGED, { mode: newMode });
    },
    [isPro, showInfo, track]
  );

  // Handle ZIP option
  const handleZipToggle = useCallback(
    (checked: boolean) => {
      if (checked && !isPro) {
        showInfo("Pro Feature", UI_TEXT.PRO_FEATURE_WARNING);
        setShowMonetization(true);
        return;
      }
      setDownloadAsZip(checked);
    },
    [isPro, showInfo]
  );

  // Can convert check
  const canConvert = useMemo(() => {
    return pdfCtx !== null && selectedPages.size > 0 && status === "ready";
  }, [pdfCtx, selectedPages, status]);

  // Start conversion
  const startConvert = useCallback(async () => {
    if (!pdfCtx || !canConvert) return;

    // Check free limits
    if (!isPro) {
      if (selectedPages.size > LIMITS.FREE_MAX_PAGES) {
        showInfo("Page Limit", UI_TEXT.FREE_LIMIT_WARNING);
        setShowMonetization(true);
        return;
      }

      if (format !== LIMITS.FREE_FORMAT) {
        showInfo("Pro Feature", UI_TEXT.PRO_FEATURE_WARNING);
        setShowMonetization(true);
        return;
      }

      if (dpi > LIMITS.FREE_MAX_DPI) {
        showInfo("Pro Feature", UI_TEXT.HIGH_DPI_WARNING);
        setShowMonetization(true);
        return;
      }

      if (outputMode === "combined") {
        showInfo("Pro Feature", UI_TEXT.PRO_FEATURE_WARNING);
        setShowMonetization(true);
        return;
      }

      if (downloadAsZip && selectedPages.size > 1) {
        showInfo("Pro Feature", UI_TEXT.PRO_FEATURE_WARNING);
        setShowMonetization(true);
        return;
      }
    }

    setStatus("processing");
    setProgressPerPage({});
    setBatchProgress(0);

    track(ANALYTICS_EVENTS.P2I_CONVERT_STARTED, {
      format,
      dpi,
      outputMode,
      pageCount: selectedPages.size,
    });

    try {
      const pages = Array.from(selectedPages).sort((a, b) => a - b);
      const options: ConvertOptions = {
        pages,
        format,
        dpi,
        quality,
        output: outputMode,
        downloadAsZip: downloadAsZip || pages.length > 1,
        onPage: (idx, pct) => {
          setProgressPerPage((prev) => ({ ...prev, [idx]: pct }));
          setBatchProgress(pct);
        },
      };

      const result = await convertPdf(pdfCtx.file, options);
      const blob = Array.isArray(result) ? result[0] : result;

      // Download the result
      const filename = getDownloadFilename(
        pdfCtx.name,
        format,
        outputMode === "combined",
        downloadAsZip || pages.length > 1
      );
      downloadBlob(blob, filename);

      setLastResult(blob);
      setStatus("success");
      showSuccess(UI_TEXT.SUCCESS_MESSAGE, `${pages.length} pages converted`);

      track(ANALYTICS_EVENTS.P2I_CONVERT_COMPLETED, {
        format,
        dpi,
        pageCount: pages.length,
      });

      // Show monetization for free users
      if (!isPro) {
        setShowMonetization(true);
      }
    } catch (error) {
      setStatus("error");
      showError(ERROR_MESSAGES.COMPRESS_FAILED, UI_TEXT.ERROR_CONVERSION);

      track(ANALYTICS_EVENTS.P2I_CONVERT_FAILED, {
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }, [
    pdfCtx,
    canConvert,
    selectedPages,
    format,
    dpi,
    quality,
    outputMode,
    downloadAsZip,
    isPro,
    track,
    showError,
    showSuccess,
    showInfo,
  ]);

  // Download again
  const downloadAgain = useCallback(() => {
    if (!lastResult || !pdfCtx) return;

    const pages = Array.from(selectedPages).sort((a, b) => a - b);
    const filename = getDownloadFilename(
      pdfCtx.name,
      format,
      outputMode === "combined",
      downloadAsZip || pages.length > 1
    );
    downloadBlob(lastResult, filename);
  }, [lastResult, pdfCtx, selectedPages, format, outputMode, downloadAsZip]);

  // Reset everything
  const reset = useCallback(() => {
    setPdfCtx(null);
    setStatus("idle");
    setSelectedPages(new Set());
    setFormat("jpg");
    setDpi(72);
    setQuality(80);
    setOutputMode("separate");
    setDownloadAsZip(false);
    setProgressPerPage({});
    setBatchProgress(0);
    setShowMonetization(false);
    setLastResult(null);
  }, []);

  return {
    // State
    pdfCtx,
    status,
    selectedPages,
    format,
    dpi,
    quality,
    outputMode,
    downloadAsZip,
    progressPerPage,
    batchProgress,
    showMonetization,
    isPro,
    canConvert,
    thumbnails,
    thumbsLoading,

    // Actions
    handleUpload,
    handleSelectPage,
    selectAllPages,
    clearSelection,
    handleRangeInput,
    handleFormatChange,
    handleDpiChange,
    setQuality,
    handleOutputChange,
    handleZipToggle,
    startConvert,
    downloadAgain,
    reset,
    setShowMonetization,
  };
};
