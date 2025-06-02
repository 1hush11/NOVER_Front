<template>
  <div class="flex flex-1 flex-col p-4 cursor-pointer overflow-y-auto">
    <section v-if="userStore.user">
      <div class="flex flex-col gap-3 mt-6-">
        <div
          class="recommendation-gradient-block flex flex-col items-center justify-center text-white rounded-lg shadow-lg cursor-pointer transition hover:scale-105"
          @click="handlePlayRecommendations"
        >
          <div class="text-black rounded-full mb-4">
            <button class="play-button" @click.stop="handlePlayRecommendations" title="Воспроизвести рекомендации">
              <span v-if="!isRecommendationPlaying">
                <svg width="30" height="30" viewBox="0 0 24 20" fill="currentColor">
                  <path d="M8 5v14l11-7-11-7z" />
                </svg>
              </span>
              <span v-else>
                <svg width="30" height="30" viewBox="0 0 24 20" fill="currentColor">
                  <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
                </svg>
              </span>
            </button>
          </div>
          <div class="text-xl text-gray-600 font-bold mb-1">Слушать рекомендации</div>
          <div class="text-sm text-gray-500 opacity-80">Персональная музыка для вас</div>
        </div>
      </div>
    </section>

    <div class="mt-6">
      <button class="text-xl font-bold mb-4 bg-transparent border-none">
        Популярно сейчас
      </button>
      <div v-if="popularTracks.length" class="flex flex-col gap-3">
        <TrackCard
          v-for="(track, index) in popularTracks"
          :key="track.id"
          :track="track"
          :index="index"
          @play="() => handleTrackPlay({ track: track, index: index })"
        />
      </div>
      <p v-else class="text-gray-500 italic">Популярные треки не найдены.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'

import TrackCard from './Cards/TrackCard.vue'

import { audioRef } from '@/stores/audioRef'
import { useAudioStore } from '@/stores/audioStore'
import { useUserStore } from '@/stores/userStore'

import { getTrackCoverPath, getTrackAudioPath } from '/src/utils/PathHelper.js'

const audioStore = useAudioStore()
const userStore = useUserStore()
const isLoadingRecs = ref(false)

const recommendedTracks = ref([])
const popularTracks = ref([])

function handleTrackPlay({ track, index }) {
  const isSame = audioStore.currentTrack.value?.id === track.id
  const isPlaying = audioStore.isPlaying.value

  if (isSame && isPlaying) {
    audioStore.pause()
  } else if (isSame && !isPlaying) {
    audioStore.togglePlay()
  } else {
    audioStore.setQueue(popularTracks.value, index)
    audioStore.playCurrent()
  }
}

function handlePlayRecommendations() {
  const firstRecTrack = recommendedTracks.value[0]
  const current = audioStore.currentTrack.value
  const isSame = current?.id === firstRecTrack?.id
  const isPlaying = audioStore.isPlaying.value

  if (isSame && isPlaying) {
    audioStore.pause()
  } else if (isSame && !isPlaying) {
    audioStore.togglePlay()
  } else {
    audioStore.setQueue(recommendedTracks.value, 0)
    audioStore.playCurrent()
  }
}

const currentTrack = computed(() => audioStore.currentTrack.value)

const isRecommendationPlaying = computed(() => {
  return (
    recommendedTracks.value.length > 0 &&
    currentTrack.value?.id === recommendedTracks.value[0].id &&
    audioStore.isPlaying.value
  )
})

onMounted(async () => {
  try {
    const topRes = await fetch('http://localhost:5240/api/track/top?count=10')
    if (!topRes.ok) {
      const text = await topRes.text()
      throw new Error(`status ${topRes.status}: ${text}`)
    }
    const topTracksData = await topRes.json()
    popularTracks.value = topTracksData.map(t => ({
      id: t.id,
      title: t.name,
      singers: Array.isArray(t.singers) 
                  ? t.singers 
                  : 'Неизвестный исполнитель',
      albumId: t.albumId,
      cover: getTrackCoverPath(t.coverUrl),
      audio: getTrackAudioPath(t.audioUrl)
    }))
  } catch (err) {
    console.error('Ошибка при загрузке популярных треков:', err)
  }

  try {
    if (!userStore.user) {
      await userStore.fetchCurrentUser()
    }
    if (userStore.user && userStore.user.id) {
      isLoadingRecs.value = true

      const recRes = await fetch(
        `http://127.0.0.1:8000/api/user/recommendations/${userStore.user.id}`
      )
      if (!recRes.ok) {
        const text = await recRes.text()
        throw new Error(`status ${recRes.status}: ${text}`)
      }
      const recData = await recRes.json()
      recommendedTracks.value = recData.map(t => ({
        id: t.id,
        title: t.name,
        singers: Array.isArray(t.singers) 
                  ? t.singers 
                  : 'Неизвестный исполнитель',
        albumId: t.album_id,
        cover: getTrackCoverPath(t.cover_url),
        audio: getTrackAudioPath(t.audio_url)
      }))
    }
  } catch (err) {
    console.error('Ошибка при загрузке рекомендаций:', err)
  } finally {
      isLoadingRecs.value = false
    }
})
</script>


<style scoped>
.cover-image {
  width: 130px;
  height: 130px;
  border-radius: 25%;
  object-fit: cover;
}

button:disabled {
  opacity: 0.3;
  cursor: default;
}

.recommendation-gradient-block {
  width: 100%;
  padding: 2rem 1rem;
  background: linear-gradient(135deg, #a18cd1 0%, #e0c8fb 30%, #fbc2eb 100%);
  border-radius: 24px;
  text-align: center;
  margin-top: 2rem;
  transition: transform 0.3s ease;
}

.recommendation-gradient-block:hover {
  transform: scale(1.02);
}

.play-button {
  width: 60px;
  height: 60px;
  background: #1c1c1c;
  color: #e0c8fb;
  border: none;
  border-radius: 50%;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.3s ease;
}

.play-button:hover {
  background: #333;
}
</style>
