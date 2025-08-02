import Aura from '@primeuix/themes/aura';
import { Noir } from './configs/prime-theme';

export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: {
    enabled: true,
    timeline: {
      enabled: true
    }
  },
  css: [
    '~/assets/styles/main.css',
    '~/assets/styles/inspira.css',
    "@milkdown/theme-nord/style.css",
  ],
  modules: [
    '@nuxt/fonts',
    'nuxt-security',
    '@nuxtjs/tailwindcss',
    '@primevue/nuxt-module',
    '@nuxtjs/color-mode',
    '@vueuse/nuxt',
    '@nuxtjs/supabase',
    '@nuxt/image'
  ],
  pages: {
    pattern: ['**/*.vue', '!**/components/**']
  },
  components: [
    '~/components', {
      path: '~/pages',
      pattern: '**/components/**',
      pathPrefix: false
    }
  ],
  runtimeConfig: {
    public: {
      auth: {
        redirectTo: '/'
      }
    }
  },
  security: {
    headers: {
      contentSecurityPolicy: {
        'img-src': [
          "'self'",
          "data:",
          "https://*.githubusercontent.com",
          "https://*.googleusercontent.com"
        ]
      },
    },
  },
  primevue: {
    options: {
      ripple: true,
      inputVariant: 'filled',
      theme: {
        preset: Aura, // Noir,
        options: {
          prefix: 'p',
          darkModeSelector: '.dark-mode',
        }
      }
    }
  },
  supabase:{
    redirect: true,
    redirectOptions: {
      login: '/login',
      callback: '/confirm', 
      exclude: [
        '/account/forgot-password',
        '/account/signup',
        '/confirm',
        '/'
      ]
    }
  },
  // colorMode: {
  //   storage: 'cookie', // or 'sessionStorage' or 'cookie'
  //   storageKey: 'nuxt-color-mode'
  // }
})