import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';
import { user } from './auth-schema';

export const game = pgTable('game', {
  id: serial('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  attempts: integer('attempts').notNull().default(0),
  input_tokens: integer('input_tokens').notNull().default(0),
  output_tokens: integer('output_tokens').notNull().default(0),
  total_tokens: integer('total_tokens').notNull().default(0),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull(),
});

export type GameType = typeof game.$inferSelect;
