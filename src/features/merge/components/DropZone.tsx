"use client";

import { useDropzone } from "react-dropzone";
import { Box, Text, VStack, Icon } from "@chakra-ui/react";
import { FaFilePdf } from "react-icons/fa";
import { UI_TEXT } from "@/lib/constants";

type DropZoneProps = {
  onFiles: (files: File[]) => void;
};

export const DropZone = ({ onFiles }: DropZoneProps) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "application/pdf": [".pdf"] },
    onDrop: onFiles,
    multiple: true,
  });

  return (
    <Box
      {...getRootProps()}
      border="2px dashed"
      borderColor={isDragActive ? "pdf.red" : "pdf.borderGray"}
      borderRadius="12px"
      p={10}
      bg={isDragActive ? "pdf.lightGray" : "white"}
      cursor="pointer"
      w="full"
      minH={{ base: "40vh", md: "250px" }}
      display="flex"
      alignItems="center"
      justifyContent="center"
      _hover={{ bg: "pdf.lightGray" }}
      transition="all 0.2s"
    >
      <input {...getInputProps()} />
      <VStack gap={4} pointerEvents="none">
        <Icon as={FaFilePdf} color="pdf.red" boxSize={10} />
        <Text
          color="pdf.darkGray"
          fontWeight="medium"
          textAlign="center"
          fontSize={{ base: "md", md: "lg" }}
        >
          {UI_TEXT.COMMON.DROP_ZONE_TEXT}
        </Text>
        <Text color="pdf.mediumGray" fontSize="sm" textAlign="center">
          {UI_TEXT.COMMON.DROP_ZONE_HINT}
        </Text>
      </VStack>
    </Box>
  );
};
