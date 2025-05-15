import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Vue3Toastify from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import { createPinia } from 'pinia'
import { useUserStore } from '@/userStore'

async function bootstrap() {
    const app = createApp(App)

    // 1) создаём Pinia и сразу регистрируем её в приложении
    const pinia = createPinia()
    app.use(pinia)

    // 2) регистрируем роутер и прочие плагины
    app.use(router)
    app.use(Vue3Toastify, { autoClose: 3000 })

    // 3) только теперь можно безопасно брать стор
    const userStore = useUserStore()
    await userStore.fetchCurrentUser()

    // 4) и монтировать Vue
    app.mount('#app')
}

bootstrap()
