<template>
    <div v-if="isVisible" class="modal-overlay">
    <div class="modal-content">
        <div class="flex justify-end">
        <button @click="close" class="absolute top-4 right-4 hover:text-gray-700 text-xl bg-transparent border-none" aria-label="Закрыть">
            <svg width="24" height="24" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fill="#1c1c1c" d="M3.2 2.15L10 8.93l6.7-6.7c.46-.4.93-.15 1.1.06.19.2.3.68-.01 1.04L11.07 10l6.71 6.7c.3.25.3.74.06 1.04-.24.27-.68.44-1.1.09L10 11.08 3.24 17.83c-.3.27-.79.22-1.02-.05-.24-.27-.34-.73-.05-1.04L8.92 10 2.22 3.3C1.97 3.03 1.89 2.53 2.22 2.22c.33-.31.83-.27.98-.07Z"/>
            </svg>
        </button>
        </div>

        <h2 class="text-2xl font-bold mb-4 text-center">Профиль</h2>

        <form @submit.prevent="saveChanges" class="flex flex-col">
        <label class="p-2 mt-2 text-sm font-semibold text-gray-700">Имя пользователя</label>
        <input
            v-model="form.username"
            type="text"
            placeholder="Имя пользователя"
            class="p-2 border border-gray-300 rounded-lg"
        />

        <label class="p-2 mt-2 text-sm font-semibold text-gray-700">Логин</label>
        <input
            v-model="form.login"
            type="text"
            placeholder="Логин"
            class="p-2 border border-gray-300 rounded-lg"
        />

        <label class="p-2 mt-2 text-sm font-semibold text-gray-700">Пароль</label>
        <input
            v-model="form.password"
            type="password"
            placeholder="Пароль"
            class="p-2 border border-gray-300 rounded-lg"
        />

        <label class="p-2 mt-2 text-sm font-semibold text-gray-700">Аватар</label>
        <div class="flex items-center">
            <input
                type="file"
                id="file"
                @change="handleAvatarUpload"
                class="hidden"
            />
            <label
                for="file"
                class="flex items-center cursor-pointer plr-2 border rounded-lg transition"
                style="width: 400px; height: 35px;"
            >  Загрузите аватар
            </label>
            <img
                v-if="avatarBase64"
                :src="avatarBase64"
                alt="Аватар"
                class="cover-image"
            />
        </div>

        <button
            type="submit"
            class="bg-purple-600 mt-4 text-md rounded-lg hover:bg-purple-700 transition border-none"
            style="height: 40px;"
        >
            Сохранить изменения
        </button>

        <button
            type="button"
            @click="logout"
            class="bg-gray mt-4 text-gray-700 rounded-lg border-none px-2 py-1"
            style="height: 30px;"
        >
            Выйти из аккаунта
        </button>
        </form>
    </div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

const props = defineProps({
    isVisible: Boolean,
    user: Object
})
const emit = defineEmits(['close', 'logout', 'updated'])

const avatarBase64 = ref(null)

const form = ref({
    username: '',
    login: '',
    password: '',
    avatar: ''
})

watch(() => props.user, (user) => {
    if (user) {
        form.value.username = user.username
        form.value.login = user.login
        form.value.avatar = user.avatar
    }
}, { immediate: true })

function handleAvatarUpload(event) {
    const file = event.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => {
        avatarBase64.value = reader.result
        form.value.avatar = file.name
    }
    reader.readAsDataURL(file)
}

function close() {
    emit('close')
}

function logout() {
    emit('logout')
}

async function saveChanges() {
    try {
        const updatedUser = {
            username: form.value.username,
            login: form.value.login,
            passwordHash: form.value.password,
            avatar: form.value.avatar
        }

        const res = await fetch('http://localhost:5240/api/user/update', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(updatedUser)
        })

        if (!res.ok) throw new Error(await res.text())

        const updateUserData = await res.json()
        toast.success('Профиль обновлён успешно', {
            position: toast.POSITION.BOTTOM_CENTER,
            autoClose: 3000
        })

        emit('updated', updateUserData)
        close()
    } catch (err) {
        toast.error(err.message || 'Ошибка при обновлении профиля', {
            position: toast.POSITION.BOTTOM_CENTER,
            autoClose: 3000
        })
    }
}

</script>

<style scoped>
.modal-overlay {
    position: fixed;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 9999;
}
.modal-content {
    width: 400px;
    max-height: 90vh;
    overflow-y: auto;
    background-color: white;
    padding: 2rem;
    border-radius: 1rem;
    position: relative;
}
.cover-image {
    width: 48px;
    height: 48px;
    border-radius: 8px;
    object-fit: cover;
}
</style>
