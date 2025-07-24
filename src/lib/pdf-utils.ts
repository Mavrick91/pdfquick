/**
 * PDF-related utility helpers
 * --------------------------------------------------------------------
 * formatFileSize  – Convert a byte count into a human-readable string.
 */

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

/**
 * Trigger a browser download for the supplied Blob.
 * Keeps identical behaviour to previous per-feature implementations.
 */
export const downloadFile = (blob: Blob, fileName: string): void => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

/**
 * Download an array of files one by one.  Accepts the same tuple shape used
 * in various feature utilities and supports an optional delay between each
 * download to avoid throttling.
 */
export const downloadMultipleFiles = async (
  files: Array<{ blob: Blob; name: string }>,
  delayMs = 100
): Promise<void> => {
  for (const file of files) {
    downloadFile(file.blob, file.name);
    // small pause so the browser has time to process each download

    await new Promise((resolve) => setTimeout(resolve, delayMs));
  }
};
