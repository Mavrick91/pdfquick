"use client";

import { Card, VStack, Text, Box, HStack, Badge } from "@chakra-ui/react";

import { UI_TEXT } from "../constants";
import type { ImageFormat } from "../types";

type FormatSelectorProps = {
  format: ImageFormat;
  isPro: boolean;
  onFormatChange: (format: ImageFormat) => void;
};

const formats: { value: ImageFormat; label: string; requiresPro: boolean }[] = [
  { value: "jpg", label: UI_TEXT.FORMAT_JPG, requiresPro: false },
  { value: "png", label: UI_TEXT.FORMAT_PNG, requiresPro: true },
  { value: "webp", label: UI_TEXT.FORMAT_WEBP, requiresPro: true },
];

export const FormatSelector = ({ format, isPro, onFormatChange }: FormatSelectorProps) => {
  return (
    <Card.Root>
      <Card.Body>
        <VStack align="stretch" gap={4}>
          <Text fontWeight="semibold">{UI_TEXT.FORMAT_LABEL}</Text>
          <HStack gap={3}>
            {formats.map((fmt) => {
              const isSelected = format === fmt.value;
              const isDisabled = fmt.requiresPro && !isPro;

              return (
                <Box
                  key={fmt.value}
                  flex={1}
                  p={3}
                  borderWidth={2}
                  borderColor={isSelected ? "pdf.red" : "gray.200"}
                  borderRadius="md"
                  cursor={isDisabled ? "not-allowed" : "pointer"}
                  opacity={isDisabled ? 0.6 : 1}
                  bg={isSelected ? "red.50" : "white"}
                  transition="all 0.2s"
                  onClick={() => !isDisabled && onFormatChange(fmt.value)}
                  _hover={
                    !isDisabled
                      ? {
                          borderColor: "pdf.red",
                          bg: "red.50",
                        }
                      : {}
                  }
                >
                  <VStack gap={1}>
                    <Text fontWeight={isSelected ? "semibold" : "medium"}>{fmt.label}</Text>
                    {fmt.requiresPro && !isPro && (
                      <Badge colorScheme="purple" size="sm">
                        PRO
                      </Badge>
                    )}
                  </VStack>
                </Box>
              );
            })}
          </HStack>
        </VStack>
      </Card.Body>
    </Card.Root>
  );
};
