"use client";

import { useEffect } from "react";
import { Box, Container, VStack, Button, Icon } from "@chakra-ui/react";
import { FaHome } from "react-icons/fa";
import { DropZone } from "@/features/merge/components/DropZone";
import { FileList } from "@/features/merge/components/FileList";
import { MergeToolbar } from "@/features/merge/components/MergeToolbar";
import { useMergeController } from "@/features/merge/hooks/useMergeController";
import { useAnalytics } from "@/features/merge/hooks/useAnalytics";
import { ANALYTICS_EVENTS, UI_TEXT } from "@/lib/constants";
import { PageHeader } from "@/components/ui/PageHeader";
import { SecurityBanner } from "@/components/ui/SecurityBanner";
import { TipsList } from "@/components/ui/TipsList";
import { FileCounter } from "@/components/ui/FileCounter";

const MergePage = () => {
  const controller = useMergeController();
  const { files, status, progress } = controller;
  const { track } = useAnalytics();

  useEffect(() => {
    track(ANALYTICS_EVENTS.MERGE_PAGE_VIEWED);
  }, [track]);

  return (
    <Box minH="100vh" bg="gray.50">
      <Container maxW="container.lg" py={{ base: 6, md: 10 }}>
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
          <PageHeader title={UI_TEXT.MERGE.TITLE} description={UI_TEXT.MERGE.DESCRIPTION} />

          {/* Drop Zone */}
          <DropZone onFiles={controller.handleAdd} />

          {/* File List */}
          {files.length > 0 && (
            <Box>
              <FileCounter count={files.length} label={UI_TEXT.COMMON.YOUR_PDFS} />
              <FileList
                files={files}
                onReorder={controller.handleReorder}
                onRemove={controller.handleRemove}
              />
            </Box>
          )}

          {/* Merge Toolbar */}
          <MergeToolbar
            files={files}
            status={status}
            progress={progress}
            onMerge={controller.handleMerge}
          />

          {/* Information */}
          <SecurityBanner />

          {/* Tips */}
          <TipsList tips={UI_TEXT.MERGE.TIPS} />
        </VStack>
      </Container>
    </Box>
  );
};

export default MergePage;
