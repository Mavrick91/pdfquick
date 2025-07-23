"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { HStack, Icon, IconButton, Text, VStack, useBreakpointValue } from "@chakra-ui/react";
import { FaGripVertical, FaTimes, FaFilePdf } from "react-icons/fa";
import type { PdfFile } from "../types";
import { formatFileSize } from "../utils/pdf";

type FileItemProps = {
  file: PdfFile;
  onRemove: (id: string) => void;
};

export const FileItem = ({ file, onRemove }: FileItemProps) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: file.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <HStack
      ref={setNodeRef}
      style={style}
      p={4}
      bg="white"
      borderRadius="8px"
      border="1px solid"
      borderColor={isDragging ? "pdf.red" : "gray.200"}
      boxShadow={isDragging ? "lg" : "sm"}
      opacity={isDragging ? 0.5 : 1}
      gap={3}
      w="full"
      justify="space-between"
    >
      <HStack gap={3} flex={1}>
        {!isMobile && (
          <Icon as={FaGripVertical} color="gray.400" cursor="grab" {...attributes} {...listeners} />
        )}
        <Icon as={FaFilePdf} color="pdf.red" boxSize={5} />
        <VStack align="start" gap={0} flex={1}>
          <Text
            fontWeight="medium"
            color="pdf.darkGray"
            fontSize="sm"
            textOverflow="ellipsis"
            overflow="hidden"
            whiteSpace="nowrap"
          >
            {file.name}
          </Text>
          <Text color="pdf.mediumGray" fontSize="xs">
            {formatFileSize(file.size)}
          </Text>
        </VStack>
      </HStack>
      <IconButton
        aria-label="Remove file"
        size="sm"
        variant="ghost"
        color="gray.500"
        _hover={{ color: "red.500" }}
        onClick={() => onRemove(file.id)}
      >
        <FaTimes />
      </IconButton>
    </HStack>
  );
};
