import { z } from 'zod';

const envSchema = z.object({
  PORT: z.coerce.number().default(3333),
  HOST: z.ipv4(),
  POSTGRES_URL: z.url(),
});

export const env = envSchema.parse(process.env);