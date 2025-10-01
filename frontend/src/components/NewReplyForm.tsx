'use client';

import { useRouter } from 'next/navigation';
import { type FormEvent, useState } from 'react';
import { createReply } from '@/lib/api';

interface NewReplyFormProps {
  messageId: string;
  onSuccess: () => void; // Função para fechar o formulário após o sucesso
}

export function NewReplyForm({ messageId, onSuccess }: NewReplyFormProps) {
  const router = useRouter();
  const [authorName, setAuthorName] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!authorName.trim() || !content.trim()) return;

    setIsSubmitting(true);

    try {
      await createReply(messageId, { authorName, content });

      // Limpa os campos
      setAuthorName('');
      setContent('');

      // Chama a função onSuccess para fechar o formulário
      onSuccess();

      // Atualiza a lista de recados na página
      router.refresh();
    } catch (error) {
      console.error(error);
      alert('Ocorreu um erro ao enviar sua resposta. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='mt-4 rounded-lg border border-gray-400 bg-gray-50 p-4'
    >
      <h3 className='mb-3 text-sm font-semibold text-gray-600'>
        Adicionar uma resposta
      </h3>
      <div className='space-y-3'>
        <input
          type='text'
          placeholder='Seu nome'
          value={authorName}
          onChange={e => setAuthorName(e.target.value)}
          className='w-full rounded-md border border-gray-400 p-2 text-sm text-gray-600 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600'
          required
          disabled={isSubmitting}
        />
        <textarea
          placeholder='Escreva sua resposta...'
          value={content}
          onChange={e => setContent(e.target.value)}
          className='w-full rounded-md border border-gray-400 p-2 text-sm text-gray-600 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600'
          rows={2}
          required
          disabled={isSubmitting}
        />
        <button
          type='submit'
          className='w-full rounded-md bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-850 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-blue-600/50'
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Enviando...' : 'Enviar Resposta'}
        </button>
      </div>
    </form>
  );
}
