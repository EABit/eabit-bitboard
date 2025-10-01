import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import z from 'zod';
import { deleteReplies } from '../../functions/replies/delete-replies.ts';

export const deleteRepliesRoute: FastifyPluginAsyncZod = async app => {
  app.delete(
    '/replies/:id',
    {
      schema: {
        summary: 'Deletar uma resposta',
        description: 'Deleta uma resposta específica pelo seu ID.',
        tags: ['Replies'],
        operationId: 'deleteReplyById',
        params: z.object({
          id: z.uuid('O ID da resposta deve ser um UUID válido.'),
        }),
        response: {
          204: z.null(),
          404: z.object({ message: z.string() }),
          500: z.object({ message: z.string() }),
        },
      },
    },
    async (request, reply) => {
      try {
        const { id } = request.params;

        const wasDeleted = await deleteReplies({ id });

        if (!wasDeleted) {
          return reply.status(404).send({ message: 'Message not found.' });
        }

        return reply.status(204).send();
      } catch (error) {
        console.error('Error deleting message:', error);

        return reply.status(500).send({ message: 'Internal Server Error.' });
      }
    }
  );
};
