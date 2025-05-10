import { defineConfig } from 'vite'
import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  base: "/wedding-website/",
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
