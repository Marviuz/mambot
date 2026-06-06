import {
  createServer,
  type IncomingMessage,
  type Server,
  type ServerResponse,
} from 'node:http';
import { logger } from '../utils/logger';
import { env } from './env';

export class HttpServer {
  private port: number;
  private server: Server<typeof IncomingMessage, typeof ServerResponse>;

  constructor() {
    this.port = env.PORT ?? 8000;
    this.server = createServer((req, res) => {
      if (
        (req.method === 'GET' || req.method === 'HEAD') &&
        req.url === '/_/healthcheck'
      ) {
        logger.info('Healthcheck');
        res.writeHead(200, { 'content-type': 'application/json' });
        res.end(JSON.stringify({ status: 'ok' }));
        return;
      }

      res.writeHead(404);
      res.end();
    });
  }

  public start() {
    this.server.listen(this.port, '0.0.0.0', () => {
      logger.info(`Server listening on port ${this.port}`);
    });
  }
}
