"use client";

import { Card, VStack, Text, HStack, Badge, RadioGroup, Slider } from "@chakra-ui/react";

import { UI_TEXT } from "../constants";
import type { DpiOption, ImageFormat } from "../types";

type QualitySettingsProps = {
  format: ImageFormat;
  dpi: DpiOption;
  quality: number;
  isPro: boolean;
  onDpiChange: (dpi: DpiOption) => void;
  onQualityChange: (quality: number) => void;
};

const dpiOptions: { value: DpiOption; label: string; requiresPro: boolean }[] = [
  { value: 72, label: UI_TEXT.DPI_72, requiresPro: false },
  { value: 150, label: UI_TEXT.DPI_150, requiresPro: false },
  { value: 300, label: UI_TEXT.DPI_300, requiresPro: true },
  { value: 600, label: UI_TEXT.DPI_600, requiresPro: true },
];

export const QualitySettings = ({
  format,
  dpi,
  quality,
  isPro,
  onDpiChange,
  onQualityChange,
}: QualitySettingsProps) => {
  return (
    <Card.Root>
      <Card.Body>
        <VStack align="stretch" gap={4}>
          <Text fontWeight="semibold">{UI_TEXT.DPI_LABEL}</Text>
          <RadioGroup.Root
            value={dpi.toString()}
            onValueChange={(details) => onDpiChange(Number(details.value) as DpiOption)}
          >
            <VStack align="stretch" gap={2}>
              {dpiOptions.map((option) => {
                const isDisabled = option.requiresPro && !isPro;
                return (
                  <HStack key={option.value} justify="space-between">
                    <RadioGroup.Item value={option.value.toString()} disabled={isDisabled}>
                      <RadioGroup.ItemControl />
                      <RadioGroup.ItemText>{option.label}</RadioGroup.ItemText>
                    </RadioGroup.Item>
                    {option.requiresPro && !isPro && (
                      <Badge colorScheme="purple" size="sm">
                        PRO
                      </Badge>
                    )}
                  </HStack>
                );
              })}
            </VStack>
          </RadioGroup.Root>

          {format === "jpg" && (
            <>
              <Text fontWeight="semibold" mt={4}>
                {UI_TEXT.QUALITY_LABEL}
              </Text>
              <VStack align="stretch" gap={2}>
                <HStack justify="space-between">
                  <Text fontSize="sm" color="pdf.mediumGray">
                    Lower quality (smaller file)
                  </Text>
                  <Text fontSize="sm" color="pdf.mediumGray">
                    Higher quality (larger file)
                  </Text>
                </HStack>
                <Slider.Root
                  value={[quality]}
                  onValueChange={(details) => onQualityChange(details.value[0])}
                  min={10}
                  max={100}
                  step={10}
                >
                  <Slider.Track>
                    <Slider.Range />
                  </Slider.Track>
                  <Slider.Thumb index={0} />
                </Slider.Root>
                <Text textAlign="center" fontSize="lg" fontWeight="semibold">
                  {quality}
                  {UI_TEXT.QUALITY_SUFFIX}
                </Text>
              </VStack>
            </>
          )}
        </VStack>
      </Card.Body>
    </Card.Root>
  );
};
