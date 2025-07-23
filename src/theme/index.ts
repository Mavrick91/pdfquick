import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const customConfig = defineConfig({
  theme: {
    tokens: {
      fonts: {
        heading: { value: "var(--font-geist-sans), sans-serif" },
        body: { value: "var(--font-geist-sans), sans-serif" },
        mono: { value: "var(--font-geist-mono), monospace" },
      },
      colors: {
        brand: {
          50: { value: "#e6f2ff" },
          100: { value: "#b3d9ff" },
          200: { value: "#80bfff" },
          300: { value: "#4da6ff" },
          400: { value: "#1a8cff" },
          500: { value: "#0073e6" },
          600: { value: "#005bb3" },
          700: { value: "#004480" },
          800: { value: "#002d4d" },
          900: { value: "#00161a" },
        },
        pdf: {
          red: { value: "#dc2626" },
          darkGray: { value: "#111827" },
          mediumGray: { value: "#6b7280" },
          lightGray: { value: "#f9fafb" },
          borderGray: { value: "#e5e7eb" },
          successGreen: { value: "#10b981" },
        },
      },
      shadows: {
        xs: { value: "0 1px 2px 0 rgba(0, 0, 0, 0.05)" },
        sm: { value: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)" },
        md: { value: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)" },
        lg: { value: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)" },
        xl: { value: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)" },
      },
    },
    semanticTokens: {
      colors: {
        "chakra-body-bg": {
          _light: { value: "{colors.white}" },
          _dark: { value: "{colors.gray.900}" },
        },
        "chakra-body-text": {
          _light: { value: "{colors.gray.800}" },
          _dark: { value: "{colors.gray.100}" },
        },
        "chakra-border-color": {
          _light: { value: "{colors.gray.200}" },
          _dark: { value: "{colors.gray.700}" },
        },
      },
    },
  },
  globalCss: {
    "html, body": {
      fontFamily: "body",
      bg: "chakra-body-bg",
      color: "chakra-body-text",
      transitionProperty: "background-color",
      transitionDuration: "200ms",
      lineHeight: "base",
    },
    "*::placeholder": {
      color: "chakra-placeholder-color",
    },
    "*, *::before, *::after": {
      borderColor: "chakra-border-color",
    },
  },
});

export const system = createSystem(defaultConfig, customConfig);
