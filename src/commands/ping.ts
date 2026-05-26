import { Command } from '@/lib/command';
import { logger } from '@/utils/logger';

export const ping = new Command({
  name: 'ping',
  description: 'Replies with pong!',
  execute: async (interaction) => {
    logger.info('pong');
    await interaction.reply('pong!');
  },
});
