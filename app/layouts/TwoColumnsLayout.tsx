import {
  Box,
  HStack,
  Icon,
  Heading,
  Badge,
  Container,
  Stack,
  VStack,
  Text,
  Link,
} from "@chakra-ui/react";
import React from "react";
import { IconType } from "react-icons";
import { FiEye, FiGithub, FiShield, FiLock } from "react-icons/fi";

const Feature: React.FC<{ title: string; icon: IconType; soon?: boolean }> = ({
  title,
  children,
  icon,
  soon,
}) => {
  return (
    <Box w="full">
      <HStack spacing={2}>
        <Icon as={icon} fontSize="lg" color="gray.600" />
        <Heading as="h2" fontSize="md">
          {title}
        </Heading>
        {soon && <Badge colorScheme="teal">Soon</Badge>}
      </HStack>
      <Text color="gray.600" mt={2} fontSize="sm">
        {children}
      </Text>
    </Box>
  );
};

export const TwoColumnsLayout: React.FC = ({ children }) => {
  return (
    <Container maxW="container.xl" px={6}>
      <Stack
        direction={{ base: "column", md: "row" }}
        spacing={20}
        py={{ base: 10, md: 20 }}
      >
        <Box w="full">{children}</Box>

        <Box w="full" maxW={{ md: "xs" }}>
          <VStack spacing={10}>
            <Feature icon={FiEye} title="One time read">
              After someone has read your message, it will be deleted from our
              database. Good for sharing passwords and secrets.
            </Feature>

            <Feature icon={FiGithub} title="Open source">
              You can check our code and see if it address your security
              concerns.{" "}
              <Link
                fontWeight="bold"
                href="https://github.com/BrunoQuaresma/onetimemessage.app"
              >
                Checkout our repo.
              </Link>
            </Feature>

            <Feature icon={FiLock} title=" Encrypted data">
              We use AES encryption with a secret key provided by you.
            </Feature>

            <Feature icon={FiShield} title="100% Privacy">
              Free of user tracking like analytics and social ads.
            </Feature>

            <Box w="full" fontSize="sm" color="gray.600">
              Made by{" "}
              <Link
                href="https://twitter.com/bruno__quaresma"
                fontWeight="bold"
              >
                @bruno__quaresma
              </Link>
            </Box>
          </VStack>
        </Box>
      </Stack>
    </Container>
  );
};
