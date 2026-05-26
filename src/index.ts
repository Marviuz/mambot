import { Client } from './lib/client';
import { env } from './lib/env';
import { logger } from './utils/logger';

const client = new Client();

try {
  await client.login(env.DISCORD_BOT_TOKEN);
} catch (e) {
  logger.error('Failed to login');
  logger.error(e);
}
