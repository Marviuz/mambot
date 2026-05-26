import {
  Collection,
  Client as DiscordClient,
  GatewayIntentBits,
} from 'discord.js';
import * as commands from '@/commands';
import * as events from '@/events';
import type { CommandOptions } from './command';
import type { EventListeners } from './event';

export class Client extends DiscordClient {
  public commands = new Collection<
    CommandOptions['name'],
    CommandOptions['execute']
  >();

  constructor() {
    super({ intents: [GatewayIntentBits.Guilds] });

    this.setupEvents();
    this.setupCommands();
  }

  private setupEvents() {
    for (const { event, listener } of Object.values(events)) {
      this.on(event, <EventListeners<typeof event>>listener);
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
    commands: Collection<CommandOptions['name'], CommandOptions['execute']>;
  }
}
