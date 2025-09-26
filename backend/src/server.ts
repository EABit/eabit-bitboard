import { createApp } from './createApp.ts';
import { env } from './env.ts';

const app = createApp();

app.listen({ port: env.PORT, host: env.HOST }, () => {
  console.info(
    `✅ BitBoard Server is up! Check service health at http://${env.HOST}:${env.PORT}/v1/health`
  );
});
