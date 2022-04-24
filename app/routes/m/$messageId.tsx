import {
  Box,
  Center,
  Container,
  Heading,
  Link,
  Spinner,
  VStack,
  Text,
} from "@chakra-ui/react";
import { useFetcher, useParams } from "@remix-run/react";
import { useEffect } from "react";
import { TwoColumnsLayout } from "~/layouts/TwoColumnsLayout";

export function CatchBoundary() {
  return (
    <Container px={4} maxW="lg">
      <Center py={20}>
        <VStack textAlign="center" spacing={8}>
          <img
            src="/images/nedry-gif.webp"
            alt='Nedry from Jurassic Park saying "no no no"'
          />
          <Heading fontSize="2xl" lineHeight="short">
            Sorry, we couldn't find your message. Either the link is wrong or
            the message has already been read.
          </Heading>
          <Box mt={4}>
            <Link fontWeight="medium" href="/">
              Create a new one time message
            </Link>
          </Box>
        </VStack>
      </Center>

      <Box
        as="footer"
        w="full"
        fontSize="sm"
        color="gray.600"
        mt={20}
        py={4}
        textAlign="center"
      >
        Made by{" "}
        <Link href="https://twitter.com/bruno__quaresma" fontWeight="bold">
          @bruno__quaresma
        </Link>
      </Box>
    </Container>
  );
}

export default function Message() {
  const message = useFetcher<{ content: string }>();
  const params = useParams();
  const messageId = params["messageId"];

  if (!messageId) {
    throw new Error("Param messageId not found");
  }

  useEffect(() => {
    message.load(`/api/messages/${messageId}`);
  }, []);

  if (!message.data) {
    return (
      <Center w="100vw" h="100vh">
        <Spinner />
      </Center>
    );
  }

  return (
    <TwoColumnsLayout>
      <Text
        textTransform="uppercase"
        letterSpacing="wider"
        fontWeight="bold"
        fontSize="xs"
      >
        Message
      </Text>
      <Text fontSize="2xl" mt={4}>
        {message.data.content}
      </Text>
      <Box mt={20} fontSize="sm">
        Do you want to create a new one time message?{" "}
        <Link fontWeight="bold" href="/">
          Create one here.
        </Link>
      </Box>
    </TwoColumnsLayout>
  );
}
