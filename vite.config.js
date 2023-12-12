import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': [
            'react',
            'react-dom',
            '@emotion/react',
            '@emotion/styled',
            '@mui/material',
            'axios',
            'date-fns',
            'react-router-dom',
            'styled-components',
            'sweetalert2',
            // Agrega aquí cualquier otra dependencia que quieras agrupar en el chunk 'vendor'
          ],
        },
      },
    },
  },
})