// swagger.config.ts
import swaggerJsdoc, { Options } from 'swagger-jsdoc';

const options: Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Next.js API Documentation',
      version: '1.0.0',
      description: 'API documentation for Next.js App Router with TypeScript',
    },
  },
  // Point to the API route files (adjust the path if needed)
  apis: ['./src/app/api/**/*.ts'],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
