"use client";

import { HStack, VStack, Text, IconButton, Icon, Progress, Box } from "@chakra-ui/react";
import { FaFilePdf, FaTimes, FaGripVertical } from "react-icons/fa";
import type { PdfFile } from "../types";
import { formatFileSize } from "../utils/pdf";
import { UI_TEXT } from "@/lib/constants";

type FileItemProps = {
  file: PdfFile;
  onRemove: (id: string) => void;
  isDragging?: boolean;
  dragHandleProps?: React.HTMLAttributes<HTMLDivElement>;
};

export const FileItem = ({ file, onRemove, isDragging, dragHandleProps }: FileItemProps) => {
  const showProgress = file.progress > 0 && file.progress < 100;
  const isComplete = file.result !== undefined;

  return (
    <HStack
      bg="white"
      border="2px solid"
      borderColor={isDragging ? "pdf.red" : "pdf.borderGray"}
      borderRadius="8px"
      p={4}
      gap={3}
      opacity={isDragging ? 0.5 : 1}
      transition="all 0.2s"
    >
      {/* Drag handle */}
      <Box {...dragHandleProps} cursor="grab" display={{ base: "none", md: "block" }}>
        <Icon as={FaGripVertical} color="gray.400" />
      </Box>

      {/* File icon */}
      <Icon as={FaFilePdf} boxSize="32px" color="pdf.red" />

      {/* File info */}
      <VStack align="start" flex={1} gap={1}>
        <Text
          fontWeight="medium"
          fontSize="sm"
          color="pdf.darkGray"
          overflow="hidden"
          textOverflow="ellipsis"
          whiteSpace="nowrap"
        >
          {file.name}
        </Text>

        {/* Size info */}
        <HStack gap={2} fontSize="xs">
          <Text color="pdf.mediumGray">
            {UI_TEXT.COMPRESS.FILE_SIZE_BEFORE(formatFileSize(file.size))}
          </Text>
          {isComplete && file.result && (
            <Text color="green.600" fontWeight="medium">
              → {formatFileSize(file.result.size)} ({file.result.savedPercent}% smaller)
            </Text>
          )}
        </HStack>

        {/* Error message */}
        {file.error && (
          <Text fontSize="xs" color="red.500">
            {file.error}
          </Text>
        )}
      </VStack>

      {/* Progress bar */}
      {showProgress && (
        <Box width="120px">
          <Progress.Root value={file.progress} size="xs" colorScheme="red">
            <Progress.Track>
              <Progress.Range />
            </Progress.Track>
          </Progress.Root>
        </Box>
      )}

      {/* Remove button */}
      <IconButton
        aria-label="Remove file"
        size="sm"
        variant="ghost"
        color="pdf.mediumGray"
        _hover={{ color: "pdf.red", bg: "red.50" }}
        onClick={() => onRemove(file.id)}
      >
        <FaTimes />
      </IconButton>
    </HStack>
  );
};
