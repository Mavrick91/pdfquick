// Analytics Events
export const ANALYTICS_EVENTS = {
  // Page Views
  MERGE_PAGE_VIEWED: "merge_page_viewed",
  COMPRESS_PAGE_VIEWED: "compress_page_viewed",
  SPLIT_PAGE_VIEWED: "split_page_viewed",
  PROTECT_PAGE_VIEWED: "protect_page_viewed",

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

  PROTECT_STARTED: "protect_started",
  PROTECT_COMPLETED: "protect_completed",
  PROTECT_FAILED: "protect_failed",

  // PDF to Image Events
  P2I_PAGE_VIEWED: "pdf_to_image_page_viewed",
  P2I_FILES_UPLOADED: "pdf_to_image_files_uploaded",
  P2I_CONVERT_STARTED: "pdf_to_image_convert_started",
  P2I_CONVERT_COMPLETED: "pdf_to_image_convert_completed",
  P2I_CONVERT_FAILED: "pdf_to_image_convert_failed",
  P2I_FORMAT_CHANGED: "pdf_to_image_format_changed",
  P2I_DPI_CHANGED: "pdf_to_image_dpi_changed",
  P2I_OUTPUT_CHANGED: "pdf_to_image_output_changed",
} as const;

// File Constraints
export const FILE_CONSTRAINTS = {
  MAX_FILE_SIZE: 25 * 1024 * 1024, // 25MB
  ACCEPTED_TYPES: ["application/pdf"] as const,
  MIN_FILES_FOR_MERGE: 2,
  MAX_FILES_FOR_MERGE: 50,
  FREE_MAX_COMPRESS_FILES: 2,
} as const;

export const MAX_FILE_SIZE_MB = FILE_CONSTRAINTS.MAX_FILE_SIZE / (1024 * 1024);
export const ACCEPT_PDF = {
  "application/pdf": [".pdf"],
};

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
  NO_PAGES_SELECTED: "Please select at least one page",
  ALL_PAGES_SELECTED_REMOVE: "Cannot remove all pages. Please deselect at least one page",
  INVALID_PAGE_RANGE: "Invalid page range format. Use format: 1-3, 5, 8-10",
  PAGE_OUT_OF_RANGE: (page: number, total: number) => `Page ${page} is out of range (1-${total})`,
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
  SPLIT: {
    TITLE: "Split PDF",
    DESCRIPTION:
      "Extract pages, split into individual files, or remove unwanted pages. Works entirely offline.",
    DROP_ZONE_TEXT: "Drop a PDF here or click to browse",
    DROP_ZONE_HINT: "Select one PDF to split",
    MODE_EXTRACT: "Extract selected pages",
    MODE_EXTRACT_DESC: "Create a new PDF with only the selected pages",
    MODE_INDIVIDUAL: "Split into individual pages",
    MODE_INDIVIDUAL_DESC: "Create separate PDF files for each page",
    MODE_REMOVE: "Remove selected pages",
    MODE_REMOVE_DESC: "Create a new PDF without the selected pages",
    BUTTON_EXTRACT: (count: number) => `Extract ${count} Page${count !== 1 ? "s" : ""}`,
    BUTTON_INDIVIDUAL: (count: number) => `Split into ${count} Files`,
    BUTTON_REMOVE: (count: number) => `Remove ${count} Page${count !== 1 ? "s" : ""}`,
    BUTTON_IDLE: "Split PDF",
    BUTTON_SUCCESS: "Download Result",
    PROCESSING: "Splitting PDF...",
    PAGE_COUNT: (count: number) => `${count} page${count !== 1 ? "s" : ""}`,
    SELECTED_COUNT: (selected: number, total: number) => `${selected} of ${total} pages selected`,
    SELECT_ALL: "Select All",
    DESELECT_ALL: "Deselect All",
    CUSTOM_RANGE: "Custom range:",
    CUSTOM_RANGE_PLACEHOLDER: "e.g., 1-3, 5, 8-10",
    CUSTOM_RANGE_HINT: "Enter page numbers or ranges separated by commas",
    TIPS: [
      "Click on pages to select/deselect them",
      "Use 'Select All' to quickly select all pages",
      "Enter custom ranges like '1-3, 5, 8-10' for quick selection",
      "Maximum file size: 25MB",
    ],
  },
  COMPRESS: {
    TITLE: "Compress PDF",
    DESCRIPTION:
      "Reduce PDF file size while maintaining quality. Perfect for email attachments and uploads.",
    DROP_ZONE_TEXT: "Drop PDFs here or click to browse",
    DROP_ZONE_HINT: "Select up to 2 PDFs to compress (Pro: unlimited)",
    BUTTON_IDLE: "Compress PDFs",
    BUTTON_SUCCESS: "Download Compressed PDFs",
    PROCESSING: "Compressing PDFs...",
    LEVEL_BALANCED: "Balanced",
    LEVEL_BALANCED_DESC: "Best for most uses • ~50-70% size reduction",
    LEVEL_HIGH: "High Quality",
    LEVEL_HIGH_DESC: "Minimal quality loss • ~30-40% size reduction",
    LEVEL_MAXIMUM: "Maximum Compression",
    LEVEL_MAXIMUM_DESC: "Smallest file size • ~70-85% size reduction",
    FILE_SIZE_BEFORE: (size: string) => `Original: ${size}`,
    FILE_SIZE_AFTER: (before: string, after: string, percent: number) =>
      `${before} → ${after} (${percent}% smaller)`,
    BATCH_PROGRESS: (percent: number) => `Compressing... ${percent}%`,
    MONETIZATION_TITLE: "✅ Compressed Successfully!",
    MONETIZATION_SUBTITLE: "Unlock Better Compression",
    MONETIZATION_BENEFITS: [
      "Maximum compression level",
      "Batch compress unlimited files",
      "Priority processing",
      "No daily limits",
    ],
    MONETIZATION_CTA: "Go Pro - $9/month",
    MONETIZATION_SKIP: "Maybe Later",
    PRO_BADGE: "Pro",
    FREE_LIMIT_WARNING: `Free users can compress up to ${FILE_CONSTRAINTS.FREE_MAX_COMPRESS_FILES} files. Upgrade to Pro for unlimited.`,
    PRO_FEATURE_WARNING: "This compression level is available for Pro users only.",
    TIPS: [
      "Higher compression = smaller file size but lower quality",
      "Balanced mode works great for most PDFs",
      "Pro users can compress unlimited files at once",
      "Files are processed entirely in your browser",
    ],
  },
  PROTECT: {
    TITLE: "Protect PDF",
    DESCRIPTION:
      "Add password protection and encryption to your PDFs. Bank-level security, processed entirely in your browser.",
    DROP_ZONE_TEXT: "Drop a PDF here or click to browse",
    DROP_ZONE_HINT: "Select one PDF to protect",
    BUTTON_IDLE: "Protect PDF",
    BUTTON_SUCCESS: "Download Protected PDF",
    PROCESSING: "Encrypting PDF...",
    PASSWORD_LABEL: "Password to open",
    PASSWORD_PLACEHOLDER: "Enter a strong password",
    PASSWORD_CONFIRM: "Confirm password",
    PASSWORD_CONFIRM_PLACEHOLDER: "Re-enter password",
    PASSWORD_MISMATCH: "Passwords do not match",
    PASSWORD_REQUIRED: "Password is required",
    OWNER_PASSWORD: "Permissions password",
    OWNER_PASSWORD_DESC: "Set a separate password to control permissions",
    OWNER_PASSWORD_PLACEHOLDER: "Optional (Pro feature)",
    ADVANCED_OPTIONS: "Advanced Options",
    PERMISSIONS_TITLE: "Document Restrictions",
    PERMISSIONS: {
      PRINTING: "Prevent printing",
      COPYING: "Prevent copying text",
      EDITING: "Prevent editing",
      FORM_FILLING: "Prevent form filling",
      COMMENTING: "Prevent commenting",
    },
    ENCRYPTION_TITLE: "Encryption Level",
    ENCRYPT_128: "Standard (128-bit)",
    ENCRYPT_128_DESC: "Compatible with all PDF readers",
    ENCRYPT_256: "Strong (256-bit AES)",
    ENCRYPT_256_DESC: "Maximum security",
    PASSWORD_STRENGTH: {
      WEAK: "Weak",
      FAIR: "Fair",
      GOOD: "Good",
      STRONG: "Strong",
      VERY_STRONG: "Very Strong",
    },
    PASSWORD_TIPS: [
      "At least 8 characters",
      "Contains numbers",
      "Contains special characters",
      "Contains uppercase letters",
    ],
    SECURITY_FEATURES: [
      "256-bit AES encryption",
      "Processed locally - never uploaded",
      "Bank-level security",
    ],
    MONETIZATION_TITLE: "✅ PDF Protected Successfully!",
    MONETIZATION_SUBTITLE: "Unlock Advanced Protection",
    MONETIZATION_TEXT: "Your PDF is now secured with 128-bit encryption.",
    MONETIZATION_BENEFITS: [
      "256-bit military-grade encryption",
      "Permission controls (prevent copying/printing)",
      "Separate owner password",
      "Batch protect multiple PDFs",
    ],
    MONETIZATION_CTA: "Go Pro - $9/month",
    MONETIZATION_SKIP: "Download Protected PDF",
    PRO_BADGE: "Pro",
    PRO_FEATURE_WARNING: "This feature is available for Pro users only.",
    TIPS: [
      "Use a strong password with letters, numbers, and symbols",
      "Pro users can set separate passwords for permissions",
      "Your password is never stored or transmitted",
      "256-bit encryption provides maximum security",
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
