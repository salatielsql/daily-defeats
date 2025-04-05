import Vue3Toastify, { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.use(Vue3Toastify, {
    autoClose: 4000,
    theme: 'auto',
    type: 'default',
    position: 'top-center',
    hideProgressBar: true,
    transition: 'slide',
  })

  return {
    provide: { toast },
  }
})
