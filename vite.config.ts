import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'dist',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // Vercel kjører på port 3000
        changeOrigin: true, // Sørg for at origin header blir oppdatert
        rewrite: (path) => path.replace(/^\/api/, '/api'), // Ingen endring i path
      },
    },
  },
});
