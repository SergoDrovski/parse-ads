// https://vitejs.dev/config/shared-options.html
// https://vitejs.dev/config/build-options.html

import { fileURLToPath, URL } from "url";

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
	root: './frontend',
	build: {
		outDir: '../public2'
	},
	plugins: [vue()],
	resolve: {
		alias: { "@": fileURLToPath(new URL("./frontend", import.meta.url)) },
	},
})
