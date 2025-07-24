"use client";

import { VStack, Button, Progress, Icon, Box } from "@chakra-ui/react";
import { FaShieldAlt, FaCheckCircle, FaDownload } from "react-icons/fa";
import type { ProtectStatus } from "../types";
import { UI_TEXT } from "@/lib/constants";

type ProtectToolbarProps = {
  status: ProtectStatus;
  progress: number;
  canProtect: boolean;
  onProtect: () => void;
};

export const ProtectToolbar = ({
  status,
  progress,
  canProtect,
  onProtect,
}: ProtectToolbarProps) => {
  const isProcessing = status === "processing";
  const isSuccess = status === "success";

  const getButtonText = () => {
    if (isProcessing) return UI_TEXT.PROTECT.PROCESSING;
    if (isSuccess) return UI_TEXT.PROTECT.BUTTON_SUCCESS;
    return UI_TEXT.PROTECT.BUTTON_IDLE;
  };

  const getButtonIcon = () => {
    if (isSuccess) return FaCheckCircle;
    if (isProcessing) return FaShieldAlt;
    return FaDownload;
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

      {/* Protect button */}
      <Button
        size="lg"
        colorScheme="red"
        disabled={!canProtect}
        loading={isProcessing}
        onClick={onProtect}
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
