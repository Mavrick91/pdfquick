"use client";

import { VStack, Button, Progress, Icon, Box } from "@chakra-ui/react";
import { FaImage, FaCheckCircle, FaDownload } from "react-icons/fa";

import { UI_TEXT } from "../constants";
import type { ConvertStatus } from "../types";

type ConvertToolbarProps = {
  status: ConvertStatus;
  progress: number;
  canConvert: boolean;
  onConvert: () => void;
  onDownloadAgain: () => void;
};

export const ConvertToolbar = ({
  status,
  progress,
  canConvert,
  onConvert,
  onDownloadAgain,
}: ConvertToolbarProps) => {
  const isProcessing = status === "processing";
  const isSuccess = status === "success";

  const getButtonText = () => {
    if (isProcessing) return UI_TEXT.BUTTON_PROCESSING;
    if (isSuccess) return UI_TEXT.BUTTON_SUCCESS;
    return UI_TEXT.BUTTON_IDLE;
  };

  const getButtonIcon = () => {
    if (isSuccess) return FaCheckCircle;
    if (isProcessing) return FaImage;
    return FaDownload;
  };

  const handleClick = () => {
    if (isSuccess) {
      onDownloadAgain();
    } else {
      onConvert();
    }
  };

  return (
    <VStack gap={4} align="stretch">
      {/* Progress bar */}
      {isProcessing && (
        <Box>
          <Progress.Root value={progress} colorScheme="red" size="sm">
            <Progress.Track>
              <Progress.Range />
            </Progress.Track>
          </Progress.Root>
        </Box>
      )}

      {/* Convert button */}
      <Button
        size="lg"
        colorScheme="red"
        disabled={!canConvert && !isSuccess}
        loading={isProcessing}
        onClick={handleClick}
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
