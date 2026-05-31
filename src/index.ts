import { Client } from './lib/client';
import { env } from './lib/env';
import { HttpServer } from './lib/server';
import { logger } from './utils/logger';

const client = new Client();
const server = new HttpServer();

try {
  await client.login(env.DISCORD_BOT_TOKEN);
  server.start();
} catch (e) {
  logger.error('Failed to login');
  logger.error(e);
}

export { server };
