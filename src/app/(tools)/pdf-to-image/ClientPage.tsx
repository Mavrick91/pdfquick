"use client";

import { VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { FaRocket } from "react-icons/fa";

import { PdfFileInfo, DropZone, MonetizationHook, LimitHint } from "@/components/common";
import { PageHeader } from "@/components/ui/PageHeader";
import { useAnalytics } from "@/features/merge/hooks/useAnalytics";
import { ConvertToolbar } from "@/features/pdf-to-img/components/ConvertToolbar";
import { FormatSelector } from "@/features/pdf-to-img/components/FormatSelector";
import { OutputOptions } from "@/features/pdf-to-img/components/OutputOptions";
import { PageSelector } from "@/features/pdf-to-img/components/PageSelector";
import { QualitySettings } from "@/features/pdf-to-img/components/QualitySettings";
import { UI_TEXT, ANALYTICS_EVENTS } from "@/features/pdf-to-img/constants";
import { useImageController } from "@/features/pdf-to-img/hooks/useImageController";
import { FILE_CONSTRAINTS } from "@/lib/constants";

const PdfToImagePage = () => {
  const ctrl = useImageController();
  const { track } = useAnalytics();

  useEffect(() => {
    track(ANALYTICS_EVENTS.P2I_PAGE_VIEWED);
  }, [track]);

  return (
    <VStack gap={{ base: 6, md: 8 }} align="stretch">
      <PageHeader title={UI_TEXT.TITLE} description={UI_TEXT.DESCRIPTION} />

      {/* Limit hints */}
      <LimitHint text={`${UI_TEXT.LIMITS.PAGES} • ${UI_TEXT.LIMITS.DPI}`} isPro={ctrl.isPro} />

      {!ctrl.pdfCtx && (
        <DropZone
          onFiles={ctrl.handleUpload}
          multiple={false}
          maxSize={FILE_CONSTRAINTS.MAX_FILE_SIZE}
          text="Drop PDF here or click to browse"
        />
      )}

      {ctrl.pdfCtx && (
        <>
          <PdfFileInfo pdf={ctrl.pdfCtx} onRemove={ctrl.reset} />

          <FormatSelector
            format={ctrl.format}
            isPro={ctrl.isPro}
            onFormatChange={ctrl.handleFormatChange}
          />

          <QualitySettings
            format={ctrl.format}
            dpi={ctrl.dpi}
            quality={ctrl.quality}
            isPro={ctrl.isPro}
            onDpiChange={ctrl.handleDpiChange}
            onQualityChange={ctrl.setQuality}
          />

          <PageSelector
            pdfCtx={ctrl.pdfCtx}
            selectedPages={ctrl.selectedPages}
            thumbnails={ctrl.thumbnails}
            thumbsLoading={ctrl.thumbsLoading}
            progressPerPage={ctrl.progressPerPage}
            isPro={ctrl.isPro}
            onSelectPage={ctrl.handleSelectPage}
            onSelectAll={ctrl.selectAllPages}
            onClearSelection={ctrl.clearSelection}
            onRangeInput={ctrl.handleRangeInput}
          />

          <OutputOptions
            outputMode={ctrl.outputMode}
            downloadAsZip={ctrl.downloadAsZip}
            isPro={ctrl.isPro}
            selectedPagesCount={ctrl.selectedPages.size}
            onOutputChange={ctrl.handleOutputChange}
            onZipToggle={ctrl.handleZipToggle}
          />

          <ConvertToolbar
            status={ctrl.status}
            progress={ctrl.batchProgress}
            canConvert={ctrl.canConvert}
            onConvert={ctrl.startConvert}
            onDownloadAgain={ctrl.downloadAgain}
          />
        </>
      )}

      <MonetizationHook
        isOpen={ctrl.showMonetization}
        title={UI_TEXT.MONETIZATION_TITLE}
        subtitle={UI_TEXT.MONETIZATION_SUBTITLE}
        benefits={UI_TEXT.MONETIZATION_BENEFITS}
        ctaLabel={UI_TEXT.MONETIZATION_CTA}
        skipLabel={UI_TEXT.MONETIZATION_SKIP}
        icon={FaRocket}
        onSkip={() => ctrl.setShowMonetization(false)}
      />
    </VStack>
  );
};

export default PdfToImagePage;
