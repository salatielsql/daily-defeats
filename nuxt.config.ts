const firebaseDevConfig = {
  apiKey: 'AIzaSyB7X2XovJ0oFaZBy65YJqrrwvqqMQjxPYs',
  authDomain: 'derrota-diaria.firebaseapp.com',
  projectId: 'derrota-diaria',
  storageBucket: 'derrota-diaria.firebasestorage.app',
  messagingSenderId: '262801826786',
  appId: '1:262801826786:web:a6c7dae82778cd526c0fbb',
  measurementId: 'G-SWT200FBY3',
}

import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/scripts',
    'nuxt-vuefire',
  ],
  css: ['@/assets/css/main.css'],
  routeRules: {
    '/': { prerender: true },
  },
  vuefire: {
    auth: {
      enabled: true,
      sessionCookie: true, // so get user works in ssr
    },
    config: firebaseDevConfig,
  },
  fonts: {
    families: [{ name: 'Comic Neue', provider: 'google' }],
  },
  vite: {
    plugins: [
      tailwindcss(),
    ]
  }
})
