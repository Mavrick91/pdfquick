export type SplitStatus = "idle" | "ready" | "processing" | "success" | "error";

export type SplitMode = "extract" | "individual" | "remove";

export type PdfContext = {
  id: string;
  file: File;
  name: string;
  size: number;
  totalPages: number;
};

export type SelectedPages = Set<number>; // 0-indexed page indices
