import { Router } from 'express';
import SimianController from './controllers/SimianController';

const routes = new Router();

routes.get('/ping', (req, res) => {
  res.json({ message: 'pong' });
});

routes.post('/simian', SimianController.processDna);
routes.get('/stats', SimianController.stats);

export default routes;
