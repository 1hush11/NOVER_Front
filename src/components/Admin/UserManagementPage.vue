<template>
    <div>
    <h2 class="text-xl font-semibold mb-4">Список пользователей</h2>

    <div v-if="users.length" class="space-y-4">
        <div
        v-for="(user, idx) in users"
        :key="user.id"
        class="flex items-center justify-between rounded-lg shadow p-4"
        >
        <div class="flex items-center gap-4">
            <p class="text-sm text-gray-600">{{ idx + 1 }}</p>
            <img
            :src="user.avatar"
            :alt="user.username + ' avatar'"
            class="user-avatar"
            />
            <div>
            <p class="text-md font-semibold">{{ user.username }}</p>
            <p class="text-sm text-gray-600">{{ user.email }}</p>
            <p class="text-sm" :class="user.isBlocked ? 'text-red-600' : 'text-green-600'">
                {{ user.isBlocked ? 'Заблокирован' : 'Активен' }}
            </p>
            </div>
        </div>

        <div class="flex items-center gap-4">
            <button
            v-if="user.status === 'Активен'"
            @click="blockUser(user.id)"
            class="btn bg-red text-red"
            >
            Заблокировать
            </button>
            <button
            v-else
            @click="unblockUser(user.id)"
            class="btn bg-green text-green"
            >
            Разблокировать
            </button>
        </div>
        </div>
    </div>

    <p v-else class="text-gray-500 italic">Нет зарегистрированных пользователей.</p>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

import { getUserAvatarPath } from '/src/utils/PathHelper.js'

const users = ref([])

async function fetchUsers() {
    try {
    const res = await fetch('http://localhost:5240/api/admin/users', {
        credentials: 'include'
    })
    if (!res.ok) throw new Error('Не удалось загрузить список пользователей')

    const data = await res.json()
    users.value = data.map(u => ({
        id: u.id,
        username: u.username,
        email: u.email,
        avatar: getUserAvatarPath(u.avatarUrl),
        status: u.status,
    }))
    } catch (err) {
    toast.error(err.message || 'Ошибка при загрузке пользователей')
    }
}

async function blockUser(id) {
    try {
    const res = await fetch(`http://localhost:5240/api/admin/user/block/${id}`, {
        method: 'POST',
        credentials: 'include'
    })
    if (!res.ok) throw new Error('Не удалось заблокировать пользователя')

    toast.success('Пользователь заблокирован', { position: 'bottom-center' })
    await fetchUsers()  
    } catch (err) {
    toast.error(err.message || 'Ошибка при блокировке', { position: 'bottom-center' })
    }
}

async function unblockUser(id) {
    try {
    const res = await fetch(`http://localhost:5240/api/admin/user/unblock/${id}`, {
        method: 'POST',
        credentials: 'include'
    })
    if (!res.ok) throw new Error('Не удалось разблокировать пользователя')

    toast.success('Пользователь разблокирован', { position: 'bottom-center' })
    await fetchUsers()  
    } catch (err) {
    toast.error(err.message || 'Ошибка при разблокировке', { position: 'bottom-center' })
    }
}

onMounted(fetchUsers)
</script>

<style scoped>
.btn {
    width: 120px;
    border: 1px solid #ccc;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    font-size: 0.875rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 0.2s;
}

.user-avatar {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    object-fit: cover;
}
</style>
