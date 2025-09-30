import { relations } from 'drizzle-orm';
import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const messages = pgTable('messages', {
  id: uuid('id').primaryKey().defaultRandom(),
  content: text('content').notNull(),
  authorName: text('author_name').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const replies = pgTable('replies', {
  id: uuid('id').primaryKey().defaultRandom(),
  content: text('content').notNull(),
  authorName: text('author_name').notNull(),
  messageId: uuid('messageId')
    .notNull()
    .references(() => messages.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
});

// Relações devem estar no mesmo arquivo e ser exportadas
export const messagesRelations = relations(messages, ({ many }) => ({
  replies: many(replies),
}));

export const repliesRelations = relations(replies, ({ one }) => ({
  message: one(messages, {
    fields: [replies.messageId],
    references: [messages.id],
  }),
}));
