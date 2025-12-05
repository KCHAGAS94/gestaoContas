// vite.config.ts

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' // Exemplo se estiver usando React

export default defineConfig({
  // *** Mude a base para caminhos relativos ***
  base: './', 
  plugins: [react()],
})