"use client";

import { SimpleGrid } from "@chakra-ui/react";

import type { SelectedPages } from "../types";

import { ThumbnailItem } from "./ThumbnailItem";

type ThumbnailGridProps = {
  totalPages: number;
  thumbnails: Map<number, string>;
  selected: SelectedPages;
  onToggle: (pageIndex: number) => void;
};

export const ThumbnailGrid = ({
  totalPages,
  thumbnails,
  selected,
  onToggle,
}: ThumbnailGridProps) => {
  // Dynamically adjust columns based on page count to avoid scrolling
  const getColumns = () => {
    if (totalPages <= 4) return { base: 2, sm: 2, md: 4 };
    if (totalPages <= 6) return { base: 3, sm: 3, md: 6 };
    if (totalPages <= 12) return { base: 3, sm: 4, md: 6 };
    if (totalPages <= 20) return { base: 4, sm: 5, md: 8 };
    return { base: 5, sm: 6, md: 10, lg: 12 };
  };

  return (
    <SimpleGrid columns={getColumns()} gap={{ base: 2, sm: 3, md: 4 }}>
      {Array.from({ length: totalPages }, (_, index) => (
        <ThumbnailItem
          key={index}
          pageIndex={index}
          thumbnail={thumbnails.get(index)}
          isSelected={selected.has(index)}
          onToggle={onToggle}
        />
      ))}
    </SimpleGrid>
  );
};
