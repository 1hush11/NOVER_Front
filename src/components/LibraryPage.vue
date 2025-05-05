<template>
  <div class="flex flex-col h-screen overflow-hidden p-8">
    <div class="flex-1 overflow-y-auto">
      <div class="flex items-start mb-6">
        <div>
            <img src="/src/resources/hearts/heart1.jpg" alt="Heart" class="cover-image mr-4" />
            <button class="play-button" title="Воспроизвести / Пауза">
            <span >
              <svg width="40" height="40" viewBox="0 0 24 20" fill="currentColor">
                <path d="M8 5v14l11-7-11-7z" />
              </svg>
            </span>
            <!-- <span>
              <svg width="40" height="40" viewBox="0 0 24 20" fill="currentColor">
                <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
              </svg>
            </span> -->
          </button>
        </div>
        <div class="flex flex-col ml-2">
          <div class="text-2xl font-bold mt-6 mb-6">Медиатека</div>
          <div class="text-lg font-semibold mt-2">@{{ user?.username || '...' }}</div>
          <div class="text-sm text-gray-600 mt-2">{{ formatTrackCount(tracks.length) }}</div>
        </div>
      </div>

      <div class="flex flex-col gap-3 mb-10 cursor-pointer">
        <TrackCard 
          v-for="(track, index) in tracks" 
          :key="track.id" 
          :track="track" 
          :index="index" 
          @play="() => handleTrackPlay({ track, index })"
          @remove="handleTrackRemove"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import TrackCard from './TrackCard.vue'

import { useAudioStore } from '@/useAudioStore'

const audioStore = useAudioStore()
const { setQueue } = useAudioStore()

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

const router = useRouter()
const user = ref(null)

const tracks = ref([])

function goToTrackPage(track) {
  router.push(`/track/${track.id}`)
}


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

    const data = await trackRes.json()
    tracks.value = data.map(t => ({
      id: t.id,
      title: t.name,
      singer: t.singers.length ? t.singers.join(', ') : 'Неизвестный исполнитель',
      cover: t.coverUrl
        ? '/src/resources/trackCovers/' + t.coverUrl
        : '/src/resources/trackCovers/empty.png',
      audioUrl: `/src/resources/trackAudio/${t.audioUrl}`
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
