"use client";

import { Icon, Tooltip } from "@chakra-ui/react";
import { FaLock } from "react-icons/fa";

type ProLockIconProps = {
  /**
   * Tooltip text
   * @default "Pro feature"
   */
  tooltip?: string;
  /**
   * Icon size
   * @default 14
   */
  size?: number;
  /**
   * Color
   * @default "pdf.red"
   */
  color?: string;
};

/**
 * Small lock icon to indicate Pro-only features
 * Shows tooltip on hover
 */
export const ProLockIcon = ({
  tooltip = "Pro feature",
  size = 14,
  color = "pdf.red",
}: ProLockIconProps) => {
  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <span>
          <Icon as={FaLock} boxSize={`${size}px`} color={color} ml={1} />
        </span>
      </Tooltip.Trigger>
      <Tooltip.Positioner>
        <Tooltip.Content>
          <Tooltip.Arrow>
            <Tooltip.ArrowTip />
          </Tooltip.Arrow>
          {tooltip}
        </Tooltip.Content>
      </Tooltip.Positioner>
    </Tooltip.Root>
  );
};
