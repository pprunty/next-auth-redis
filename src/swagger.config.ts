// src/swagger.config.ts
import swaggerJsdoc from 'swagger-jsdoc';
import type { Options } from 'swagger-jsdoc';

const options: Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Next.js API Documentation',
      version: '1.0.0',
      description: 'API documentation for Next.js App Router with TypeScript',
    },
  },
  apis: ['./src/app/api/**/*.ts'],
};

const swaggerSpec = swaggerJsdoc(options);

// Print the spec to stdout so it can be redirected to a file
console.log(JSON.stringify(swaggerSpec, null, 2));
export default swaggerSpec;
