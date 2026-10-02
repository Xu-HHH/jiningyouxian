import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],

  // Pin the dev server to port 5174 so the URL stays stable
  server: {
    host: true,
    port: 5174,
    strictPort: true,
  },


  // Multi-page build: index.html (main) + TV.html (cable-TV packages)
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        tv: 'TV.html',
        sim: 'SIM.html',
        ronghe: 'ronghe.html',
        zhengce: 'zhengce.html',
        guanyu: 'guanyu.html',
      },
    },
  },
})
