import { z } from 'zod';

/**
 * Define o schema para todas as variáveis de ambiente necessárias para a aplicação.
 * Usamos Zod para garantir que a aplicação só inicie se todas as variáveis
 * essenciais estiverem presentes e com o formato correto (fail-fast).
 */

const envSchema = z.object({
  /** O ambiente em que a aplicação está rodando. */
  NODE_ENV: z.enum(['development', 'production']).default('development'),

  /** A porta em que o servidor Fastify irá escutar. */
  PORT: z.coerce.number().default(3001),

  /** O host em que o servidor Fastify irá escutar. '0.0.0.0' é ideal para Docker. */
  HOST: z.ipv4('Host inválido.').default('0.0.0.0'),

  /** A URL de conexão completa para o banco de dados PostgreSQL. */
  POSTGRES_URL: z.url(
    'A URL de conexão com o PostgreSQL deve ser válida e completa.'
  ),
});

// Valida as variáveis de ambiente usando safeParse para um controle de erro mais elegante.
const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  // Se a validação falhar, exibe um erro claro no console e encerra o processo.
  console.error(
    '❌ Erro ao validar as variáveis de ambiente:',
    parsedEnv.error.flatten().fieldErrors
  );
  // Encerra o processo com um código de erro. Essencial para ambientes de produção e CI/CD.
  process.exit(1);
}

// Exporta as variáveis de ambiente validadas e com a tipagem correta.
export const env = parsedEnv.data;
