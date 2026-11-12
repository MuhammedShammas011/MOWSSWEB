import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5001',
        changeOrigin: true,
        secure: false,
      },
      '/contact.php': {
        target: 'http://localhost:5001/api',
        changeOrigin: true,
        rewrite: (path) => path.replace('/contact.php', '/contact'),
      },
    },
  },
})
