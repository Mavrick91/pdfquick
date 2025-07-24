"use client";

import { Box, Text } from "@chakra-ui/react";

type LimitCounterProps = {
  /**
   * Current count
   */
  current: number;
  /**
   * Maximum allowed count
   */
  max: number;
  /**
   * Hide for Pro users
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
 * Shows a counter badge like "2/5" to indicate usage vs limit
 * Changes color when approaching or exceeding limit
 */
export const LimitCounter = ({
  current,
  max,
  hideIfPro = true,
  isPro = false,
}: LimitCounterProps) => {
  if (hideIfPro && isPro) {
    return null;
  }

  const isAtLimit = current >= max;
  const isNearLimit = current >= max * 0.8;

  const bgColor = isAtLimit ? "red.100" : isNearLimit ? "orange.100" : "gray.100";
  const textColor = isAtLimit ? "red.700" : isNearLimit ? "orange.700" : "gray.600";

  return (
    <Box
      as="span"
      bg={bgColor}
      color={textColor}
      px={2}
      py={0.5}
      borderRadius="md"
      fontSize="xs"
      fontWeight="semibold"
      ml={2}
    >
      <Text as="span">{current}</Text>
      <Text as="span" mx={0.5}>
        /
      </Text>
      <Text as="span">{max}</Text>
    </Box>
  );
};
