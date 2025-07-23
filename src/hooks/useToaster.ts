"use client";

import { useCallback } from "react";
import { toaster } from "@/components/ui/toaster";

export const useToaster = () => {
  const showError = useCallback((title: string, description?: string) => {
    toaster.error({ title, description });
  }, []);

  const showSuccess = useCallback((title: string, description?: string) => {
    toaster.success({ title, description });
  }, []);

  const showInfo = useCallback((title: string, description?: string) => {
    toaster.info({ title, description });
  }, []);

  const showErrorFromResult = useCallback(
    (errors: Array<{ fileName: string; error: string }>) => {
      errors.forEach(({ error }) => {
        showError("Validation Error", error);
      });
    },
    [showError]
  );

  return {
    showError,
    showSuccess,
    showInfo,
    showErrorFromResult,
  };
};
