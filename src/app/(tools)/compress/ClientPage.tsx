"use client";

import { Text, Box, HStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { FaRocket } from "react-icons/fa";

import {
  DraggableFileList,
  DropZone,
  MonetizationHook,
  LimitHint,
  LimitCounter,
} from "@/components/common";
import { PageHeader } from "@/components/ui/PageHeader";
import { TipsList } from "@/components/ui/TipsList";
import { CompressToolbar } from "@/features/compress/components/CompressToolbar";
import { FileItem } from "@/features/compress/components/FileItem";
import { useCompressController } from "@/features/compress/hooks/useCompressController";
import { useAnalytics } from "@/features/merge/hooks/useAnalytics";
import { ANALYTICS_EVENTS, UI_TEXT, FILE_CONSTRAINTS } from "@/lib/constants";

const CompressPage = () => {
  const controller = useCompressController();
  const { files, status, showMonetization, isPro } = controller;
  const { track } = useAnalytics();

  useEffect(() => {
    track(ANALYTICS_EVENTS.COMPRESS_PAGE_VIEWED);
  }, [track]);

  return (
    <>
      {/* Header */}
      <PageHeader title={UI_TEXT.COMPRESS.TITLE} description={UI_TEXT.COMPRESS.DESCRIPTION} />

      {/* Limit hint */}
      <LimitHint text={UI_TEXT.COMPRESS.LIMITS.FILE_COUNT} isPro={isPro} />

      {/* Drop Zone */}
      <DropZone
        onFiles={controller.handleAdd}
        multiple={true}
        hint={UI_TEXT.COMPRESS.DROP_ZONE_HINT}
      />

      {/* File List */}
      {files.length > 0 && (
        <Box>
          <HStack mb={3}>
            <Text fontWeight="medium" color="pdf.darkGray">
              {UI_TEXT.COMMON.YOUR_PDFS(files.length)}
            </Text>
            <LimitCounter
              current={files.length}
              max={FILE_CONSTRAINTS.FREE_MAX_COMPRESS_FILES}
              isPro={isPro}
            />
          </HStack>
          <DraggableFileList
            files={files}
            onReorder={controller.handleReorder}
            onRemove={controller.handleRemove}
            renderItem={(file, isDragging, dragHandleProps) => (
              <FileItem
                key={file.id}
                file={file}
                onRemove={controller.handleRemove}
                isDragging={isDragging}
                dragHandleProps={dragHandleProps}
              />
            )}
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
        <MonetizationHook
          title={UI_TEXT.COMPRESS.MONETIZATION_TITLE}
          subtitle={UI_TEXT.COMPRESS.MONETIZATION_SUBTITLE}
          benefits={UI_TEXT.COMPRESS.MONETIZATION_BENEFITS}
          ctaLabel={UI_TEXT.COMPRESS.MONETIZATION_CTA}
          skipLabel={UI_TEXT.COMPRESS.MONETIZATION_SKIP}
          icon={FaRocket}
          onSkip={() => controller.setShowMonetization(false)}
        />
      )}

      {/* Tips */}
      <TipsList tips={UI_TEXT.COMPRESS.TIPS} />
    </>
  );
};

export default CompressPage;
