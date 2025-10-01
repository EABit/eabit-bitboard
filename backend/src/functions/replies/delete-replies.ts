import { eq } from 'drizzle-orm';
import { db } from '../../db/drizzle/client.ts';
import { replies } from '../../db/drizzle/schema/schema.ts';

interface DeleteRepliesParams {
  id: string;
}

export async function deleteReplies({ id }: DeleteRepliesParams) {
  const result = await db
    .delete(replies)
    .where(eq(replies.id, id))
    .returning({ id: replies.id });

  return result.length > 0;
}
