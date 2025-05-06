import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './', // This will make all assets load relative to the current path
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true
  }
}); 