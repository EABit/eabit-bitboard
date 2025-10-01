import { db } from '../../db/drizzle/client.ts';
import { replies } from '../../db/drizzle/schema/schema.ts';

// A interface agora inclui o userId
interface CreateRepliesParams {
  content: string;
  authorName: string;
  messageId: string;
}

export async function createReplies({
  content,
  authorName,
  messageId,
}: CreateRepliesParams) {
  const [newReply] = await db
    .insert(replies)
    .values({
      content,
      authorName,
      messageId,
    })
    .returning();

  // Retorna o objeto completo diretamente
  return { newReply };
}
