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
  Link,
  Text,
  VStack,
  Card,
} from "@chakra-ui/react";
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

const ToolCard = ({ icon, title, description }: ToolCardProps) => {
  return (
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
};

const Home = () => {
  const tools = [
    {
      icon: FaCompress,
      title: "Compress PDF",
      description: "Reduce file size while maintaining quality",
    },
    {
      icon: FaLock,
      title: "Protect PDF",
      description: "Add password protection to your documents",
    },
    {
      icon: FaEdit,
      title: "Edit PDF",
      description: "Modify text and images in your PDFs",
    },
    {
      icon: FaFileImage,
      title: "PDF to Image",
      description: "Convert PDF pages to JPG or PNG",
    },
    {
      icon: FaFilePdf,
      title: "Merge PDF",
      description: "Combine multiple PDFs into one",
    },
    {
      icon: FaCodeBranch,
      title: "Split PDF",
      description: "Separate PDF pages into multiple files",
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
              <Link color="pdf.mediumGray" _hover={{ color: "pdf.darkGray" }}>
                Tools
              </Link>
              <Link color="pdf.mediumGray" _hover={{ color: "pdf.darkGray" }}>
                Pricing
              </Link>
              <Link color="pdf.mediumGray" _hover={{ color: "pdf.darkGray" }}>
                API
              </Link>
              <Link color="pdf.mediumGray" _hover={{ color: "pdf.darkGray" }}>
                Blog
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
            templateColumns={{
              base: "1fr",
              md: "repeat(3, 1fr)",
            }}
            gap={6}
            mt={16}
          >
            {tools.map((tool) => (
              <ToolCard key={tool.title} {...tool} />
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
