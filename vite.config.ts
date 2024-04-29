import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import sass from 'sass'
// import vitePluginSass from 'vite-plugin-sass';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        implementation: sass
      }
    }
  }
})
