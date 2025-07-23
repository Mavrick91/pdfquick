"use client";

import { useEffect } from "react";
import { Box, Container, VStack, Button, Icon } from "@chakra-ui/react";
import { FaHome } from "react-icons/fa";
import NextLink from "next/link";
import { DropZoneSingle } from "@/features/split/components/DropZoneSingle";
import { FileInfo } from "@/features/split/components/FileInfo";
import { ThumbnailGrid } from "@/features/split/components/ThumbnailGrid";
import { SplitToolbar } from "@/features/split/components/SplitToolbar";
import { useSplitController } from "@/features/split/hooks/useSplitController";
import { useAnalytics } from "@/features/merge/hooks/useAnalytics";
import { ANALYTICS_EVENTS, UI_TEXT } from "@/lib/constants";
import { PageHeader } from "@/components/ui/PageHeader";
import { SecurityBanner } from "@/components/ui/SecurityBanner";
import { TipsList } from "@/components/ui/TipsList";

const SplitPage = () => {
  const controller = useSplitController();
  const { pdf, thumbnails } = controller;
  const { track } = useAnalytics();

  useEffect(() => {
    track(ANALYTICS_EVENTS.SPLIT_PAGE_VIEWED);
  }, [track]);

  return (
    <Box minH="100vh" bg="gray.50">
      <Container maxW="container.xl" py={{ base: 6, md: 10 }}>
        <VStack gap={{ base: 6, md: 8 }} align="stretch">
          {/* Back Button */}
          <Box>
            <Button
              variant="ghost"
              size="sm"
              color="pdf.mediumGray"
              _hover={{ color: "pdf.darkGray" }}
              width="auto"
              onClick={() => {
                window.location.href = "/";
              }}
            >
              <Icon as={FaHome} mr={2} />
              Home
            </Button>
          </Box>

          {/* Header */}
          <PageHeader title={UI_TEXT.SPLIT.TITLE} description={UI_TEXT.SPLIT.DESCRIPTION} />

          {/* Main content */}
          {!pdf ? (
            <DropZoneSingle onFile={controller.handleUpload} />
          ) : (
            <>
              {/* File info */}
              <FileInfo pdf={pdf} onRemove={controller.reset} />

              {/* Thumbnail grid */}
              <ThumbnailGrid
                totalPages={pdf.totalPages}
                thumbnails={thumbnails}
                selected={controller.selected}
                onToggle={controller.togglePage}
              />

              {/* Split toolbar */}
              <SplitToolbar
                mode={controller.mode}
                onModeChange={controller.setMode}
                selectedCount={controller.selected.size}
                totalPages={pdf.totalPages}
                customRange={controller.customRange}
                onRangeChange={controller.applyCustomRange}
                status={controller.status}
                progress={controller.progress}
                onSplit={controller.handleSplit}
                onSelectAll={controller.selectAll}
                onDeselectAll={controller.deselectAll}
              />
            </>
          )}

          {/* Information */}
          <SecurityBanner />

          {/* Tips */}
          <TipsList tips={UI_TEXT.SPLIT.TIPS} />
        </VStack>
      </Container>
    </Box>
  );
};

export default SplitPage;
