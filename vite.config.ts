import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        background: 'src/background.ts',
        content: 'src/content.ts',
        inject: 'src/inject.ts'
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
