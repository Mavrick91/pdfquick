"use client";

import { Button, Icon } from "@chakra-ui/react";
import Link from "next/link";
import { FaHome } from "react-icons/fa";

/**
 * Reusable button that navigates back to the landing page.
 * Lives as a client component so interactive behaviour is allowed.
 */
export const HomeButton = () => {
  return (
    <Link href="/" passHref>
      <Button
        variant="ghost"
        size="sm"
        color="pdf.mediumGray"
        _hover={{ color: "pdf.darkGray" }}
        width="auto"
      >
        <Icon as={FaHome} mr={2} />
        Home
      </Button>
    </Link>
  );
};
