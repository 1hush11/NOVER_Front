<template>
  <div class="flex-1 p-4 ml-2">
    <div class="flex justify-end">
    <button class="bg-transparent border-none" @click="close">
        <svg width="24" height="24" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path fill="#1c1c1" d="M3.21878,2.15448L9.99679,8.92745L16.70268,2.22183C17.15981,1.81458 17.63394,2.05757 17.8219,2.26259C18.00986,2.46761 18.11719,2.95117 17.77817,3.29732L11.07079,10.0014L17.77817,16.7027C18.07648,16.9529 18.07648,17.4434 17.83701,17.7166C17.59753,17.9897 17.15756,18.1484 16.74155,17.8244L9.99679,11.0754L3.24361,17.8271C2.94835,18.092 2.46049,18.0382 2.21878,17.7746C1.97707,17.5111 1.88533,17.0549 2.19441,16.733L8.92279,10.0014L2.22183,3.29732C1.97729,3.02649 1.8919,2.53265 2.22183,2.22183C2.55175,1.911 3.04367,1.95438 3.21878,2.15448Z"/>
        </svg>
    </button>
    </div>

    <h1 class="text-2xl font-bold mb-4 mt-6-">{{ genre.name }}</h1>
    <p class="text-gray-700 mb-6">{{ genre.description }}</p>

    <h2 class="text-xl font-semibold mb-4">Лучшие исполнители</h2>
    <div class="flex gap-4 mb-6">
      <div
        v-for="singer in genre.singers"
        :key="singer"
        class="flex flex-col items-center w-24 cursor-pointer transition hover:scale-105"
        @click="goToSinger(singer)"
      >
        <img
          :src="singer.image"
          :alt="singer"
          class="cover-image"
        />
        <p class="mt-2 text-center text-sm text-gray-700 font-medium mt-2">{{ singer.name }}</p>
      </div>
    </div>

    <h2 class="text-xl font-semibold mb-2">Популярные треки</h2>
    <div class="flex flex-col gap-3">
      <TrackCard
          v-for="(track, index) in genre.tracks"
          :key="index"
          :track="track"
          :index="index"
          @play="() => handleTrackPlay({ track, index })"
        />
    </div>
  </div>
</template>


<script setup>
import { useRoute, useRouter } from 'vue-router'
import { ref, watchEffect } from 'vue'
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
    audioStore.setQueue(genre.value.tracks, index)
    audioStore.playCurrent()
  }
}

const router = useRouter()
const route = useRoute()

const genre = ref({
  name: '',
  description: '',
  singers: [],
  tracks: []
})

function close() {
  router.back()
}

function goToSinger(singer) {
  router.push(`/singers/${singer.id}`)
}

async function fetchGenreDetails(id) {
  try {
    const [singersRes, tracksRes] = await Promise.all([
      fetch(`http://localhost:5240/api/genre/genres/${id}/singers?count=6`),
      fetch(`http://localhost:5240/api/genre/genres/${id}/tracks?count=5`)
    ])

    if (!singersRes.ok || !tracksRes.ok)
      throw new Error('Ошибка загрузки данных жанра')

    const [singers, tracks] = await Promise.all([
      singersRes.json(),
      tracksRes.json()
    ])

    const genreRes = await fetch(`http://localhost:5240/api/genre/genres/${id}`)
    if (!genreRes.ok) throw new Error('Жанр не найден')
    const genreData = await genreRes.json()

    genre.value = {
      name: genreData.name,
      description: genreData.description,
      singers: singers.map(s => ({
        id: s.id,
        name: s.name,
        image: '/src/resources/singerCovers/' + s.photoUrl
      })),
      tracks: tracks.map(t => ({
        id: t.id,
        title: t.name,
        singer: t.singers.length ? t.singers.join(', ') : 'Неизвестный исполнитель',
        cover: t.coverUrl
          ? '/src/resources/trackCovers/' + t.coverUrl
          : '/src/resources/trackCovers/empty.png',
        audioUrl: `/src/resources/trackAudio/${t.audioUrl}`
      }))
    }
  } catch (err) {
    console.error('Ошибка при загрузке жанра:', err)
  }
}

watchEffect(() => {
  const genreId = Number(route.params.id)
  if (!isNaN(genreId)) {
    fetchGenreDetails(genreId)
  }
})
</script>


<style scoped>
.cover-image {
    width: 69px;
    height: 69px;
    border-radius: 99%;
    object-fit: cover;
}
.cover-track-image {
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
