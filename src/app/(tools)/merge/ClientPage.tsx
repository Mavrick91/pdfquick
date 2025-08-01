"use client";

import { Box } from "@chakra-ui/react";
import { useEffect } from "react";

import { DraggableFileList, DropZone, LimitHint } from "@/components/common";
import { FileCounter } from "@/components/ui/FileCounter";
import { PageHeader } from "@/components/ui/PageHeader";
import { TipsList } from "@/components/ui/TipsList";
import { MergeToolbar } from "@/features/merge/components/MergeToolbar";
import { useAnalytics } from "@/features/merge/hooks/useAnalytics";
import { useMergeController } from "@/features/merge/hooks/useMergeController";
import { ANALYTICS_EVENTS, UI_TEXT, FILE_CONSTRAINTS } from "@/lib/constants";

const MergePage = () => {
  const controller = useMergeController();
  const { files, status, progress } = controller;
  const { track } = useAnalytics();

  useEffect(() => {
    track(ANALYTICS_EVENTS.MERGE_PAGE_VIEWED);
  }, [track]);

  return (
    <>
      {/* Header */}
      <PageHeader title={UI_TEXT.MERGE.TITLE} description={UI_TEXT.MERGE.DESCRIPTION} />

      {/* Limit hint */}
      <LimitHint text={UI_TEXT.MERGE.LIMITS.FILE_COUNT} hideIfPro={false} />

      {/* Drop Zone */}
      <DropZone onFiles={controller.handleAdd} multiple={true} />

      {/* File List */}
      {files.length > 0 && (
        <Box>
          <FileCounter
            count={files.length}
            label={UI_TEXT.COMMON.YOUR_PDFS}
            max={FILE_CONSTRAINTS.MAX_FILES_FOR_MERGE}
            showLimit={true}
          />
          <DraggableFileList
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

      {/* Tips */}
      <TipsList tips={UI_TEXT.MERGE.TIPS} />
    </>
  );
};

export default MergePage;
