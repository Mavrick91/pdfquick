export type PdfFile = {
  id: string;
  file: File;
  name: string;
  size: number;
};

export type MergeStatus = "idle" | "ready" | "processing" | "success" | "error";
