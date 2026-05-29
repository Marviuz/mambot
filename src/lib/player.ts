import { AudioPlayer, createAudioResource } from '@discordjs/voice';
import { logger } from '@/utils/logger';

const log = logger.child({ module: 'Player' });

export class Player {
  public player: AudioPlayer | null = null;

  public play(path: string) {
    if (!this.player) {
      const message = 'No player found';
      log.error(message);
      throw new Error(message);
    }

    const resource = this.createResource(path);
    this.player.play(resource);
  }

  public createPlayer() {
    this.player = new AudioPlayer();
  }

  public getPlayer() {
    if (!this.player) {
      const message = 'No player found';
      log.error(message);
      throw new Error(message);
    }
    return this.player;
  }

  public stop() {
    this.player?.stop();
    this.player = null;
  }

  private createResource(path: string) {
    return createAudioResource(path);
  }
}
