"use client";

import { SimpleGrid, VStack, Card, Heading, Text, Icon, Button } from "@chakra-ui/react";
import Link from "next/link";
import { FaFilePdf, FaCut, FaCompress, FaShieldAlt, FaImage } from "react-icons/fa";

import { PageHeader } from "@/components/ui/PageHeader";
import { ROUTES, TOOL_NAMES, TOOL_DESCRIPTIONS } from "@/lib/routes";

const tools = [
  {
    href: ROUTES.tools.merge,
    icon: FaFilePdf,
    title: TOOL_NAMES.merge,
    description: TOOL_DESCRIPTIONS.merge,
    color: "red.500",
  },
  {
    href: ROUTES.tools.split,
    icon: FaCut,
    title: TOOL_NAMES.split,
    description: TOOL_DESCRIPTIONS.split,
    color: "blue.500",
  },
  {
    href: ROUTES.tools.compress,
    icon: FaCompress,
    title: TOOL_NAMES.compress,
    description: TOOL_DESCRIPTIONS.compress,
    color: "green.500",
  },
  {
    href: ROUTES.tools.protect,
    icon: FaShieldAlt,
    title: TOOL_NAMES.protect,
    description: TOOL_DESCRIPTIONS.protect,
    color: "purple.500",
  },
  {
    href: ROUTES.tools.pdfToImage,
    icon: FaImage,
    title: TOOL_NAMES.pdfToImage,
    description: TOOL_DESCRIPTIONS.pdfToImage,
    color: "orange.500",
  },
];

const ToolsOverviewPage = () => {
  return (
    <VStack gap={{ base: 6, md: 8 }} align="stretch">
      <PageHeader
        title="All PDF Tools"
        description="Choose from our collection of free, secure PDF tools"
      />

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6}>
        {tools.map((tool) => (
          <Link key={tool.href} href={tool.href} style={{ textDecoration: "none" }}>
            <Card.Root
              _hover={{
                transform: "translateY(-4px)",
                shadow: "lg",
              }}
              transition="all 0.2s"
              cursor="pointer"
            >
              <Card.Body>
                <VStack align="start" gap={4}>
                  <Icon as={tool.icon} boxSize={10} color={tool.color} />
                  <VStack align="start" gap={2}>
                    <Heading size="md">{tool.title}</Heading>
                    <Text color="gray.600">{tool.description}</Text>
                  </VStack>
                  <Button colorScheme="red" variant="ghost" size="sm" ml="auto">
                    Open Tool
                    <Icon as={FaFilePdf} ml={2} />
                  </Button>
                </VStack>
              </Card.Body>
            </Card.Root>
          </Link>
        ))}
      </SimpleGrid>
    </VStack>
  );
};

export default ToolsOverviewPage;
