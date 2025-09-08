import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        ansiedad: resolve(__dirname, 'ansiedad.html'),
        depresion: resolve(__dirname, 'depresion.html'),
      },
    },
  },
})
