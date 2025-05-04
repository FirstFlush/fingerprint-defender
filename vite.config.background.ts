import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: false,
    lib: {
      entry: path.resolve(__dirname, 'src/background/index.ts'),
      name: 'background',
      fileName: () => 'background.js',
      formats: ['iife'], // <-- key: generate non-module script
    },
    rollupOptions: {
      output: {
        manualChunks: undefined, // no code splitting
      },
    },
  },
});
