import { eq } from 'drizzle-orm';
import { db } from '../../db/drizzle/client.ts';
import { messages } from '../../db/drizzle/schema/schema.ts';

interface DeleteMessagesParams {
  id: string;
}

export async function deleteMessages({ id }: DeleteMessagesParams) {
  const result = await db
    .delete(messages)
    .where(eq(messages.id, id))
    .returning({ id: messages.id });

  return result.length > 0;
}
