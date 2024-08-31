import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  plugins: [react()],
  test: {
    globals: true,
    setupFiles: ['./test/setup.ts'],
    environment: 'jsdom',
  }
})