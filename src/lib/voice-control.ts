import {
  type AudioPlayer,
  generateDependencyReport,
  joinVoiceChannel,
  type VoiceConnection,
} from '@discordjs/voice';
import type { VoiceBasedChannel } from 'discord.js';
import { logger } from '@/utils/logger';

const log = logger.child({ module: 'VoiceControl' });

export class VoiceControl {
  private connection: VoiceConnection | null = null;

  constructor() {
    log.info(`\n${generateDependencyReport()}`);
  }

  public join(channel: VoiceBasedChannel) {
    this.connection = joinVoiceChannel({
      adapterCreator: channel.guild.voiceAdapterCreator,
      guildId: channel.guildId,
      channelId: channel.id,
    });
  }

  public leave() {
    this.connection?.destroy();
    this.connection = null;
  }

  public subscribe(player: AudioPlayer) {
    this.connection?.subscribe(player);
  }
}
