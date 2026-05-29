import {
  Collection,
  Client as DiscordClient,
  GatewayIntentBits,
} from 'discord.js';
import * as commands from '@/commands';
import * as events from '@/events';
import type { CommandFn, CommandName } from './command';
import type { EventListeners } from './event';
import { Player } from './player';
import { VoiceControl } from './voice-control';

export class Client extends DiscordClient {
  public commands = new Collection<CommandName, CommandFn>();
  public voiceControl: VoiceControl;
  public player: Player;

  constructor() {
    super({
      intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates],
    });

    this.voiceControl = new VoiceControl();
    this.player = new Player();

    this.setupEvents();
    this.setupCommands();
  }

  private setupEvents() {
    for (const { event, listener, once } of Object.values(events)) {
      if (once) {
        this.once(event, <EventListeners<typeof event>>listener);
      } else {
        this.on(event, <EventListeners<typeof event>>listener);
      }
    }
  }

  private setupCommands() {
    for (const { name, execute } of Object.values(commands)) {
      this.commands.set(name, execute);
    }
  }
}

declare module 'discord.js' {
  interface Client {
    commands: Collection<CommandName, CommandFn>;
    voiceControl: VoiceControl;
    player: Player;
  }
}
