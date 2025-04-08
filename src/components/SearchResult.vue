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
          />
        </div>
      </div>

      <div v-if="albums.length">
        <h3 class="text-lg font-semibold mb-4">Альбомы</h3>
        <div class="flex justify-center overflow-hidden transition rounded-lg p-2 mb-4">
          <button
            class="text-2xl text-bold bg-transparent border-none"
            @click="prev"
            :disabled="currentPage === 0"
          >
            ‹
          </button>
          <AlbumCard
            v-for="album in pagedAlbums"
            :key="'album-' + album.id"
            :album="album"
          />
          <button
            class="text-2xl text-bold bg-transparent border-none"
            @click="next"
            :disabled="currentPage + itemsPerPage >= pagedAlbums.length"
          >
            ›
          </button>
        </div>
      </div>

      <div v-if="playlists.length">
        <h3 class="text-lg font-semibold mb-4">Плейлисты</h3>
        <div class="flex flex-wrap gap-4 mb-4">
          <PlaylistCard
            v-for="playlist in playlists"
            :key="'playlist-' + playlist.id"
            :playlist="playlist"
          />
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
            <img :src="genre.coverUrl" alt="genre cover" class="cover-image p-2" />
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

import TrackCard from './TrackCard.vue'
import SingerCard from './SingerCard.vue'
import AlbumCard from './AlbumCard.vue'
import PlaylistCard from './PlaylistCard.vue'

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
    title: t.title,
    singer: t.singer || 'Неизвестный исполнитель',
    cover: t. coverUrl
      ? '/src/resources/trackCovers/' + t.coverUrl
      : '/src/resources/trackCovers/empty.png',
    audioUrl: `/src/resources/trackAudio/${t.audioUrl}`
  })) || []
)

const singers = computed(() =>
  results.value.singers?.map(s => ({
    id: s.id,
    name: s.name,
    image: s.coverUrl ? `/src/resources/singerCovers/${s.coverUrl}` : '/src/icons/NOVER_icon.ico',
    subscribersCount: s.subscribersCount,
    totalTracks: s.totalTracks,
    totalPlayCount: s.totalPlayCount
  })) || []
)

const albums = computed(() =>
  results.value.albums?.map(a => ({
    id: a.id,
    title: a.title,
    year: a.releaseDate?.split('-')[0] || 'Неизвестно',
    singer: a.singer.name,
    singerCover: `/src/resources/singerCovers/${a.singer.photoUrl}`,
    cover: a.coverUrl ? `/src/resources/albumCovers/${a.coverUrl}` : '/src/icons/NOVER_icon.ico'
  })) || []
)

const genres = computed(() =>
  results.value.genres?.map(g => ({
    id: g.id,
    name: g.name,
    description: g.description || '',
    coverUrl: g.coverUrl ? `/src/resources/genreCovers/${g.coverUrl}` : '/src/icons/NOVER_icon.ico'
  })) || []
)

const playlists = computed(() =>
  results.value.playlists?.map(p => ({
    id: p.id,
    title: p.title,
    user: p.user || 'Неизвестный',
    cover: p.coverUrl ? `/src/resources/playlistCovers/${p.coverUrl}` : '/src/icons/NOVER_icon.ico'
  })) || []
)

const isEmpty = computed(() =>
  !results.value.tracks.length &&
  !results.value.singers.length &&
  !results.value.albums.length &&
  !results.value.playlists.length &&
  !results.value.genres.length
)

function goToGenre(genre) {
  router.push(`/genres/${genre.id}`)
}

function close() {
  router.back()
}

const itemsPerPage = 3
const currentPage = ref(0)

const pagedAlbums = computed(() =>
  albums.value.slice(currentPage.value * itemsPerPage, (currentPage.value + 1) * itemsPerPage)
)

function next() {
  if (currentPage.value + 1 < Math.ceil(albums.value.length / itemsPerPage)) {
    currentPage.value++
  }
}

function prev() {
  if (currentPage.value > 0) {
    currentPage.value--
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
