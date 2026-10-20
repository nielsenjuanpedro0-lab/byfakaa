import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import catalogHandler from './api/catalog.ts'

export default defineConfig(({ mode }) => {
  // Secret stays server-side: copied into process.env for the dev proxy only, never exposed to the client bundle.
  process.env.STACKR_API_KEY ??= loadEnv(mode, process.cwd(), '').STACKR_API_KEY
  return {
    plugins: [
      react(),
      {
        name: 'dev-catalog-proxy',
        configureServer: (server) => void server.middlewares.use('/api/catalog', catalogHandler),
      },
    ],
  }
})
