import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    minChunkSize: 20000, // Ajusta el tamaño mínimo del chunk a 20 KB
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom'], // Ejemplo de cómo dividir las dependencias en un chunk separado
        },
      },
    },
  },
})