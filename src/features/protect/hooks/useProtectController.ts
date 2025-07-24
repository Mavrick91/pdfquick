"use client";

import { useState, useCallback, useMemo } from "react";
import { v4 as uuidv4 } from "uuid";
import type { ProtectStatus, EncryptionStrength, PermissionFlags, PdfContext } from "../types";
import { encryptPdf, downloadFile } from "../utils/pdf";
import { useAnalytics } from "@/features/merge/hooks/useAnalytics";
import { useToaster } from "@/hooks/useToaster";
import { validatePdfFile } from "@/lib/validation";
import { ANALYTICS_EVENTS, ERROR_MESSAGES, UI_TEXT } from "@/lib/constants";

export const useProtectController = () => {
  const [pdf, setPdf] = useState<PdfContext | null>(null);
  const [status, setStatus] = useState<ProtectStatus>("idle");
  const [userPassword, setUserPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [ownerPassword, setOwnerPassword] = useState("");
  const [encryptionStrength, setEncryptionStrength] = useState<EncryptionStrength>("128");
  const [permissions, setPermissions] = useState<PermissionFlags>({
    printing: false,
    copying: false,
    editing: false,
    formFilling: false,
    commenting: false,
  });
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showMonetization, setShowMonetization] = useState(false);

  const { track } = useAnalytics();
  const { showError, showSuccess, showInfo } = useToaster();

  // Stub for Pro status - will be replaced with actual auth
  const isPro = useMemo(() => false, []);

  // Handle file upload
  const handleUpload = useCallback(
    (files: File[]) => {
      if (files.length === 0) return;

      const file = files[0]; // Only take the first file
      const validation = validatePdfFile(file);

      if (!validation.valid || !validation.file) {
        showError("Invalid File", validation.error);
        return;
      }

      const pdfContext: PdfContext = {
        id: uuidv4(),
        file,
        name: file.name,
        size: file.size,
      };

      setPdf(pdfContext);
      setStatus("ready");

      track(ANALYTICS_EVENTS.FILES_UPLOADED, {
        tool: "protect",
      });
    },
    [track, showError]
  );

  // Toggle permission
  const togglePermission = useCallback(
    (key: keyof PermissionFlags) => {
      if (!isPro) {
        showInfo("Pro feature", UI_TEXT.PROTECT.PRO_FEATURE_WARNING);
        setShowMonetization(true);
        return;
      }

      setPermissions((prev) => ({
        ...prev,
        [key]: !prev[key],
      }));
    },
    [isPro, showInfo]
  );

  // Handle encryption strength change
  const handleEncryptionChange = useCallback(
    (strength: EncryptionStrength) => {
      if (strength === "256" && !isPro) {
        showInfo("Pro feature", UI_TEXT.PROTECT.PRO_FEATURE_WARNING);
        setShowMonetization(true);
        return;
      }
      setEncryptionStrength(strength);
    },
    [isPro, showInfo]
  );

  // Validate form
  const canProtect = useMemo(() => {
    return (
      pdf !== null &&
      userPassword.length > 0 &&
      userPassword === confirmPassword &&
      status === "ready"
    );
  }, [pdf, userPassword, confirmPassword, status]);

  // Start protection
  const startProtect = useCallback(async () => {
    if (!pdf || !canProtect) return;

    // Check Pro features
    const needsPro =
      ownerPassword.length > 0 ||
      Object.values(permissions).some((v) => v) ||
      encryptionStrength === "256";

    if (needsPro && !isPro) {
      showInfo("Pro features required", "Upgrade to Pro to use advanced protection features");
      setShowMonetization(true);
      return;
    }

    setStatus("processing");
    setProgress(0);

    track(ANALYTICS_EVENTS.PROTECT_STARTED, {
      encryptionStrength,
      hasOwnerPassword: ownerPassword.length > 0,
      permissions: Object.values(permissions).filter((v) => v).length,
    });

    try {
      // Simulate progress
      const progressInterval = setInterval(() => {
        setProgress((prev) => Math.min(prev + 10, 90));
      }, 200);

      // Encrypt the PDF
      const encryptedBlob = await encryptPdf(
        pdf.file,
        userPassword,
        ownerPassword || undefined,
        encryptionStrength,
        permissions
      );

      clearInterval(progressInterval);
      setProgress(100);

      // Download the protected PDF
      const protectedName = pdf.name.replace(".pdf", "_protected.pdf");
      downloadFile(encryptedBlob, protectedName);

      setStatus("success");
      showSuccess("PDF Protected!", "Your PDF has been encrypted successfully.");

      // Show monetization for free users
      if (!isPro) {
        setShowMonetization(true);
      }

      track(ANALYTICS_EVENTS.PROTECT_COMPLETED, {
        encryptionStrength,
      });
    } catch (error) {
      setStatus("error");
      showError(ERROR_MESSAGES.COMPRESS_FAILED, error instanceof Error ? error.message : undefined);

      track(ANALYTICS_EVENTS.PROTECT_FAILED, {
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }, [
    pdf,
    canProtect,
    userPassword,
    ownerPassword,
    encryptionStrength,
    permissions,
    isPro,
    track,
    showError,
    showSuccess,
    showInfo,
  ]);

  // Reset everything
  const reset = useCallback(() => {
    setPdf(null);
    setStatus("idle");
    setUserPassword("");
    setConfirmPassword("");
    setOwnerPassword("");
    setEncryptionStrength("128");
    setPermissions({
      printing: false,
      copying: false,
      editing: false,
      formFilling: false,
      commenting: false,
    });
    setShowAdvanced(false);
    setProgress(0);
    setShowMonetization(false);
  }, []);

  return {
    // State
    pdf,
    status,
    userPassword,
    confirmPassword,
    ownerPassword,
    encryptionStrength,
    permissions,
    showAdvanced,
    progress,
    showMonetization,
    isPro,
    canProtect,

    // Actions
    handleUpload,
    setUserPassword,
    setConfirmPassword,
    setOwnerPassword,
    togglePermission,
    handleEncryptionChange,
    setShowAdvanced,
    startProtect,
    reset,
    setShowMonetization,
  };
};
