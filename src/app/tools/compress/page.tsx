"use client";

import { useEffect } from "react";
import { Box, Container, VStack, Button, Icon, Text } from "@chakra-ui/react";
import { FaHome } from "react-icons/fa";
import { DropZone } from "@/features/merge/components/DropZone";
import { FileList } from "@/features/compress/components/FileList";
import { CompressToolbar } from "@/features/compress/components/CompressToolbar";
import { MonetizationHook } from "@/features/compress/components/MonetizationHook";
import { useCompressController } from "@/features/compress/hooks/useCompressController";
import { useAnalytics } from "@/features/merge/hooks/useAnalytics";
import { ANALYTICS_EVENTS, UI_TEXT } from "@/lib/constants";
import { PageHeader } from "@/components/ui/PageHeader";
import { SecurityBanner } from "@/components/ui/SecurityBanner";
import { TipsList } from "@/components/ui/TipsList";

const CompressPage = () => {
  const controller = useCompressController();
  const { files, status, showMonetization } = controller;
  const { track } = useAnalytics();

  useEffect(() => {
    track(ANALYTICS_EVENTS.COMPRESS_PAGE_VIEWED);
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
          <PageHeader title={UI_TEXT.COMPRESS.TITLE} description={UI_TEXT.COMPRESS.DESCRIPTION} />

          {/* Drop Zone */}
          <DropZone onFiles={controller.handleAdd} />

          {/* File List */}
          {files.length > 0 && (
            <Box>
              <Text fontWeight="medium" color="pdf.darkGray" mb={3}>
                {UI_TEXT.COMMON.YOUR_PDFS(files.length)}
              </Text>
              <FileList
                files={files}
                onReorder={controller.handleReorder}
                onRemove={controller.handleRemove}
              />
            </Box>
          )}

          {/* Compress Toolbar */}
          {files.length > 0 && (
            <CompressToolbar
              level={controller.level}
              onLevelChange={controller.handleLevelChange}
              status={status}
              batchProgress={controller.batchProgress}
              fileCount={files.length}
              isPro={controller.isPro}
              onCompress={controller.startCompress}
            />
          )}

          {/* Monetization Hook */}
          {showMonetization && (
            <MonetizationHook onClose={() => controller.setShowMonetization(false)} />
          )}

          {/* Information */}
          <SecurityBanner />

          {/* Tips */}
          <TipsList tips={UI_TEXT.COMPRESS.TIPS} />
        </VStack>
      </Container>
    </Box>
  );
};

export default CompressPage;
