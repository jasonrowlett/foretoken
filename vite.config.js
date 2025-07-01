// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/foretoken/', // 👈 necessary for GitHub Pages under a subpath
  build: {
    outDir: 'docs', // 👈 GitHub Pages will publish from /docs
  },
});
