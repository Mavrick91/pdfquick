"use client";

import { useState, useCallback, useMemo } from "react";
import { v4 as uuidv4 } from "uuid";
import type { CompressionLevel, CompressStatus, PdfFile } from "../types";
import {
  compressPdf,
  calculateSavedPercent,
  downloadFile,
  downloadMultipleFiles,
} from "../utils/pdf";
import { useAnalytics } from "@/features/merge/hooks/useAnalytics";
import { useToaster } from "@/hooks/useToaster";
import { validatePdfFiles } from "@/lib/validation";
import {
  ANALYTICS_EVENTS,
  SUCCESS_MESSAGES,
  ERROR_MESSAGES,
  FILE_CONSTRAINTS,
  UI_TEXT,
} from "@/lib/constants";

export const useCompressController = () => {
  const [files, setFiles] = useState<PdfFile[]>([]);
  const [level, setLevel] = useState<CompressionLevel>("balanced");
  const [status, setStatus] = useState<CompressStatus>("idle");
  const [showMonetization, setShowMonetization] = useState(false);

  const { track } = useAnalytics();
  const { showError, showSuccess, showInfo } = useToaster();

  // Stub for Pro status - will be replaced with actual auth
  const isPro = useMemo(() => false, []);

  // Calculate batch progress
  const batchProgress = useMemo(() => {
    if (files.length === 0) return 0;
    const totalProgress = files.reduce((sum, file) => sum + file.progress, 0);
    return Math.round(totalProgress / files.length);
  }, [files]);

  // Handle file addition
  const handleAdd = useCallback(
    (newFiles: File[]) => {
      const { validFiles, errors } = validatePdfFiles(newFiles);

      // Show validation errors
      if (errors.length > 0) {
        errors.forEach(({ fileName, error }) => {
          showError(`Invalid file: ${fileName}`, error);
        });
      }

      if (validFiles.length === 0) return;

      // Check free tier limits
      const currentCount = files.length;
      const newCount = currentCount + validFiles.length;

      if (!isPro && newCount > FILE_CONSTRAINTS.FREE_MAX_COMPRESS_FILES) {
        const allowedCount = FILE_CONSTRAINTS.FREE_MAX_COMPRESS_FILES - currentCount;

        showInfo("Free tier limit", UI_TEXT.COMPRESS.FREE_LIMIT_WARNING);

        // Only add files up to the limit
        validFiles.splice(allowedCount);
      }

      // Create PdfFile objects
      const pdfFiles: PdfFile[] = validFiles.map((file) => ({
        id: uuidv4(),
        file,
        name: file.name,
        size: file.size,
        progress: 0,
      }));

      setFiles((prev) => [...prev, ...pdfFiles]);
      setStatus("ready");

      track(ANALYTICS_EVENTS.FILES_UPLOADED, {
        tool: "compress",
        count: validFiles.length,
      });
    },
    [files.length, isPro, track, showError, showInfo]
  );

  // Handle file removal
  const handleRemove = useCallback(
    (id: string) => {
      setFiles((prev) => prev.filter((f) => f.id !== id));
      if (files.length === 1) {
        setStatus("idle");
      }
      track(ANALYTICS_EVENTS.FILE_REMOVED, { tool: "compress" });
    },
    [files.length, track]
  );

  // Handle file reordering
  const handleReorder = useCallback(
    (reorderedFiles: PdfFile[]) => {
      setFiles(reorderedFiles);
      track(ANALYTICS_EVENTS.FILES_REORDERED, { tool: "compress" });
    },
    [track]
  );

  // Handle compression level change
  const handleLevelChange = useCallback(
    (newLevel: CompressionLevel) => {
      if (!isPro && newLevel !== "balanced") {
        showInfo("Pro feature", UI_TEXT.COMPRESS.PRO_FEATURE_WARNING);
        setShowMonetization(true);
        return;
      }
      setLevel(newLevel);
    },
    [isPro, showInfo]
  );

  // Start compression
  const startCompress = useCallback(async () => {
    if (files.length === 0) return;

    setStatus("processing");
    setShowMonetization(false);

    track(ANALYTICS_EVENTS.COMPRESS_STARTED, {
      level,
      fileCount: files.length,
    });

    const results: Array<{ blob: Blob; name: string }> = [];
    let hasError = false;

    // Process files sequentially
    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      try {
        // Update progress for this file
        const updateProgress = (progress: number) => {
          setFiles((prev) => prev.map((f) => (f.id === file.id ? { ...f, progress } : f)));
        };

        // Compress the file
        const result = await compressPdf(file.file, level, updateProgress);

        // Update file with result
        setFiles((prev) =>
          prev.map((f) =>
            f.id === file.id
              ? {
                  ...f,
                  result: {
                    blob: result.blob,
                    size: result.after,
                    savedPercent: calculateSavedPercent(result.before, result.after),
                  },
                  progress: 100,
                }
              : f
          )
        );

        // Add to results for download
        const compressedName = file.name.replace(".pdf", "_compressed.pdf");
        results.push({ blob: result.blob, name: compressedName });
      } catch {
        hasError = true;
        setFiles((prev) =>
          prev.map((f) =>
            f.id === file.id ? { ...f, error: "Compression failed", progress: 0 } : f
          )
        );
        showError(ERROR_MESSAGES.COMPRESS_FAILED, file.name);
      }
    }

    if (!hasError) {
      setStatus("success");
      showSuccess(SUCCESS_MESSAGES.COMPRESS_COMPLETED, SUCCESS_MESSAGES.COMPRESS_DESCRIPTION);

      // Show monetization hook for free users
      if (!isPro) {
        setShowMonetization(true);
      }

      track(ANALYTICS_EVENTS.COMPRESS_COMPLETED, {
        level,
        fileCount: results.length,
      });

      // Auto-download results
      if (results.length === 1) {
        downloadFile(results[0].blob, results[0].name);
      } else if (results.length > 1) {
        await downloadMultipleFiles(results);
      }
    } else {
      setStatus("error");
      track(ANALYTICS_EVENTS.COMPRESS_FAILED);
    }
  }, [files, level, isPro, track, showError, showSuccess]);

  // Reset everything
  const reset = useCallback(() => {
    setFiles([]);
    setLevel("balanced");
    setStatus("idle");
    setShowMonetization(false);
  }, []);

  return {
    // State
    files,
    level,
    status,
    batchProgress,
    isPro,
    showMonetization,

    // Actions
    handleAdd,
    handleRemove,
    handleReorder,
    handleLevelChange,
    startCompress,
    reset,
    setShowMonetization,
  };
};
