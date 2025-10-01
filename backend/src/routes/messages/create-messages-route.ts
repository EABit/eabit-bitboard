import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import z from 'zod';
import { createMessages } from '../../functions/messages/create-messages.ts';

export const createMessagesRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/messages',
    {
      schema: {
        summary: 'Criar um novo recado',
        description: 'Cria um novo recado principal no mural.',
        tags: ['Messages'],
        operationId: 'createMessage',
        body: z.object({
          content: z.string().min(1, 'O conteúdo não pode ser vazio.'),
          authorName: z.string().min(1, 'O nome do autor não pode ser vazio.'),
        }),
        response: {
          201: z.object({
            id: z.uuid(),
            content: z.string(),
            authorName: z.string(),
            createdAt: z.date(),
          }),
          500: z.object({ message: z.string() }),
        },
      },
    },
    async (request, reply) => {
      try {
        const { content, authorName } = request.body;

        // Chama a função de lógica de negócio
        const { newMessage } = await createMessages({
          content,
          authorName,
        });

        return reply.status(201).send(newMessage);
      } catch (error) {
        console.error('Error creating message:', error);
        return reply.status(500).send({ message: 'Internal Server Error' });
      }
    }
  );
};
