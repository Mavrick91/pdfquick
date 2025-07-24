export const ROUTES = {
  home: "/",
  tools: {
    merge: "/merge",
    split: "/split",
    compress: "/compress",
    protect: "/protect",
    pdfToImage: "/pdf-to-image",
  },
  pricing: "/pricing",
  about: "/about",
} as const;

export const TOOL_NAMES = {
  merge: "Merge PDFs",
  split: "Split PDF",
  compress: "Compress PDF",
  protect: "Protect PDF",
  pdfToImage: "PDF to Image",
} as const;

export const TOOL_DESCRIPTIONS = {
  merge: "Combine multiple PDF files into one document",
  split: "Extract or split pages from PDF files",
  compress: "Reduce PDF file size without losing quality",
  protect: "Add password protection to PDF files",
  pdfToImage: "Convert PDF pages to images",
} as const;
