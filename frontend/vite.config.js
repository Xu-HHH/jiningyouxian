import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue({ template: { transformAssetUrls: false } })], // 保持 src 属性原样（public 资源用相对路径，兼容 GitHub Pages 子路径）
  base: './', // relative asset links so site works under a GitHub Pages subpath

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
