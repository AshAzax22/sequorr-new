import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import Sitemap from 'vite-plugin-sitemap'
import viteCompression from 'vite-plugin-compression'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    Sitemap({
      hostname: 'https://sequorr.com',
      dynamicRoutes: [
        '/',
        '/about',
        '/features',
        '/blogs',
        '/contact',
        '/findrr'
      ]
    }),
    viteCompression({ algorithm: 'gzip' }),
    viteCompression({ algorithm: 'brotliCompress', ext: '.br' })
  ],
  optimizeDeps: {
    exclude: ['@vladmandic/human', '@huggingface/transformers']
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom', 'react-helmet-async'],
          three: ['three', '@react-three/fiber', '@react-three/postprocessing', 'postprocessing'],
          leaflet: ['leaflet', 'react-leaflet'],
          motion: ['motion/react'],
          lucide: ['lucide-react']
        }
      }
    }
  }
})
