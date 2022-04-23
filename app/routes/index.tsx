import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Stack,
  Textarea,
  Text,
  VStack,
  Icon,
  HStack,
  Link,
  Badge,
} from "@chakra-ui/react";
import { Form, useTransition } from "@remix-run/react";
import { IconType } from "react-icons";
import { FiEye, FiGithub, FiKey, FiLock, FiShield } from "react-icons/fi";

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

export default function Index() {
  const transition = useTransition();
  
  return (
    <Container maxW="container.xl" px={6}>
      <Stack direction={{ base: "column", md: "row" }} spacing={20} py={{ base: 10, md: 20 }}>
        <Box w="full">
          <Form method="post" action="/m/new">
            <Textarea
              autoFocus
              name="content"
              rows={15}
              fontSize="2xl"
              placeholder="Type your secret message here..."
              border={0}
              _focus={{ outline: 0 }}
            />

            <Flex justifyContent="end" pt={8}>
              <Button
                isLoading={transition.state === "submitting"}
                type="submit"
                colorScheme="gray"
                bgColor="black"
                color="white"
                _hover={{ bgColor: "gray.700" }}
                _active={{ bgColor: "gray.700" }}
                _disabled={{ bgColor: "gray.600" }}
              >
                Create message
              </Button>
            </Flex>
          </Form>
        </Box>

        <Box w="full" maxW={{ md: "xs" }}>
          <VStack spacing={10}>
            <Feature icon={FiEye} title="One time read">
              After someone read your message, it will be deleted from our
              database. Good for share passwords and secrets.
            </Feature>

            <Feature icon={FiGithub} title="Open source">
              You can check our code and see if it address your security
              concerns. <Link fontWeight="bold">Checkout our repo.</Link>
            </Feature>

            <Feature icon={FiShield} title="Privacy">
              Free of user tracking like analytics and social ads.
            </Feature>

            <Feature icon={FiLock} title=" Encrypted data">
              We use AES encryption with a 4096-bit key.
            </Feature>

            <Feature icon={FiKey} title="Custom key" soon>
              If you don't want to use our encryption key, you can provide one.
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
}
