import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  build: {
    outDir: 'dist', // same as other build, output goes into same folder
    emptyOutDir: false, // prevent wiping dist folder
    lib: {
      entry: path.resolve(__dirname, 'src/inject/index.ts'),
      name: 'inject',
      fileName: () => 'inject.js',
      formats: ['iife'], // <-- critical: no import statements
    },
    rollupOptions: {
      output: {
        manualChunks: undefined, // no code splitting
      },
    },
  },
});
