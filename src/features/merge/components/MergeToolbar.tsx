"use client";

import { Button, HStack, Progress, Text, VStack } from "@chakra-ui/react";
import { FaDownload } from "react-icons/fa";
import type { PdfFile, MergeStatus } from "../types";
import { UI_TEXT } from "@/lib/constants";

type MergeToolbarProps = {
  files: PdfFile[];
  status: MergeStatus;
  progress: number;
  onMerge: () => void;
};

export const MergeToolbar = ({ files, status, progress, onMerge }: MergeToolbarProps) => {
  const fileCount = files.length;
  const isDisabled = fileCount < 2 || status === "processing";
  const isLoading = status === "processing";

  return (
    <VStack gap={4} w="full">
      {status === "processing" && (
        <VStack gap={2} w="full">
          <Text fontSize="sm" color="pdf.mediumGray">
            {UI_TEXT.MERGE.PROCESSING(fileCount)}
          </Text>
          <Progress.Root value={progress} size="sm" w="full" colorPalette="red">
            <Progress.Track borderRadius="full">
              <Progress.Range />
            </Progress.Track>
          </Progress.Root>
        </VStack>
      )}

      <HStack justify="space-between" w="full">
        <Text fontSize="sm" color="pdf.mediumGray">
          {UI_TEXT.MERGE.FILE_COUNT(fileCount)}
        </Text>

        <Button
          colorScheme="red"
          disabled={isDisabled}
          loading={isLoading}
          onClick={onMerge}
          bg="pdf.red"
          _hover={{ bg: "red.600" }}
          size={{ base: "md", md: "lg" }}
          px={8}
        >
          {status === "success" && <FaDownload />}
          {status === "success" ? UI_TEXT.MERGE.BUTTON_SUCCESS : UI_TEXT.MERGE.BUTTON_IDLE}
        </Button>
      </HStack>

      {fileCount === 1 && (
        <Text fontSize="xs" color="orange.500" textAlign="center">
          {UI_TEXT.MERGE.MIN_FILES_WARNING}
        </Text>
      )}
    </VStack>
  );
};
