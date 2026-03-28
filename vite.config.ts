import react from '@vitejs/plugin-react';
import observerPlugin from "mobx-react-observer/babel-plugin";
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [
    tailwindcss(),
    react({
      babel: {
        plugins: [
          observerPlugin(
              // optional
              { exclude: ["src/ui-components/**"] }
          ),
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    }
  }
});
