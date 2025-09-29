import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import z from 'zod';

export const getMessages: FastifyPluginAsyncZod = async app => {
  app.get(
    '/messages',
    {
      schema: {
        summary: 'Listar todos os recados', // CORRIGIDO
        description:
          'Retorna uma lista de todos os recados principais. Para facilitar a exibição no frontend, cada objeto de recado já virá com um array aninhado de suas respectivas respostas.',
        tags: ['Messages'],
        operationId: 'getMessages',
        response: {
          200: z.object({
            messages: z.array(
              z.object({
                id: z.string(),
                content: z.string(),
                authorName: z.string(),
                createdAt: z.date(),
                replies: z.array(
                  z.object({
                    id: z.string(),
                    content: z.string(),
                    authorName: z.string(),
                    createdAt: z.date(),
                  })
                ),
              })
            ),
          }),
        },
      },
    },
    async (_request, reply) => {
      const messages = [
        {
          id: 'a1b2c3d4-1234-5678-9abc-def012345678',
          content: 'Bem-vindo ao BitBoard! Este é o primeiro recado.',
          authorName: 'Roberto Zanin',
          createdAt: new Date(),
          replies: [
            {
              id: 'e1f2g3h4-5678-1234-9def-abc012345678',
              content: 'Ótima iniciativa! O projeto parece promissor.',
              authorName: 'Dev Sênior',
              createdAt: new Date(),
            },
          ],
        },
        {
          id: 'a1b2c3d4-1234-5678-9abc-def012345689',
          content: 'Bem-vindo ao BitBoard! Este é o segundo recado.',
          authorName: 'Aline Cristina',
          createdAt: new Date(),
          replies: [],
        },
      ];

      return reply.status(200).send({ messages });
    }
  );
};
