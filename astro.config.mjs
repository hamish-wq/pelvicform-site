// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://pelvicform.lazymagnet.com',
  integrations: [sitemap()],
  vite: { plugins: [tailwindcss()] },
  redirects: {
    '/about-us': '/about',
    '/contact-us': '/contact',
  },
});
