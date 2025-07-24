"use client";

import { Box, Image, Checkbox, AspectRatio, Skeleton } from "@chakra-ui/react";

type ThumbnailItemProps = {
  pageIndex: number;
  thumbnail?: string;
  isSelected: boolean;
  onToggle: (pageIndex: number) => void;
};

export const ThumbnailItem = ({
  pageIndex,
  thumbnail,
  isSelected,
  onToggle,
}: ThumbnailItemProps) => {
  const pageNumber = pageIndex + 1; // Display as 1-indexed

  return (
    <Box
      position="relative"
      borderRadius="8px"
      overflow="hidden"
      cursor="pointer"
      transition="all 0.2s"
      border="2px solid"
      borderColor={isSelected ? "pdf.red" : "pdf.borderGray"}
      bg={isSelected ? "red.50" : "white"}
      _hover={{
        transform: "scale(1.05)",
        boxShadow: "md",
      }}
      onClick={() => onToggle(pageIndex)}
    >
      {/* Checkbox overlay */}
      <Box
        position="absolute"
        top={{ base: "auto", md: 2 }}
        bottom={{ base: 2, md: "auto" }}
        left={2}
        zIndex={2}
        bg="white"
        borderRadius="4px"
        p={1}
      >
        <Checkbox.Root
          checked={isSelected}
          onCheckedChange={() => onToggle(pageIndex)}
          onClick={(e: React.MouseEvent) => e.stopPropagation()}
          size="lg"
          colorScheme="red"
        >
          <Checkbox.Control />
        </Checkbox.Root>
      </Box>

      {/* Page number */}
      <Box
        position="absolute"
        top={{ base: 2, md: "auto" }}
        bottom={{ base: "auto", md: 2 }}
        right={2}
        bg="black"
        color="white"
        px={2}
        py={1}
        borderRadius="4px"
        fontSize="xs"
        fontWeight="medium"
        zIndex={2}
      >
        {pageNumber}
      </Box>

      {/* Thumbnail image */}
      <AspectRatio ratio={8.5 / 11}>
        {thumbnail ? (
          <Image
            src={thumbnail}
            alt={`Page ${pageNumber}`}
            width="100%"
            height="100%"
            objectFit="contain"
            bg="gray.50"
          />
        ) : (
          <Skeleton width="100%" height="100%" />
        )}
      </AspectRatio>
    </Box>
  );
};
