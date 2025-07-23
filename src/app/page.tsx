"use client";

import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  Heading,
  HStack,
  Icon,
  Text,
  VStack,
  Card,
} from "@chakra-ui/react";
import Link from "next/link";
import {
  FaFilePdf,
  FaCompress,
  FaLock,
  FaEdit,
  FaFileImage,
  FaCodeBranch,
  FaCheckCircle,
} from "react-icons/fa";

type ToolCardProps = {
  icon: React.ElementType;
  title: string;
  description: string;
};

const ToolCard = ({ icon, title, description, href }: ToolCardProps & { href?: string }) => {
  const content = (
    <Card.Root
      bg="white"
      borderRadius="12px"
      boxShadow="sm"
      transition="all 0.3s"
      _hover={{
        transform: "translateY(-4px)",
        boxShadow: "lg",
      }}
      cursor="pointer"
      border="1px solid"
      borderColor="gray.100"
    >
      <Card.Body textAlign="center" p={6}>
        <Icon as={icon} boxSize="60px" color="pdf.red" mb={4} />
        <Heading size="md" mb={2} color="pdf.darkGray">
          {title}
        </Heading>
        <Text color="pdf.mediumGray" fontSize="sm">
          {description}
        </Text>
      </Card.Body>
    </Card.Root>
  );

  if (href) {
    return (
      <Link href={href} style={{ textDecoration: "none" }}>
        {content}
      </Link>
    );
  }

  return content;
};

const Home = () => {
  const tools = [
    {
      icon: FaCompress,
      title: "Compress PDF",
      description: "Reduce file size while maintaining quality",
      href: "/tools/compress",
    },
    {
      icon: FaLock,
      title: "Protect PDF",
      description: "Add password protection to your documents",
      href: "/tools/protect",
    },
    {
      icon: FaEdit,
      title: "Edit PDF",
      description: "Modify text and images in your PDFs",
      href: "/tools/edit",
    },
    {
      icon: FaFileImage,
      title: "PDF to Image",
      description: "Convert PDF pages to JPG or PNG",
      href: "/tools/pdf-to-image",
    },
    {
      icon: FaFilePdf,
      title: "Merge PDF",
      description: "Combine multiple PDFs into one",
      href: "/tools/merge",
    },
    {
      icon: FaCodeBranch,
      title: "Split PDF",
      description: "Separate PDF pages into multiple files",
      href: "/tools/split",
    },
  ];

  return (
    <Box minH="100vh">
      {/* Navigation Bar */}
      <Box
        as="nav"
        position="sticky"
        top={0}
        bg="white"
        borderBottom="1px solid"
        borderColor="pdf.borderGray"
        zIndex={10}
        boxShadow="xs"
      >
        <Container maxW="container.xl">
          <Flex h={16} alignItems="center" justifyContent="space-between">
            {/* Logo */}
            <Heading size="lg">
              <Text as="span" color="pdf.red">
                PDF
              </Text>
              <Text as="span" color="pdf.darkGray">
                Quick
              </Text>
            </Heading>

            {/* Center Nav Links */}
            <HStack gap={8} display={{ base: "none", md: "flex" }}>
              <Link href="#tools" style={{ textDecoration: "none" }}>
                <Text color="pdf.mediumGray" _hover={{ color: "pdf.darkGray" }} cursor="pointer">
                  Tools
                </Text>
              </Link>
              <Link href="#pricing" style={{ textDecoration: "none" }}>
                <Text color="pdf.mediumGray" _hover={{ color: "pdf.darkGray" }} cursor="pointer">
                  Pricing
                </Text>
              </Link>
              <Link href="#api" style={{ textDecoration: "none" }}>
                <Text color="pdf.mediumGray" _hover={{ color: "pdf.darkGray" }} cursor="pointer">
                  API
                </Text>
              </Link>
              <Link href="#blog" style={{ textDecoration: "none" }}>
                <Text color="pdf.mediumGray" _hover={{ color: "pdf.darkGray" }} cursor="pointer">
                  Blog
                </Text>
              </Link>
            </HStack>

            {/* Go Pro Button */}
            <Button
              bg="pdf.red"
              color="white"
              borderRadius="6px"
              _hover={{ bg: "red.600" }}
              size="md"
              px={6}
              fontWeight="semibold"
            >
              Go Pro
            </Button>
          </Flex>
        </Container>
      </Box>

      {/* Hero Section */}
      <Box bgGradient="linear(to-b, #f9fafb, #ffffff)" minH="90vh" pt={20} pb={10}>
        <Container maxW="container.xl">
          <VStack gap={8} textAlign="center">
            {/* Main Headline */}
            <Heading
              fontSize={{ base: "3xl", md: "56px" }}
              fontWeight="800"
              lineHeight="1.2"
              maxW="800px"
            >
              <Text as="span" color="pdf.darkGray">
                Your PDFs. Your Computer.
              </Text>
              <br />
              <Text as="span" color="pdf.red">
                Zero Uploads.
              </Text>
            </Heading>

            {/* Subheadline */}
            <Text
              fontSize={{ base: "lg", md: "20px" }}
              color="pdf.mediumGray"
              maxW="600px"
              lineHeight="1.6"
            >
              Fast, secure PDF tools that work 100% in your browser. Your files never leave your
              computer.
            </Text>

            {/* Trust Indicators */}
            <HStack gap={6} pt={4}>
              <HStack>
                <Icon as={FaCheckCircle} color="pdf.successGreen" boxSize={5} />
                <Text color="pdf.darkGray" fontWeight="medium">
                  No file uploads
                </Text>
              </HStack>
              <HStack>
                <Icon as={FaCheckCircle} color="pdf.successGreen" boxSize={5} />
                <Text color="pdf.darkGray" fontWeight="medium">
                  No sign-up required
                </Text>
              </HStack>
              <HStack>
                <Icon as={FaCheckCircle} color="pdf.successGreen" boxSize={5} />
                <Text color="pdf.darkGray" fontWeight="medium">
                  100% Private
                </Text>
              </HStack>
            </HStack>
          </VStack>

          {/* Tool Cards Grid */}
          <Grid
            id="tools"
            templateColumns={{
              base: "1fr",
              md: "repeat(3, 1fr)",
            }}
            gap={6}
            mt={16}
          >
            {tools.map((tool) => (
              <ToolCard key={tool.title} {...tool} href={tool.href} />
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
