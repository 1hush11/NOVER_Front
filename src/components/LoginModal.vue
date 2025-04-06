<template>
    <div v-if="isVisible" class="modal-overlay">
    <div class="modal-content relative bg-white p-6 rounded-xl shadow-xl w-full max-w-md">
        <div class="flex justify-end">
            <button @click="close" class="absolute hover:text-gray-700 text-xl bg-transparent border-none" aria-label="Закрыть">
            <svg width="24" height="24" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fill="#1c1c1" d="M3.21878,2.15448L9.99679,8.92745L16.70268,2.22183C17.15981,1.81458 17.63394,2.05757 17.8219,2.26259C18.00986,2.46761 18.11719,2.95117 17.77817,3.29732L11.07079,10.0014L17.77817,16.7027C18.07648,16.9529 18.07648,17.4434 17.83701,17.7166C17.59753,17.9897 17.15756,18.1484 16.74155,17.8244L9.99679,11.0754L3.24361,17.8271C2.94835,18.092 2.46049,18.0382 2.21878,17.7746C1.97707,17.5111 1.88533,17.0549 2.19441,16.733L8.92279,10.0014L2.22183,3.29732C1.97729,3.02649 1.8919,2.53265 2.22183,2.22183C2.55175,1.911 3.04367,1.95438 3.21878,2.15448Z"/>
            </svg>
            </button>
        </div>  

        <h2 class="text-2xl font-bold p-4 mt-4 mb-4 text-center">Вход в аккаунт</h2>

        <form @submit.prevent="handleLogin" class="flex flex-col gap-4 text-md">
            <div class="flex flex-col">
                <label for="login" class="p-2 mb-1 text-sm font-semibold text-gray-700">Логин</label>
                <input
                    id="login"
                    v-model="login"
                    type="text"
                    class="p-2 w-3-5 mt-2 border-gray-300 rounded-lg"
                    required
                />
            </div>

            <div class="flex flex-col">
                <label for="password" class="p-2 mb-1 text-sm font-semibold text-gray-700">Пароль</label>
                <input
                id="password"
                v-model="password"
                type="password"
                class="p-2 w-3-5 mt-2 border-gray-300 rounded-lg"
                required
                />
        </div>

        <div class="flex justify-end text-sm text-purple-500 hover:underline cursor-pointer">
            Забыли пароль?
        </div>

        <button
            type="submit"
            class="bg-purple-600 text-md rounded-lg hover:bg-purple-700 transition border-none"
            style="height: 40px;"
        >
            Войти
        </button>
        </form>


        <div class="mt-4 text-sm text-center">
            Нет аккаунта?
            <span @click="switchToRegister" class="text-purple-500 hover:underline cursor-pointer">Создать</span>
        </div>
        </div>
    </div>
</template>


<script setup>
import { ref } from 'vue'

const props = defineProps({
    isVisible: Boolean
})

const emit = defineEmits(['close', 'login', 'switchToRegister'])

const login = ref('')
const password = ref('')

function close() {
    emit('close')
}

function handleLogin() {
    emit('login', { login: login.value, password: password.value })
    close()
}

function switchToRegister() {
    emit('switchToRegister')
}
</script>

<style scoped>
.modal-overlay {
    position: fixed;
    display: flex;
    align-items: center;
    inset: 0;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.4);
    z-index: 9999;
}
.modal-content {
    width: 400px;
    height: 500px;
    border-radius: 4%;
    background-color: white;
    padding: 1.5rem;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    position: relative;
}
</style>