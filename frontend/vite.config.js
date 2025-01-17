import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: process.env.VITE_API_BASE_URL,  // Ensure 'http://' is included
        changeOrigin: true,
        secure: false,

      },
    },
  },
  plugins: [react()],
});
