// @ts-check
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'

/**
 * Uncomment the following line and visualizer line to enable bundle visualizer
 * and run `astro build` to generate stats.html
 */
// import { visualizer } from 'rollup-plugin-visualizer'

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [
      tailwindcss(),
      // visualizer({
      //   emitFile: true,
      //   filename: 'stats.html',
      // }),
    ],
  },
})
