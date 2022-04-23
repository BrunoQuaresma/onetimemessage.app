import {
  Container,
  Center,
  Text,
  Box,
  HStack,
  IconButton,
  Icon,
  useClipboard,
  Link,
} from "@chakra-ui/react";
import { ActionFunction, json, redirect } from "@remix-run/node";
import { useSearchParams } from "@remix-run/react";
import { FiCheck, FiCopy } from "react-icons/fi";
import { createMessage } from "~/models/message.server";

export const action: ActionFunction = async ({ request }) => {
  const body = await request.formData();
  const content = body.get("content")?.toString();

  if (!content) {
    return json({ success: false });
  }

  const messageId = await createMessage(content);
  return redirect(`/m/new?id=${messageId}`);
};

export default function NewMessage() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const copy = useClipboard(`https://onetimemessage.com/m/${id}`);

  if (!id) {
    throw new Error(
      "Error on create a new message. messageId not found in the URL."
    );
  }

  return (
    <Container maxW="container.xl" px={4} py={20}>
      <Center>
        <Box textAlign="center">
          <Text fontSize="2xl" display="block" fontWeight="bold">
            The link for your message is
          </Text>

          <HStack
            spacing={0}
            borderWidth={1}
            mt={4}
            maxW={{ base: 360, md: "100%" }}
          >
            <Box
              py={2}
              pl={3}
              display="block"
              letterSpacing="wider"
              userSelect="all"
              color="gray.700"
              whiteSpace="nowrap"
              overflowX="auto"
            >
              https://onetimemessage.com/m/
              <span data-testid="messageId">{id}</span>
            </Box>
            <Box p={2}>
              <IconButton
                disabled={copy.hasCopied}
                onClick={copy.onCopy}
                size="sm"
                icon={
                  copy.hasCopied ? <Icon as={FiCheck} /> : <Icon as={FiCopy} />
                }
                aria-label="Copy message url"
              />
            </Box>
          </HStack>

          <Box mt={4}>
            <Link fontWeight="medium" href="/">
              Create a new message
            </Link>
          </Box>

          <Box as="footer" w="full" fontSize="sm" color="gray.600" mt={20} py={4}>
              Made by{" "}
              <Link
                href="https://twitter.com/bruno__quaresma"
                fontWeight="bold"
              >
                @bruno__quaresma
              </Link>
            </Box>
        </Box>
      </Center>
    </Container>
  );
}
