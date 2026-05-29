import { Mambo } from '@/features/mambo';
import { Event } from '@/lib/event';
import { logger } from '@/utils/logger';

export const clientReady = new Event(
  'clientReady',
  (client) => {
    logger.info('Client ready!');

    new Mambo(client);
  },
  true,
);
