import { getHealthRoute } from './health/health-route.ts';
import { getMessages } from './messages/get-messages-route.ts';

export const routes = [getHealthRoute, getMessages];
