import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import z from 'zod';
import { getMessages } from '../../functions/messages/get-messages.ts';

export const getMessagesRoute: FastifyPluginAsyncZod = async app => {
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
      const { messages } = await getMessages();

      return reply.status(200).send({ messages });
    }
  );
};
