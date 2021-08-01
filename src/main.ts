import app from './app';

function main() {
  const server = app.listen(4000, () => {
    console.log('server started on *:4000');
  });

  process.on('SIGTERM', () => {
    server.close(() => {
      console.log('Server terminated');
    });
  });
}
main();
