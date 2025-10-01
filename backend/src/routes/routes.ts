import { getHealthRoute } from './health/health-route.ts';
import { createMessagesRoute } from './messages/create-messages-route.ts';
import { deleteMessagesRoute } from './messages/delete-messages-route.ts';
import { getMessagesRoute } from './messages/get-messages-route.ts';
import { createRepliesRoute } from './replies/create-replies-route.ts';
import { deleteRepliesRoute } from './replies/delete-replies-route.ts';

export const routes = [
  getHealthRoute,
  getMessagesRoute,
  createMessagesRoute,
  deleteMessagesRoute,
  createRepliesRoute,
  deleteRepliesRoute,
];
