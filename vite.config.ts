import { resolve } from 'path'
import { defineConfig } from 'vite'
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'lib/main.ts'),
      name: 'cybereye',
    },
  },
  server: {
    port: 3000,
  },
})
