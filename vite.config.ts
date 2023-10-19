import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { createFileName } from "@abb-hmi/build/lib";
import { name } from "./package.json";
import externals from "./externals.json";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [react()],
    build: {
      outDir: "build",
      lib: {
        entry: "./src/main.ts",
        name: createFileName(name),
        fileName: createFileName(name),
        formats: ["umd"],
      },
      rollupOptions: {
        external: Object.keys(externals.imports),
      },
    },
    define: {
      "process.env.NODE_ENV": JSON.stringify(mode),
    },
    test: {
      globals: true,
      environment: "jsdom",
    },
  };
});
