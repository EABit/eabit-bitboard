'use client';

import { Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { deleteMessage, deleteReply } from '@/lib/api';
import type { Message } from '@/lib/types';
import { NewReplyForm } from './NewReplyForm';

interface MessageCardProps {
  message: Message;
}

export function MessageCard({ message }: MessageCardProps) {
  // --- Hooks ---
  const router = useRouter();
  const [isReplying, setIsReplying] = useState(false);

  // --- Handlers ---
  async function handleDeleteMessage() {
    const isConfirmed = window.confirm(
      'Você tem certeza que deseja deletar este recado? Todas as respostas também serão removidas.'
    );
    if (!isConfirmed) return;

    try {
      await deleteMessage(message.id);
      router.refresh();
    } catch (error) {
      console.error(error);
      alert('Ocorreu um erro ao deletar o recado. Tente novamente.');
    }
  }

  async function handleDeleteReply(replyId: string) {
    const isConfirmed = window.confirm(
      'Você tem certeza que deseja deletar esta resposta?'
    );
    if (!isConfirmed) return;

    try {
      await deleteReply(replyId);
      router.refresh();
    } catch (error) {
      console.error(error);
      alert('Ocorreu um erro ao deletar a resposta. Tente novamente.');
    }
  }

  // --- Renderização ---
  const formattedDate = new Date(message.createdAt).toLocaleDateString(
    'pt-BR',
    {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }
  );

  return (
    <article className='rounded-xl border border-blue-900 bg-white p-6 shadow-md transition-shadow hover:shadow-lg'>
      {/* Cabeçalho do Recado Principal */}
      <header className='flex items-start justify-between gap-4'>
        <p className='font-semibold text-blue-850'>{message.authorName}</p>
        <div className='flex flex-shrink-0 items-center space-x-2 text-sm text-gray-550'>
          <time>{formattedDate}</time>
          <button
            type='button'
            onClick={handleDeleteMessage}
            title='Deletar recado'
            className='text-gray-400 transition hover:text-orange-600'
          >
            <Trash2 className='h-4 w-4' />
          </button>
        </div>
      </header>

      {/* Conteúdo do Recado */}
      <p className='my-4 whitespace-pre-wrap text-gray-600'>
        {message.content}
      </p>

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
                <div
                  key={reply.id}
                  className='ml-4 rounded-lg bg-gray-50 p-3 shadow-sm'
                >
                  <header className='flex items-start justify-between gap-2'>
                    <p className='font-semibold text-sm text-blue-850'>
                      {reply.authorName}
                    </p>
                    <div className='flex flex-shrink-0 items-center space-x-2 text-xs text-gray-550'>
                      <time>{replyFormattedDate}</time>
                      <button
                        type='button'
                        onClick={() => handleDeleteReply(reply.id)}
                        title='Deletar resposta'
                        className='text-gray-400 transition hover:text-orange-600'
                      >
                        <Trash2 className='h-4 w-4' />
                      </button>
                    </div>
                  </header>
                  <p className='mt-2 text-sm text-gray-600'>{reply.content}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Rodapé com Ação de Responder */}
      <footer className='mt-4 pt-4 border-t border-gray-400/50'>
        <button
          type='button'
          onClick={() => setIsReplying(!isReplying)}
          className='text-sm font-semibold text-blue-600 transition hover:text-blue-850'
        >
          {isReplying ? 'Cancelar' : 'Responder'}
        </button>
        {isReplying && (
          <NewReplyForm
            messageId={message.id}
            onSuccess={() => setIsReplying(false)}
          />
        )}
      </footer>
    </article>
  );
}
