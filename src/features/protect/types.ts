import type { BasePdfFile, ProcessingStatus } from "@/types/pdf";

export type ProtectStatus = ProcessingStatus;

export type EncryptionStrength = "128" | "256";

export type PermissionFlags = {
  printing?: boolean;
  copying?: boolean;
  editing?: boolean;
  formFilling?: boolean;
  commenting?: boolean;
};

export type PdfContext = BasePdfFile;
