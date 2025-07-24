import type { BasePdfContext, ProcessingStatus } from "@/types/pdf";

export type SplitStatus = ProcessingStatus;

export type SplitMode = "extract" | "individual" | "remove";

export type PdfContext = {
  totalPages: number; // required for Split feature
} & BasePdfContext;

export type SelectedPages = Set<number>; // 0-indexed page indices
