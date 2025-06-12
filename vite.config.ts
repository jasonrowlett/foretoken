import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": "http://localhost:3000",
    },
    historyApiFallback: true,
  },

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  preview: {
    port: 4173,
    host: "0.0.0.0",
    allowedHosts: ["foretoken.xyz", "www.foretoken.xyz"]
  }
});
