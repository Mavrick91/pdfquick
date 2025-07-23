"use client";

import { useState, useCallback } from "react";
import type { PdfFile, MergeStatus } from "../types";
import { mergePdfs, downloadFile } from "../utils/pdf";
import { useAnalytics } from "./useAnalytics";
import { useToaster } from "@/hooks/useToaster";
import { validatePdfFiles, validateMergeOperation } from "@/lib/validation";
import { ANALYTICS_EVENTS, SUCCESS_MESSAGES, ERROR_MESSAGES } from "@/lib/constants";

export const useMergeController = () => {
  const [files, setFiles] = useState<PdfFile[]>([]);
  const [status, setStatus] = useState<MergeStatus>("idle");
  const [progress, setProgress] = useState<number>(0);

  const { track } = useAnalytics();
  const { showError, showSuccess, showErrorFromResult } = useToaster();

  const handleAdd = useCallback(
    (incomingFiles: File[]) => {
      const { validFiles, errors } = validatePdfFiles(incomingFiles);

      if (errors.length > 0) {
        showErrorFromResult(errors);
      }

      if (validFiles.length === 0) return;

      const newFiles: PdfFile[] = validFiles.map((file) => ({
        id: crypto.randomUUID(),
        file,
        name: file.name,
        size: file.size,
      }));

      setFiles((prev) => [...prev, ...newFiles]);
      track(ANALYTICS_EVENTS.FILES_UPLOADED, { count: validFiles.length });

      if (files.length + newFiles.length >= 2) {
        setStatus("ready");
      }
    },
    [files.length, track, showErrorFromResult]
  );

  const handleReorder = useCallback((reorderedFiles: PdfFile[]) => {
    setFiles(reorderedFiles);
  }, []);

  const handleRemove = useCallback((id: string) => {
    setFiles((prev) => {
      const updated = prev.filter((f) => f.id !== id);
      if (updated.length < 2) {
        setStatus("idle");
      }
      return updated;
    });
  }, []);

  const handleMerge = useCallback(async () => {
    const mergeValidation = validateMergeOperation(files.length);
    if (!mergeValidation.valid) {
      showError("Cannot merge", mergeValidation.error);
      return;
    }

    try {
      setStatus("processing");
      setProgress(0);
      track(ANALYTICS_EVENTS.MERGE_STARTED, { count: files.length });

      const blob = await mergePdfs(files, (prog) => {
        setProgress(Math.round(prog));
      });

      setStatus("success");
      track(ANALYTICS_EVENTS.MERGE_COMPLETED, {
        count: files.length,
        totalSize: files.reduce((acc, f) => acc + f.size, 0),
      });

      // Auto-download
      downloadFile(blob, "merged.pdf");

      showSuccess(SUCCESS_MESSAGES.MERGE_COMPLETED, SUCCESS_MESSAGES.MERGE_DESCRIPTION);
    } catch (error) {
      console.error("Merge error:", error);
      setStatus("error");
      track(ANALYTICS_EVENTS.MERGE_FAILED, {
        error: error instanceof Error ? error.message : "Unknown error",
      });

      showError(
        "Merge failed",
        error instanceof Error ? error.message : ERROR_MESSAGES.MERGE_FAILED
      );
    }
  }, [files, track, showError, showSuccess]);

  const reset = useCallback(() => {
    setFiles([]);
    setStatus("idle");
    setProgress(0);
  }, []);

  return {
    files,
    status,
    progress,
    handleAdd,
    handleReorder,
    handleRemove,
    handleMerge,
    reset,
  };
};
