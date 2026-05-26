import { Event } from '@/lib/event';
import { logger } from '@/utils/logger';

export const clientReady = new Event('clientReady', () => {
  logger.info('Client ready!');
});
