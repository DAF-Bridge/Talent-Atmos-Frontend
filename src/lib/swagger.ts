import { createSwaggerSpec } from 'next-swagger-doc';

const apiConfig = {
  openapi: '3.0.0',
  info: {
    title: 'Your API Documentation',
    version: '1.0',
    description: 'Documentation for your Next.js API',
  },
  servers: [
    {
      url: process.env.NODE_ENV === 'development' 
        ? 'http://localhost:3000' 
        : 'https://your-production-domain.com',
    },
  ],
};

export const getApiDocs = async () => {
  return createSwaggerSpec({
    apiFolder: 'src/app/api', // Path to API folder
    definition: apiConfig,
  });
};