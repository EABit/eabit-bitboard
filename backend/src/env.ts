import { inspect } from 'node:util';
import { z } from 'zod';

/**
 * Define o schema para todas as variáveis de ambiente necessárias para a aplicação.
 */
const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  PORT: z.coerce.number().default(3001),
  HOST: z.ipv4('Host inválido.').default('0.0.0.0'),
  POSTGRES_URL: z.url(
    'A URL de conexão com o PostgreSQL deve ser válida e completa.'
  ),
  CORS_ORIGIN: z
    .url('A origem do CORS deve ser uma URL válida.')
    .default('http://localhost:3000'),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error(
    '❌ Erro ao validar as variáveis de ambiente:',
    // Envolvemos o erro com inspect para forçar a exibição completa
    inspect(z.treeifyError(parsedEnv.error), { depth: null, colors: true })
  );
  process.exit(1);
}

export const env = parsedEnv.data;
