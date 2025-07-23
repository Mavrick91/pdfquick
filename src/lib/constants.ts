// Analytics Events
export const ANALYTICS_EVENTS = {
  // Page Views
  MERGE_PAGE_VIEWED: "merge_page_viewed",
  COMPRESS_PAGE_VIEWED: "compress_page_viewed",
  SPLIT_PAGE_VIEWED: "split_page_viewed",

  // File Operations
  FILES_UPLOADED: "files_uploaded",
  FILE_REMOVED: "file_removed",
  FILES_REORDERED: "files_reordered",

  // Processing Events
  MERGE_STARTED: "merge_started",
  MERGE_COMPLETED: "merge_completed",
  MERGE_FAILED: "merge_failed",

  COMPRESS_STARTED: "compress_started",
  COMPRESS_COMPLETED: "compress_completed",
  COMPRESS_FAILED: "compress_failed",

  SPLIT_STARTED: "split_started",
  SPLIT_COMPLETED: "split_completed",
  SPLIT_FAILED: "split_failed",
} as const;

// File Constraints
export const FILE_CONSTRAINTS = {
  MAX_FILE_SIZE: 25 * 1024 * 1024, // 25MB
  ACCEPTED_TYPES: ["application/pdf"] as const,
  MIN_FILES_FOR_MERGE: 2,
  MAX_FILES_FOR_MERGE: 50,
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  INVALID_FILE_TYPE: (fileName: string) => `${fileName} is not a PDF file`,
  FILE_TOO_LARGE: (fileName: string) =>
    `${fileName} exceeds ${FILE_CONSTRAINTS.MAX_FILE_SIZE / (1024 * 1024)}MB limit`,
  MERGE_FAILED: "An error occurred while merging PDFs",
  COMPRESS_FAILED: "An error occurred while compressing PDF",
  SPLIT_FAILED: "An error occurred while splitting PDF",
  MIN_FILES_REQUIRED: `At least ${FILE_CONSTRAINTS.MIN_FILES_FOR_MERGE} PDFs are required to merge`,
  MAX_FILES_EXCEEDED: `Maximum ${FILE_CONSTRAINTS.MAX_FILES_FOR_MERGE} PDFs can be merged at once`,
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  MERGE_COMPLETED: "PDFs merged successfully!",
  MERGE_DESCRIPTION: "Your merged PDF has been downloaded.",
  COMPRESS_COMPLETED: "PDF compressed successfully!",
  COMPRESS_DESCRIPTION: "Your compressed PDF has been downloaded.",
  SPLIT_COMPLETED: "PDF split successfully!",
  SPLIT_DESCRIPTION: "Your split PDFs have been downloaded.",
} as const;

// Tool Routes
export const TOOL_ROUTES = {
  MERGE: "/tools/merge",
  COMPRESS: "/tools/compress",
  SPLIT: "/tools/split",
  PROTECT: "/tools/protect",
  EDIT: "/tools/edit",
  PDF_TO_IMAGE: "/tools/pdf-to-image",
} as const;

// UI Text
export const UI_TEXT = {
  MERGE: {
    TITLE: "Merge PDF Files",
    DESCRIPTION:
      "Combine multiple PDFs into a single document. Fast, secure, and completely offline.",
    BUTTON_IDLE: "Merge PDFs",
    BUTTON_SUCCESS: "Download Merged PDF",
    PROCESSING: (count: number) => `Merging ${count} PDFs...`,
    FILE_COUNT: (count: number) => {
      if (count === 0) return "No files selected";
      if (count === 1) return "1 PDF selected";
      return `${count} PDFs selected`;
    },
    MIN_FILES_WARNING: "Add at least one more PDF to merge",
    TIPS: [
      "Drag and drop files to reorder them before merging",
      "Maximum file size: 25MB per PDF",
      "Works with all standard PDF files",
      "The order of files in the list will be the order in the merged PDF",
    ],
  },
  COMMON: {
    DROP_ZONE_TEXT: "Drop PDFs here or click to browse",
    DROP_ZONE_HINT: "Select multiple PDFs to process",
    REMOVE_FILE: "Remove file",
    YOUR_PDFS: (count: number) => `Your PDFs (${count})`,
    SECURITY_TITLE: "100% Secure & Private",
    SECURITY_DESCRIPTION:
      "Your PDFs are processed entirely in your browser. No files are uploaded to any server, ensuring complete privacy and security.",
  },
} as const;
