"use client";

import { Button, ButtonProps } from "@chakra-ui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavLinkItemProps = {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
  leftIcon?: React.ReactElement;
} & Omit<ButtonProps, "as" | "href" | "leftIcon">;

/**
 * Navigation link component that handles active states
 */
export const NavLinkItem = ({
  href,
  children,
  isActive: isActiveProp,
  onClick,
  ...buttonProps
}: NavLinkItemProps) => {
  const pathname = usePathname();
  const isActive = isActiveProp ?? pathname === href;

  return (
    <Link href={href} passHref>
      <Button
        variant="ghost"
        size="sm"
        color={isActive ? "pdf.red" : "pdf.mediumGray"}
        fontWeight={isActive ? "semibold" : "normal"}
        _hover={{
          color: "pdf.darkGray",
          bg: "pdf.lightGray",
        }}
        _active={{
          bg: "pdf.lightGray",
        }}
        aria-current={isActive ? "page" : undefined}
        onClick={onClick}
        {...buttonProps}
      >
        {children}
      </Button>
    </Link>
  );
};
