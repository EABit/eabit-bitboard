import { fastifyCors } from '@fastify/cors';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import { fastify } from 'fastify';
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod';
import { env } from './env.ts';
import { routes } from './routes/routes.ts';

export function createApp() {
  const isProduction = env.NODE_ENV === 'production';

  const app = fastify({
    logger: isProduction
      ? true // Logger JSON padrão em produção
      : {
          // Pino Pretty em desenvolvimento
          transport: {
            target: 'pino-pretty',
            options: {
              colorize: true,
              translateTime: 'SYS:yyyy-mm-dd HH:MM:ss.l',
              ignore: 'pid, hostname',
            },
          },
        },
  }).withTypeProvider<ZodTypeProvider>();

  app.setSerializerCompiler(serializerCompiler);
  app.setValidatorCompiler(validatorCompiler);

  app.register(fastifyCors, {
    origin: env.CORS_ORIGIN, // Continua lendo do .env

    // Adiciona a lista explícita de métodos permitidos
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  });

  app.register(fastifySwagger, {
    openapi: {
      info: {
        title: 'BitBoard API',
        description: 'API for BitBoard',
        version: '1.0.0',
      },
    },
    transform: jsonSchemaTransform,
  });

  app.register(fastifySwaggerUi, {
    routePrefix: '/docs',
  });

  for (const route of routes) {
    app.register(route, { prefix: '/v1' });
  }

  return app;
}
