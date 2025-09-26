import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const messages = pgTable('messages', {
  id: uuid('id').defaultRandom().primaryKey(),

  content: text('content').notNull(), // Ex.: "Poste 12"

  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
});
