import {
  Collection,
  Create,
  Delete,
  Do,
  errors,
  Get,
  Let,
  Ref,
  Select,
  Var,
} from "faunadb";
import { db, Doc } from "~/db.server";

type MessageId = string;
type Message = { content: string };
type MessageDoc = Doc<Message>;

export async function createMessage(
  content: Message["content"]
): Promise<MessageId> {
  const messageDoc = await db.query<MessageDoc>(
    Create(Collection("messages"), { data: { content } })
  );
  return messageDoc.ref.id;
}

export async function getMessageContentById(
  id: MessageId
): Promise<string | undefined> {
  try {
    const [_, content] = await db.query<[any, Message["content"]]>(
      Let(
        {
          messageDoc: Get(Ref(Collection("messages"), id)),
          messageContent: Select(["data", "content"], Var("messageDoc")),
        },
        Do([Delete(Select("ref", Var("messageDoc"))), Var("messageContent")])
      )
    );

    return content;
  } catch (error) {
    if (error instanceof errors.NotFound) {
      return undefined;
    }

    throw error;
  }
}
