import { defineConfig } from 'orval';

export default defineConfig({
  loyalty: {
    output: {
      mode: 'tags-split',
      target: 'src/api/endpoints',
      schemas: 'src/api/model',
      client: 'react-query',
      mock: true,
    },
    input: {
      target: '../backend/openapi.json',
    },
  },
});
