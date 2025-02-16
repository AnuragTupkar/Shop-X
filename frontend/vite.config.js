import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: process.env.VITE_API_BASE_URL, // Use process.env for Vite config
        changeOrigin: true,
        secure: false,
      },
    },
  },
  plugins: [react()],
});
