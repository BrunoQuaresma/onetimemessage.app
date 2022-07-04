import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { Form, FormProps, useSubmit, useTransition } from "@remix-run/react";
import { useRef } from "react";
import { TwoColumnsLayout } from "~/layouts/TwoColumnsLayout";
import cryptoRandomString from "crypto-random-string";
import { encrypt } from "~/encryption";

export default function Index() {
  const transition = useTransition();
  const defaultKey = useRef(
    cryptoRandomString({ length: 128, type: "url-safe" })
  );
  const submit = useSubmit();

  const handleSubmit: FormProps["onSubmit"] = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const message = formData.get("message")?.toString();
    const key = formData.get("key")?.toString();
    if (!message) {
      throw new Error("Message is not defined.");
    }
    if (!key) {
      throw new Error("Key is not defined.");
    }
    const submitFormData = new FormData();
    submitFormData.set("encryptedMessage", encrypt(message, key));
    submitFormData.set("key", key);
    submit(submitFormData, {
      method: "post",
      action: `/m/new`,
    });
  };

  return (
    <TwoColumnsLayout>
      <Form onSubmit={handleSubmit}>
        <VStack spacing={6}>
          <FormControl>
            <FormLabel>Secret message</FormLabel>
            <Textarea
              required
              autoFocus
              name="message"
              rows={10}
              fontSize="2xl"
              placeholder="Type your secret message here..."
            />
          </FormControl>

          <FormControl>
            <FormLabel>Encryption key</FormLabel>
            <Textarea
              required
              name="key"
              rows={3}
              fontSize="lg"
              placeholder="Type your secret message here..."
              defaultValue={defaultKey.current}
            />
          </FormControl>

          <Flex justifyContent="end" w="full">
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
        </VStack>
      </Form>
    </TwoColumnsLayout>
  );
}
