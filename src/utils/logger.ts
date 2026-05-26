import pino, { type LoggerOptions } from 'pino';

const pinoOptions: LoggerOptions = {
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
};

if (process.env.NODE_ENV !== 'production') {
  pinoOptions.transport = {
    target: 'pino-pretty',
    options: {
      colorize: true,
      ignore: 'pid,hostname',
      translateTime: 'SYS:yyyy-mm-dd hh:MM:ss TT',
    },
  };
}

export const logger = pino(pinoOptions);
