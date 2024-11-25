/// <reference types="vitest/config" />

import tailwind from 'tailwindcss/vite';
import variants from './vite/index.js';

/**
 * @type {import('vite').UserConfig}
 */
export default {
  plugins: [variants(), tailwind()],
  test: {}
};
