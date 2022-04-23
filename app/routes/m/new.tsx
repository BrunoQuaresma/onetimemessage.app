import { Container, Textarea, Flex, Button } from "@chakra-ui/react";
import { ActionFunction, json } from "@remix-run/node";
import { useActionData, Form } from "@remix-run/react";
import { createMessage } from "~/models/message.server";

type ActionData =
  | {
      success: false;
      messageId: undefined;
    }
  | {
      success: true;
      messageId: string;
    };
    
export const action: ActionFunction = async ({ request }) => {
  const body = await request.formData();
  const content = body.get("content")?.toString();

  if (!content) {
    return json({ success: false });
  }

  const messageId = await createMessage(content);
  return json({ success: true, messageId });
};

export default function NewMessage() {
  const result = useActionData<ActionData>();

  if(!result) {
    throw new Error("Error on create a new message.")
  }

  return (
    <Container maxW="container.xl">
       <div>
          {result.success === false && <div>Something wrong happened</div>}
          {result.success === true && (
            <div>
              The link for your message is https://onetimemessage.com/m/
              <span data-testid="messageId">{result.messageId}</span>
            </div>
          )}
        </div>
    </Container>
  );
}