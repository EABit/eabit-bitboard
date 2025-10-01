'use client'; // Diretiva obrigatória para componentes interativos no App Router

import { useRouter } from 'next/navigation';
import { type FormEvent, useState } from 'react';
import { createMessage } from '@/lib/api';

export function NewMessageForm() {
  const router = useRouter();
  const [authorName, setAuthorName] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!authorName.trim() || !content.trim()) return;

    setIsSubmitting(true); // Desabilita o botão

    try {
      await createMessage({ authorName, content });

      // Limpa o formulário
      setAuthorName('');
      setContent('');

      // ✨ ATUALIZA A LISTA DE RECADOS ✨
      // O router.refresh() diz ao Next.js para buscar novamente os dados
      // da página no servidor e atualizar a interface.
      router.refresh();
    } catch (error) {
      console.error(error);
      alert('Ocorreu um erro ao enviar seu recado. Tente novamente.');
    } finally {
      setIsSubmitting(false); // Reabilita o botão
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='mb-10 rounded-lg border border-gray-400 bg-gray-50 p-6'
    >
      <h2 className='mb-4 text-lg font-semibold text-gray-600'>
        Deixe seu recado
      </h2>
      <div className='space-y-4'>
        <input
          type='text'
          placeholder='Seu nome'
          value={authorName}
          onChange={e => setAuthorName(e.target.value)}
          className='w-full rounded-md border border-gray-400 p-3 text-gray-600 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600'
          required
        />
        <textarea
          placeholder='Escreva seu recado aqui...'
          value={content}
          onChange={e => setContent(e.target.value)}
          className='w-full rounded-md border border-gray-400 p-3 text-gray-600 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600'
          rows={3}
          required
        />
        <button
          type='submit'
          className='w-full rounded-md bg-orange-550 px-6 py-3 font-semibold text-white transition hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2'
        >
          {isSubmitting ? 'Enviando...' : 'Enviar Recado'}
        </button>
      </div>
    </form>
  );
}
