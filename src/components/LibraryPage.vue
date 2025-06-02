<template>
  <div class="flex flex-col h-screen overflow-hidden p-8">
    <div class="flex-1 overflow-y-auto">
      <div class="flex items-start mb-6">
        <div>
          <img :src="`http://localhost:5240/Resources/Hearts/${userHeart}`" alt="Heart" class="cover-image mr-4" />
            <button class="play-button" @click="togglePlay"  title="Воспроизвести / Пауза">
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
        </div>
        <div class="flex flex-col ml-2">
          <div class="text-2xl font-bold mt-6 mb-6">Медиатека</div>
          <div class="text-lg font-semibold mt-2">@{{ user?.username || '...' }}</div>
          <div class="text-sm text-gray-600 mt-2">{{ formatTrackCount(tracks.length) }}</div>
        </div>
      </div>

      <div v-if="tracks.length" class="flex flex-col gap-3 mb-10 cursor-pointer">
        <TrackCard 
          v-for="(track, index) in tracks" 
          :key="track.id" 
          :track="track" 
          :index="index" 
          @play="() => handleTrackPlay({ track, index })"
          @remove="handleTrackRemove"
        />
      </div>
      <p v-else class="text-gray-500 italic mt-4">Нет треков в медиатеке.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import TrackCard from './Cards/TrackCard.vue'

import { useAudioStore } from '@/stores/audioStore'

import { getTrackCoverPath, getTrackAudioPath } from '/src/utils/PathHelper.js'

const audioStore = useAudioStore()

const isThisTrackPlaying = computed(() => {
  const current = audioStore.currentTrack.value
  return tracks.value.some(t => t.id === current?.id) && audioStore.isPlaying.value
})

function togglePlay() {
  const queue = audioStore.trackQueue.value
  const sameQueue = queue.length === tracks.value.length &&
    queue.every((t, i) => t.id === tracks.value[i]?.id)

  if (sameQueue && audioStore.currentTrack.value) {
    audioStore.togglePlay()
  } else {
    audioStore.setQueue(tracks.value, 0)
    audioStore.playCurrent()
  }
}

function handleTrackPlay({ track, index }) {
  const isSame = audioStore.currentTrack.value?.id === track.id
  const isPlaying = audioStore.isPlaying.value

  if (isSame && isPlaying) {
    audioStore.pause()
  } else if (isSame && !isPlaying) {
    audioStore.togglePlay()
  } else {
    audioStore.setQueue(tracks.value, index)
    audioStore.playCurrent()
  }
}

function handleTrackRemove(trackId) {
  tracks.value = tracks.value.filter(t => t.id !== trackId)
}

const user = ref(null)

const tracks = ref([])

onMounted(async () => {
  try {
    const userRes = await fetch('http://localhost:5240/api/user/me', {
      credentials: 'include'
    })

    if (userRes.ok) {
      user.value = await userRes.json()
    } else {
      console.warn('Пользователь не авторизован')
    }

    const trackRes = await fetch('http://localhost:5240/api/user/library/tracks', {
      credentials: 'include'
    })

    if (!trackRes.ok) {
      console.error('Ошибка авторизации или загрузки:', await trackRes.text())
      return
    }

    const tracksData = await trackRes.json()
    tracks.value = tracksData.map(t => ({
      id: t.id,
      title: t.name,
      singers: Array.isArray(t.singers) 
                  ? t.singers 
                  : 'Неизвестный исполнитель',
      albumId: t.albumId,
      cover: getTrackCoverPath(t.coverUrl),
      audio: getTrackAudioPath(t.audioUrl)
    }))
  } catch (error) {
    console.error('Ошибка при загрузке треков:', error)
  }
})

function formatTrackCount(n) {
  const lastDigit = n % 10
  const lastTwo = n % 100

  if (lastTwo >= 11 && lastTwo <= 14) return `${n} треков`
  if (lastDigit === 1) return `${n} трек`
  if (lastDigit >= 2 && lastDigit <= 4) return `${n} трека`
  return `${n} треков`
}
const userHeart = computed(() => {
  if (!user.value?.id) return 'heart1.jpg'
  const number = (user.value.id - 1) % 5 + 1
  return `heart${number}.jpg`
})

</script>

<style scoped>
.cover-image {
  width: 190px;
  height: 190px;
  border-radius: 4%;
  object-fit: cover;
}

.play-button {
position: relative;
margin-left: 30%;
margin-top: -20%;
width: 65px;
height: 65px;
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
