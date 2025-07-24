"use client";

import { Box, VStack, HStack, Text, Button, Icon, Heading, Card } from "@chakra-ui/react";
import { FaCheckCircle, FaShieldAlt } from "react-icons/fa";
import { UI_TEXT } from "@/lib/constants";

type MonetizationHookProps = {
  onClose?: () => void;
  onDownload?: () => void;
};

export const MonetizationHook = ({ onClose, onDownload }: MonetizationHookProps) => {
  return (
    <Card.Root bg="white" shadow="md" borderLeft="4px solid" borderLeftColor="pdf.red">
      <Card.Body p={6}>
        <VStack align="stretch" gap={4}>
          {/* Success message */}
          <HStack>
            <Icon as={FaCheckCircle} color="green.500" boxSize="24px" />
            <Heading size="md" color="pdf.darkGray">
              {UI_TEXT.PROTECT.MONETIZATION_TITLE}
            </Heading>
          </HStack>

          <Text color="pdf.mediumGray">{UI_TEXT.PROTECT.MONETIZATION_TEXT}</Text>

          {/* Upgrade pitch */}
          <Box>
            <HStack mb={3}>
              <Icon as={FaShieldAlt} color="pdf.red" />
              <Text fontWeight="semibold" color="pdf.darkGray">
                {UI_TEXT.PROTECT.MONETIZATION_SUBTITLE}
              </Text>
            </HStack>

            {/* Benefits list */}
            <VStack align="stretch" gap={2} pl={6}>
              {UI_TEXT.PROTECT.MONETIZATION_BENEFITS.map((benefit, index) => (
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
              {UI_TEXT.PROTECT.MONETIZATION_CTA}
            </Button>
            <Button variant="outline" size="lg" onClick={onClose || onDownload}>
              {UI_TEXT.PROTECT.MONETIZATION_SKIP}
            </Button>
          </HStack>
        </VStack>
      </Card.Body>
    </Card.Root>
  );
};
