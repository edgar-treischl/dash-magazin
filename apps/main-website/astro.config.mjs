// @ts-check
import { defineConfig } from 'astro/config';
import path from 'path';

import tailwindcss from '@tailwindcss/vite';

import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@reports': path.resolve('../../packages/reports')
      }
    }
  },

  integrations: [mdx()]
});