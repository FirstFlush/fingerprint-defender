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
    emptyOutDir: true,
    target: 'esnext',
    sourcemap: false,
    rollupOptions: {
      input: {
        background: 'src/background/index.ts',
        content: 'src/content.ts',
      },
      output: {
        entryFileNames: '[name].js',
      },
    },
  },
});
