import app from './app';
import CONFIG from './config/config';
import logger from './config/logger';

function main() {
  const server = app.listen(CONFIG.PORT, () => {
    logger.info(`server started on *:${CONFIG.PORT}`);
  });

  process.on('SIGTERM', () => {
    server.close(() => {
      logger.info('Server terminated');
    });
  });
}
main();
