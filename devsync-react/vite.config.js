import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file
const customPort = process.env.VITE_PORT || 5173; // Use CUSTOM_PORT if set, or default to 3000

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: Number(customPort),
    open: true, // Set this to true to automatically open the browser
  },
  define: {
    'process.env': dotenv.config().parsed,
  },
});
