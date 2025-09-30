import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { env } from '../../env.ts';
import * as schema from './schema/schema.ts'; // A importação correta

export const queryClient = postgres(env.POSTGRES_URL);

// O objeto 'schema' completo deve ser passado aqui
export const db = drizzle(queryClient, { schema });
