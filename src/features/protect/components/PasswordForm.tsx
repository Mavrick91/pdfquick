"use client";

import { VStack, Input, IconButton, Text, Progress, HStack, Box, Field } from "@chakra-ui/react";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { UI_TEXT } from "@/lib/constants";

import { usePasswordStrength } from "../hooks/usePasswordStrength";

type PasswordFormProps = {
  userPassword: string;
  confirmPassword: string;
  onPasswordChange: (value: string) => void;
  onConfirmChange: (value: string) => void;
};

export const PasswordForm = ({
  userPassword,
  confirmPassword,
  onPasswordChange,
  onConfirmChange,
}: PasswordFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const passwordStrength = usePasswordStrength(userPassword);
  const passwordsMatch = confirmPassword === "" || userPassword === confirmPassword;

  return (
    <Box bg="white" p={6} borderRadius="12px" border="1px solid" borderColor="pdf.borderGray">
      <VStack gap={4} align="stretch">
        {/* Password field */}
        <Field.Root required>
          <Field.Label>{UI_TEXT.PROTECT.PASSWORD_LABEL}</Field.Label>
          <HStack>
            <Input
              type={showPassword ? "text" : "password"}
              value={userPassword}
              onChange={(e) => onPasswordChange(e.target.value)}
              placeholder={UI_TEXT.PROTECT.PASSWORD_PLACEHOLDER}
              flex={1}
            />
            <IconButton
              aria-label={showPassword ? "Hide password" : "Show password"}
              size="sm"
              variant="ghost"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </IconButton>
          </HStack>
        </Field.Root>

        {/* Password strength meter */}
        {userPassword && (
          <Box>
            <HStack justifyContent="space-between" mb={2}>
              <Text fontSize="sm" color="pdf.mediumGray">
                Password strength:
              </Text>
              <Text fontSize="sm" fontWeight="medium" color={passwordStrength.color}>
                {passwordStrength.label}
              </Text>
            </HStack>
            <Progress.Root value={passwordStrength.percentage} size="xs">
              <Progress.Track bg="gray.200">
                <Progress.Range bg={passwordStrength.color} />
              </Progress.Track>
            </Progress.Root>
          </Box>
        )}

        {/* Confirm password field */}
        <Field.Root required invalid={!passwordsMatch}>
          <Field.Label>{UI_TEXT.PROTECT.PASSWORD_CONFIRM}</Field.Label>
          <HStack>
            <Input
              type={showConfirm ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => onConfirmChange(e.target.value)}
              placeholder={UI_TEXT.PROTECT.PASSWORD_CONFIRM_PLACEHOLDER}
              flex={1}
            />
            <IconButton
              aria-label={showConfirm ? "Hide password" : "Show password"}
              size="sm"
              variant="ghost"
              onClick={() => setShowConfirm(!showConfirm)}
            >
              {showConfirm ? <FaEyeSlash /> : <FaEye />}
            </IconButton>
          </HStack>
          {!passwordsMatch && confirmPassword && (
            <Field.ErrorText>{UI_TEXT.PROTECT.PASSWORD_MISMATCH}</Field.ErrorText>
          )}
        </Field.Root>
      </VStack>
    </Box>
  );
};
