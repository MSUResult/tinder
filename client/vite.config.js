import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer'; // Correct import

export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 500, // Custom chunk size warning limit
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Split node_modules into separate chunks for each dependency
          if (id.includes('node_modules')) {
            return id
              .toString()
              .split('node_modules/')[1]
              .split('/')[0]
              .toString();
          }
        },
      },
      plugins: [
        visualizer({ open: true }), // Correct usage of visualizer plugin
      ],
    },
  },
});
