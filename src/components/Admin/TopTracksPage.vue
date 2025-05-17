<template>
    <div>
    <div class="flex justify-between items-center mb-6">
        <h1 class="text-xl font-bold">Рейтинг треков по жанрам</h1>
        <button
        @click="refreshRatings"
        :disabled="updating"
        class="btn text-md bg-purple text-white"
        >
        {{ updating ? 'Обновление...' : 'Обновить рейтинг' }}
        </button>
    </div>

    <div v-if="filteredPlaylists.length">
        <div
            v-for="playlist in filteredPlaylists"
            :key="playlist.id"
            class="mb-6"
        >
        <h2 class="text-xl font-semibold mb-4">Сборник "{{ playlist.title }}"</h2>
        <div class="tracks-grid">
            <div
                v-for="track in playlist.filteredTracks"
                :key="track.id"
                class="flex items-center justify-between rounded-lg shadow p-4 w-full gap-4"
            >
            <div class="flex items-center gap-4">
                <img
                    :src="getTrackCoverPath(track.coverUrl)"
                    alt="Cover"
                    class="cover-image"
                />
                <div class="mt-2">
                    <p class="font-medium truncate">{{ track.name }}</p>
                    <p class="text-sm text-gray-600 truncate">{{ track.singers.join(', ') }}</p>
                </div>
            </div>
            </div>
        </div>
        </div>
    </div>
    <p v-else class="text-gray-500">Данные не найдены.</p>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { getTrackCoverPath } from '/src/utils/PathHelper.js'

import { useSearchStore } from '../../stores/searchStore.js'

const searchStore = useSearchStore()

const playlists = ref([])
const updating = ref(false)

const filteredPlaylists = computed(() => {
    const q = searchStore.query.toLowerCase()
    return playlists.value.map(p => ({
        ...p,
        filteredTracks: p.tracks.filter(t =>
            t.name?.toLowerCase().includes(q) ||
            t.singers?.some(s => s.toLowerCase().includes(q))
        )
    })).filter(p => p.name?.toLowerCase().includes(q) || p.filteredTracks.length > 0)
})


async function fetchPlaylists() {
    try {
        const res = await fetch('http://localhost:5240/api/admin/playlists_by_genre', { credentials: 'include' })
        if (!res.ok) throw new Error(await res.text())
        playlists.value = await res.json()
    } catch (err) {
        console.error('Ошибка загрузки плейлистов:', err)
    }
}

async function refreshRatings() {
    updating.value = true
        try {
        const res = await fetch('http://localhost:5240/api/admin/update_genre_playlists', {
            method: 'POST',
            credentials: 'include'
        })
        if (!res.ok) throw new Error(await res.text())
        await fetchPlaylists()
    } catch (err) {
        console.error('Ошибка обновления рейтингов:', err)
    } finally {
        updating.value = false
    }
}

onMounted(() => {
    fetchPlaylists()
})
</script>

<style scoped>
.cover-image {
    width: 48px;
    height: 48px;
    border-radius: 25%;
    object-fit: cover;
}

.btn {
    color: #1c1c1c;
    border: 1px solid #ccc;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    transition: 0.2s;
}
.btn:hover:not(:disabled) {
    background-color: #f3f3f3;
}
.btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

.tracks-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1.5rem;
}
</style>
