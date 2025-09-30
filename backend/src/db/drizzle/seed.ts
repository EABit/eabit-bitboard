import { reset } from 'drizzle-seed';
import { db, pg } from './client.ts';
import { schema } from './schema/index.ts';

await reset(db, schema);

await db.insert(schema.messages).values([
  {
    content:
      'Bem-vindo ao BitBoard! Este é o primeiro recado. Qual a sua sugestão para a próxima funcionalidade?',
    authorName: 'Roberto Zanin',
  },
  {
    content:
      'Estou pensando em começarmos a documentação da API com Swagger. O que vocês acham?',
    authorName: 'Aline Cristina',
  },
]);

await pg.end();

console.info('Database seeded successfully');
