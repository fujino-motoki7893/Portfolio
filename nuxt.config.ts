// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/ui',
  ],

  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],

  devtools: { enabled: true },

  css: ['~/assets/css/main.css'],

  // devServer: {
  //   host: '0.0.0.0',
  //   port: 3000,
  // },

  compatibilityDate: '2024-11-01',

  nitro: {
    preset: 'github_pages',
    devProxy: {
      '/graphql': {
        target: 'http://localhost:5142/graphql',
        changeOrigin: true,
      },
    },
  },

  vite: {
    plugins: [
      tailwindcss(),
    ],
    optimizeDeps: {
      include: ['lucide-vue-next'],
    },
  },

  eslint: {
    config: {
      stylistic: true,
    },
  },

  image: {
    providers: {
      local: {
        name: 'local',
        provider: '~/providers/provider.ts',
        options: {
          baseURL: '/images',
        },
      },
    },

    provider: 'local',
  },
})
