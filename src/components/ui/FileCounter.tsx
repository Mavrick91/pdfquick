import { Text } from "@chakra-ui/react";

type FileCounterProps = {
  count: number;
  label: (count: number) => string;
};

export const FileCounter = ({ count, label }: FileCounterProps) => {
  return (
    <Text fontWeight="medium" color="pdf.darkGray" mb={3}>
      {label(count)}
    </Text>
  );
};
