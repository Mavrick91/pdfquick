"use client";

import { HStack, Text, Icon } from "@chakra-ui/react";
import { useEffect } from "react";
import { FaCheckCircle, FaShieldAlt } from "react-icons/fa";

import { PdfFileInfo, DropZone, MonetizationHook } from "@/components/common";
import { PageHeader } from "@/components/ui/PageHeader";
import { TipsList } from "@/components/ui/TipsList";
import { useAnalytics } from "@/features/merge/hooks/useAnalytics";
import { AdvancedOptions } from "@/features/protect/components/AdvancedOptions";
import { PasswordForm } from "@/features/protect/components/PasswordForm";
import { ProtectToolbar } from "@/features/protect/components/ProtectToolbar";
import { useProtectController } from "@/features/protect/hooks/useProtectController";
import { ANALYTICS_EVENTS, UI_TEXT, FILE_CONSTRAINTS } from "@/lib/constants";

const ProtectPage = () => {
  const controller = useProtectController();
  const { pdf, status, showMonetization } = controller;
  const { track } = useAnalytics();

  useEffect(() => {
    track(ANALYTICS_EVENTS.PROTECT_PAGE_VIEWED);
  }, [track]);

  return (
    <>
      {/* Header */}
      <PageHeader title={UI_TEXT.PROTECT.TITLE} description={UI_TEXT.PROTECT.DESCRIPTION} />

      {/* Security features */}
      <HStack gap={6} flexWrap="wrap" justifyContent="center">
        {UI_TEXT.PROTECT.SECURITY_FEATURES.map((feature, index) => (
          <HStack key={index}>
            <Icon as={FaCheckCircle} color="pdf.successGreen" boxSize={4} />
            <Text fontSize="sm" color="pdf.darkGray">
              {feature}
            </Text>
          </HStack>
        ))}
      </HStack>

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

          {/* Password form */}
          <PasswordForm
            userPassword={controller.userPassword}
            confirmPassword={controller.confirmPassword}
            onPasswordChange={controller.setUserPassword}
            onConfirmChange={controller.setConfirmPassword}
          />

          {/* Advanced options */}
          <AdvancedOptions
            ownerPassword={controller.ownerPassword}
            onOwnerPasswordChange={controller.setOwnerPassword}
            permissions={controller.permissions}
            onPermissionToggle={controller.togglePermission}
            encryptionStrength={controller.encryptionStrength}
            onEncryptionChange={controller.handleEncryptionChange}
            isPro={controller.isPro}
          />

          {/* Protect toolbar */}
          <ProtectToolbar
            status={status}
            progress={controller.progress}
            canProtect={controller.canProtect}
            onProtect={controller.startProtect}
          />
        </>
      )}

      {/* Monetization Hook */}
      {showMonetization && status === "success" && (
        <MonetizationHook
          title={UI_TEXT.PROTECT.MONETIZATION_TITLE}
          subtitle={UI_TEXT.PROTECT.MONETIZATION_SUBTITLE}
          description={UI_TEXT.PROTECT.MONETIZATION_TEXT}
          benefits={UI_TEXT.PROTECT.MONETIZATION_BENEFITS}
          ctaLabel={UI_TEXT.PROTECT.MONETIZATION_CTA}
          skipLabel={UI_TEXT.PROTECT.MONETIZATION_SKIP}
          icon={FaShieldAlt}
          skipVariant="outline"
          onSkip={() => controller.setShowMonetization(false)}
        />
      )}

      {/* Tips */}
      <TipsList tips={UI_TEXT.PROTECT.TIPS} />
    </>
  );
};

export default ProtectPage;
