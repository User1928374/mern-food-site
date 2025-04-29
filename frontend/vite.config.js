// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Make sure every import of Emotion points to *one* copy
      '@emotion/react': path.resolve(__dirname, 'node_modules/@emotion/react'),
      '@emotion/styled': path.resolve(__dirname, 'node_modules/@emotion/styled'),
    },
  },
  optimizeDeps: {
    // Explicitly pre-bundle these so Vite doesn’t try to lazy-load them at runtime
    include: [
      'react',
      'react-dom/client',
      '@chakra-ui/react',
      '@emotion/react',
      '@emotion/styled',
      'framer-motion',
    ],
  },
  server: {
    // On some Windows setups, polling fixes hot-reload flakiness
    watch: {
      usePolling: true,
    },
  },
})