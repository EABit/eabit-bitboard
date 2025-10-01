// /src/lib/api.ts
import type { Message } from './types';

// O tipo de retorno esperado da API para a rota GET /messages
type GetMessagesResponse = {
  messages: Message[];
};

export async function getMessages(): Promise<Message[]> {
  // A URL da API é lida de uma variável de ambiente
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    throw new Error(
      'A variável de ambiente NEXT_PUBLIC_API_URL não está definida.'
    );
  }

  const response = await fetch(`${apiUrl}/messages`);

  // Tratamento de erro essencial para chamadas de API
  if (!response.ok) {
    throw new Error('Falha ao buscar os recados da API.');
  }

  const data: GetMessagesResponse = await response.json();

  // Retornamos apenas o array de recados
  return data.messages;
}
