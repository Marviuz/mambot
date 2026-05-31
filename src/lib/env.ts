import 'dotenv/config';
import z from 'zod';

export const env = z
  .object({
    DISCORD_BOT_TOKEN: z.string(),
    DISCORD_CLIENT_ID: z.string(),
    GUILD_ID: z.string(),
    PORT: z.coerce.number().optional(),
  })
  .parse(process.env);
