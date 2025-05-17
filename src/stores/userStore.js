import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getUserAvatarPath } from '/src/utils/PathHelper.js'

export const useUserStore = defineStore('user', () => {
    const user = ref(null)

    async function fetchCurrentUser() {
        try {
            const res = await fetch('http://localhost:5240/api/user/me', {
                credentials: 'include',
            })

            if (!res.ok) {
                user.value = null
                return
            }

            const data = await res.json()
            data.avatar = getUserAvatarPath(data.avatar)
            user.value = data
        } catch (err) {
            console.error('Ошибка при получении пользователя:', err)
            user.value = null
        }
    }

    async function login(login, password) {
        try {
            const res = await fetch('http://localhost:5240/api/user/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ login, password })
            })

            if (!res.ok) {
                const text = await res.text()
                throw new Error(text)
            }

            const data = await res.json()
            data.avatar = getUserAvatarPath(data.avatar)
            user.value = data
        } catch (err) {
            throw err
        }
    }

    async function register(userData) {
        try {
            const res = await fetch('http://localhost:5240/api/user/signup', {
                method: 'POST',
                body: userData,
                credentials: 'include',
            })

            if (!res.ok) {
                const text = await res.text()
                throw new Error(text)
            }

            const loginForm = {
                login: userData.get('login'),
                password: userData.get('passwordHash'),
            }

            await login(loginForm.login, loginForm.password)
        } catch (err) {
            throw err
        }
    }

    async function logout() {
        try {
            await fetch('http://localhost:5240/api/user/logout', {
                method: 'POST',
                credentials: 'include'
            })
            user.value = null
            window.location.reload()
        } catch (err) {
            console.error('Ошибка выхода:', err)
        }
    }

    return {
        user,
        fetchCurrentUser,
        login,
        register,
        logout
    }
})
