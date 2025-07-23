"use client";

import { useState, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import type { PdfContext, SplitStatus, SplitMode, SelectedPages } from "../types";
import {
  splitPdf,
  parsePageRange,
  validatePageRange,
  downloadFile,
  downloadMultipleFiles,
  getPdfPageCount,
} from "../utils/pdf";
import { usePageThumbnails } from "./usePageThumbnails";
import { useAnalytics } from "@/features/merge/hooks/useAnalytics";
import { useToaster } from "@/hooks/useToaster";
import { validatePdfFile } from "@/lib/validation";
import { ANALYTICS_EVENTS, SUCCESS_MESSAGES, ERROR_MESSAGES, UI_TEXT } from "@/lib/constants";

export const useSplitController = () => {
  const [pdf, setPdf] = useState<PdfContext | null>(null);
  const [status, setStatus] = useState<SplitStatus>("idle");
  const [mode, setMode] = useState<SplitMode>("extract");
  const [selected, setSelected] = useState<SelectedPages>(new Set());
  const [customRange, setCustomRange] = useState<string>("");
  const [progress, setProgress] = useState<number>(0);

  const { thumbnails, loading: thumbnailsLoading } = usePageThumbnails(pdf?.file || null);
  const { track } = useAnalytics();
  const { showError, showSuccess } = useToaster();

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
        const pageCount = await getPdfPageCount(file);
        const pdfContext: PdfContext = {
          id: uuidv4(),
          file,
          name: file.name,
          size: file.size,
          totalPages: pageCount,
        };

        setPdf(pdfContext);
        setStatus("ready");
        setSelected(new Set());
        setCustomRange("");
        setProgress(0);

        track(ANALYTICS_EVENTS.FILES_UPLOADED, {
          tool: "split",
          pages: pageCount,
        });
      } catch (error) {
        showError("Failed to load PDF", "Please try a different file");
      }
    },
    [track, showError]
  );

  // Toggle page selection
  const togglePage = useCallback((pageIndex: number) => {
    setSelected((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(pageIndex)) {
        newSet.delete(pageIndex);
      } else {
        newSet.add(pageIndex);
      }
      return newSet;
    });
  }, []);

  // Select all pages
  const selectAll = useCallback(() => {
    if (!pdf) return;
    const allPages = new Set(Array.from({ length: pdf.totalPages }, (_, i) => i));
    setSelected(allPages);
  }, [pdf]);

  // Deselect all pages
  const deselectAll = useCallback(() => {
    setSelected(new Set());
  }, []);

  // Parse and apply custom range
  const applyCustomRange = useCallback(
    (range: string) => {
      if (!pdf) return;

      setCustomRange(range);

      if (!range.trim()) {
        return;
      }

      const validation = validatePageRange(range, pdf.totalPages);
      if (!validation.valid) {
        showError("Invalid Range", validation.error);
        return;
      }

      const newSelection = parsePageRange(range, pdf.totalPages);
      setSelected(newSelection);
    },
    [pdf, showError]
  );

  // Handle split operation
  const handleSplit = useCallback(async () => {
    if (!pdf) return;

    // Validate selection based on mode
    if (mode !== "individual" && selected.size === 0) {
      showError("No pages selected", ERROR_MESSAGES.NO_PAGES_SELECTED);
      return;
    }

    if (mode === "remove" && selected.size === pdf.totalPages) {
      showError("Invalid selection", ERROR_MESSAGES.ALL_PAGES_SELECTED_REMOVE);
      return;
    }

    setStatus("processing");
    setProgress(0);

    track(ANALYTICS_EVENTS.SPLIT_STARTED, {
      mode,
      selectedCount: selected.size,
      totalPages: pdf.totalPages,
    });

    try {
      const result = await splitPdf(pdf.file, mode, selected, (progress) => setProgress(progress));

      setStatus("success");

      // Download the result
      const baseName = pdf.name.replace(".pdf", "");

      if (Array.isArray(result)) {
        // Multiple files (individual mode)
        await downloadMultipleFiles(result, baseName);
      } else {
        // Single file (extract or remove mode)
        const suffix = mode === "extract" ? "_extracted" : "_remaining";
        downloadFile(result, `${baseName}${suffix}.pdf`);
      }

      showSuccess(SUCCESS_MESSAGES.SPLIT_COMPLETED, SUCCESS_MESSAGES.SPLIT_DESCRIPTION);

      track(ANALYTICS_EVENTS.SPLIT_COMPLETED, {
        mode,
        outputFiles: Array.isArray(result) ? result.length : 1,
      });

      // Reset after download
      setTimeout(() => {
        setStatus("ready");
        setProgress(0);
      }, 2000);
    } catch (error) {
      setStatus("error");
      showError(ERROR_MESSAGES.SPLIT_FAILED, error instanceof Error ? error.message : undefined);

      track(ANALYTICS_EVENTS.SPLIT_FAILED, {
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }, [pdf, selected, mode, track, showError, showSuccess]);

  // Reset everything
  const reset = useCallback(() => {
    setPdf(null);
    setStatus("idle");
    setMode("extract");
    setSelected(new Set());
    setCustomRange("");
    setProgress(0);
  }, []);

  return {
    // State
    pdf,
    status,
    mode,
    selected,
    customRange,
    progress,
    thumbnails,
    thumbnailsLoading,

    // Actions
    handleUpload,
    togglePage,
    selectAll,
    deselectAll,
    applyCustomRange,
    handleSplit,
    reset,
    setMode,
  };
};
