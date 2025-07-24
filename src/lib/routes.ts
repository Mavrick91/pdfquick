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
  blog: "/blog",
  api: "/api",
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

/**
 * Navigation items for the global header
 */
export const NAV_ITEMS = {
  tools: [
    { name: TOOL_NAMES.merge, href: ROUTES.tools.merge, icon: "merge" },
    { name: TOOL_NAMES.split, href: ROUTES.tools.split, icon: "split" },
    { name: TOOL_NAMES.compress, href: ROUTES.tools.compress, icon: "compress" },
    { name: TOOL_NAMES.protect, href: ROUTES.tools.protect, icon: "protect" },
    { name: TOOL_NAMES.pdfToImage, href: ROUTES.tools.pdfToImage, icon: "image" },
  ],
  marketing: [
    { name: "Home", href: ROUTES.home },
    { name: "Pricing", href: ROUTES.pricing },
    { name: "API", href: ROUTES.api },
    { name: "Blog", href: ROUTES.blog },
  ],
} as const;

/**
 * Get the current active tool from pathname
 */
export function getActiveToolFromPath(pathname: string): string | null {
  // Check if the pathname matches any of our tool routes
  const toolPaths = Object.values(ROUTES.tools) as string[];
  if (toolPaths.includes(pathname)) {
    return pathname.slice(1); // Remove leading slash
  }
  return null;
}

/**
 * Check if the current path is a tool page
 */
export function isToolPage(pathname: string): boolean {
  const toolPaths = Object.values(ROUTES.tools) as string[];
  return toolPaths.includes(pathname);
}
