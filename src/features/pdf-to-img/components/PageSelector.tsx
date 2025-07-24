"use client";

import {
  Card,
  VStack,
  Text,
  HStack,
  Button,
  Input,
  SimpleGrid,
  Box,
  Progress,
  Image,
  Skeleton,
  Checkbox,
} from "@chakra-ui/react";
import { useState } from "react";

import { UI_TEXT } from "../constants";
import type { PdfContext } from "../types";

type PageSelectorProps = {
  pdfCtx: PdfContext;
  selectedPages: Set<number>;
  thumbnails: Map<number, string>;
  thumbsLoading: boolean;
  progressPerPage: Record<number, number>;
  onSelectPage: (idx: number) => void;
  onSelectAll: () => void;
  onClearSelection: () => void;
  onRangeInput: (range: string) => void;
};

export const PageSelector = ({
  pdfCtx,
  selectedPages,
  thumbnails,
  thumbsLoading,
  progressPerPage,
  onSelectPage,
  onSelectAll,
  onClearSelection,
  onRangeInput,
}: PageSelectorProps) => {
  const [rangeInput, setRangeInput] = useState("");

  const handleRangeSubmit = () => {
    if (rangeInput.trim()) {
      onRangeInput(rangeInput);
      setRangeInput("");
    }
  };

  // Determine grid columns based on total pages
  const getColumns = () => {
    const pages = pdfCtx.totalPages;
    if (pages <= 4) return { base: 2, sm: 2, md: 4 };
    if (pages <= 6) return { base: 3, sm: 3, md: 6 };
    if (pages <= 12) return { base: 3, sm: 4, md: 6 };
    if (pages <= 20) return { base: 4, sm: 5, md: 8 };
    return { base: 5, sm: 6, md: 10, lg: 12 };
  };

  return (
    <Card.Root>
      <Card.Body>
        <VStack align="stretch" gap={4}>
          <HStack justify="space-between">
            <Text fontWeight="semibold">{UI_TEXT.PAGES_LABEL}</Text>
            <HStack>
              <Button size="sm" variant="outline" onClick={onSelectAll}>
                {UI_TEXT.SELECT_ALL}
              </Button>
              <Button size="sm" variant="outline" onClick={onClearSelection}>
                {UI_TEXT.SELECT_NONE}
              </Button>
            </HStack>
          </HStack>

          <HStack>
            <Input
              placeholder={UI_TEXT.RANGE_PLACEHOLDER}
              value={rangeInput}
              onChange={(e) => setRangeInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleRangeSubmit()}
            />
            <Button onClick={handleRangeSubmit}>Apply</Button>
          </HStack>

          <SimpleGrid columns={getColumns()} gap={3}>
            {Array.from({ length: pdfCtx.totalPages }, (_, idx) => {
              const isSelected = selectedPages.has(idx);
              const progress = progressPerPage[idx] || 0;
              const thumbnail = thumbnails.get(idx);

              return (
                <Box
                  key={idx}
                  position="relative"
                  borderWidth={2}
                  borderColor={isSelected ? "pdf.red" : "gray.200"}
                  borderRadius="md"
                  overflow="hidden"
                  cursor="pointer"
                  transition="all 0.2s"
                  onClick={() => onSelectPage(idx)}
                  _hover={{ borderColor: "pdf.red" }}
                >
                  {thumbsLoading || !thumbnail ? (
                    <Skeleton aspectRatio={210 / 297} />
                  ) : (
                    <Image src={thumbnail} alt={`Page ${idx + 1}`} aspectRatio={210 / 297} />
                  )}

                  {/* Page number */}
                  <Box
                    position="absolute"
                    bottom={1}
                    right={1}
                    bg="blackAlpha.700"
                    color="white"
                    px={2}
                    py={0.5}
                    borderRadius="md"
                    fontSize="xs"
                  >
                    {idx + 1}
                  </Box>

                  {/* Selection checkbox */}
                  <Box
                    position="absolute"
                    top={1}
                    left={1}
                    bg="whiteAlpha.900"
                    borderRadius="md"
                    p={1}
                  >
                    <Checkbox.Root checked={isSelected} size="sm">
                      <Checkbox.Control />
                    </Checkbox.Root>
                  </Box>

                  {/* Progress overlay */}
                  {progress > 0 && (
                    <Box
                      position="absolute"
                      bottom={0}
                      left={0}
                      right={0}
                      p={2}
                      bg="blackAlpha.700"
                    >
                      <Progress.Root value={progress} size="xs" colorScheme="green">
                        <Progress.Track>
                          <Progress.Range />
                        </Progress.Track>
                      </Progress.Root>
                    </Box>
                  )}
                </Box>
              );
            })}
          </SimpleGrid>

          <Text fontSize="sm" color="pdf.mediumGray" textAlign="center">
            {selectedPages.size} of {pdfCtx.totalPages} pages selected
          </Text>
        </VStack>
      </Card.Body>
    </Card.Root>
  );
};
