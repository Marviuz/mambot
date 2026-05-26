import { Event } from '@/lib/event';
import { logger } from '@/utils/logger';

export const interactionCreate = new Event(
  'interactionCreate',
  async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
      logger.warn(`Unknown command: ${interaction.commandName}`);
      return;
    }

    await command(interaction);
  },
);
