import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import docsPlugin from "./vite-plugin-docs";
export default defineConfig({
    plugins: [vue(), docsPlugin()],
    resolve: {
        alias: {
            "@": resolve(__dirname, "src"),
            "@doc": resolve(__dirname, "documentation"),
        },
    },
    assetsInclude: ["**/*.md"],
    server: {
        fs: {
            allow: ["../.."],
        },
    },
    build: {
        target: "esnext",
    },
});
