import express from 'express';
import cors from 'cors';
import routes from './routes';
import validator from './middlewares/validator';
import logger from './lib/logger';
import { resolve } from 'path';

import './database';

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(cors());
    this.server.use(express.json());
    this.server.use(this.requestLogger);
    this.server.use(validator);
    this.server.get('/', (req, res) => {
      res.json({ go: 'meli 💪💪' });
    });
    this.server.use(express.static(resolve(__dirname, '..', 'coverage')));
  }

  requestLogger(req, res, next) {
    logger.info(`${req.method} - ${req.url}`);
    next();
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
