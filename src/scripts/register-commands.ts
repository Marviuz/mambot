import { REST, Routes } from 'discord.js';
import * as $commands from '@/commands';
import { env } from '@/lib/env';
import { logger } from '@/utils/logger';

const log = logger.child({ module: 'Register commands' });

const commands = Object.values($commands);

const rest = new REST().setToken(env.DISCORD_BOT_TOKEN);

const registerCommands = async () => {
  try {
    log.info(`Started refreshing ${commands.length} application (/) commands.`);

    const data = await rest.put(
      Routes.applicationCommands(env.DISCORD_CLIENT_ID),
      { body: commands },
    );

    log.info(`Successfully reloaded application (/) commands.`);
    log.info(data);
  } catch (error) {
    log.error(error);
  }
};

void registerCommands();
