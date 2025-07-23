"use client";

import { VStack, HStack, Box, Button, Text, Input, Progress, Icon } from "@chakra-ui/react";
import { FaDownload, FaFileAlt, FaCheckCircle } from "react-icons/fa";
import type { SplitMode, SplitStatus } from "../types";
import { UI_TEXT } from "@/lib/constants";

type SplitToolbarProps = {
  mode: SplitMode;
  onModeChange: (mode: SplitMode) => void;
  selectedCount: number;
  totalPages: number;
  customRange: string;
  onRangeChange: (range: string) => void;
  status: SplitStatus;
  progress: number;
  onSplit: () => void;
  onSelectAll: () => void;
  onDeselectAll: () => void;
};

export const SplitToolbar = ({
  mode,
  onModeChange,
  selectedCount,
  totalPages,
  customRange,
  onRangeChange,
  status,
  progress,
  onSplit,
  onSelectAll,
  onDeselectAll,
}: SplitToolbarProps) => {
  const canSplit = (mode === "individual" || selectedCount > 0) && status === "ready";

  const getButtonText = () => {
    if (status === "processing") return UI_TEXT.SPLIT.PROCESSING;
    if (status === "success") return UI_TEXT.SPLIT.BUTTON_SUCCESS;

    switch (mode) {
      case "extract":
        return UI_TEXT.SPLIT.BUTTON_EXTRACT(selectedCount);
      case "individual":
        return UI_TEXT.SPLIT.BUTTON_INDIVIDUAL(totalPages);
      case "remove":
        return UI_TEXT.SPLIT.BUTTON_REMOVE(selectedCount);
      default:
        return UI_TEXT.SPLIT.BUTTON_IDLE;
    }
  };

  const getButtonIcon = () => {
    if (status === "success") return FaCheckCircle;
    if (status === "processing") return FaFileAlt;
    return FaDownload;
  };

  return (
    <VStack gap={6} align="stretch">
      {/* Mode selector */}
      <Box bg="white" p={6} borderRadius="12px" border="1px solid" borderColor="pdf.borderGray">
        <Text fontWeight="semibold" color="pdf.darkGray" mb={4}>
          Split Mode
        </Text>
        <VStack align="stretch" gap={3}>
          {/* Extract mode */}
          <Box
            p={4}
            border="2px solid"
            borderColor={mode === "extract" ? "pdf.red" : "gray.200"}
            borderRadius="md"
            cursor="pointer"
            bg={mode === "extract" ? "red.50" : "white"}
            onClick={() => onModeChange("extract")}
            _hover={{ borderColor: "pdf.red", bg: mode === "extract" ? "red.50" : "gray.50" }}
          >
            <VStack align="start" gap={0}>
              <Text fontWeight="medium">{UI_TEXT.SPLIT.MODE_EXTRACT}</Text>
              <Text fontSize="sm" color="pdf.mediumGray">
                {UI_TEXT.SPLIT.MODE_EXTRACT_DESC}
              </Text>
            </VStack>
          </Box>

          {/* Individual mode */}
          <Box
            p={4}
            border="2px solid"
            borderColor={mode === "individual" ? "pdf.red" : "gray.200"}
            borderRadius="md"
            cursor="pointer"
            bg={mode === "individual" ? "red.50" : "white"}
            onClick={() => onModeChange("individual")}
            _hover={{ borderColor: "pdf.red", bg: mode === "individual" ? "red.50" : "gray.50" }}
          >
            <VStack align="start" gap={0}>
              <Text fontWeight="medium">{UI_TEXT.SPLIT.MODE_INDIVIDUAL}</Text>
              <Text fontSize="sm" color="pdf.mediumGray">
                {UI_TEXT.SPLIT.MODE_INDIVIDUAL_DESC}
              </Text>
            </VStack>
          </Box>

          {/* Remove mode */}
          <Box
            p={4}
            border="2px solid"
            borderColor={mode === "remove" ? "pdf.red" : "gray.200"}
            borderRadius="md"
            cursor="pointer"
            bg={mode === "remove" ? "red.50" : "white"}
            onClick={() => onModeChange("remove")}
            _hover={{ borderColor: "pdf.red", bg: mode === "remove" ? "red.50" : "gray.50" }}
          >
            <VStack align="start" gap={0}>
              <Text fontWeight="medium">{UI_TEXT.SPLIT.MODE_REMOVE}</Text>
              <Text fontSize="sm" color="pdf.mediumGray">
                {UI_TEXT.SPLIT.MODE_REMOVE_DESC}
              </Text>
            </VStack>
          </Box>
        </VStack>
      </Box>

      {/* Selection controls */}
      <Box bg="white" p={4} borderRadius="8px" border="1px solid" borderColor="pdf.borderGray">
        <VStack gap={3}>
          <HStack justifyContent="space-between" width="100%">
            <Text fontSize="sm" color="pdf.darkGray">
              {UI_TEXT.SPLIT.SELECTED_COUNT(selectedCount, totalPages)}
            </Text>
            <HStack>
              <Button size="sm" variant="outline" onClick={onSelectAll}>
                {UI_TEXT.SPLIT.SELECT_ALL}
              </Button>
              <Button size="sm" variant="outline" onClick={onDeselectAll}>
                {UI_TEXT.SPLIT.DESELECT_ALL}
              </Button>
            </HStack>
          </HStack>

          {/* Custom range input */}
          <Box width="100%">
            <Text fontSize="sm" color="pdf.darkGray" mb={1}>
              {UI_TEXT.SPLIT.CUSTOM_RANGE}
            </Text>
            <Input
              size="sm"
              placeholder={UI_TEXT.SPLIT.CUSTOM_RANGE_PLACEHOLDER}
              value={customRange}
              onChange={(e) => onRangeChange(e.target.value)}
            />
            <Text fontSize="xs" color="pdf.mediumGray" mt={1}>
              {UI_TEXT.SPLIT.CUSTOM_RANGE_HINT}
            </Text>
          </Box>
        </VStack>
      </Box>

      {/* Progress bar */}
      {status === "processing" && (
        <Box>
          <Progress.Root value={progress} colorScheme="red" size="sm">
            <Progress.Track>
              <Progress.Range />
            </Progress.Track>
          </Progress.Root>
        </Box>
      )}

      {/* Split button */}
      <Button
        size="lg"
        colorScheme="red"
        disabled={!canSplit}
        loading={status === "processing"}
        onClick={onSplit}
        bg={status === "success" ? "pdf.successGreen" : "pdf.red"}
        _hover={{
          bg: status === "success" ? "green.600" : "red.600",
        }}
      >
        <Icon as={getButtonIcon()} mr={2} />
        {getButtonText()}
      </Button>
    </VStack>
  );
};
