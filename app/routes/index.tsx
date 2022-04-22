import { ActionFunction, json } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { createMessage } from "~/models/message.server";

type ActionData = {
  success: false,
  messageId: undefined
} | {
  success: true,
  messageId: string
}

export const action: ActionFunction = async ({ request }) => {
  const body = await request.formData();
  const content = body.get("content")?.toString()

  if(!content) {
    return json({ success: false })
  }

  const messageId = await createMessage(content);
  return json({ success: true, messageId  })
}

export default function Index() {
  const result = useActionData<ActionData>()

  return (
    <div>
      <Form method="post">
        <div>
          <label htmlFor="">Message</label>
          <textarea name="content" rows={10} />
        </div>

        <div>
          <button>Create</button>
        </div>
      </Form>

      {result && <div>
        {result.success === false && <div>Something wrong happened</div>}  
        {result.success === true && <div>The link for your message is https://onetimemessage.com/m/{result.messageId}</div>}  
      </div>}
    </div>
  );
}