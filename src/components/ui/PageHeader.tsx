import { VStack, Heading, Text } from "@chakra-ui/react";

type PageHeaderProps = {
  title: string;
  description: string;
};

export const PageHeader = ({ title, description }: PageHeaderProps) => {
  return (
    <VStack gap={2} align="start">
      <Heading size="xl" color="pdf.darkGray">
        {title}
      </Heading>
      <Text color="pdf.mediumGray" fontSize="lg">
        {description}
      </Text>
    </VStack>
  );
};
