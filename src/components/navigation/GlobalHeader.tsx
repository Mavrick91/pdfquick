"use client";

import { Box, Container, HStack, Text, IconButton, Button, useDisclosure } from "@chakra-ui/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FaBars, FaFilePdf, FaCut, FaCompress, FaShieldAlt, FaImage } from "react-icons/fa";

import { NAV_ITEMS, ROUTES, isToolPage } from "@/lib/routes";

import { MobileDrawer } from "./MobileDrawer";
import { NavLinkItem } from "./NavLinkItem";

const toolIcons = {
  merge: FaFilePdf,
  split: FaCut,
  compress: FaCompress,
  protect: FaShieldAlt,
  image: FaImage,
} as const;

/**
 * Global navigation header component
 */
export const GlobalHeader = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { open, onOpen, onClose } = useDisclosure();
  const showToolNav = isToolPage(pathname);

  return (
    <>
      <Box
        as="nav"
        position="sticky"
        top={0}
        bg="white"
        borderBottom="1px solid"
        borderColor="pdf.borderGray"
        zIndex={10}
        boxShadow="sm"
        height="64px"
      >
        <Container maxW="container.xl" height="full">
          <HStack height="full" justify="space-between">
            {/* Logo */}
            <Link href={ROUTES.home} style={{ textDecoration: "none" }}>
              <HStack cursor="pointer">
                <Text as="span" color="pdf.red" fontSize="2xl" fontWeight="bold">
                  PDF
                </Text>
                <Text as="span" color="pdf.darkGray" fontSize="2xl" fontWeight="bold">
                  Quick
                </Text>
              </HStack>
            </Link>

            {/* Desktop Navigation */}
            <HStack gap={1} display={{ base: "none", md: "flex" }}>
              {/* Tool Navigation */}
              {showToolNav
                ? NAV_ITEMS.tools.map((tool) => {
                    const Icon = toolIcons[tool.icon as keyof typeof toolIcons];
                    return (
                      <NavLinkItem key={tool.href} href={tool.href} leftIcon={<Icon />}>
                        {tool.name}
                      </NavLinkItem>
                    );
                  })
                : NAV_ITEMS.marketing.slice(1).map((item) => (
                    <NavLinkItem key={item.href} href={item.href}>
                      {item.name}
                    </NavLinkItem>
                  ))}
            </HStack>

            {/* Desktop Go Pro Button */}
            <Button
              colorScheme="red"
              size="md"
              borderRadius="6px"
              onClick={() => router.push(ROUTES.pricing)}
              display={{ base: "none", md: "flex" }}
            >
              Go Pro
            </Button>

            {/* Mobile Menu Button */}
            <IconButton
              aria-label="Open menu"
              onClick={onOpen}
              variant="ghost"
              size="md"
              display={{ base: "flex", md: "none" }}
            >
              <FaBars />
            </IconButton>
          </HStack>
        </Container>
      </Box>

      {/* Mobile Drawer */}
      <MobileDrawer isOpen={open} onClose={onClose} />
    </>
  );
};
