// lib/swagger.ts
import { createSwaggerSpec } from 'next-swagger-doc';

export const getApiDocs = async () => {
  const spec = createSwaggerSpec({
    apiFolder: 'app/api', // Path to your Next.js API routes
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Your App Name', // Change to your app name
        description:
          'This is the API documentation for Your App Name. It provides details on available endpoints and their functionalities.',
        version: '1.0.0',
        contact: {
          name: 'Your Name',
          email: 'support@yourapp.com',
          url: 'https://yourapp.com',
        },
        license: {
          name: 'MIT',
          url: 'https://opensource.org/licenses/MIT',
        },
      },
      servers: [
        {
          url: 'http://localhost:3000', // Change for production
          description: 'Local Development Server',
        },
        {
          url: 'https://api.yourapp.com',
          description: 'Production Server',
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
    },
  });

  return spec;
};
