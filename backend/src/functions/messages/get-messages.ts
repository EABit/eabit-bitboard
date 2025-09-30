import { db } from '../../db/drizzle/client.ts';
import { schema } from '../../db/drizzle/schema/index.ts';

export async function getMessages() {
  const result = await db.select().from(schema.messages);

  const messagesList = result.map(message => ({
    id: message.id,
    content: message.content,
    authorName: message.authorName,
    createdAt: message.createdAt,
    replies: [],
  }));

  return { messagesList };
}
