"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { ThemeProvider } from "next-themes";
import { system } from "@/theme";

type ProviderProps = {
  children: React.ReactNode;
};

export const Provider = ({ children }: ProviderProps) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <ChakraProvider value={system}>{children}</ChakraProvider>
    </ThemeProvider>
  );
};
