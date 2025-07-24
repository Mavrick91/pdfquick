"use client";

import {
  Box,
  VStack,
  HStack,
  Text,
  Input,
  Checkbox,
  Badge,
  Button,
  Icon,
  Field,
  Collapsible,
} from "@chakra-ui/react";
import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

import { ProLockIcon, LimitHint } from "@/components/common";
import { UI_TEXT } from "@/lib/constants";

import type { PermissionFlags, EncryptionStrength } from "../types";

type AdvancedOptionsProps = {
  ownerPassword: string;
  onOwnerPasswordChange: (value: string) => void;
  permissions: PermissionFlags;
  onPermissionToggle: (key: keyof PermissionFlags) => void;
  encryptionStrength: EncryptionStrength;
  onEncryptionChange: (strength: EncryptionStrength) => void;
  isPro: boolean;
};

export const AdvancedOptions = ({
  ownerPassword,
  onOwnerPasswordChange,
  permissions,
  onPermissionToggle,
  encryptionStrength,
  onEncryptionChange,
  isPro,
}: AdvancedOptionsProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const encryptionOptions = [
    {
      value: "128" as EncryptionStrength,
      title: UI_TEXT.PROTECT.ENCRYPT_128,
      description: UI_TEXT.PROTECT.ENCRYPT_128_DESC,
      isPro: false,
    },
    {
      value: "256" as EncryptionStrength,
      title: UI_TEXT.PROTECT.ENCRYPT_256,
      description: UI_TEXT.PROTECT.ENCRYPT_256_DESC,
      isPro: true,
    },
  ];

  const permissionOptions = [
    { key: "printing" as keyof PermissionFlags, label: UI_TEXT.PROTECT.PERMISSIONS.PRINTING },
    { key: "copying" as keyof PermissionFlags, label: UI_TEXT.PROTECT.PERMISSIONS.COPYING },
    { key: "editing" as keyof PermissionFlags, label: UI_TEXT.PROTECT.PERMISSIONS.EDITING },
    {
      key: "formFilling" as keyof PermissionFlags,
      label: UI_TEXT.PROTECT.PERMISSIONS.FORM_FILLING,
    },
    { key: "commenting" as keyof PermissionFlags, label: UI_TEXT.PROTECT.PERMISSIONS.COMMENTING },
  ];

  return (
    <Box bg="white" p={6} borderRadius="12px" border="1px solid" borderColor="pdf.borderGray">
      <Button
        variant="ghost"
        width="100%"
        justifyContent="space-between"
        onClick={() => setIsOpen(!isOpen)}
      >
        <HStack>
          <Text fontWeight="medium">{UI_TEXT.PROTECT.ADVANCED_OPTIONS}</Text>
          {!isPro && (
            <>
              <Badge colorScheme="red" size="sm">
                {UI_TEXT.PROTECT.PRO_BADGE}
              </Badge>
              <LimitHint text={UI_TEXT.PROTECT.LIMITS.ADVANCED} hideIfPro={false} />
            </>
          )}
        </HStack>
        <Icon as={isOpen ? FaChevronUp : FaChevronDown} />
      </Button>

      <Collapsible.Root open={isOpen}>
        <Collapsible.Content>
          <VStack gap={6} align="stretch" pt={6}>
            {/* Owner password */}
            <Field.Root opacity={isPro ? 1 : 0.6}>
              <Field.Label>
                <HStack>
                  <Text>{UI_TEXT.PROTECT.OWNER_PASSWORD}</Text>
                  {!isPro && <ProLockIcon />}
                  {!isPro && (
                    <Badge colorScheme="red" size="sm">
                      {UI_TEXT.PROTECT.PRO_BADGE}
                    </Badge>
                  )}
                </HStack>
              </Field.Label>
              <Field.HelperText>{UI_TEXT.PROTECT.OWNER_PASSWORD_DESC}</Field.HelperText>
              <Input
                type="password"
                value={ownerPassword}
                onChange={(e) => isPro && onOwnerPasswordChange(e.target.value)}
                placeholder={UI_TEXT.PROTECT.OWNER_PASSWORD_PLACEHOLDER}
                disabled={!isPro}
              />
            </Field.Root>

            {/* Permissions */}
            <Box opacity={isPro ? 1 : 0.6}>
              <Text fontWeight="medium" mb={3}>
                {UI_TEXT.PROTECT.PERMISSIONS_TITLE}
              </Text>
              <VStack align="stretch" gap={2}>
                {permissionOptions.map((option) => (
                  <Checkbox.Root
                    key={option.key}
                    checked={permissions[option.key] || false}
                    onCheckedChange={() => onPermissionToggle(option.key)}
                    disabled={!isPro}
                  >
                    <Checkbox.Control />
                    <Checkbox.Label>
                      <HStack>
                        <Text>{option.label}</Text>
                        {!isPro && <ProLockIcon size={12} />}
                      </HStack>
                    </Checkbox.Label>
                  </Checkbox.Root>
                ))}
              </VStack>
            </Box>

            {/* Encryption strength */}
            <Box>
              <Text fontWeight="medium" mb={3}>
                {UI_TEXT.PROTECT.ENCRYPTION_TITLE}
              </Text>
              <VStack align="stretch" gap={3}>
                {encryptionOptions.map((option) => (
                  <Box
                    key={option.value}
                    p={4}
                    border="2px solid"
                    borderColor={encryptionStrength === option.value ? "pdf.red" : "gray.200"}
                    borderRadius="md"
                    cursor={option.isPro && !isPro ? "not-allowed" : "pointer"}
                    bg={encryptionStrength === option.value ? "red.50" : "white"}
                    opacity={option.isPro && !isPro ? 0.6 : 1}
                    onClick={() => {
                      if (!option.isPro || isPro) {
                        onEncryptionChange(option.value);
                      }
                    }}
                  >
                    <HStack justifyContent="space-between" mb={1}>
                      <HStack>
                        <Text fontWeight="medium" color="pdf.darkGray">
                          {option.title}
                        </Text>
                        {option.isPro && !isPro && <ProLockIcon />}
                      </HStack>
                      {option.isPro && (
                        <Badge colorScheme="red" size="sm">
                          {UI_TEXT.PROTECT.PRO_BADGE}
                        </Badge>
                      )}
                    </HStack>
                    <Text fontSize="sm" color="pdf.mediumGray">
                      {option.description}
                    </Text>
                  </Box>
                ))}
              </VStack>
            </Box>
          </VStack>
        </Collapsible.Content>
      </Collapsible.Root>
    </Box>
  );
};
