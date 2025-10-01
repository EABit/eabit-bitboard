import { MessageCard } from '@/components/MessageCard';
import { NewMessageForm } from '@/components/NewMessageForm'; // 1. Importa o formulário
import { getMessages } from '@/lib/api';

export default async function HomePage() {
  const messages = await getMessages();

  return (
    <main className='mx-auto max-w-3xl p-8'>
      <header className='mb-10 text-center'>
        <h1 className='text-4xl font-semibold text-blue-850'>
          Mural de Recados - BitBoard
        </h1>
        <p className='mt-2 text-gray-550'>
          Deixe sua mensagem e interaja com a comunidade.
        </p>
      </header>

      {/* 2. Renderiza o componente do formulário */}
      <NewMessageForm />

      <section className='mt-12 space-y-6'>
        {messages.length === 0 ? (
          <p className='text-center text-gray-500'>
            Ainda não há recados. Seja o primeiro a postar!
          </p>
        ) : (
          messages.map(message => (
            <MessageCard key={message.id} message={message} />
          ))
        )}
      </section>
    </main>
  );
}
