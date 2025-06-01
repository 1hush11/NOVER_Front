import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Vue3Toastify from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import { createPinia } from 'pinia'
import { useUserStore } from '@/stores/userStore'

async function bootstrap() {
    const app = createApp(App)

    const pinia = createPinia()
    app.use(pinia)

    app.use(router)
    app.use(Vue3Toastify, { autoClose: 3000 })

    const userStore = useUserStore()
    await userStore.fetchCurrentUser()

    app.mount('#app')
}

bootstrap()