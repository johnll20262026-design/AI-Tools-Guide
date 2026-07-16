import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => ({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  build: {
    outDir: 'dist/client',
    emptyOutDir: true,
    sourcemap: mode === 'development',
    assetsInlineLimit: 4096,
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (!id.includes('node_modules')) return;
          
          if (id.includes('/node_modules/react/') || 
              id.includes('/node_modules/react-dom/') || 
              id.includes('/node_modules/react-router/') ||
              id.includes('/node_modules/react-router-dom/') ||
              id.includes('/node_modules/scheduler/')) {
            return 'vendor-react';
          }
          
          if (id.includes('/node_modules/framer-motion/') || 
              id.includes('/node_modules/lucide-react/') ||
              id.includes('/node_modules/@radix-ui/') ||
              id.includes('/node_modules/clsx/') ||
              id.includes('/node_modules/tailwind-merge/') ||
              id.includes('/node_modules/class-variance-authority/')) {
            return 'ui';
          }

          if (id.includes('/node_modules/react-markdown/') ||
              id.includes('/node_modules/remark-') ||
              id.includes('/node_modules/rehype-') ||
              id.includes('/node_modules/unified/') ||
              id.includes('/node_modules/unist-') ||
              id.includes('/node_modules/mdast-') ||
              id.includes('/node_modules/hast-') ||
              id.includes('/node_modules/micromark/') ||
              id.includes('/node_modules/parse-entities/') ||
              id.includes('/node_modules/character-entities/') ||
              id.includes('/node_modules/zwitch/') ||
              id.includes('/node_modules/bail/') ||
              id.includes('/node_modules/is-plain-obj/') ||
              id.includes('/node_modules/trough/') ||
              id.includes('/node_modules/vfile/') ||
              id.includes('/node_modules/longest-streak/') ||
              id.includes('/node_modules/markdown-table/') ||
              id.includes('/node_modules/ccount/') ||
              id.includes('/node_modules/escape-string-regexp/') ||
              id.includes('/node_modules/stringify-entities/') ||
              id.includes('/node_modules/decode-named-character-reference/') ||
              id.includes('/node_modules/property-information/') ||
              id.includes('/node_modules/comma-separated-tokens/') ||
              id.includes('/node_modules/space-separated-tokens/') ||
              id.includes('/node_modules/trim-lines/') ||
              id.includes('/node_modules/hastscript/') ||
              id.includes('/node_modules/web-namespaces/') ||
              id.includes('/node_modules/html-url-attributes/')) {
            return 'vendor-markdown';
          }
        },
      },
    },
  },
}))
