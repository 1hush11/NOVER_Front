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
        <div id="profile" class="flex items-center gap-4 mb-6 mt-6-">
          <img :src="singer.photo" alt="Artist Image" class="cover-image" />
          <div>
            <h1 class="text-2xl font-bold mb-2">{{ singer.name }}</h1>
            <div class="flex items-center">
            <p class="flex items-center text-sm text-gray-500 mb-4">
              <span>
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 7.16C17.94 7.15 17.87 7.15 17.81 7.16C16.43 7.11 15.33 5.98 15.33 4.58C15.33 3.15 16.48 2 17.91 2C19.34 2 20.49 3.16 20.49 4.58C20.48 5.98 19.38 7.11 18 7.16Z" stroke="#757575" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M16.9699 14.44C18.3399 14.67 19.8499 14.43 20.9099 13.72C22.3199 12.78 22.3199 11.24 20.9099 10.3C19.8399 9.59004 18.3099 9.35003 16.9399 9.59003" stroke="#757575"stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M5.96998 7.16C6.02998 7.15 6.09998 7.15 6.15998 7.16C7.53998 7.11 8.63998 5.98 8.63998 4.58C8.63998 3.15 7.48998 2 6.05998 2C4.62998 2 3.47998 3.16 3.47998 4.58C3.48998 5.98 4.58998 7.11 5.96998 7.16Z" stroke="#757575" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M6.99994 14.44C5.62994 14.67 4.11994 14.43 3.05994 13.72C1.64994 12.78 1.64994 11.24 3.05994 10.3C4.12994 9.59004 5.65994 9.35003 7.02994 9.59003" stroke="#757575" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M12 14.63C11.94 14.62 11.87 14.62 11.81 14.63C10.43 14.58 9.32996 13.45 9.32996 12.05C9.32996 10.62 10.48 9.46997 11.91 9.46997C13.34 9.46997 14.49 10.63 14.49 12.05C14.48 13.45 13.38 14.59 12 14.63Z" stroke="#757575" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M9.08997 17.78C7.67997 18.72 7.67997 20.26 9.08997 21.2C10.69 22.27 13.31 22.27 14.91 21.2C16.32 20.26 16.32 18.72 14.91 17.78C13.32 16.72 10.69 16.72 9.08997 17.78Z" stroke="#757575" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              </span>
            {{ formatNumber(singer.followers) }} подписчиков
            </p>
            </div>
            <p class="text-sm mb-4">{{ singer.description }}</p>

            <div class="flex mt-2">
              <button class="btn"  @click="toggleSubscription">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 11.63C11.94 11.62 11.87 11.62 11.81 11.63C10.43 11.58 9.32996 10.45 9.32996 9.05C9.32996 7.62 10.48 6.46997 11.91 6.46997C13.34 6.46997 14.49 7.63 14.49 9.05C14.48 10.45 13.38 11.59 12 11.63Z" stroke="#1c1c1c" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M9.08997 14.78C7.67997 15.72 7.67997 17.26 9.08997 18.2C10.69 19.27 13.31 19.27 14.91 18.2C16.32 17.26 16.32 15.72 14.91 14.78C13.32 13.72 10.69 13.72 9.08997 14.78Z" stroke="#1c1c1c" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              {{ isSubscribed ? 'Отписаться' : 'Подписаться' }}
              </button>
            </div>
          </div>
        </div>

        <div class="mb-6 mt-4">
          <h2 class="text-xl font-semibold mb-2">Популярные треки</h2>
          <div v-if="topTracks.length">
            <TrackCard
              v-for="(track, index) in topTracks"
              :key="track.id"
              :track="track"
              :index="index"
              @play="() => handleTrackPlay({ track, index })"
            />
          </div>
          <p v-else class="text-gray-500">Нет треков</p>
        </div>

        <div class="mb-6">
          <h2 class="text-xl font-semibold mb-2">Альбомы</h2>
          <div v-if="albums.length" class="flex justify-center overflow-hidden transition gap-2 rounded-lg p-2">
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
          <p v-else class="text-gray-500">Нет альбомов</p>
        </div>

        <div class="mb-6">
          <h2 class="text-xl font-semibold mb-2">Похожие исполнители</h2>
          <div v-if="similarSingers.length" class="flex gap-4 overflow-x-auto">
            <div class="flex flex-col gap-3 mb-10" style="width: 800px;" >
              <SingerCard
                v-for="similarArtist in similarSingers"
                :key="similarArtist.id"
                :singer="similarArtist"
                @click="goToSinger(similarArtist)"
              />
            </div>
          </div>
          <p v-else class="text-gray-500">Нет похожих исполнителей</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import TrackCard from '/src/components/Cards/TrackCard.vue'
import SingerCard from '/src/components/Cards/SingerCard.vue'
import AlbumCard from '/src/components/Cards/AlbumCard.vue'

import { useAudioStore } from '@/stores/audioStore'

import { getAlbumCoverPath, getSingerPhotoPath, getTrackCoverPath, getTrackAudioPath } from '/src/utils/PathHelper.js'

const isSubscribed = ref(false)

async function checkIfSubscribed() {
  try {
    const res = await fetch('http://localhost:5240/api/user/me', {
      credentials: 'include'
    })
    if (!res.ok) return

    const subsRes = await fetch(`http://localhost:5240/api/user/subscriptions`, {
      credentials: 'include'
    })

    if (!subsRes.ok) return
    const subscriptions = await subsRes.json()

    isSubscribed.value = subscriptions.some(s => s.id === Number(route.params.id))
  } catch (e) {
    console.error('Ошибка при проверке подписки:', e)
  }
}

async function toggleSubscription() {
  try {
    const res = await fetch(
      `http://localhost:5240/api/singer/${isSubscribed.value ? 'unsubscribe' : 'subscribe'}/${route.params.id}`,
      {
        method: 'POST',
        credentials: 'include'
      }
    )

    if (!res.ok) {
      const message = await res.text()
      throw new Error(message)
    }

    isSubscribed.value = !isSubscribed.value
    singer.value.followers += isSubscribed.value ? 1 : -1
  } catch (err) {
    console.error(err.message || 'Ошибка при подписке/отписке')
  }
}


const audioStore = useAudioStore()

function handleTrackPlay({ track, index }) {
  const isSame = audioStore.currentTrack.value?.id === track.id
  const isPlaying = audioStore.isPlaying.value

  if (isSame && isPlaying) {
    audioStore.pause()
  } else if (isSame && !isPlaying) {
    audioStore.togglePlay()
  } else {
    audioStore.setQueue(topTracks.value, index)
    audioStore.playCurrent()
  }
}

const route = useRoute()
const router = useRouter()

const singer = ref({})
const topTracks = ref([])
const albums = ref([])
const similarSingers = ref([])

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
function goToAlbum(album) {
  router.push(`/albums/${album.id}`)
}

const API = 'http://localhost:5240/api/singer'

async function loadSingerData(id) {
  try {
    const [singerData, tracksData, albumsData, similardata] = await Promise.all([
      fetch(`${API}/singers/${id}`).then(r => r.json()),
      fetch(`${API}/singers/${id}/top_tracks`).then(r => r.json()),
      fetch(`${API}/singers/${id}/albums`).then(r => r.json()),
      fetch(`${API}/singers/${id}/similar`).then(r => r.json())
    ])

    singer.value = {
      name: singerData.singer.name,
      photo: getSingerPhotoPath(singerData.singer.photoUrl),
      followers: Number(singerData.singer.subscribersCount) || 0,
      description: singerData.singer.description,
    }

    topTracks.value = tracksData.map(t => ({
      id: t.id,
      title: t.name,
      singer: t.singers.length ? t.singers.join(', ') : 'Неизвестный исполнитель',
      cover: getTrackCoverPath(t.coverUrl),
      audio: getTrackAudioPath(t.audioUrl),
    }))

    albums.value = albumsData.map(a => ({
      id: a.id,
      name: a.name,
      year: new Date(a.releaseDate).getFullYear(),
      cover: getAlbumCoverPath(a.coverUrl),
      tracks: a.tracks,
    }))

    similarSingers.value = similardata.map(s => {
      const totalTracks = s.tracks?.length ?? 0
      const totalPlayCount = s.tracks?.reduce((sum, t) => sum + (t.playCount ?? 0), 0) ?? 0

      return {
        id: s.id,
        name: s.name,
        photo: getSingerPhotoPath(s.photoUrl),
        subscribersCount: s.subscribersCount ?? 0,
        totalPlayCount,
        totalTracks,
        description: s.description,
      }
    })
  } catch (err) {
    console.error('Ошибка при загрузке данных исполнителя:', err)
  }
}

onMounted(() => {
  loadSingerData(route.params.id)
  checkIfSubscribed()
})

watch(() => route.params.id, async (newId) => {
  await loadSingerData(newId)
  checkIfSubscribed()
  scrollToTop()
})

</script>


<style scoped>
.cover-image {
  width: 220px;
  height: 220px;
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
  width: 190px;
  height: 40px;
  color: #1c1c1c;
  background: white;
  border: 1px solid #ccc;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
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