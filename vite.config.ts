import path, { resolve } from 'path'
import { defineConfig } from 'vite'
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'lib/main.ts'),
      name: 'cybereye',
      fileName: (format) => `index.${format}.js`,
      formats: ['es', 'umd'],
    },
    outDir: path.resolve(__dirname, 'dist'),
  },
  server: {
    port: 3000,
  },
})
