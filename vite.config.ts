/// <reference types="vitest" />
/// <reference types="vite/client" />

import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/utils/setup.ts'],
  },
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, './src/components'),
      '@types': path.resolve(__dirname, './src/types.d.ts'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
    },
  },
});
