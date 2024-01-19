import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  base: '/permittering',
  plugins: [react(), viteTsconfigPaths()],
  server: {
    open: true,
    port: 3000,
    proxy: {
      '/permittering/api/organisasjoner': 'http://localhost:3000',
      '/permittering/api/stillingstitler': 'http://localhost:3000',
      '/permittering/api': 'http://localhost:3000',
      'permittering/redirect-til-login': 'http://localhost:3000',
      '/permittering/static/js/settings.js': 'http://localhost:3000',
      '/permittering/internal/isAlive': 'http://localhost:3000',
      '/permittering/internal/isReady': 'http://localhost:3000',
      '/permittering/*': 'http://localhost:3000',
      '/' : 'http://localhost:3000'
    }
  }
})