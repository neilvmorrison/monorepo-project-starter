import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import dts from "vite-plugin-dts";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({
      tsconfigPath: "./tsconfig.build.json",
      outDir: "./dist",
      exclude: ["**/*.stories.tsx", "**/*.test.tsx"],
      insertTypesEntry: true,
    }),
  ],
  server: {
    port: 6173,
  },
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "DesignSystem",
      fileName: "index",
      formats: ["es"],
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
        assetFileNames: "assets/[name][extname]",
      },
    },
    sourcemap: true,
    minify: true,
    cssCodeSplit: true,
  },
  css: {
    modules: {
      localsConvention: "camelCase",
      generateScopedName: "[name]__[local]___[hash:base64:5]",
    },
  },
});
