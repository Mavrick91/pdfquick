"use client";

import { Box, VStack, HStack, Text, Button, Icon, Heading, Card } from "@chakra-ui/react";
import { FaCheckCircle, FaRocket } from "react-icons/fa";
import { UI_TEXT } from "@/lib/constants";

type MonetizationHookProps = {
  onClose?: () => void;
};

export const MonetizationHook = ({ onClose }: MonetizationHookProps) => {
  return (
    <Card.Root bg="white" shadow="md" borderLeft="4px solid" borderLeftColor="pdf.red">
      <Card.Body p={6}>
        <VStack align="stretch" gap={4}>
          {/* Success message */}
          <HStack>
            <Icon as={FaCheckCircle} color="green.500" boxSize="24px" />
            <Heading size="md" color="pdf.darkGray">
              {UI_TEXT.COMPRESS.MONETIZATION_TITLE}
            </Heading>
          </HStack>

          {/* Upgrade pitch */}
          <Box>
            <HStack mb={3}>
              <Icon as={FaRocket} color="pdf.red" />
              <Text fontWeight="semibold" color="pdf.darkGray">
                {UI_TEXT.COMPRESS.MONETIZATION_SUBTITLE}
              </Text>
            </HStack>

            {/* Benefits list */}
            <VStack align="stretch" gap={2} pl={6}>
              {UI_TEXT.COMPRESS.MONETIZATION_BENEFITS.map((benefit, index) => (
                <HStack key={index} gap={2}>
                  <Text color="pdf.red">•</Text>
                  <Text fontSize="sm" color="pdf.mediumGray">
                    {benefit}
                  </Text>
                </HStack>
              ))}
            </VStack>
          </Box>

          {/* CTA buttons */}
          <HStack gap={3} pt={2}>
            <Button
              colorScheme="red"
              size="lg"
              onClick={() => {
                // TODO: Navigate to pricing page
                window.location.href = "/pricing";
              }}
            >
              {UI_TEXT.COMPRESS.MONETIZATION_CTA}
            </Button>
            <Button variant="ghost" size="lg" onClick={onClose}>
              {UI_TEXT.COMPRESS.MONETIZATION_SKIP}
            </Button>
          </HStack>
        </VStack>
      </Card.Body>
    </Card.Root>
  );
};
