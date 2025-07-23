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
