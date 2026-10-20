import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// base './' makes the build work on a custom domain AND on username.github.io/repo-name
export default defineConfig({ base: './', plugins: [react(), tailwindcss()] })
