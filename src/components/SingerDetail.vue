<template>
  <div class="flex h-screen">
    <div ref="scrollContainer" class="flex-1 overflow-y-auto bg-white text-gray-900">
      <router-view/>
      <div class="flex justify-end">
        <button class="bg-transparent border-none mt-4 mr-4" @click="close">
            <svg width="24" height="24" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fill="#1c1c1" d="M3.21878,2.15448L9.99679,8.92745L16.70268,2.22183C17.15981,1.81458 17.63394,2.05757 17.8219,2.26259C18.00986,2.46761 18.11719,2.95117 17.77817,3.29732L11.07079,10.0014L17.77817,16.7027C18.07648,16.9529 18.07648,17.4434 17.83701,17.7166C17.59753,17.9897 17.15756,18.1484 16.74155,17.8244L9.99679,11.0754L3.24361,17.8271C2.94835,18.092 2.46049,18.0382 2.21878,17.7746C1.97707,17.5111 1.88533,17.0549 2.19441,16.733L8.92279,10.0014L2.22183,3.29732C1.97729,3.02649 1.8919,2.53265 2.22183,2.22183C2.55175,1.911 3.04367,1.95438 3.21878,2.15448Z"/>
            </svg>
        </button>
      </div>
      <div class="flex-1 overflow-y-auto p-8 bg-white text-gray-900">
        <div id="profile" class="flex items-center gap-6 mb-10 mt-6-">
          <img :src="singer.image" alt="Artist Image" class="cover-image" />
          <div>
            <h1 class="text-3xl font-bold mb-2">{{ singer.name }}</h1>
            <p class="text-sm text-gray-500 mb-4">
              <span>
              <svg width="20" height="20" viewBox="0 0 48 25" fill="#1c1c1c" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M16 19C18.7629 19 21 16.7629 21 14C21 11.2371 18.7629 9 16 9C13.2371 9 11 11.2371 11 14C11 16.7629 13.2371 19 16 19ZM16 21C19.8675 21 23 17.8675 23 14C23 10.1325 19.8675 7 16 7C12.1325 7 9 10.1325 9 14C9 17.8675 12.1325 21 16 21Z"
                  fill="#1c1c1c"/>
                <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M5.76618 28.0846C5.14556 28.6486 5 29.0826 5 29.4V33H27V29.4C27 29.0826 26.8544 28.6486 26.2338 28.0846C25.6009 27.5095 24.6268 26.9511 23.3932 26.4645C20.924 25.4906 17.9234 25 16 25C14.0766 25 11.076 25.4906 8.60682 26.4645C7.37322 26.9511 6.39908 27.5095 5.76618 28.0846ZM16 23C11.6612 23 3 25.144 3 29.4V35H29V29.4C29 25.144 20.3387 23 16 23Z"
                  fill="#1c1c1c"/>
              </svg>
              </span>
            {{ formatNumber(singer.followers) }} подписчиков
            </p>
            <p>{{ singer.description }}</p>

            <div class="flex gap-4 mt-2">
              <button class="btn">Подписаться</button>
              <button class="btn">Поделиться</button>
            </div>
          </div>
        </div>

        <div class="mb-6 mt-4">
          <h2 class="text-xl font-semibold mb-2">Популярные треки</h2>
          <div class="space-y-4">
            <TrackCard
              v-for="(track, index) in topTracks"
              :key="track.id"
              :track="track"
              :index="index"
              @click="goToTrackPage(track)"
            />
          </div>
        </div>

        <div class="mb-6">
          <h2 class="text-xl font-semibold mb-2">Альбомы</h2>
          <div class="flex justify-center overflow-hidden transition gap-2 rounded-lg p-2">
          <button 
            class="text-2xl text-bold p-4 bg-transparent border-none" 
            @click="prev" 
            :disabled="currentPage === 0"
          >
            ‹
          </button>
            <AlbumCard
              v-for="album in pagedAlbums"
              :key="album.id"
              :album="album"
              @click="goToAlbum(album)"
            />
            <button
              class="text-2xl text-bold p-4 bg-transparent border-none"
              @click="next"
              :disabled="currentPage + itemsPerPage >= albums.length"
            >
              ›
            </button>
          </div>
        </div>

        <div class="mb-6">
          <h2 class="text-xl font-semibold mb-4">Похожие исполнители</h2>
          <div class="flex gap-4 overflow-x-auto">
            <div class="flex flex-col gap-3 mb-10" style="width: 800px;" >
              <SingerCard
                v-for="similarArtist in similarArtists"
                :key="similarArtist.id"
                :singer="similarArtist"
                @click="goToSinger(similarArtist)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import TrackCard from './TrackCard.vue'
import SingerCard from './SingerCard.vue'
import AlbumCard from './AlbumCard.vue'

const route = useRoute()
const router = useRouter()

const singer = ref({})
const topTracks = ref([])
const albums = ref([])
const similarArtists = ref([])

const scrollContainer = ref(null)

const itemsPerPage = 4
const currentPage = ref(0)
const pagedAlbums = computed(() =>
  albums.value.slice(currentPage.value, currentPage.value + itemsPerPage)
)

function formatNumber(value) {
  if (typeof value !== 'number' || isNaN(value)) return '0'
  if (value >= 1_000_000_000) return (value / 1_000_000_000).toFixed(1) + 'B'
  if (value >= 1_000_000) return (value / 1_000_000).toFixed(1) + 'M'
  if (value >= 1_000) return (value / 1_000).toFixed(1) + 'K'
  return value.toString()
}

function scrollToTop() {
  if (scrollContainer.value) {
    scrollContainer.value.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

function next() {
  if (currentPage.value + itemsPerPage < albums.value.length) currentPage.value++
}
function prev() {
  if (currentPage.value > 0) currentPage.value--
}
function close() {
  router.back()
}
function goToSinger(singer) {
  router.push(`/singers/${singer.id}`)
  scrollToTop()
}
function goToTrackPage(track) {
  router.push(`/track/${track.id}`)
}
function goToAlbum(album) {
  router.push(`/albums/${album.id}`)
}

const API = 'http://localhost:5240/api/singer'

async function loadSingerData(id) {
  try {
    const [singerRes, tracksRes, albumsRes, similarRes] = await Promise.all([
      fetch(`${API}/singers/${id}`).then(r => r.json()),
      fetch(`${API}/singers/${id}/top_tracks`).then(r => r.json()),
      fetch(`${API}/singers/${id}/albums`).then(r => r.json()),
      fetch(`${API}/singers/${id}/similar`).then(r => r.json())
    ])

    singer.value = {
      name: singerRes.singer.name,
      image: `/src/resources/singerCovers/${singerRes.singer.photoUrl}`,
      followers: Number(singerRes.singer.subscribersCount) || 0,
      description: singerRes.singer.description
    }

    topTracks.value = tracksRes.map(t => ({
      id: t.id,
      title: t.name,
      singer: singerRes.singer.name,
      cover: `/src/resources/trackCovers/${t.coverUrl}`
    }))

    albums.value = albumsRes.map(a => ({
      id: a.id,
      title: a.name,
      year: new Date(a.releaseDate).getFullYear(),
      cover: `/src/resources/albumCovers/${a.coverUrl}`
    }))

    similarArtists.value = similarRes.map(s => {
      const totalTracks = s.tracks?.length ?? 0
      const totalPlayCount = s.tracks?.reduce((sum, t) => sum + (t.playCount ?? 0), 0) ?? 0

      return {
        id: s.id,
        name: s.name,
        image: `/src/resources/singerCovers/${s.photoUrl}`,
        subscribersCount: s.subscribersCount ?? 0,
        totalPlayCount,
        totalTracks,
        description: s.description
      }
    })
  } catch (err) {
    console.error('Ошибка при загрузке данных исполнителя:', err)
  }
}

onMounted(() => {
  loadSingerData(route.params.id)
})

watch(() => route.params.id, async (newId) => {
  await loadSingerData(newId)
  scrollToTop()
})
</script>


<style scoped>
.cover-image {
    width: 180px;
    height: 180px;
    border-radius: 99%;
    object-fit: cover;
}
.cover-album-image {
    width: 150px;
    height: 150px;
    border-radius: 8%;
    object-fit: cover;
}
.btn {
  width: 120px;
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

.btn:hover {
  background: #f5f5f5;
}

button:disabled {
  opacity: 0.3;
  cursor: default;
}
</style>