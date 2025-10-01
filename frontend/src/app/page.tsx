import { MessageCard } from '@/components/MessageCard';
import { getMessages } from '@/lib/api';

// Esta página é um Server Component, por isso podemos torná-la 'async'
export default async function HomePage() {
  // A busca de dados acontece no servidor antes de a página ser enviada ao cliente
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

      {/* TODO: Implementar o formulário para criar um novo recado */}
      <div className='mb-10 rounded-lg bg-gray-50 p-4 text-center text-gray-400'>
        Aqui ficará o formulário de novo recado.
      </div>

      <section className='space-y-6'>
        {/* Renderização condicional: exibe uma mensagem se não houver recados */}
        {messages.length === 0 ? (
          <p className='text-center text-gray-500'>
            Ainda não há recados. Seja o primeiro a postar!
          </p>
        ) : (
          // Mapeia a lista de recados e renderiza um Card para cada um
          messages.map(message => (
            <MessageCard key={message.id} message={message} />
          ))
        )}
      </section>
    </main>
  );
}
