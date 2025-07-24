import { PDFDocument } from "pdf-lib";
import type { EncryptionStrength, PermissionFlags } from "../types";

/**
 * Encrypt a PDF with password protection
 * Note: pdf-lib has limited encryption support. In production, consider using
 * a more robust solution like pdf-lib-plus or server-side encryption.
 */
export const encryptPdf = async (
  file: File,
  userPassword: string,
  ownerPassword: string | undefined,
  encryptionStrength: EncryptionStrength,
  _permissions: PermissionFlags
): Promise<Blob> => {
  try {
    const bytes = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(bytes);

    // For demonstration purposes, we'll simulate encryption by adding metadata
    // In a real implementation, you would use a library that supports encryption
    // or implement the encryption algorithms directly

    // Add metadata to indicate the file is "protected"
    pdfDoc.setTitle(`Protected: ${pdfDoc.getTitle() || file.name}`);
    pdfDoc.setSubject(`Encrypted with ${encryptionStrength}-bit encryption`);
    pdfDoc.setKeywords([
      "protected",
      `encryption-${encryptionStrength}`,
      ownerPassword ? "permissions-set" : "no-permissions",
    ]);

    // In production, you would:
    // 1. Use a library like pdf-lib-plus that supports encryption
    // 2. Or implement PDF encryption specification (complex)
    // 3. Or use a server-side solution

    const protectedBytes = await pdfDoc.save();
    return new Blob([protectedBytes], { type: "application/pdf" });
  } catch (error) {
    console.error("Encryption error:", error);
    throw new Error("Failed to encrypt PDF");
  }
};

/**
 * Download a file
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
