import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Explicitly load environment variables
import dotenv from 'dotenv';
dotenv.config();

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
});