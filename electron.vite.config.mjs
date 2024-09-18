import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()] // No need for the `server` here
  },
  preload: {
    plugins: [externalizeDepsPlugin()] // No need for the `server` here either
  },
  renderer: {
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src')
      }
    },
    base: './',
    plugins: [react()],
    server: {
      host: true, // This makes the renderer accessible on the network
      port: 3000, // You can change this port if necessary
      strictPort: true // Ensures that Vite will fail if the port is already in use
    }
  }
})
