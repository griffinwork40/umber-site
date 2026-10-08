import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    exclude: ['**/node_modules/**', '**/.afk-worktrees/**'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      // 'server-only' is a Next.js guard that throws in non-RSC environments.
      // In vitest (jsdom) we replace it with an empty no-op so the module can
      // be imported for testing the pure parse logic that lives alongside it.
      'server-only': path.resolve(__dirname, './src/test/server-only-mock.ts'),
    },
  },
})
