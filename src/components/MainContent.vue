<template>
  <div class="flex flex-1 flex-col p-4 cursor-pointer overflow-y-auto">
    <div class="flex-col flex">
      <div>
        <section>
          <h2 class="text-xl font-bold mb-4">Плейлисты популярных жанров</h2>
          <div class="flex justify-center overflow-hidden transition gap-2 rounded-lg p-2">
            <button 
              class="text-2xl text-bold p-4 bg-transparent border-none" 
              @click="prev" 
              :disabled="currentPage === 0"
            >
              ‹
            </button>
            <PlaylistCard
              v-for="playlist in pagedGenres"
              :key="playlist.id"
              :playlist="playlist"
              @click="goToPlaylist(playlist)"
            />
            <button
              class="text-2xl text-bold p-4 bg-transparent border-none"
              @click="next"
              :disabled="currentPage + itemsPerPage >= genrePlaylists.length"
            >
              ›
            </button>
          </div>
        </section>
        </div>
      </div>

    <div class="mt-6">
      <button class="text-xl font-bold mb-4 bg-transparent border-none">Популярно сейчас</button>
      <div class="flex flex-col gap-3">
        <TrackCard
          v-for="(track, index) in popularTracks"
          :key="track.id"
          :track="track"
          :index="index"
          @play="() => handleTrackPlay({ track, index })"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'

import TrackCard from './TrackCard.vue'
import PlaylistCard from './PlaylistCard.vue'

import { audioRef } from '@/audioRef'
import { useAudioStore } from '@/useAudioStore'

import { getTrackCoverPath, getTrackAudioPath, getGenreCoverPath } from '/src/utils/PathHelper.js'

const audioStore = useAudioStore()

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

const audioElement = ref(null)

const popularTracks = ref([])
const genrePlaylists = ref([])

onMounted(async () => {
  try {
    const topRes = await fetch('http://localhost:5240/api/track/top?count=10')
    if (!topRes.ok) throw new Error(await topRes.text())

    const topTracksData = await topRes.json()

    popularTracks.value = topTracksData.map(t => ({
      id: t.id,
      title: t.name,
      singer: t.singers.length ? t.singers.join(', ') : 'Неизвестный исполнитель',
      albumId: t.albumId,
      cover: getTrackCoverPath(t.coverUrl),
      audio: getTrackAudioPath(t.audioUrl)
    }))

    const genresRes = await fetch('http://localhost:5240/api/genre/genres', {
      credentials: 'include'
    })
    if (!genresRes.ok) throw new Error('Не удалось загрузить жанры')

    const genresData = await genresRes.json()

    const genrePlaylistPromises = genresData.slice(0, 6).map(async g => {
      const trackRes = await fetch(`http://localhost:5240/api/genre/genres/${g.id}/tracks?count=5`)
      if (!trackRes.ok) return null

      const tracks = await trackRes.json()

      return {
        id: `genre-${g.id}`,
        title: g.name,
        user: 'Жанровый плейлист',
        cover: getGenreCoverPath(g.coverUrl),
        tracks: tracks
      }
    })

    const genreResults = await Promise.all(genrePlaylistPromises)
    genrePlaylists.value = genreResults.filter(Boolean)

    audioRef.value = audioElement.value

  } catch (err) {
    console.error('Ошибка при загрузке данных:', err.message)
  }
})

const itemsPerPage = 3
const currentPage = ref(0)
const pagedGenres = computed(() =>
  genrePlaylists.value.slice(currentPage.value, currentPage.value + itemsPerPage)
)

const next = () => {
  if (currentPage.value + itemsPerPage < genrePlaylists.value.length) {
    currentPage.value += 1
  }
}

const prev = () => {
  if (currentPage.value > 0) {
    currentPage.value -= 1
  }
}

  const router = useRouter()

  function goToPlaylist(playlist) {
  router.push(`/playlist/${playlist.id}`)
}
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
</style>
