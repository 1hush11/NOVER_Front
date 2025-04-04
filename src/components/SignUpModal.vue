<template>
  <div v-if="isVisible" class="modal-overlay">
    <div class="modal-content">
      <div class="flex justify-end">
            <button @click="close" class="absolute hover:text-gray-700 text-xl bg-transparent border-none" aria-label="Закрыть">
            <svg width="24" height="24" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fill="#1c1c1" d="M3.21878,2.15448L9.99679,8.92745L16.70268,2.22183C17.15981,1.81458 17.63394,2.05757 17.8219,2.26259C18.00986,2.46761 18.11719,2.95117 17.77817,3.29732L11.07079,10.0014L17.77817,16.7027C18.07648,16.9529 18.07648,17.4434 17.83701,17.7166C17.59753,17.9897 17.15756,18.1484 16.74155,17.8244L9.99679,11.0754L3.24361,17.8271C2.94835,18.092 2.46049,18.0382 2.21878,17.7746C1.97707,17.5111 1.88533,17.0549 2.19441,16.733L8.92279,10.0014L2.22183,3.29732C1.97729,3.02649 1.8919,2.53265 2.22183,2.22183C2.55175,1.911 3.04367,1.95438 3.21878,2.15448Z"/>
            </svg>
            </button>
        </div>  
      <h1 class="text-2xl font-bold text-center mb-6">Регистрация</h1>

      <form @submit.prevent="handleRegister" class="flex flex-col gap-4">
        <input
          v-model="form.username"
          type="text"
          placeholder="Имя пользователя"
          class="p-2 w-3-5 mt-2 border-gray-300 rounded-lg"
          required
        />
        <input
          v-model="form.email"
          type="email"
          placeholder="Email"
          class="p-2 w-3-5 mt-2 borf border-gray-300 rounded-lg"
          required
        />
        <input
          v-model="form.password"
          type="password"
          placeholder="Пароль"
          class="p-2 w-3-5 mt-2 border-gray-300 rounded-lg"
          required
        />
        <input
          v-model="form.confirmPassword"
          type="password"
          placeholder="Повторите пароль"
          class="p-2 w-3-5 mt-2 border-gray-300 rounded-lg"
          required
        />

        <label class="text-sm flex gap-2 p-2 mt-2">
          <input type="checkbox" v-model="form.agree" required />
          <span class="ml-2 mt-1">Я принимаю <a href="#" class="text-purple-500 underline">условия использования</a></span>
        </label>  

        <button
          type="submit"
          class="bg-purple-600 text-md rounded-lg hover:bg-purple-700 transition border-none"
          style="height: 40px;"
        >
          Зарегистрироваться
        </button>
      </form>

      <p class="text-sm text-center mt-4">
        Уже есть аккаунт?
        <span @click="switchToLogin" class="text-purple-500 hover:underline cursor-pointer">Войти</span>
      </p>
    </div>
  </div>
</template>



<script setup>
import { ref } from 'vue'

const props = defineProps({
  isVisible: Boolean
})

const emit = defineEmits(['close', 'switchToLogin'])

function close() {
  emit('close')
}

function switchToLogin() {
  emit('switchToLogin')
}

const form = ref({
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  agree: false
})

function handleRegister() {
  // Здесь можешь добавить валидацию или отправку данных
  console.log('Registering:', form.value)
  close()
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