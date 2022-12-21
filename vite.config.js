import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
	root: './frontend',
	build: './build',
	publicDir: './public2',
	plugins: [vue()],
})