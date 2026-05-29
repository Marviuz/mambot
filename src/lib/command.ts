import {
  type ChatInputCommandInteraction,
  SlashCommandBuilder,
} from 'discord.js';

export type CommandName = string;
export type CommandFn = (
  interaction: ChatInputCommandInteraction,
) => Promise<void>;

type CommandOptions = {
  name: string;
  description: string;
  execute: CommandFn;
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
