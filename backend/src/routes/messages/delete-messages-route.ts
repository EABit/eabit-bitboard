import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import z from 'zod';
import { deleteMessages } from '../../functions/messages/delete-messages.ts';

export const deleteMessagesRoute: FastifyPluginAsyncZod = async app => {
  app.delete(
    '/messages/:id',
    {
      schema: {
        summary: 'Deletar um recado',
        description: 'Deleta um recado específico pelo seu ID.',
        tags: ['Messages'],
        operationId: 'deleteMessageById',
        params: z.object({
          id: z.string().uuid('O ID do recado deve ser um UUID válido.'),
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

        const wasDeleted = await deleteMessages({ id });

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
