import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { env } from '../../env.ts';
import { messages } from './schema/messages.ts';

export const pg = postgres(env.POSTGRES_URL);

export const db = drizzle(pg, {
  schema: { messages },
  casing: 'snake_case',
});
