<template>
    <div>
    <h2 class="text-xl font-semibold mb-4">Ожидающие одобрения треки</h2>

    <div v-if="filteredTracks.length" class="space-y-4">
        <div v-for="track in filteredTracks" :key="track.id">
            <div class="flex items-center justify-between rounded-lg shadow p-4 w-full">
                <div class="flex items-center gap-4">
                <img :src="track.cover" :alt="track.title + ' cover'" class="cover-image" />

                <div>
                    <p
                    class="text-md font-semibold hover:underline cursor-pointer"
                    @click.stop="goToTrackPage"
                    >
                    {{ track.title }}
                    </p>
                    <p class="text-sm text-gray-600 cursor-default">{{ track.singer }}</p>
                </div>
                </div>

                <div class="flex items-center gap-4">
                    <button class="play-button"  @click.stop="toggleTrackPlay(track)" title="Воспроизвести/Остановить">
                        <span v-if="!isThisTrackPlaying(track)">
                        <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 20">
                            <path d="M8 5v14l11-7-11-7z" />
                        </svg>
                        </span>
                        <span v-else>
                        <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 20">
                            <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
                        </svg>
                        </span>
                    </button>
                    <button @click="approveTrack(track.id)" class="btn bg-green text-green">
                    Одобрить
                    </button>
                    <button @click="rejectTrack(track.id)" class="btn bg-red text-red">
                    Отклонить
                    </button>
                </div>
            </div>
        </div>
    </div>

    <p v-else class="text-gray-500 italic">Нет треков, ожидающих модерации.</p>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

import { getTrackCoverPath, getTrackAudioPath } from '/src/utils/PathHelper.js'

import { useSearchStore } from '@/stores/searchStore'

const searchStore = useSearchStore()

const tracks = ref([])

const filteredTracks = computed(() => {
    const q = searchStore.query.toLowerCase()
    return tracks.value.filter(t =>
        t.title.toLowerCase().includes(q) ||
        t.singer.toLowerCase().includes(q)
    )
})

async function fetchPendingTracks() {
    try {
    const res = await fetch('http://localhost:5240/api/admin/tracks/pending', {
        credentials: 'include'
    })
    if (!res.ok) throw new Error('Не удалось загрузить треки')

    const trackData = await res.json()
    tracks.value = trackData.map(t => ({
        id: t.id,
        title: t.name,
        singer: t.singers?.length ? t.singers.join(', ') : 'Неизвестный исполнитель',
        albumId: t.albumId,
        cover: getTrackCoverPath(t.coverUrl),
        audio: getTrackAudioPath(t.audioUrl)
    }))
    } catch (err) {
    toast.error(err.message || 'Ошибка при загрузке треков')
    }
}

async function approveTrack(id) {
    try {
    const res = await fetch(`http://localhost:5240/api/admin/track/approve/${id}`, {
        method: 'POST',
        credentials: 'include'
    })
    if (!res.ok) throw new Error(await res.text())

    toast.success('Трек одобрен', {
        position: 'bottom-center',
    })
    tracks.value = tracks.value.filter(t => t.id !== id)
    } catch (err) {
    toast.error(err.message || 'Ошибка при одобрении')
    }
}

async function rejectTrack(id) {
    try {
    const res = await fetch(`http://localhost:5240/api/admin/track/reject/${id}`, {
        method: 'POST',
        credentials: 'include'
    })
    if (!res.ok) throw new Error(await res.text())

    toast.success('Трек отклонён', {
        position: 'bottom-center',
    })
    tracks.value = tracks.value.filter(t => t.id !== id)
    } catch (err) {
    toast.error(err.message || 'Ошибка при отклонении')
    }
}


import { useAudioStore } from '@/stores/useAudioStore'
const { currentTrack, isPlaying, setQueue, play, togglePlay, isShuffle } = useAudioStore()

function isThisTrackPlaying(track) {
    return currentTrack.value?.id === track.id && isPlaying.value
}

function toggleTrackPlay(track) {
    if (isThisTrackPlaying(track)) {
        togglePlay()
    } else {
        const queue = isShuffle.value
        ? [track, ...shuffleArray(similarTracks.value.filter(t => t.id !== track.id))]
        : [track]

        setQueue(queue, 0)
        play(track)

        try {
        fetch(`http://localhost:5240/api/track/set_current/${track.id}`, {
            method: 'POST',
            credentials: 'include'
        })
        } catch (err) {
        console.error('Ошибка установки текущего трека:', err)
        }
    }
}


onMounted(fetchPendingTracks)
</script>


<style scoped>
.btn {
    width: 100px;
    border: 1px solid #ccc;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    font-size: 0.875rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    transition: 0.2s;
}

.cover-image {
    width: 48px;
    height: 48px;
    border-radius: 25%;
    object-fit: cover;
}

.play-button {
    width: 45px;
    height: 45px;
    background: #e0c8fb;
    color: #1c1c1c;
    border: none;
    border-radius: 50%;
    font-size: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}
</style>
