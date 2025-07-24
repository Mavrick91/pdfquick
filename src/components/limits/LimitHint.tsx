"use client";

import { Text, HStack } from "@chakra-ui/react";
import { FaInfoCircle } from "react-icons/fa";

type LimitHintProps = {
  /**
   * The limitation text to display
   */
  text: string;
  /**
   * Hide this component for Pro users
   * @default true
   */
  hideIfPro?: boolean;
  /**
   * Whether the current user is Pro
   * @default false
   */
  isPro?: boolean;
};

/**
 * A subtle hint component that shows Free plan limitations
 * Displays as a small pill/badge with informational styling
 */
export const LimitHint = ({ text, hideIfPro = true, isPro = false }: LimitHintProps) => {
  if (hideIfPro && isPro) {
    return null;
  }

  return (
    <HStack
      bg="orange.50"
      color="orange.700"
      px={3}
      py={1}
      borderRadius="full"
      fontSize="sm"
      fontWeight="medium"
      display="inline-flex"
      gap={1}
    >
      <FaInfoCircle size={14} />
      <Text>{text}</Text>
    </HStack>
  );
};
