import {
  Container,
  Center,
  Text,
  Box,
  HStack,
  IconButton,
  Icon,
  useClipboard,
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
          <Text fontSize="xl" display="block" fontWeight="bold">
            The link for your message is
          </Text>
          <HStack spacing={3} borderWidth={1} p={2} pl={3} mt={2}>
            <Text
              display="block"
              letterSpacing="wider"
              userSelect="all"
              color="gray.700"
            >
              https://onetimemessage.com/m/
              <span data-testid="messageId">{id}</span>
            </Text>
            <IconButton
              disabled={copy.hasCopied}
              onClick={copy.onCopy}
              size="sm"
              icon={
                copy.hasCopied ? <Icon as={FiCheck} /> : <Icon as={FiCopy} />
              }
              aria-label="Copy message url"
            />
          </HStack>
        </Box>
      </Center>
    </Container>
  );
}
