import { Button, Flex, Textarea } from "@chakra-ui/react";
import { Form, useTransition } from "@remix-run/react";
import { TwoColumnsLayout } from "~/layouts/TwoColumnsLayout";

export default function Index() {
  const transition = useTransition();

  return (
    <TwoColumnsLayout>
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
    </TwoColumnsLayout>
  );
}
