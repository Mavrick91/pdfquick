"use client";

import { VStack, Box, Button, Progress, Icon, Text } from "@chakra-ui/react";
import { FaCompress, FaCheckCircle, FaDownload } from "react-icons/fa";
import type { CompressionLevel, CompressStatus } from "../types";
import { LevelSelector } from "./LevelSelector";
import { UI_TEXT } from "@/lib/constants";

type CompressToolbarProps = {
  level: CompressionLevel;
  onLevelChange: (level: CompressionLevel) => void;
  status: CompressStatus;
  batchProgress: number;
  fileCount: number;
  isPro: boolean;
  onCompress: () => void;
};

export const CompressToolbar = ({
  level,
  onLevelChange,
  status,
  batchProgress,
  fileCount,
  isPro,
  onCompress,
}: CompressToolbarProps) => {
  const canCompress = fileCount > 0 && status === "ready";
  const isProcessing = status === "processing";
  const isSuccess = status === "success";

  const getButtonText = () => {
    if (isProcessing) return UI_TEXT.COMPRESS.PROCESSING;
    if (isSuccess) return UI_TEXT.COMPRESS.BUTTON_SUCCESS;
    return UI_TEXT.COMPRESS.BUTTON_IDLE;
  };

  const getButtonIcon = () => {
    if (isSuccess) return FaCheckCircle;
    if (isProcessing) return FaCompress;
    return FaDownload;
  };

  return (
    <VStack gap={6} align="stretch">
      {/* Compression level selector */}
      <Box bg="white" p={6} borderRadius="12px" border="1px solid" borderColor="pdf.borderGray">
        <LevelSelector level={level} onChange={onLevelChange} isPro={isPro} />
      </Box>

      {/* Progress bar */}
      {isProcessing && (
        <Box>
          <Text fontSize="sm" color="pdf.mediumGray" mb={2}>
            {UI_TEXT.COMPRESS.BATCH_PROGRESS(batchProgress)}
          </Text>
          <Progress.Root value={batchProgress} colorScheme="red" size="sm">
            <Progress.Track>
              <Progress.Range />
            </Progress.Track>
          </Progress.Root>
        </Box>
      )}

      {/* Compress button */}
      <Button
        size="lg"
        colorScheme="red"
        disabled={!canCompress}
        loading={isProcessing}
        onClick={onCompress}
        bg={isSuccess ? "pdf.successGreen" : "pdf.red"}
        _hover={{
          bg: isSuccess ? "green.600" : "red.600",
        }}
      >
        <Icon as={getButtonIcon()} mr={2} />
        {getButtonText()}
      </Button>
    </VStack>
  );
};
