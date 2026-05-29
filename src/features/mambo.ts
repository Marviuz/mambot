import path from 'node:path';
import { AudioPlayerStatus } from '@discordjs/voice';
import { CronJob } from 'cron';
import { ChannelType, type Client } from 'discord.js';
import { env } from '@/lib/env';
import { logger } from '@/utils/logger';

const log = logger.child({ module: 'Mambo' });

const MAMBO_PATH = path.resolve(process.cwd(), 'src/assets/audio/mambo.mp3');

class UnhandledError extends Error {
  readonly _tag = 'UnhandledError';

  constructor(message: string) {
    super(message);
    logger.error(message);
  }
}

export class Mambo {
  private client: Client;

  constructor(client: Client) {
    log.info('Mambo scheduled');

    this.client = client;

    // Run every 15 minutes
    new CronJob('*/15 * * * *', () => this.start(), null, true);
  }

  private async start() {
    const player = this.client.player;
    const voiceControl = this.client.voiceControl;

    const guild = this.client.guilds.resolve(env.GUILD_ID);
    if (!guild) {
      throw new UnhandledError('Cannot find guild');
    }

    const channels = await guild.channels.fetch();
    const activeVoiceChannels = channels.filter(
      (channel) =>
        channel?.type === ChannelType.GuildVoice &&
        channel.members.filter((member) => !member.user.bot).size > 0,
    );

    if (activeVoiceChannels.size <= 0) {
      log.info('No one is in voice channel');
      return;
    }

    const randomChannel = activeVoiceChannels.random();
    if (!randomChannel?.isVoiceBased()) {
      log.error('No voice channel found');
      return;
    }

    if (!this.shouldMambo()) {
      log.info('Failed to win Mambo gacha');
      return;
    }

    player.createPlayer();
    voiceControl.join(randomChannel);
    voiceControl.subscribe(player.getPlayer());

    player.play(MAMBO_PATH);

    player.player?.on('stateChange', (_, newState) => {
      if (newState.status === AudioPlayerStatus.Idle) {
        player.stop();
        voiceControl.leave();
      }
    });
  }

  private shouldMambo() {
    const MAMBO_WIN_RATE = 0.5;
    return Math.random() < MAMBO_WIN_RATE;
  }
}
