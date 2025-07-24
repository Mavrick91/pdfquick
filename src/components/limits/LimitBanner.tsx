"use client";

import { Box, Text, Button, HStack } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { FaExclamationTriangle } from "react-icons/fa";

type LimitBannerProps = {
  /**
   * Whether to show the banner
   */
  isVisible: boolean;
  /**
   * The title of the alert
   */
  title: string;
  /**
   * Detailed description
   */
  description: string;
  /**
   * Optional CTA button text
   * @default "Upgrade to Pro"
   */
  ctaText?: string;
  /**
   * Optional callback when CTA is clicked
   * If not provided, navigates to /pricing
   */
  onCtaClick?: () => void;
};

/**
 * Full-width alert banner for when limits are exceeded
 * Shows contextual information and upgrade CTA
 */
export const LimitBanner = ({
  isVisible,
  title,
  description,
  ctaText = "Upgrade to Pro",
  onCtaClick,
}: LimitBannerProps) => {
  const router = useRouter();

  if (!isVisible) {
    return null;
  }

  const handleCta = () => {
    if (onCtaClick) {
      onCtaClick();
    } else {
      router.push("/pricing");
    }
  };

  return (
    <Box bg="orange.50" border="1px solid" borderColor="orange.200" borderRadius="md" p={4} mb={4}>
      <HStack justify="space-between" align="start">
        <HStack align="start" flex={1}>
          <FaExclamationTriangle color="orange" size={20} style={{ marginTop: 2 }} />
          <Box>
            <Text fontWeight="semibold" color="orange.800" mb={1}>
              {title}
            </Text>
            <Text fontSize="sm" color="orange.700">
              {description}
            </Text>
          </Box>
        </HStack>
        <Button size="sm" colorScheme="orange" onClick={handleCta}>
          {ctaText}
        </Button>
      </HStack>
    </Box>
  );
};
