<template>
  <div class="p-8">
    <div class="flex justify-end">
        <button class="bg-transparent border-none mt-4 mr-4" @click="close">
            <svg width="24" height="24" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fill="#1c1c1" d="M3.21878,2.15448L9.99679,8.92745L16.70268,2.22183C17.15981,1.81458 17.63394,2.05757 17.8219,2.26259C18.00986,2.46761 18.11719,2.95117 17.77817,3.29732L11.07079,10.0014L17.77817,16.7027C18.07648,16.9529 18.07648,17.4434 17.83701,17.7166C17.59753,17.9897 17.15756,18.1484 16.74155,17.8244L9.99679,11.0754L3.24361,17.8271C2.94835,18.092 2.46049,18.0382 2.21878,17.7746C1.97707,17.5111 1.88533,17.0549 2.19441,16.733L8.92279,10.0014L2.22183,3.29732C1.97729,3.02649 1.8919,2.53265 2.22183,2.22183C2.55175,1.911 3.04367,1.95438 3.21878,2.15448Z"/>
            </svg>
        </button>
    </div>
    <h2 class="text-xl font-bold mb-6 mt-6-">Результаты поиска по: "{{ searchQuery }}"</h2>

    <div v-if="isEmpty">
      <p>Ничего не найдено.</p>
    </div>

    <div v-else class="space-y-8">
      <div v-if="tracks.length">
        <h3 class="text-lg font-semibold mb-4">Треки</h3>
        <div class="space-y-3 mb-4">
          <TrackCard
            v-for="(track, index) in tracks"
            :key="'track-' + track.id"
            :track="track"
            :index="index"
            @play="() => handleTrackPlay({ track, index })"
          />
        </div>
      </div>

      <div v-if="singers.length">
        <h3 class="text-lg font-semibold mb-4">Исполнители</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          <SingerCard
            v-for="singer in singers"
            :key="'singer-' + singer.id"
            :singer="singer"
            @click="goToSinger(singer)"
          />
        </div>
      </div>

      <div v-if="albums.length">
        <h3 class="text-lg font-semibold mb-4">Альбомы</h3>
        <div class="flex justify-center overflow-hidden transition rounded-lg mb-4">
          <button
            class="text-2xl text-bold bg-transparent border-none"
            @click="prevAlbum"
            :disabled="currentPage === 0"
          >
            ‹
          </button>
          <AlbumCard
            v-for="album in pagedAlbums"
            :key="'album-' + album.id"
            :album="album"
            @click="goToAlbum(album)"
          />
          <button
            class="text-2xl text-bold bg-transparent border-none"
            @click="nextAlbum"
            :disabled="(currentPage + 1) * itemsPerPage >= albums.length"
          >
            ›
          </button>
        </div>
      </div>

      <div v-if="playlists.length">
        <h3 class="text-lg font-semibold mb-4">Плейлисты</h3>
        <div class="flex flex-wrap gap-4 mb-4">
          <button
            class="text-2xl font-bold bg-transparent border-none px-4"
            @click="prevPlaylist"
            :disabled="currentPlaylistPage === 0"
          >
            ‹
          </button>

          <div class="flex space-x-4">
            <PlaylistCard
              v-for="playlist in pagedPlaylists"
              :key="'playlist-' + playlist.id"
              :playlist="playlist"
              @click="goToPlaylist(playlist)"
            />
          </div>

          <button
            class="text-2xl font-bold bg-transparent border-none px-4"
            @click="nextPlaylist"
            :disabled="(currentPlaylistPage + 1) * playlistsPerPage >= playlists.length"
          >
            ›
          </button>
        </div>
      </div>

      <div v-if="genres.length">
        <h3 class="text-lg font-semibold mb-4">Жанры</h3>
        <div class="grid gap-4 mb-4">
          <div
            v-for="genre in genres"
            :key="'genre-' + genre.id"
            class="flex gap-4 p-2 shadow rounded-lg cursor-pointer transition"
            @click="goToGenre(genre)"
          >
            <img :src="genre.cover" alt="genre cover" class="cover-image p-2" />
            <div>
              <h2 class="text-lg font-semibold text-gray-800 mt-4">{{ genre.name }}</h2>
              <p class="text-sm text-gray-600 mt-4">{{ genre.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import TrackCard from './Cards/TrackCard.vue'
import SingerCard from './Cards/SingerCard.vue'
import AlbumCard from './Cards/AlbumCard.vue'
import PlaylistCard from './Cards/PlaylistCard.vue'

import { useAudioStore } from '@/stores/audioStore'

import { getAlbumCoverPath, getSingerPhotoPath, getTrackCoverPath, getTrackAudioPath, getPlaylistCoverPath, getGenreCoverPath } from '/src/utils/PathHelper.js'

const audioStore = useAudioStore()

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

const route = useRoute()
const router = useRouter()

const searchQuery = ref(route.query.q || '')
const results = ref({
  tracks: [],
  singers: [],
  albums: [],
  playlists: [],
  genres: []
})

const tracks = computed(() =>
  results.value.tracks?.map(t => ({
    id: t.id,
    title: t.name,
    singer: t.singers.length ? t.singers.join(', ') : 'Неизвестный исполнитель',
    cover: getTrackCoverPath(t.coverUrl),
    audio: getTrackAudioPath(t.audioUrl)
  }))
)

const singers = computed(() =>
  results.value.singers?.map(s => ({
    id: s.id,
    name: s.name,
    photo: getSingerPhotoPath(s.photoUrl),
    subscribersCount: s.subscribersCount,
    totalTracks: s.totalTracks,
    totalPlayCount: s.totalPlayCount
  }))
)

const albums = computed(() =>
  results.value.albums?.map(a => ({
    id: a.id,
    name: a.name,
    year: a.releaseDate?.split('-')[0] || 'Неизвестно',
    singer: a.singer,
    cover: getAlbumCoverPath(a.coverUrl),
  }))
)

const genres = computed(() =>
  results.value.genres?.map(g => ({
    id: g.id,
    name: g.name,
    description: g.description || '',
    cover: getGenreCoverPath(g.coverUrl),
  }))
)

const playlists = computed(() =>
  results.value.playlists?.map(p => ({
    id: p.id,
    title: p.title,
    user: p.user || 'Неизвестный',
    cover: getPlaylistCoverPath(p.coverUrl)
  }))
)

const isEmpty = computed(() =>
  !results.value.tracks.length &&
  !results.value.singers.length &&
  !results.value.albums.length &&
  !results.value.playlists.length &&
  !results.value.genres.length
)

function goToSinger(singer) {
  router.push(`/singers/${singer.id}`)
}
function goToAlbum(album) {
  router.push(`/albums/${album.id}`)
}
function goToPlaylist(playlist) {
  router.push(`/playlist/${playlist.id}`)
}
function goToGenre(genre) {
  router.push(`/genres/${genre.id}`)
}

function close() {
  router.back()
}

const albumsPerPage = 3
const currentAlbumPage = ref(0)
const pagedAlbums = computed(() =>
  albums.value.slice(currentAlbumPage.value * albumsPerPage, (currentAlbumPage.value + 1) * albumsPerPage)
)
function nextAlbum() {
  if ((currentAlbumPage.value + 1) * albumsPerPage < albums.value.length) {
    currentAlbumPage.value++
  }
}
function prevAlbum() {
  if (currentAlbumPage.value > 0) {
    currentAlbumPage.value--
  }
}

const playlistsPerPage = 4
const currentPlaylistPage = ref(0)
const pagedPlaylists = computed(() =>
  playlists.value.slice(currentPlaylistPage.value * playlistsPerPage, (currentPlaylistPage.value + 1) * playlistsPerPage)
)
function nextPlaylist() {
  if ((currentPlaylistPage.value + 1) * playlistsPerPage < playlists.value.length) {
    currentPlaylistPage.value++
  }
}
function prevPlaylist() {
  if (currentPlaylistPage.value > 0) {
    currentPlaylistPage.value--
  }
}


async function fetchSearchResults() {
  if (!searchQuery.value) return

  try {
    const res = await fetch(`http://localhost:5240/api/search?q=${encodeURIComponent(searchQuery.value)}`)
    const data = await res.json()
    results.value = data
  } catch (err) {
    console.error('Ошибка при поиске:', err)
  }
}

watch(() => route.query.q, (newQ) => {
  searchQuery.value = newQ
  fetchSearchResults()
})

onMounted(fetchSearchResults)
</script>

<style scoped>
.cover-image {
  width: 140px;
  height: 140px;
  border-radius: 25%;
  object-fit: cover;
}
</style>
