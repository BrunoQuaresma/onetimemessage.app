import { LoaderFunction, json } from "@remix-run/node";
import { getMessageContentById } from "~/models/message.server";

export const loader: LoaderFunction = async ({ params }) => {
  const { messageId = "" } = params;
  const content = await getMessageContentById(messageId);

  if (!content) {
    throw new Response("Not found", { status: 404 });
  }

  return json({ content });
};
