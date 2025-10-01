import { db } from '../../db/drizzle/client.ts';
import { messages } from '../../db/drizzle/schema/schema.ts';

// A interface agora inclui o userId
interface CreateMessagesParams {
  content: string;
  authorName: string;
}

export async function createMessages({
  content,
  authorName,
}: CreateMessagesParams) {
  const [newMessage] = await db
    .insert(messages)
    .values({
      content,
      authorName,
    })
    .returning(); // Retorna o objeto completo

  // Retorna o objeto completo, não apenas o ID
  return { newMessage };
}
