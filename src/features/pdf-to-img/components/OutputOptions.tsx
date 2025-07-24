"use client";

import { Card, VStack, Text, HStack, Badge, RadioGroup, Checkbox } from "@chakra-ui/react";

import { UI_TEXT } from "../constants";
import type { OutputMode } from "../types";

type OutputOptionsProps = {
  outputMode: OutputMode;
  downloadAsZip: boolean;
  isPro: boolean;
  selectedPagesCount: number;
  onOutputChange: (mode: OutputMode) => void;
  onZipToggle: (checked: boolean) => void;
};

export const OutputOptions = ({
  outputMode,
  downloadAsZip,
  isPro,
  selectedPagesCount,
  onOutputChange,
  onZipToggle,
}: OutputOptionsProps) => {
  const shouldDisableZip = !isPro || selectedPagesCount <= 1;

  return (
    <Card.Root>
      <Card.Body>
        <VStack align="stretch" gap={4}>
          <Text fontWeight="semibold">{UI_TEXT.OUTPUT_LABEL}</Text>

          <RadioGroup.Root
            value={outputMode}
            onValueChange={(details) => onOutputChange(details.value as OutputMode)}
          >
            <VStack align="stretch" gap={2}>
              <RadioGroup.Item value="separate">
                <RadioGroup.ItemControl />
                <RadioGroup.ItemText>{UI_TEXT.OUTPUT_SEPARATE}</RadioGroup.ItemText>
              </RadioGroup.Item>
              <HStack justify="space-between">
                <RadioGroup.Item value="combined" disabled={!isPro}>
                  <RadioGroup.ItemControl />
                  <RadioGroup.ItemText>{UI_TEXT.OUTPUT_COMBINED}</RadioGroup.ItemText>
                </RadioGroup.Item>
                {!isPro && (
                  <Badge colorScheme="purple" size="sm">
                    PRO
                  </Badge>
                )}
              </HStack>
            </VStack>
          </RadioGroup.Root>

          {selectedPagesCount > 1 && (
            <HStack justify="space-between" mt={2}>
              <Checkbox.Root
                checked={downloadAsZip}
                onCheckedChange={(details) => onZipToggle(!!details.checked)}
                disabled={shouldDisableZip}
              >
                <Checkbox.Control />
                <Checkbox.Label>{UI_TEXT.OUTPUT_ZIP}</Checkbox.Label>
              </Checkbox.Root>
              {!isPro && (
                <Badge colorScheme="purple" size="sm">
                  PRO
                </Badge>
              )}
            </HStack>
          )}
        </VStack>
      </Card.Body>
    </Card.Root>
  );
};
