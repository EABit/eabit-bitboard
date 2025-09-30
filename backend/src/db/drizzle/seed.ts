import { reset } from 'drizzle-seed';
import { db, queryClient } from './client.ts';
import * as schema from './schema/schema.ts';

await reset(db, schema);

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
    authorName: 'Aline Cristina',
  })
  .returning();

const _message3 = await db
  .insert(schema.messages)
  .values({
    content:
      'Acabei de abrir um Pull Request para corrigir um bug no CSS do frontend!',
    authorName: 'Aline Cristina',
  })
  .returning();

await db.insert(schema.replies).values({
  content:
    'Acho que a funcionalidade de autenticação de usuários seria a mais importante agora!',
  authorName: 'Aline Cristina',
  messageId: message1[0].id,
});

await db.insert(schema.replies).values({
  content:
    'Concordo com a Aline. Autenticação é essencial para os próximos passos.',
  authorName: 'John Doe',
  messageId: message1[0].id,
});

await db.insert(schema.replies).values({
  content:
    'Ótima ideia! A documentação vai facilitar muito a vida de novos contribuidores.',
  authorName: 'John Doe',
  messageId: message2[0].id,
});

await queryClient.end();

console.info('Database seeded successfully');
