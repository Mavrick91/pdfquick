import { FILE_CONSTRAINTS, ERROR_MESSAGES } from "./constants";

export type ValidationResult = {
  valid: boolean;
  error?: string;
};

export type FileValidationResult = ValidationResult & {
  file?: File;
};

export const validatePdfFile = (file: File): FileValidationResult => {
  // Check file type
  if (!FILE_CONSTRAINTS.ACCEPTED_TYPES.includes(file.type as "application/pdf")) {
    return {
      valid: false,
      error: ERROR_MESSAGES.INVALID_FILE_TYPE(file.name),
    };
  }

  // Check file size
  if (file.size > FILE_CONSTRAINTS.MAX_FILE_SIZE) {
    return {
      valid: false,
      error: ERROR_MESSAGES.FILE_TOO_LARGE(file.name),
    };
  }

  return {
    valid: true,
    file,
  };
};

export const validatePdfFiles = (
  files: File[]
): {
  validFiles: File[];
  errors: Array<{ fileName: string; error: string }>;
} => {
  const validFiles: File[] = [];
  const errors: Array<{ fileName: string; error: string }> = [];

  files.forEach((file) => {
    const result = validatePdfFile(file);
    if (result.valid && result.file) {
      validFiles.push(result.file);
    } else if (result.error) {
      errors.push({ fileName: file.name, error: result.error });
    }
  });

  return { validFiles, errors };
};

export const validateMergeOperation = (fileCount: number): ValidationResult => {
  if (fileCount < FILE_CONSTRAINTS.MIN_FILES_FOR_MERGE) {
    return {
      valid: false,
      error: ERROR_MESSAGES.MIN_FILES_REQUIRED,
    };
  }

  if (fileCount > FILE_CONSTRAINTS.MAX_FILES_FOR_MERGE) {
    return {
      valid: false,
      error: ERROR_MESSAGES.MAX_FILES_EXCEEDED,
    };
  }

  return { valid: true };
};

export const hasValidExtension = (fileName: string, extensions: string[]): boolean => {
  const lowerName = fileName.toLowerCase();
  return extensions.some((ext) => lowerName.endsWith(ext.toLowerCase()));
};

export const getFileExtension = (fileName: string): string => {
  const parts = fileName.split(".");
  return parts.length > 1 ? parts[parts.length - 1].toLowerCase() : "";
};
