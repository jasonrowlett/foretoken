import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/foretoken/',
  plugins: [react()],
  build: {
    outDir: 'docs',
  },
});