import { getHealthRoute } from './health/health-route.ts';
import { getMessagesRoute } from './messages/get-messages-route.ts';

export const routes = [getHealthRoute, getMessagesRoute];
