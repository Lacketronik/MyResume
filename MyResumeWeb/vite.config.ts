import { defineConfig } from 'vite'
import mkcert from 'vite-plugin-mkcert'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), mkcert()],
  define: {
    __BUILD_ID__: JSON.stringify(new Date().toISOString()),
  },
})
