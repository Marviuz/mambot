import z from 'zod';

export const env = z
  .object({
    DISCORD_BOT_TOKEN: z.string(),
    DISCORD_CLIENT_ID: z.string(),
  })
  .parse(process.env);
