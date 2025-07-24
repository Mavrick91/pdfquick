"use client";

import { useEffect } from "react";

import { PdfFileInfo, DropZone } from "@/components/common";
import { PageHeader } from "@/components/ui/PageHeader";
import { TipsList } from "@/components/ui/TipsList";
import { useAnalytics } from "@/features/merge/hooks/useAnalytics";
import { SplitToolbar } from "@/features/split/components/SplitToolbar";
import { ThumbnailGrid } from "@/features/split/components/ThumbnailGrid";
import { useSplitController } from "@/features/split/hooks/useSplitController";
import { ANALYTICS_EVENTS, UI_TEXT, FILE_CONSTRAINTS } from "@/lib/constants";

const SplitPage = () => {
  const controller = useSplitController();
  const { pdf, thumbnails } = controller;
  const { track } = useAnalytics();

  useEffect(() => {
    track(ANALYTICS_EVENTS.SPLIT_PAGE_VIEWED);
  }, [track]);

  return (
    <>
      {/* Header */}
      <PageHeader title={UI_TEXT.SPLIT.TITLE} description={UI_TEXT.SPLIT.DESCRIPTION} />

      {/* Main content */}
      {!pdf ? (
        <DropZone
          onFiles={controller.handleUpload}
          multiple={false}
          maxSize={FILE_CONSTRAINTS.MAX_FILE_SIZE}
        />
      ) : (
        <>
          {/* File info */}
          <PdfFileInfo pdf={pdf} onRemove={controller.reset} />

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

      {/* Tips */}
      <TipsList tips={UI_TEXT.SPLIT.TIPS} />
    </>
  );
};

export default SplitPage;
