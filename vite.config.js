import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
    plugins: [
        laravel({
            refresh: true,
            // input: [
            //     'resources/sass/app.scss',
            //     'resources/js/app.js',
            // ],
            input: ["resources/sass/app.scss", "resources/ts/book.tsx"],
        }),
        react(),
    ],
    resolve: {
        alias: {
            "@ag-grid-community": path.resolve(
                __dirname,
                "./node_modules/ag-grid-community"
            ),
        },
    },
});
