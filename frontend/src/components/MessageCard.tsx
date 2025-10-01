import type { Message } from '@/lib/types';

interface MessageCardProps {
  message: Message;
}

export function MessageCard({ message }: MessageCardProps) {
  // Função simples para formatar a data para o padrão brasileiro
  const formattedDate = new Date(message.createdAt).toLocaleDateString(
    'pt-BR',
    {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }
  );

  return (
    <article className='rounded-xl border border-blue-900 bg-white p-6 shadow-md'>
      {/* Cabeçalho do Recado */}
      <header className='flex items-center justify-between'>
        <p className='font-semibold text-blue-850'>{message.authorName}</p>
        <time className='text-sm text-gray-550'>{formattedDate}</time>
      </header>

      {/* Conteúdo do Recado */}
      <p className='my-4 text-gray-600'>{message.content}</p>

      {/* Seção de Respostas */}
      {message.replies.length > 0 && (
        <div className='mt-4 border-t border-gray-400 pt-4'>
          <h3 className='mb-3 text-sm font-semibold text-gray-600'>
            Respostas ({message.replies.length})
          </h3>
          <div className='space-y-4'>
            {message.replies.map(reply => {
              const replyFormattedDate = new Date(
                reply.createdAt
              ).toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: 'short',
                hour: '2-digit',
                minute: '2-digit',
              });

              return (
                <div key={reply.id} className='ml-4 rounded-lg bg-gray-50 p-4'>
                  <header className='flex items-center justify-between'>
                    <p className='font-semibold text-sm text-blue-850'>
                      {reply.authorName}
                    </p>
                    <time className='text-xs text-gray-550'>
                      {replyFormattedDate}
                    </time>
                  </header>
                  <p className='mt-2 text-sm text-gray-600'>{reply.content}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TODO: Futuramente, adicionar aqui o formulário para criar uma nova resposta */}
    </article>
  );
}
