import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  modules: ['@nuxt/eslint', '@vueuse/nuxt'],

  // Auto import components (https://nuxt.com/docs/guide/concepts/auto-imports)
  components: [
    '~/components',
    { path: '~/components/ui', extensions: ['vue'], pathPrefix: false },
  ],
  devtools: { enabled: true },

  build: {
    transpile: ['vuetify'],
  },
  compatibilityDate: '2025-07-15',

  vite: {
    plugins: [
      // @ts-expect-error Vite plugin
      vuetify({ autoImport: true }),
    ],
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },

  eslint: {
    config: {
      stylistic: true,
    },
  },
})
