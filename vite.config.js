import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  base: '/junker-s-split-tracker-website/',
  resolve: {
    alias: {
      './aurora-gradient-1778021307601.png': fileURLToPath(
        new URL('./assets/aurora-gradient-1778021307601.png', import.meta.url)
      ),
      './frog-heart-eyes.png': fileURLToPath(
        new URL('./assets/frog-heart-eyes.png', import.meta.url)
      ),
    },
  },
})

