import {
  type ChatInputCommandInteraction,
  SlashCommandBuilder,
} from 'discord.js';

export type CommandOptions = {
  name: string;
  description: string;
  execute: (interaction: ChatInputCommandInteraction) => Promise<void>;
};

export class Command extends SlashCommandBuilder {
  public execute: CommandOptions['execute'];

  constructor(opts: CommandOptions) {
    super();

    this.setName(opts.name);
    this.setDescription(opts.description);

    this.execute = opts.execute;
  }
}
