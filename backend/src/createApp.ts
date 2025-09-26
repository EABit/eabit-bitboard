import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { fastifyCors } from '@fastify/cors';
import fastifyStatic from '@fastify/static';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import { fastify } from 'fastify';
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod';
import { routes } from './routes/routes.ts';

export function createApp() {
  const app = fastify({
    logger: {
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
    origin: true,
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

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  app.register(fastifyStatic, {
    root: path.join(process.cwd(), 'public'),
    prefix: '/',
    decorateReply: false, // evita colisões com outros handlers
    setHeaders(res, filePath) {
      // permitir apenas imagens e ícones
      if (!/\.(png|jpg|jpeg|gif|svg|ico)$/i.test(filePath)) {
        res.statusCode = 403;
      }
    },
  });

  for (const route of routes) {
    app.register(route, { prefix: '/v1' });
  }

  return app;
}
