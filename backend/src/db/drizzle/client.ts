import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { env } from '../../env.ts';
import { schema } from './schema/index.ts';

export const pg = postgres(env.POSTGRES_URL);

export const db = drizzle(pg, {
  schema: { schema },
  casing: 'snake_case',
});
