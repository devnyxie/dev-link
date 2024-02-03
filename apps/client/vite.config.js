import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import dotenv from "dotenv";

dotenv.config({ path: "../../.env" });

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "127.0.0.1",
    port: 5173,
  },
  define: {
    "process.env": process.env,
  },
  build: {
    rollupOptions: {
      external: ["@mui/material/utils"],
    },
  },
});
