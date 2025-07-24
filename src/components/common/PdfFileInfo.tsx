"use client";

import { HStack, VStack, Text, IconButton, Icon } from "@chakra-ui/react";
import { FaFilePdf, FaTimes } from "react-icons/fa";

import { formatFileSize } from "@/lib/pdf-utils";
import type { BasePdfContext } from "@/types/pdf";

type PdfFileInfoProps = {
  pdf: BasePdfContext;
  onRemove?: () => void;
  /**
   * Set to false to hide the remove icon (defaults to true)
   */
  showRemoveButton?: boolean;
};

/**
 * Simple representation of an uploaded PDF with optional page count
 * and a remove button.  Consolidates previous duplicated implementations.
 */
export const PdfFileInfo = ({ pdf, onRemove, showRemoveButton = true }: PdfFileInfoProps) => {
  return (
    <HStack
      bg="white"
      border="1px solid"
      borderColor="pdf.borderGray"
      p={4}
      borderRadius="8px"
      justify="space-between"
    >
      <HStack gap={3}>
        <Icon as={FaFilePdf} boxSize={8} color="pdf.red" />
        <VStack align="start" gap={0}>
          <Text fontWeight="medium" fontSize="sm" color="pdf.darkGray">
            {pdf.name}
          </Text>
          <Text fontSize="xs" color="pdf.mediumGray">
            {formatFileSize(pdf.size)}
            {pdf.totalPages !== undefined && ` • ${pdf.totalPages} pages`}
          </Text>
        </VStack>
      </HStack>

      {showRemoveButton && onRemove && (
        <IconButton
          aria-label="Remove file"
          size="sm"
          variant="ghost"
          color="pdf.mediumGray"
          _hover={{ color: "pdf.red", bg: "red.50" }}
          onClick={onRemove}
        >
          <FaTimes />
        </IconButton>
      )}
    </HStack>
  );
};
