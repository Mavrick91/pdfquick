"use client";

import { VStack, Box, Text, Badge, HStack } from "@chakra-ui/react";

import { ProLockIcon } from "@/components/common";
import { UI_TEXT } from "@/lib/constants";

import type { CompressionLevel } from "../types";

type LevelSelectorProps = {
  level: CompressionLevel;
  onChange: (level: CompressionLevel) => void;
  isPro: boolean;
};

type LevelOption = {
  value: CompressionLevel;
  title: string;
  description: string;
  isPro: boolean;
};

export const LevelSelector = ({ level, onChange, isPro }: LevelSelectorProps) => {
  const options: LevelOption[] = [
    {
      value: "balanced",
      title: UI_TEXT.COMPRESS.LEVEL_BALANCED,
      description: UI_TEXT.COMPRESS.LEVEL_BALANCED_DESC,
      isPro: false,
    },
    {
      value: "high",
      title: UI_TEXT.COMPRESS.LEVEL_HIGH,
      description: UI_TEXT.COMPRESS.LEVEL_HIGH_DESC,
      isPro: true,
    },
    {
      value: "maximum",
      title: UI_TEXT.COMPRESS.LEVEL_MAXIMUM,
      description: UI_TEXT.COMPRESS.LEVEL_MAXIMUM_DESC,
      isPro: true,
    },
  ];

  return (
    <VStack align="stretch" gap={3}>
      <Text fontWeight="semibold" color="pdf.darkGray">
        Compression Level
      </Text>

      {options.map((option) => (
        <Box
          key={option.value}
          p={4}
          border="2px solid"
          borderColor={level === option.value ? "pdf.red" : "gray.200"}
          borderRadius="md"
          cursor={option.isPro && !isPro ? "not-allowed" : "pointer"}
          bg={level === option.value ? "red.50" : "white"}
          opacity={option.isPro && !isPro ? 0.6 : 1}
          onClick={() => {
            if (!option.isPro || isPro) {
              onChange(option.value);
            }
          }}
          _hover={
            !option.isPro || isPro
              ? { borderColor: "pdf.red", bg: level === option.value ? "red.50" : "gray.50" }
              : {}
          }
        >
          <HStack justifyContent="space-between" mb={1}>
            <HStack>
              <Text fontWeight="medium" color="pdf.darkGray">
                {option.title}
              </Text>
              {option.isPro && !isPro && <ProLockIcon />}
            </HStack>
            {option.isPro && (
              <Badge colorScheme="red" size="sm">
                {UI_TEXT.COMPRESS.PRO_BADGE}
              </Badge>
            )}
          </HStack>
          <Text fontSize="sm" color="pdf.mediumGray">
            {option.description}
          </Text>
        </Box>
      ))}
    </VStack>
  );
};
