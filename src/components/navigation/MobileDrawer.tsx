"use client";

import { Drawer, VStack, HStack, Text, IconButton, Button, Separator } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { FaTimes, FaFilePdf, FaCut, FaCompress, FaShieldAlt, FaImage } from "react-icons/fa";

import { NAV_ITEMS, ROUTES } from "@/lib/routes";

import { NavLinkItem } from "./NavLinkItem";

type MobileDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
};

const toolIcons = {
  merge: FaFilePdf,
  split: FaCut,
  compress: FaCompress,
  protect: FaShieldAlt,
  image: FaImage,
} as const;

/**
 * Mobile navigation drawer component
 */
export const MobileDrawer = ({ isOpen, onClose }: MobileDrawerProps) => {
  const router = useRouter();

  const handleNavClick = () => {
    onClose();
  };

  const handleGoProClick = () => {
    router.push(ROUTES.pricing);
    onClose();
  };

  return (
    <Drawer.Root open={isOpen} placement="start" size="xs">
      <Drawer.Backdrop onClick={onClose} />
      <Drawer.Content>
        <Drawer.Header borderBottomWidth="1px">
          <HStack justify="space-between">
            <HStack>
              <Text as="span" color="pdf.red" fontSize="xl" fontWeight="bold">
                PDF
              </Text>
              <Text as="span" color="pdf.darkGray" fontSize="xl" fontWeight="bold">
                Quick
              </Text>
            </HStack>
            <IconButton aria-label="Close menu" onClick={onClose} variant="ghost" size="sm">
              <FaTimes />
            </IconButton>
          </HStack>
        </Drawer.Header>

        <Drawer.Body>
          <VStack align="stretch" gap={4} pt={4}>
            {/* Tools Section */}
            <VStack align="stretch" gap={2}>
              <Text fontSize="xs" fontWeight="semibold" color="pdf.mediumGray" px={2}>
                TOOLS
              </Text>
              {NAV_ITEMS.tools.map((tool) => {
                const Icon = toolIcons[tool.icon as keyof typeof toolIcons];
                return (
                  <NavLinkItem
                    key={tool.href}
                    href={tool.href}
                    onClick={handleNavClick}
                    leftIcon={<Icon />}
                    justifyContent="flex-start"
                    width="full"
                  >
                    {tool.name}
                  </NavLinkItem>
                );
              })}
            </VStack>

            <Separator />

            {/* Marketing Pages */}
            <VStack align="stretch" gap={2}>
              {NAV_ITEMS.marketing.map((item) => (
                <NavLinkItem
                  key={item.href}
                  href={item.href}
                  onClick={handleNavClick}
                  justifyContent="flex-start"
                  width="full"
                >
                  {item.name}
                </NavLinkItem>
              ))}
            </VStack>

            <Separator />

            {/* Go Pro CTA */}
            <Button colorScheme="red" size="md" onClick={handleGoProClick} width="full">
              Go Pro - $9/month
            </Button>
          </VStack>
        </Drawer.Body>
      </Drawer.Content>
    </Drawer.Root>
  );
};
