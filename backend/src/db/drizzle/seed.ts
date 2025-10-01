import { reset } from 'drizzle-seed';
import { db, queryClient } from './client.ts';
import * as schema from './schema/schema.ts';

async function seed() {
  console.info('Seeding database...');

  // 1. Limpar dados existentes para garantir um estado limpo
  // A ordem importa devido às chaves estrangeiras: primeiro as respostas, depois os recados
  console.info('Clearing existing data...');
  await reset(db, schema);

  // 2. Criar recados (messages)
  console.info('Creating messages...');

  const message1 = await db
    .insert(schema.messages)
    .values({
      content:
        'Bem-vindo ao BitBoard! Este é o primeiro recado. Qual a sua sugestão para a próxima funcionalidade?',
      authorName: 'Roberto Zanin',
    })
    .returning();

  const message2 = await db
    .insert(schema.messages)
    .values({
      content:
        'Estou pensando em começarmos a documentação da API com Swagger. O que vocês acham?',
      authorName: 'John Doe',
    })
    .returning();

  const _message3 = await db
    .insert(schema.messages)
    .values({
      content:
        'Acabei de abrir um Pull Request para corrigir um bug no CSS do frontend!',
      authorName: 'John Doe',
    })
    .returning();

  // 3. Criar respostas (replies) para os recados
  console.info('Creating replies...');

  await db.insert(schema.replies).values({
    content:
      'Acho que a funcionalidade de autenticação de usuários seria a mais importante agora!',
    authorName: 'John Doe',
    messageId: message1[0].id,
  });

  await db.insert(schema.replies).values({
    content:
      'Concordo com o John. Autenticação é essencial para os próximos passos.',
    authorName: 'Roberto Zanin',
    messageId: message1[0].id,
  });

  await db.insert(schema.replies).values({
    content:
      'Ótima ideia! A documentação vai facilitar muito a vida de novos contribuidores.',
    authorName: 'Roberto Zanin',
    messageId: message2[0].id,
  });

  console.info('Database seeded successfully! ✅');
  await queryClient.end();
}

seed().catch(err => {
  console.error('Error seeding database:', err);
  process.exit(1);
});
