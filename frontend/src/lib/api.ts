// /src/lib/api.ts
import type { Message, Reply } from './types';

// Tipos existentes...
type GetMessagesResponse = {
  messages: Message[];
};
type CreateMessagePayload = {
  content: string;
  authorName: string;
};

// --- NOVOS TIPOS PARA REPLIES ---
type CreateReplyPayload = {
  content: string;
  authorName: string;
};
// --------------------------------

const getApiUrl = (): string => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) {
    throw new Error(
      'A variável de ambiente NEXT_PUBLIC_API_URL não está definida.'
    );
  }
  return apiUrl;
};

// --- Funções existentes... ---
export async function getMessages(): Promise<Message[]> {
  const apiUrl = getApiUrl();
  const response = await fetch(`${apiUrl}/messages`);
  if (!response.ok) throw new Error('Falha ao buscar os recados da API.');
  const data: GetMessagesResponse = await response.json();
  return data.messages;
}

export async function createMessage(
  payload: CreateMessagePayload
): Promise<Message> {
  const apiUrl = getApiUrl();
  const response = await fetch(`${apiUrl}/messages`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!response.ok) throw new Error('Falha ao criar o recado.');
  return response.json();
}

// --- NOVA FUNÇÃO ---
export async function createReply(
  messageId: string,
  payload: CreateReplyPayload
): Promise<Reply> {
  const apiUrl = getApiUrl();
  // A URL é dinâmica, incluindo o ID do recado
  const response = await fetch(`${apiUrl}/messages/${messageId}/replies`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error('Falha ao criar a resposta.');
  }

  return response.json();
}

// --- NOVA FUNÇÃO ---
export async function deleteReply(replyId: string): Promise<void> {
  const apiUrl = getApiUrl();

  console.info(`${apiUrl}/replies/${replyId}`);
  const response = await fetch(`${apiUrl}/replies/${replyId}`, {
    method: 'DELETE',
  });

  // Se a resposta não for 204 No Content, consideramos um erro
  if (response.status !== 204) {
    throw new Error('Falha ao deletar a resposta.');
  }

  // A resposta 204 não tem corpo, então não há JSON para retornar
}

// --- NOVA FUNÇÃO ---
export async function deleteMessage(messageId: string): Promise<void> {
  const apiUrl = getApiUrl();
  const response = await fetch(`${apiUrl}/messages/${messageId}`, {
    method: 'DELETE',
  });

  if (response.status !== 204) {
    throw new Error('Falha ao deletar o recado.');
  }
}
