import { reset } from 'drizzle-seed';
import { db, pg } from './client.ts';
import { schema } from './schema/index.ts';

type Messages = {
  content: string;
};

const messages: Messages[] = [
  {
    content:
      ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent quis finibus lectus, vitae congue lectus. lacus tincidunt mauris, eget fringilla nulla massa finibus leo. Praesent molestie, ligula ut finibus consequat, lacus nulla convallis quam, nec tempor sapien ex at dolor. Praesent non finibus velit. Curabitur maximus interdum diam, vel placerat sem hendrerit non. Cras quis nisl eros. Donec lectus nibh, semper in bibendum eget, condimentum id arcu. Aliquam sit amet sodales augue, in consequat dolor. Nulla facilisi. Praesent sit amet lectus sodales tortor porta pretium in a eros. Donec eget convallis tellus. Nullam volutpat turpis mi. Vivamus posuere dolor non dolor tristique pretium sit amet nec dolor. Curabitur ornare interdum ultricies. ',
  },
];

await reset(db, schema);

// insert servers
for (const row of messages) {
  await db.insert(schema.messages).values(row);
}

await pg.end();

console.info('Database seeded successfully');
