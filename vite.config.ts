import { defineConfig } from "vite";
import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    // React and Tailwind are required for the layout engine to render
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      // Allows you to use absolute imports like '@/components/Button'
      "@": path.resolve(__dirname, "./src"),
    },
  },

  // Forces Vite to handle SVGs and CSVs as static file paths rather than JS modules
  assetsInclude: ["**/*.svg", "**/*.csv"],
});
