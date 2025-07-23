"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Box, Text, VStack, Icon } from "@chakra-ui/react";
import { FaFilePdf } from "react-icons/fa";
import { UI_TEXT, FILE_CONSTRAINTS } from "@/lib/constants";

type DropZoneSingleProps = {
  onFile: (files: File[]) => void;
};

export const DropZoneSingle = ({ onFile }: DropZoneSingleProps) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        onFile([acceptedFiles[0]]); // Only take the first file
      }
    },
    [onFile]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
    },
    maxFiles: 1,
    maxSize: FILE_CONSTRAINTS.MAX_FILE_SIZE,
    multiple: false,
  });

  return (
    <Box
      {...getRootProps()}
      bg="white"
      border="2px dashed"
      borderColor={isDragActive ? "pdf.red" : "pdf.borderGray"}
      borderRadius="12px"
      p={{ base: 8, md: 12 }}
      textAlign="center"
      cursor="pointer"
      transition="all 0.3s"
      _hover={{
        borderColor: "pdf.red",
        transform: "translateY(-2px)",
        boxShadow: "sm",
      }}
    >
      <input {...getInputProps()} />
      <VStack gap={4}>
        <Icon
          as={FaFilePdf}
          boxSize={{ base: "60px", md: "80px" }}
          color={isDragActive ? "pdf.red" : "pdf.mediumGray"}
        />
        <Text fontSize="lg" fontWeight="medium" color="pdf.darkGray">
          {isDragActive ? "Drop your PDF here" : UI_TEXT.SPLIT.DROP_ZONE_TEXT}
        </Text>
        <Text fontSize="sm" color="pdf.mediumGray">
          {UI_TEXT.SPLIT.DROP_ZONE_HINT}
        </Text>
      </VStack>
    </Box>
  );
};
