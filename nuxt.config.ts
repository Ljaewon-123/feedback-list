import Aura from '@primeuix/themes/aura';
import { Noir } from './configs/prime-theme';

export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  future: { compatibilityVersion: 4 },
  css: ['~/assets/styles/main.css'],
  modules: [
    '@nuxt/fonts',
    'nuxt-security',
    '@nuxtjs/tailwindcss',
    '@primevue/nuxt-module',
    '@nuxtjs/color-mode'
  ],
  primevue: {
    options: {
      ripple: true,
      inputVariant: 'filled',
      theme: {
        preset: Noir,
        options: {
          prefix: 'p',
          darkModeSelector: '.dark-mode',
        }
      }
    }
  },
  // colorMode: {
  //   storage: 'cookie', // or 'sessionStorage' or 'cookie'
  //   storageKey: 'nuxt-color-mode'
  // }
})