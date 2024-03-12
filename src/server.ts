import { Server } from 'http';
import app from './app';
import config from './config';

async function bootstrap() {
  const server: Server = app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
    console.log(config.env==="development"?`Docs running on http://localhost:${config.port}/api-docs`:`Docs running on https://routine-planner-api.ridoy.dev/api-docs/`);
  });

  const exitHandler = () => {
    if (server) {
      server.close(() => {
        console.log('Server closed');
      });
    }
    process.exit(1);
  };

  const unexpectedErrorHandler = (error: unknown) => {
    console.log(error);
    exitHandler();
  };

  process.on('uncaughtException', unexpectedErrorHandler);
  process.on('unhandledRejection', unexpectedErrorHandler);

  process.on('SIGTERM', () => {
    if (server) {
      server.close();
    }
  });
}

bootstrap();
