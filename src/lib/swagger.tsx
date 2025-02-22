// lib/swagger.ts
import { createSwaggerSpec } from 'next-swagger-doc';

export const getApiDocs = async () => {
  const spec = createSwaggerSpec({
    apiFolder: 'src/app/api', // Path to your Next.js API routes
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Your App Name', // Change to your app name
        description:
          'This is the API documentation for Your App Name. It provides details on available endpoints and their functionalities.',
        version: '1.0.0',
      },
    },
  });

  return spec;
};
