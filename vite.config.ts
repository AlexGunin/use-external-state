import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import myPlugin from './my-plugin';
import path from "path";
import autoprefixer from "autoprefixer";
import postcssNesting from 'postcss-nesting';

const resolvePathBySrc = (p?: string) => path.resolve(__dirname, p ? `./src/${p}` : './src');

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      extract: false,
      modules: true,
      use: ['sass'],
      plugins: [
        autoprefixer(),
        // postcssUrl({
        //   url: 'inline',
        //   maxSize: 500,
        //   fallback: 'copy',
        // }),
        postcssNesting(),
      ],
      extensions: ['.scss', '.css'],
    },
  },
  build: {
    lib: {
      entry: resolvePathBySrc('App.tsx'),
      name: 'ChatbotBuilder',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format}.js`,
    },

    rollupOptions: {
      external: ['react', '@chatbot-builder/core'],
    },
  },
})
