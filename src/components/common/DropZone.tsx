"use client";

import { Box, Text, VStack, Icon as ChakraIcon } from "@chakra-ui/react";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { FaFilePdf, FaUpload } from "react-icons/fa";

import { UI_TEXT } from "@/lib/constants";

type DropZoneProps = {
  onFiles: (files: File[]) => void;
  /**
   * Whether to accept multiple files (default: true)
   */
  multiple?: boolean;
  /**
   * Maximum file size in bytes (optional)
   */
  maxSize?: number;
  /**
   * Custom text to display in the drop zone
   */
  text?: string;
  /**
   * Custom hint text to display below the main text
   */
  hint?: string;
};

export const DropZone = ({ onFiles, multiple = true, maxSize, text, hint }: DropZoneProps) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        onFiles(multiple ? acceptedFiles : [acceptedFiles[0]]);
      }
    },
    [onFiles, multiple]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
    },
    multiple,
    maxFiles: multiple ? undefined : 1,
    maxSize,
  });

  return (
    <Box
      {...getRootProps()}
      bg={isDragActive ? "red.50" : "pdf.lightGray"}
      border="2px dashed"
      borderColor={isDragActive ? "pdf.red" : "pdf.borderGray"}
      borderRadius="12px"
      p={{ base: 8, md: 10 }}
      textAlign="center"
      cursor="pointer"
      transition="all 0.3s"
      minH={{ base: "40vh", md: "250px" }}
      display="flex"
      alignItems="center"
      justifyContent="center"
      _hover={{
        borderColor: "pdf.red",
        bg: "red.50",
        transform: "translateY(-2px)",
        boxShadow: "sm",
      }}
    >
      <input {...getInputProps()} />
      <VStack gap={4} pointerEvents="none">
        <ChakraIcon
          as={isDragActive ? FaUpload : FaFilePdf}
          boxSize={{ base: "60px", md: "80px" }}
          color={isDragActive ? "pdf.red" : "pdf.mediumGray"}
        />
        <VStack gap={2}>
          <Text fontSize={{ base: "md", md: "lg" }} fontWeight="medium" color="pdf.darkGray">
            {isDragActive
              ? "Drop your PDF here"
              : text || (multiple ? UI_TEXT.COMMON.DROP_ZONE_TEXT : UI_TEXT.SPLIT.DROP_ZONE_TEXT)}
          </Text>
          <Text fontSize="sm" color="pdf.mediumGray">
            {hint || (multiple ? UI_TEXT.COMMON.DROP_ZONE_HINT : UI_TEXT.SPLIT.DROP_ZONE_HINT)}
          </Text>
          {maxSize && (
            <Text fontSize="xs" color="pdf.mediumGray">
              Max file size: {Math.round(maxSize / (1024 * 1024))}MB
            </Text>
          )}
        </VStack>
      </VStack>
    </Box>
  );
};
