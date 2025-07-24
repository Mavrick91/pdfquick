export type ProtectStatus = "idle" | "ready" | "processing" | "success" | "error";

export type EncryptionStrength = "128" | "256";

export type PermissionFlags = {
  printing?: boolean;
  copying?: boolean;
  editing?: boolean;
  formFilling?: boolean;
  commenting?: boolean;
};

export type PdfContext = {
  id: string;
  file: File;
  name: string;
  size: number;
};
