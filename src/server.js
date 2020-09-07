import app from './app';
import logger from './lib/logger';

app.listen(process.env.PORT, () => {
  logger.info(`server listen at: ${process.env.PORT}`);
});
