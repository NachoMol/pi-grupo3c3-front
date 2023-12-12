import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import emotionBabelPlugin from '@emotion/babel-plugin';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['@emotion/react', '@emotion/styled', '@mui/material/Tooltip']
  },
  esbuildOptions: {
    jsxInject: `import React from 'react'`,
    jsxFactory: `React.createElement`,
    jsxFragment: `React.Fragment`,
    plugins: [
      emotionBabelPlugin  
    ],
  },
})
