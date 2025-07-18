import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react()],
  base: "/move-page-cleangit remote add origin https://github.com/Grzyb3k-bit/move-page-clean.git",
  server: {
    historyApiFallback: true,
  },
});
