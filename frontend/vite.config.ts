import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    watch: {
      usePolling: true,
    },
  },
  css: {
    postcss: './postcss.config.ts',
  },
  resolve: {
    alias: [
      {
        find: '@components',
        replacement: path.resolve(__dirname, './src/components'),
      },
      {
        find: '@api',
        replacement: path.resolve(__dirname, './src/api'),
      },
      {
        find: '@constants',
        replacement: path.resolve(__dirname, './src/constants.ts'),
      },
      {
        find: '@store',
        replacement: path.resolve(__dirname, './src/store'),
      },
      {
        find: '@hooks',
        replacement: path.resolve(__dirname, './src/hooks/hooks.ts'),
      },
      {
        find: '@helper',
        replacement: path.resolve(__dirname, './src/helper'),
      },
    ],
  },
})
