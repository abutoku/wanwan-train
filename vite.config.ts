import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    watch: {
      // ソース外のツール系ファイルの変更で全リロードされるのを防ぐ
      ignored: ['**/.claude/**', '**/.playwright-mcp/**', '**/docs/**'],
    },
  },
})
