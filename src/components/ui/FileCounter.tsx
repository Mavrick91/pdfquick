import { Text, HStack } from "@chakra-ui/react";

import { LimitCounter } from "@/components/common";

type FileCounterProps = {
  count: number;
  label: (count: number) => string;
  max?: number;
  showLimit?: boolean;
};

export const FileCounter = ({ count, label, max, showLimit = false }: FileCounterProps) => {
  return (
    <HStack mb={3}>
      <Text fontWeight="medium" color="pdf.darkGray">
        {label(count)}
      </Text>
      {showLimit && max && <LimitCounter current={count} max={max} hideIfPro={false} />}
    </HStack>
  );
};
