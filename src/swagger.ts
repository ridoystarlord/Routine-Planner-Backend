import swaggerAutogen from 'swagger-autogen';
import config from './config';

const doc = {
  info: {
    version: '1.0.0',
    title: 'Routine Planner API',
    description: 'API Documentation for the Routine Planner Backend',
  },
  schemes: ['http', 'https'],
  consumes: ['application/json'],
  produces: ['application/json'],
  servers: [
    {
      url: 'http://localhost:5000',
      description: 'Localhost',
    },
  ],
  components: {
    securitySchemes: {
      BearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
};

const outputFile = './swagger-output.json';
const devRoutes = ['./app.ts'];
const productionRoutes = ['./app.js'];

swaggerAutogen({
  openapi: '3.0.0',
  autoBody: true,
  autoQuery: true,
  autoHeaders: true,
})(
  outputFile,
  config.env === 'development' ? devRoutes : productionRoutes,
  doc
).then(() => {
  import('./server');
});
