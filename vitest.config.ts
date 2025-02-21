import {defineConfig} from 'vitest/config';
import tsConfigPaths from 'vite-tsconfig-paths'


export default defineConfig({
  test: {
    include: ['tests/**/*.spec.ts','src/**/*.spec.ts'],
    globals: true,
    root: './',
  },
  plugins: [
    tsConfigPaths(),
  ]
})