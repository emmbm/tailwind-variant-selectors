import tailwind from '@tailwindcss/vite';
import { defineConfig, mergeConfig } from 'vite';
import { defineWorkspace } from 'vitest/config';
import postcssPlugin from './src/postcss';
import vitePlugin from './src/vite';

const base = defineConfig({
  root: 'test',
  build: {
    write: false
  },
  test: {
    css: true,
    setupFiles: ['setup.ts']
  }
});

export default defineWorkspace([
  mergeConfig(base, {
    plugins: [vitePlugin(), tailwind()],
    test: {
      name: 'vite-plugin'
    }
  }),
  mergeConfig(base, {
    css: {
      postcss: {
        plugins: [
          postcssPlugin({
            files: ['test/variants.css']
          })
        ]
      }
    },
    plugins: [tailwind()],
    test: {
      name: 'postcss-plugin'
    }
  })
]);
