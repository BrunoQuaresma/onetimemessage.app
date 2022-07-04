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
import { ActionFunction, json } from "@remix-run/node";
import { useActionData } from "@remix-run/react";
import { FiCheck, FiCopy } from "react-icons/fi";
import { WEBSITE_URL } from "~/constants";
import { createMessage } from "~/models/message.server";

export const action: ActionFunction = async ({ request }) => {
  const body = await request.formData();
  const encryptedMessage = body.get("encryptedMessage")?.toString();
  const key = body.get("key")?.toString();

  if (!encryptedMessage || !key) {
    return json({ success: false });
  }

  const messageId = await createMessage(encryptedMessage);

  return json({ messageId, key });
};

export default function NewMessage() {
  const data = useActionData<{ messageId: string; key: string }>();
  const id = data?.messageId;
  const key = data?.key;
  const messageLink = `${WEBSITE_URL}/m/${id}#${key}`;
  const copy = useClipboard(messageLink);

  if (!id) {
    throw new Error("Error on create a new message, messageId not found.");
  }

  if (!key) {
    throw new Error("No key found.");
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
            maxW={{ base: 360, md: 480 }}
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
              data-testid="link"
            >
              {messageLink}
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

          <Box mt={4} fontSize="sm" color="gray.700">
            Do you want to create another message?{" "}
            <Link fontWeight="medium" href="/" color="blue.600">
              Create a new message
            </Link>
          </Box>

          <Box
            as="footer"
            w="full"
            fontSize="sm"
            color="gray.600"
            mt={20}
            py={4}
          >
            Made by{" "}
            <Link href="https://twitter.com/bruno__quaresma" fontWeight="bold">
              @bruno__quaresma
            </Link>
          </Box>
        </Box>
      </Center>
    </Container>
  );
}
