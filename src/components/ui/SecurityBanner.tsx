import { VStack, Text } from "@chakra-ui/react";

import { UI_TEXT } from "@/lib/constants";

export const SecurityBanner = () => {
  return (
    <VStack
      p={6}
      bg="blue.50"
      borderRadius="lg"
      align="start"
      gap={3}
      borderLeft="4px solid"
      borderColor="blue.400"
    >
      <Text fontWeight="semibold" color="blue.800">
        {UI_TEXT.COMMON.SECURITY_TITLE}
      </Text>
      <Text fontSize="sm" color="blue.700">
        {UI_TEXT.COMMON.SECURITY_DESCRIPTION}
      </Text>
    </VStack>
  );
};
