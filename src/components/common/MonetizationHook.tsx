"use client";

import { Card, VStack, HStack, Text, Button, Icon as ChakraIcon, Box } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import type { IconType } from "react-icons";
import { FaCheckCircle, FaRocket } from "react-icons/fa";

type MonetizationHookProps = {
  /**
   * Controls visibility of the component
   * @default true
   */
  isOpen?: boolean;
  /**
   * Success heading text
   */
  title: string;
  /**
   * "Unlock..." subtitle line
   */
  subtitle: string;
  /**
   * Optional description paragraph
   */
  description?: string;
  /**
   * List of benefits to display as bullets
   */
  benefits: readonly string[];
  /**
   * Icon to show next to subtitle
   * @default FaRocket
   */
  icon?: IconType;
  /**
   * Border color for the card
   * @default "pdf.red"
   */
  borderColor?: string;
  /**
   * Primary button text
   */
  ctaLabel: string;
  /**
   * Secondary button text
   */
  skipLabel: string;
  /**
   * Primary button destination
   * @default "/pricing"
   */
  ctaHref?: string;
  /**
   * Secondary button variant
   * @default "ghost"
   */
  skipVariant?: "outline" | "ghost";
  /**
   * Handler for secondary button click
   */
  onSkip?: () => void;
  /**
   * Optional handler for primary button (overrides navigation)
   */
  onCTA?: () => void;
};

/**
 * Reusable monetization prompt component that displays after successful operations
 * to encourage users to upgrade to Pro
 */
export const MonetizationHook = ({
  isOpen = true,
  title,
  subtitle,
  description,
  benefits,
  icon: Icon = FaRocket,
  borderColor = "pdf.red",
  ctaLabel,
  skipLabel,
  ctaHref = "/pricing",
  skipVariant = "ghost",
  onSkip,
  onCTA,
}: MonetizationHookProps) => {
  const router = useRouter();

  if (!isOpen) {
    return null;
  }

  const handleCTA = () => {
    if (onCTA) {
      onCTA();
    } else {
      router.push(ctaHref);
    }
  };

  const handleSkip = () => {
    if (onSkip) {
      onSkip();
    }
  };

  return (
    <Card.Root borderLeftWidth={4} borderLeftColor={borderColor}>
      <Card.Body>
        <VStack gap={4} align="stretch">
          {/* Success header */}
          <HStack>
            <ChakraIcon as={FaCheckCircle} color="pdf.successGreen" boxSize={5} />
            <Text fontSize="lg" fontWeight="bold" color="pdf.darkGray">
              {title}
            </Text>
          </HStack>

          {/* Upgrade pitch */}
          <HStack align="start">
            <ChakraIcon as={Icon} color={borderColor} boxSize={5} mt={0.5} />
            <Box flex={1}>
              <Text fontWeight="medium" color="pdf.darkGray" mb={2}>
                {subtitle}
              </Text>
              {description && (
                <Text fontSize="sm" color="pdf.mediumGray" mb={3}>
                  {description}
                </Text>
              )}
              <VStack align="start" gap={1}>
                {benefits.map((benefit, index) => (
                  <Text key={index} fontSize="sm" color="pdf.mediumGray">
                    • {benefit}
                  </Text>
                ))}
              </VStack>
            </Box>
          </HStack>

          {/* Action buttons */}
          <HStack gap={3}>
            <Button colorScheme="red" onClick={handleCTA} flex={1}>
              {ctaLabel}
            </Button>
            <Button variant={skipVariant} onClick={handleSkip} flex={1}>
              {skipLabel}
            </Button>
          </HStack>
        </VStack>
      </Card.Body>
    </Card.Root>
  );
};
