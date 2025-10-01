import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import z from 'zod';
import { createReplies } from '../../functions/replies/create-replies.ts';

export const createRepliesRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/messages/:messageId/replies',
    {
      schema: {
        summary: 'Adicionar uma resposta a um recado',
        description: 'Cria uma nova resposta vinculada a um recado específico.',
        tags: ['Replies'],
        operationId: 'createReplyForMessage',
        params: z.object({
          messageId: z.uuid('O ID do recado deve ser um UUID válido.'),
        }),
        body: z.object({
          content: z
            .string()
            .min(1, 'O conteúdo da resposta não pode ser vazio.'),
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
        const { messageId } = request.params;

        const { newReply } = await createReplies({
          content,
          authorName,
          messageId,
        });

        return reply.status(201).send(newReply);
      } catch (error) {
        console.error('Error creating reply:', error);
        return reply.status(500).send({ message: 'Internal Server Error' });
      }
    }
  );
};
