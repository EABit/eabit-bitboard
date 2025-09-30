export async function getMessages() {
  const messages = [
    {
      id: 'a1b2c3d4-1234-5678-9abc-def012345678',
      content: 'Bem-vindo ao BitBoard! Este é o primeiro recado.',
      authorName: 'Roberto Zanin',
      createdAt: new Date(),
      replies: [
        {
          id: 'e1f2g3h4-5678-1234-9def-abc012345678',
          content: 'Ótima iniciativa! O projeto parece promissor.',
          authorName: 'Dev Sênior',
          createdAt: new Date(),
        },
      ],
    },
    {
      id: 'a1b2c3d4-1234-5678-9abc-def012345689',
      content: 'Bem-vindo ao BitBoard! Este é o segundo recado.',
      authorName: 'Aline Cristina',
      createdAt: new Date(),
      replies: [],
    },
  ];

  return { messages };
}
