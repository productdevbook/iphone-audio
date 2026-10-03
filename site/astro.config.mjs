import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  site: 'https://iphone-audio.productdevbook.com',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'tr', 'de'],
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    sitemap({
      i18n: { defaultLocale: 'en', locales: { en: 'en', tr: 'tr', de: 'de' } },
    }),
  ],
  vite: { plugins: [tailwindcss()] },
})
