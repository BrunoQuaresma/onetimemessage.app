
type MessageId = string

type Message = {
  content: string
}

export async function createMessage(content: Message['content']): Promise<MessageId> {
  return "123"
}

export async function getMessageById(id: MessageId): Promise<Message['content']> {
  return "some"
}