import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import z from 'zod';

export const getHealthRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    '/health',
    {
      schema: {
        summary: 'Health Route',
        description: 'Informs health of system',
        tags: ['Health'],
        operationId: 'getHealth',
        response: {
          200: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (_request, reply) => {
      return reply.status(200).send({ message: 'BitBoard API is online...' });
    }
  );
};