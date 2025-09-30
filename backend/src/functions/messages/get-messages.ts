import { db } from '../../db/drizzle/client.ts';

export async function getMessages() {
  const messages = await db.query.messages.findMany({
    with: {
      replies: true,
    },
    orderBy: (messages, { desc }) => [desc(messages.createdAt)],
  });

  return { messages };
}
