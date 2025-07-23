"use client";

import { HStack, VStack, Text, IconButton, Icon } from "@chakra-ui/react";
import { FaFilePdf, FaTimes } from "react-icons/fa";
import type { PdfContext } from "../types";
import { UI_TEXT } from "@/lib/constants";

type FileInfoProps = {
  pdf: PdfContext;
  onRemove: () => void;
};

export const FileInfo = ({ pdf, onRemove }: FileInfoProps) => {
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <HStack
      bg="white"
      border="1px solid"
      borderColor="pdf.borderGray"
      p={4}
      borderRadius="8px"
      justifyContent="space-between"
    >
      <HStack gap={3}>
        <Icon as={FaFilePdf} boxSize="40px" color="pdf.red" />
        <VStack align="start" gap={0}>
          <Text fontWeight="medium" color="pdf.darkGray" fontSize="sm">
            {pdf.name}
          </Text>
          <Text fontSize="xs" color="pdf.mediumGray">
            {formatFileSize(pdf.size)} • {UI_TEXT.SPLIT.PAGE_COUNT(pdf.totalPages)}
          </Text>
        </VStack>
      </HStack>
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
    </HStack>
  );
};
