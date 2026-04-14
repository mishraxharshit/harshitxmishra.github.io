import { defineConfig } from 'vite'

export default defineConfig({
  // Change this to your repo name if deploying to username.github.io/repo-name
  // If your site is at harshitxmishra.github.io (root), set base: '/'
  base: '/harshitxmishra.github.io/',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: 'index.html',
        blog: 'blog.html',
        learn: 'learn.html',
      }
    }
  }
})
