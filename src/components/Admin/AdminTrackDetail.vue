<template>
    <div class="flex-1 p-4" ref="scrollContainer">
    <div class="flex justify-end">
        <button class="bg-transparent border-none mt-4 mr-4" @click="close">
        <svg width="24" height="24" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fill="#1c1c1" d="M3.21878,2.15448L9.99679,8.92745L16.70268,2.22183C17.15981,1.81458 17.63394,2.05757 17.8219,2.26259C18.00986,2.46761 18.11719,2.95117 17.77817,3.29732L11.07079,10.0014L17.77817,16.7027C18.07648,16.9529 18.07648,17.4434 17.83701,17.7166C17.59753,17.9897 17.15756,18.1484 16.74155,17.8244L9.99679,11.0754L3.24361,17.8271C2.94835,18.092 2.46049,18.0382 2.21878,17.7746C1.97707,17.5111 1.88533,17.0549 2.19441,16.733L8.92279,10.0014L2.22183,3.29732C1.97729,3.02649 1.8919,2.53265 2.22183,2.22183C2.55175,1.911 3.04367,1.95438 3.21878,2.15448Z"/>
        </svg>
        </button>
    </div>

    <div class="flex">
        <img v-if="track.cover" :src="track.cover" alt="track cover" class="cover-image ml-2 mr-4" />
        <div class="flex-1 ml-2">
        <h1 class="text-4xl font-bold mb-4">{{ track.title }}</h1>
        <div class="mb-4">
            <div class="flex flex-wrap items-center">
            <template v-for="(item, idx) in track.singers" :key="item.id">
                <button
                class="bg-transparent border-none text-lg font-semibold text-gray-700 hover:underline"
                @click="goToSinger(item.id)"
                >
                {{ item.name }}
                </button>
                <span v-if="idx < track.singers.length - 1">, </span>
            </template>
            </div>

            <div class="mt-1">
            <button
                class="bg-transparent border-none text-lg text-gray-500 hover:underline"
                @click="goToGenre()"
            >
                {{ track.genre }}
            </button>
            </div>
        </div>
        <div class="flex items-center gap-6 ml-4">
            <button class="play-button" @click.stop="toggleTrackPlay(track)" title="Воспроизвести/Остановить">
                <span v-if="!isThisTrackPlaying">
                <svg width="40" height="40" viewBox="0 0 24 20" fill="currentColor">
                    <path d="M8 5v14l11-7-11-7z" />
                </svg>
                </span>
                <span v-else>
                <svg width="40" height="40" viewBox="0 0 24 20" fill="currentColor">
                    <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
                </svg>
                </span>
            </button>
            <button class="relative bg-transparent border-none" @click="toggleRepeatMode" title="Повтор">
                <svg v-if="repeatMode === 'off'" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.924 5.617a.997.997 0 0 0-.217-.324l-3-3a1 1 0 1 0-1.414 1.414L17.586 5H8a5 5 0 0 0-5 5v2a1 1 0 1 0 2 0v-2a3 3 0 0 1 3-3h9.586l-1.293 1.293a1 1 0 0 0 1.414 1.414l3-3a.997.997 0 0 0 .217-1.09zM3 18.383a.997.997 0 0 0 .217 1.09l3 3a1 1 0 0 0 1.414-1.414L6.414 19H16a5 5 0 0 0 5-5v-2a1 1 0 1 0-2 0v2a3 3 0 0 1-3 3H6.414l1.293-1.293a1 1 0 1 0-1.414-1.414l-3 3z"/>
                </svg>

                <svg v-else-if="repeatMode === 'all'" width="24" height="24" viewBox="0 0 24 24" fill="#e0c8fb">
                <path d="M20.924 5.617a.997.997 0 0 0-.217-.324l-3-3a1 1 0 1 0-1.414 1.414L17.586 5H8a5 5 0 0 0-5 5v2a1 1 0 1 0 2 0v-2a3 3 0 0 1 3-3h9.586l-1.293 1.293a1 1 0 0 0 1.414 1.414l3-3a.997.997 0 0 0 .217-1.09zM3 18.383a.997.997 0 0 0 .217 1.09l3 3a1 1 0 0 0 1.414-1.414L6.414 19H16a5 5 0 0 0 5-5v-2a1 1 0 1 0-2 0v2a3 3 0 0 1-3 3H6.414l1.293-1.293a1 1 0 1 0-1.414-1.414l-3 3z"/>
                </svg>

                <div v-else-if="repeatMode === 'one'" class="relative">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#e0c8fb">
                    <path d="M20.924 5.617a.997.997 0 0 0-.217-.324l-3-3a1 1 0 1 0-1.414 1.414L17.586 5H8a5 5 0 0 0-5 5v2a1 1 0 1 0 2 0v-2a3 3 0 0 1 3-3h9.586l-1.293 1.293a1 1 0 0 0 1.414 1.414l3-3a.997.997 0 0 0 .217-1.09zM3 18.383a.997.997 0 0 0 .217 1.09l3 3a1 1 0 0 0 1.414-1.414L6.414 19H16a5 5 0 0 0 5-5v-2a1 1 0 1 0-2 0v2a3 3 0 0 1-3 3H6.414l1.293-1.293a1 1 0 1 0-1.414-1.414l-3 3z"/>
                </svg>
                <span
                    class="absolute text-xs text-purple-500"
                    style="top: -2px; left: -3px;"
                >
                    1
                </span>
                </div>
            </button>
        </div>
        </div>
        <div class="mr-4 mt-2 flex flex-col items-center">
            <svg width="24" height="24" viewBox="-2 0 32 32">
                <path d="M13.635 5.274l-7.686 6.127h-5.949v4.742l-0.004 0.003 0.004 0.003v4.693h5.98l7.656 6.008v-6.008h0.002v-9.441h-0.002v-6.127h0zM12.588 19.794h-0.002v4.9l-6.244-4.9h-5.293v-7.343h5.267l6.271-4.999v3.95l0.002 1.049v7.343h0z" fill="currentColor"/>
                <path d="M16.087 10.729c1.141 1.521 1.745 3.333 1.745 5.241 0 1.948-0.627 3.791-1.812 5.33l0.832 0.64c1.328-1.724 2.029-3.788 2.029-5.97 0-2.137-0.676-4.167-1.955-5.87l-0.839 0.63z" fill="currentColor"/>
                <path d="M20.313 6.927l-0.809 0.668c1.971 2.387 3.057 5.41 3.057 8.512 0 3.066-1.009 5.949-2.917 8.339l0.821 0.655c2.057-2.578 3.145-5.687 3.145-8.994 0-3.346-1.171-6.606-3.297-9.18z" fill="currentColor"/>
                <path d="M23.578 3.521l-0.787 0.693c2.893 3.285 4.486 7.51 4.486 11.897 0 4.298-1.538 8.458-4.329 11.715l0.796 0.682c2.956-3.446 4.582-7.849 4.582-12.397-0-4.642-1.686-9.113-4.748-12.59z" fill="currentColor"/>
            </svg>
            <input
                type="range"
                min="0"
                max="100"
                step="1"
                v-model="volume"
                @input="changeVolume"
                class="volume-slider mt-2"
                orient="vertical"
            />
        </div>
    </div>
    </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { ref, onMounted, computed, watch } from 'vue'
import { useAudioStore } from '@/stores/audioStore'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import { getTrackCoverPath, getTrackAudioPath } from '/src/utils/PathHelper.js'

const audioStore = useAudioStore()
const {
    currentTrack,
    isPlaying,
    repeatMode,
    toggleRepeatMode,
    setVolume,
    togglePlay,
    play,
    setQueue
} = audioStore

const route = useRoute()
const router = useRouter()

const track = ref({
    id: null,
    title: '',
    singers: [],
    albumId: '',
    genre: '',
    genreId: '',
    cover: '',
    duration: 0,
    audioUrl: '',
})

const volume = ref(100)

function changeVolume(event) {
    const newVolume = parseInt(event.target.value, 10)
    volume.value = newVolume
    setVolume(newVolume / 100)
}

const isThisTrackPlaying = computed(() =>
    currentTrack.value?.id === track.value.id && isPlaying.value
)

function toggleTrackPlay(trackData) {
    if (currentTrack.value?.id === trackData.id && isPlaying.value) {
        togglePlay()
    } else {
        const queue = [trackData]
        setQueue(queue, 0)
        play(trackData)

        try {
        fetch(`http://localhost:5240/api/track/set_current/${trackData.id}`, {
            method: 'POST',
            credentials: 'include'
        })
        } catch (err) {
        console.error('Ошибка установки текущего трека:', err)
        }
    }
}

function close() {
    router.back()
}

function scrollToTop() {
    if (scrollContainer.value) {
        scrollContainer.value.scrollTo({ top: 0, behavior: 'smooth' })
    }
}

async function loadTrackInfo(id) {
    try {
        const res = await fetch(`http://localhost:5240/api/track/tracks/${id}`)
        if (!res.ok) throw new Error(await res.text())
        const trackData = await res.json()

        track.value = {
        id: trackData.id,
        title: trackData.name,
        singers: Array.isArray(trackData.singers) ? trackData.singers : [],
        albumId: trackData.albumId,
        genre: trackData.genreName,
        genreId: trackData.genreId,
        cover: getTrackCoverPath(trackData.coverUrl),
        audio: getTrackAudioPath(trackData.audioUrl),
        duration: trackData.duration
        }
    } catch (err) {
        console.error('Ошибка загрузки информации о треке:', err)
        toast.error('Не удалось загрузить информацию о треке', {
        autoClose: 3000,
        position: 'bottom-center'
        })
    }
}

onMounted(async () => {
    const trackId = route.params.id
    await loadTrackInfo(trackId)
})

watch(() => route.params.id, async (newId) => {
    await loadTrackInfo(newId)
    scrollToTop()
})
</script>


<style scoped>
.btn {
    width: 190px;
    color: #1c1c1c;
    background: white;
    border: 1px solid #ccc;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    font-size: 0.875rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    transition: 0.2s;
}

.play-button {
    width: 65px;
    height: 65px;
    background: #e0c8fb;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    cursor: pointer;
}

.cover-image {
    width: 200px;
    height: 200px;
    border-radius: 8%;
    object-fit: cover;
    border: 1px solid #1c1c1c;
}

.volume-slider {
    writing-mode: vertical-lr;
    direction: rtl;
    height: 120px;
    width: 6px;
    background: #ccc;
    border-radius: 6px;
    appearance: none;
}
.volume-slider::-webkit-slider-thumb {
    appearance: none;
    width: 14px;
    height: 14px;
    background: black;
    border-radius: 50%;
    cursor: pointer;
}
.volume-slider::-moz-range-thumb {
    width: 14px;
    height: 14px;
    background: black;
    border-radius: 50%;
    cursor: pointer;
}
.volume-slider::-webkit-slider-thumb {
    width: 14px;
    height: 14px;
    background: black;
    border-radius: 50%;
    cursor: pointer;
}

.loader {
    width: 14px;
    height: 14px;
    border: 2px solid #d1b6ee;
    border-top: 2px solid transparent;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
}

@keyframes spin {
    to { transform: rotate(360deg); }
}
</style>
