// /src/lib/types.ts

export type Reply = {
  id: string;
  content: string;
  authorName: string;
  createdAt: string; // ISO 8601 date string
};

export type Message = {
  id: string;
  content: string;
  authorName: string;
  createdAt: string; // ISO 8601 date string
  replies: Reply[];
};
