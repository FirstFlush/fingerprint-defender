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
  
    rollupOptions: {
      input: {
        background: 'src/background/index.ts',
        content: 'src/content.ts',
        inject: 'src/inject/index.ts'
      },
      output: {
        entryFileNames: '[name].js'
      }
    },
    emptyOutDir: true,
    sourcemap: false,
    target: 'esnext',
  }
});
