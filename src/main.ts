import app from './app';
import CONFIG from './config/config';

function main() {
  const server = app.listen(CONFIG.PORT, () => {
    console.log('server started on *:4000');
  });

  process.on('SIGTERM', () => {
    server.close(() => {
      console.log('Server terminated');
    });
  });
}
main();
