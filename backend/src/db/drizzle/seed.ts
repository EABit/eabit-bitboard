import { reset } from 'drizzle-seed';
import { db, pg } from './client.ts';
import { schema } from './schema/index.ts';

await reset(db, schema);

await db.insert(schema.messages).values({
  content:
    'teakdja aklfj a afdkl adsklf na fadklfjadfka afds as akls jfadk ja akljfadsf',
});

await pg.end();

console.info('Database seeded successfully');
