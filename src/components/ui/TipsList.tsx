import { VStack, Text } from "@chakra-ui/react";

type TipsListProps = {
  title?: string;
  tips: readonly string[];
};

export const TipsList = ({ title = "Tips:", tips }: TipsListProps) => {
  return (
    <VStack align="start" gap={2}>
      <Text fontWeight="semibold" color="pdf.darkGray">
        {title}
      </Text>
      <VStack align="start" gap={1} pl={4}>
        {tips.map((tip, index) => (
          <Text key={index} fontSize="sm" color="pdf.mediumGray">
            • {tip}
          </Text>
        ))}
      </VStack>
    </VStack>
  );
};
