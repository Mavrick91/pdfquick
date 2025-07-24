"use client";

import { useEffect } from "react";
import { Box, Container, VStack, Button, Icon, HStack, Text } from "@chakra-ui/react";
import { FaHome, FaCheckCircle } from "react-icons/fa";
import { DropZoneSingle } from "@/features/split/components/DropZoneSingle";
import { FileInfo } from "@/features/protect/components/FileInfo";
import { PasswordForm } from "@/features/protect/components/PasswordForm";
import { AdvancedOptions } from "@/features/protect/components/AdvancedOptions";
import { ProtectToolbar } from "@/features/protect/components/ProtectToolbar";
import { MonetizationHook } from "@/features/protect/components/MonetizationHook";
import { useProtectController } from "@/features/protect/hooks/useProtectController";
import { useAnalytics } from "@/features/merge/hooks/useAnalytics";
import { ANALYTICS_EVENTS, UI_TEXT } from "@/lib/constants";
import { PageHeader } from "@/components/ui/PageHeader";
import { SecurityBanner } from "@/components/ui/SecurityBanner";
import { TipsList } from "@/components/ui/TipsList";

const ProtectPage = () => {
  const controller = useProtectController();
  const { pdf, status, showMonetization } = controller;
  const { track } = useAnalytics();

  useEffect(() => {
    track(ANALYTICS_EVENTS.PROTECT_PAGE_VIEWED);
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
            <DropZoneSingle onFile={controller.handleUpload} />
          ) : (
            <>
              {/* File info */}
              <FileInfo pdf={pdf} onRemove={controller.reset} />

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
            <MonetizationHook onClose={() => controller.setShowMonetization(false)} />
          )}

          {/* Information */}
          <SecurityBanner />

          {/* Tips */}
          <TipsList tips={UI_TEXT.PROTECT.TIPS} />
        </VStack>
      </Container>
    </Box>
  );
};

export default ProtectPage;
