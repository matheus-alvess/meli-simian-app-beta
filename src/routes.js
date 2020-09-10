import { Router } from 'express';
import SimianController from './controllers/SimianController';
import { resolve } from 'path';

const routes = new Router();

routes.get('/ping', (req, res) => {
  res.json({ message: 'pong' });
});

routes.get('/coverage', (req, res) => res.sendFile(resolve(__dirname, '..', 'coverage', 'index.html')));

routes.post('/simian', SimianController.processDna);

routes.get('/stats', SimianController.stats);

export default routes;
