import { json, LoaderFunction, Response } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { errors } from "faunadb";
import { getMessageContentById } from "~/models/message.server";

export const loader: LoaderFunction = async ({ params }) => {
  const { messageId = "" } = params;
  const content = await getMessageContentById(messageId);

  if (!content) {
    throw new Response("Not found", { status: 404 });
  }

  return json({ content });
};

export default function Message() {
  const data = useLoaderData<{ content: string }>();

  return <div>{data.content}</div>;
}
