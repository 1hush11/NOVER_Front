<template>
    <div class="p-6">
    <h2 class="text-2xl font-bold mb-4">Результаты поиска: “{{ q }}”</h2>

    <div v-if="loading" class="text-gray-500">Загрузка…</div>
    <div v-else-if="isEmpty" class="text-gray-600">Ничего не найдено.</div>
    <div v-else class="space-y-8">
        
        <!-- Треки -->
        <section v-if="results.tracks && results.tracks.length">
        <h3 class="text-lg font-semibold mb-2">Треки</h3>
        <table class="w-full table-auto border-collapse mb-4">
            <thead>
            <tr class="bg-gray-100">
                <th class="border px-2 py-1 text-left">Название</th>
                <th class="border px-2 py-1 text-left">Исполнители</th>
                <th class="border px-2 py-1 text-left">Альбом</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="t in results.tracks" :key="t.id" class="hover:bg-gray-50">
                <td class="border px-2 py-1">{{ t.name }}</td>
                <td class="border px-2 py-1">{{ t.singers.join(', ') }}</td>
                <td class="border px-2 py-1">{{ t.albumName || '—' }}</td>
            </tr>
            </tbody>
        </table>
        </section>

        <section v-if="results.users && results.users.length">
        <h3 class="text-lg font-semibold mb-2">Пользователи</h3>
        <table class="w-full table-auto border-collapse mb-4">
            <thead>
            <tr class="bg-gray-100">
                <th class="border px-2 py-1 text-left">Имя</th>
                <th class="border px-2 py-1 text-left">Логин</th>
                <th class="border px-2 py-1 text-left">Роль</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="u in results.users" :key="u.id" class="hover:bg-gray-50">
                <td class="border px-2 py-1">{{ u.username }}</td>
                <td class="border px-2 py-1">{{ u.login }}</td>
                <td class="border px-2 py-1">{{ u.role }}</td>
            </tr>
            </tbody>
        </table>
        </section>

        <section v-if="results.genres && results.genres.length">
        <h3 class="text-lg font-semibold mb-2">Жанры</h3>
        <ul class="list-disc pl-5 space-y-2">
            <li v-for="g in results.genres" :key="g.id" class="hover:bg-gray-50 p-2 rounded">
            <strong>{{ g.name }}</strong>
            <p class="text-sm text-gray-600">{{ g.description }}</p>
            </li>
        </ul>
        </section>
    </div>
    </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
    q: { type: String, required: true }
})
const router = useRouter()

const loading = ref(false)
const results = ref({ tracks: [], users: [], genres: [], playlists: [], albums: [] })

const isEmpty = computed(() =>
    !results.value.tracks.length &&
    !results.value.users.length &&
    !results.value.genres.length &&
    !results.value.playlists.length &&
    !results.value.albums.length
)

async function fetchAdminSearch() {
    loading.value = true
    try {
    const res = await fetch(
        `http://localhost:5240/api/search?q=${encodeURIComponent(props.q)}`,
        { credentials: 'include' }
    )
    if (!res.ok) throw new Error(await res.text())
    results.value = await res.json()
    } catch (err) {
    console.error('Ошибка поиска админом:', err)
    results.value = { tracks: [], users: [], genres: [], playlists: [], albums: [] }
    } finally {
    loading.value = false
    }
}

onMounted(fetchAdminSearch)
watch(() => props.q, fetchAdminSearch)
</script>

<style scoped>
table th, table td {
    border: 1px solid #e2e8f0;
}
</style>
