import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    "/api": {
      target: "http://localhost:2300",
      changeOrigin: true,
    },
  },
});
