// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  root: "./",
  build: {
    outDir: "docs",             // ✅ GitHub Pages expects /docs
    emptyOutDir: false,         // ✅ Don't delete CNAME on build
    rollupOptions: {
      input: "./index.html",    // ✅ entry point for Vite build
    },
    copyPublicDir: true         // ✅ copies /public to /docs
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@assets": path.resolve(__dirname, "./attached_assets"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@shared": path.resolve(__dirname, "./shared")
    }
  }
});
