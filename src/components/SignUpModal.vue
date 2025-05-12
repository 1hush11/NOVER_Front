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

      <form @submit.prevent="handleRegister" class="flex flex-col">
        <label for="username" class="p-2 mt-2 text-sm font-semibold text-gray-700">Имя пользователя</label>
        <input
          id="username"
          v-model="form.username"
          type="text"
          placeholder="Имя пользователя"
          class="p-2 w-3-5 border-gray-300 rounded-lg"
          required
        />
        <label for="login" class="p-2 mt-2 text-sm font-semibold text-gray-700">Логин</label>
        <input
          id="login"
          v-model="form.email"
          type="text"
          placeholder="Email"
          class="p-2 w-3-5 borf border-gray-300 rounded-lg"
          required
        />
        <label for="password" class="p-2 mt-2 text-sm font-semibold text-gray-700">Пароль</label>
        <input
          id="password"
          v-model="form.password"
          type="password"
          placeholder="Пароль"
          class="p-2 w-3-5  border-gray-300 rounded-lg"
          required
        />
        <label for="confirmPassword" class="p-2 mt-2 text-sm font-semibold text-gray-700">Повторите пароль</label>
        <input
          id="confirmPassword"
          v-model="form.confirmPassword"
          type="password"
          placeholder="Повторите пароль"
          class="p-2 w-3-5 border-gray-300 rounded-lg"
          required
        />

        <label class="p-2 mt-2 text-sm font-semibold text-gray-700">Аватар</label>
        <input
          class="custom-file-input mb-6"
          type="file"
          id="file"
          @change="handleAvatarChange"
          accept="image/*"
        />


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

const avatarFile = ref(null)
function handleAvatarChange(event) {
  avatarFile.value = event.target.files[0]
}

const emit = defineEmits(['close', 'switchToLogin', 'register'])

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
  avatarFile: ''
})

function handleRegister() {
  if (form.value.password !== form.value.confirmPassword) {
    alert("Пароли не совпадают!")
    return
  }

  const userData = new FormData()
  userData.append('username', form.value.username)
  userData.append('login', form.value.email)
  userData.append('passwordHash', form.value.password)

  if (avatarFile.value) {
    userData.append('avatarFile', avatarFile.value)
  }


  fetch('http://localhost:5240/api/user/signup', {
    method: 'POST',
    body: userData,
    credentials: 'include'
  })
  .then(res => res.ok ? res.json() : res.text().then(text => { throw new Error(text) }))
  .then(
    emit('register', userData)
  )
  .catch(err => console.error(err.message))
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
  height: 600px;
  border-radius: 4%;
  background-color: white;
  padding: 1.5rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  position: relative;
}

.cover-image {
  width: 48px;
  height: 48px;
  border-radius: 8%;
  object-fit: cover;
}
</style>