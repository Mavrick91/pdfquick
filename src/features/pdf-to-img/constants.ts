export const LIMITS = {
  FREE_MAX_PAGES: 5,
  FREE_MAX_DPI: 150,
  FREE_FORMAT: "jpg" as const,
  MAX_CANVAS_HEIGHT: 32768, // Browser limit
  THUMB_DPI: 30,
};

export const UI_TEXT = {
  TITLE: "PDF to Image Converter",
  DESCRIPTION: "Convert PDF pages to JPG, PNG, or WebP images",

  FORMAT_LABEL: "Output Format",
  FORMAT_JPG: "JPG",
  FORMAT_JPG_FREE: "JPG (Free)",
  FORMAT_PNG: "PNG",
  FORMAT_WEBP: "WebP",

  DPI_LABEL: "Image Quality (DPI)",
  DPI_72: "72 DPI - Web",
  DPI_150: "150 DPI - Standard",
  DPI_300: "300 DPI - High Quality",
  DPI_600: "600 DPI - Print Quality",

  QUALITY_LABEL: "JPG Quality",
  QUALITY_SUFFIX: "%",

  OUTPUT_LABEL: "Output Options",
  OUTPUT_SEPARATE: "One image per page",
  OUTPUT_COMBINED: "Combined long image",
  OUTPUT_ZIP: "Download as ZIP",

  PAGES_LABEL: "Select Pages to Convert",
  SELECT_ALL: "Select All",
  SELECT_NONE: "Clear Selection",
  RANGE_PLACEHOLDER: "e.g. 1-3, 5, 7-10",

  BUTTON_IDLE: "Convert to Images",
  BUTTON_PROCESSING: "Converting...",
  BUTTON_SUCCESS: "Converted! Click to Download Again",

  PRO_FEATURE_WARNING: "This feature requires a Pro subscription",
  FREE_LIMIT_WARNING: "Free users can convert up to 5 pages",
  HIGH_DPI_WARNING: "High resolution requires Pro subscription",

  ERROR_NO_PAGES: "Please select at least one page to convert",
  ERROR_CONVERSION: "Failed to convert PDF pages",
  SUCCESS_MESSAGE: "PDF converted successfully!",

  MONETIZATION_TITLE: "✅ Images Converted Successfully!",
  MONETIZATION_SUBTITLE: "Unlock Pro Image Conversion",
  MONETIZATION_BENEFITS: [
    "Convert unlimited pages",
    "PNG & WebP formats",
    "High resolution (300+ DPI)",
    "Download as ZIP",
    "Combined long image",
    "Priority processing",
  ],
  MONETIZATION_CTA: "Upgrade to Pro",
  MONETIZATION_SKIP: "Continue with Free",

  LIMITS: {
    PAGES: `Free: ${LIMITS.FREE_MAX_PAGES} pages per conversion`,
    DPI: `Free: up to ${LIMITS.FREE_MAX_DPI} DPI`,
    FORMAT: "Only JPG format in Free plan",
    OUTPUT: "Combined & ZIP are Pro features",
  },
};

export const ANALYTICS_EVENTS = {
  P2I_PAGE_VIEWED: "pdf_to_image_page_viewed",
  P2I_FILES_UPLOADED: "pdf_to_image_files_uploaded",
  P2I_CONVERT_STARTED: "pdf_to_image_convert_started",
  P2I_CONVERT_COMPLETED: "pdf_to_image_convert_completed",
  P2I_CONVERT_FAILED: "pdf_to_image_convert_failed",
  P2I_FORMAT_CHANGED: "pdf_to_image_format_changed",
  P2I_DPI_CHANGED: "pdf_to_image_dpi_changed",
  P2I_OUTPUT_CHANGED: "pdf_to_image_output_changed",
};
