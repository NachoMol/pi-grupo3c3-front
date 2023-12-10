import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['@emotion/react', '@emotion/styled', '@mui/material/Tooltip']
  },
  esbuild: {
    jsxInject: `import React from 'react'`,
    jsxFactory: `React.createElement`,
    jsxFragment: `React.Fragment`,
    plugins: [
      require('@emotion/babel-plugin')
    ],
  },
})
