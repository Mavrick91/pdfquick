import { Box, Container, VStack } from "@chakra-ui/react";
import type { Metadata } from "next";

import { HomeButton } from "@/components/ui/HomeButton";
import { SecurityBanner } from "@/components/ui/SecurityBanner";

export const metadata: Metadata = {
  title: {
    template: "%s | PDFQuick - Free Online PDF Tools",
    default: "PDF Tools | PDFQuick",
  },
  description:
    "Professional PDF tools for all your document needs. Merge, split, compress, protect, and convert PDFs online for free.",
  keywords: [
    "PDF tools",
    "online PDF editor",
    "PDF converter",
    "merge PDF",
    "split PDF",
    "compress PDF",
  ],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    siteName: "PDFQuick",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PDFQuick - Free Online PDF Tools",
      },
    ],
  },
};

type ToolsLayoutProps = {
  children: React.ReactNode;
};

const ToolsLayout = ({ children }: ToolsLayoutProps) => {
  return (
    <Box bgGradient="linear(to-b, pdf.lightGray, white)" minH="100vh">
      <Container maxW="container.xl" py={{ base: 6, md: 10 }}>
        <VStack gap={{ base: 6, md: 8 }} align="stretch">
          {/* Back to Home Button */}
          <Box>
            <HomeButton />
          </Box>

          {/* Page content */}
          {children}

          {/* Security Banner - Common for all tools */}
          <SecurityBanner />
        </VStack>
      </Container>
    </Box>
  );
};

export default ToolsLayout;
