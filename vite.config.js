import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  base: '/watchedmovies-spa/',
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.js',
    pool: 'forks', // SWC native binaries hang in worker_threads on Windows
  },
})
