<template>
  <div>
    <div class="flex justify-end">
      <button class="bg-transparent border-none mt-4 mr-4" @click="close">
        <svg width="24" height="24" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fill="#1c1c1" d="M3.21878,2.15448L9.99679,8.92745L16.70268,2.22183C17.15981,1.81458 17.63394,2.05757 17.8219,2.26259C18.00986,2.46761 18.11719,2.95117 17.77817,3.29732L11.07079,10.0014L17.77817,16.7027C18.07648,16.9529 18.07648,17.4434 17.83701,17.7166C17.59753,17.9897 17.15756,18.1484 16.74155,17.8244L9.99679,11.0754L3.24361,17.8271C2.94835,18.092 2.46049,18.0382 2.21878,17.7746C1.97707,17.5111 1.88533,17.0549 2.19441,16.733L8.92279,10.0014L2.22183,3.29732C1.97729,3.02649 1.8919,2.53265 2.22183,2.22183C2.55175,1.911 3.04367,1.95438 3.21878,2.15448Z"/>
        </svg>
      </button>
    </div>

    <div class="flex gap-4 justify-center mt-6- p-8">
      <img :src="album.cover" alt="Album cover" class="cover-image" />

      <div class="flex flex-col justify-between">
        <div>
          <h1 class="text-2xl font-bold">{{ album.title }}</h1>

          <div class="flex items-center mt-2">
            <img :src="album.singerCover" alt="Singer cover" class="cover-singer-image" />
            <p class="text-purple-600 font-medium cursor-pointer hover:underline">
              {{ album.singer }}
            </p>
          </div>

          <p class="text-sm text-gray-500 mt-2">Дата выпуска: {{ album.releaseDate }}</p>
          <p class="text-sm text-gray-500">Треков: {{ album.tracks.length }}</p>
        </div>
      </div>
    </div>

    <div class="flex justify-center gap-4 mt-2">
      <button class="btn" @click="togglePlay" title="Воспроизвести / Пауза">
        <span v-if="!isThisTrackPlaying">
          <svg width="24" height="24" viewBox="0 0 24 20" fill="currentColor">
            <path d="M8 5v14l11-7-11-7z" />
          </svg>
        </span>
        <span v-else>
          <svg width="24" height="24" viewBox="0 0 24 20" fill="currentColor">
            <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
          </svg>
        </span>
        Воспроизвести
      </button>

      <button class="btn" title="В избранное" @click="toggleAlbumLibrary">
        <svg :fill="inLibrary ? '#a896bc' : '#1c1c1'" width="30" height="30" viewBox="-2 -4 24 24" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin" class="jam jam-heart">
          <path d='M3.636 7.208L10 13.572l6.364-6.364a3 3 0 1 0-4.243-4.243L10 5.086l-2.121-2.12a3 3 0 0 0-4.243 4.242zM9.293 1.55l.707.707.707-.707a5 5 0 1 1 7.071 7.071l-7.07 7.071a1 1 0 0 1-1.415 0l-7.071-7.07a5 5 0 1 1 7.07-7.071z'/>
        </svg>
        В избранное
      </button>
    </div>

    <div class="p-8">
      <h2 class="text-xl font-semibold mb-4">Треки альбома</h2>
      <TrackCard
        v-for="(track, index) in album.tracks"
        :key="index"
        :index="index"
        :track="track"
        @play="() => handleTrackPlay({ track, index })"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, h, computed  } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import TrackCard from './TrackCard.vue'

import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

import { useAudioStore } from '@/useAudioStore'

const isAuthorized = ref(false)
const inLibrary = ref(false)

const audioStore = useAudioStore()

function handleTrackPlay({ track, index }) {
  const isSame = audioStore.currentTrack.value?.id === track.id
  const isPlaying = audioStore.isPlaying.value

  if (isSame && isPlaying) {
    audioStore.pause()
  } else if (isSame && !isPlaying) {
    audioStore.togglePlay()
  } else {
    audioStore.setQueue(album.value.tracks, index)
    audioStore.playCurrent()
  }
}

async function fetchCurrentUser() {
  try {
    const res = await fetch('http://localhost:5240/api/user/me', {
      credentials: 'include'
    })
    if (!res.ok) {
      isAuthorized.value = false
      return
    }
    await res.json()
    isAuthorized.value = true
  } catch (err) {
    console.error('Ошибка получения пользователя:', err)
    isAuthorized.value = false
  }
}

async function checkIfInLibrary() {
  try {
    const res = await fetch('http://localhost:5240/api/user/library/albums', {
      credentials: 'include'
    })

    if (res.status === 401) {
      isAuthorized.value = false
      return
    }

    if (!res.ok) throw new Error(await res.text())
    const data = await res.json()
    inLibrary.value = data.some(a => a.id === album.value.id)
  } catch (err) {
    console.error('Ошибка при проверке медиатеки:', err)
    isAuthorized.value = false
  }
}

const route = useRoute()
const router = useRouter()

const album = ref({
  id: '',
  title: '',
  cover: '',
  releaseDate: '',
  singer: '',
  singerCover: '',
  tracks: []
})

const isThisTrackPlaying = computed(() =>
  audioStore.currentTrack.value?.albumId === album.id && audioStore.isPlaying.value
)

const isShuffle = computed(() => audioStore.isShuffle.value)

function togglePlay() {
  const isSameAlbum =
    audioStore.trackQueue.value.length === album.value.tracks.length &&
    audioStore.trackQueue.value.every((track, index) => {
      return track.id === album.value.tracks[index]?.id
    })

  if (isSameAlbum) {
    audioStore.togglePlay()
  } else {
    audioStore.setQueue(album.value.tracks, 0)
    audioStore.playCurrent()
  }
}

function toggleShuffle() {
  isShuffle.value = !isShuffle.value
}

function close() {
  router.back()
}

async function loadAlbumData(albumId) {
  try {
    const response = await fetch(`http://localhost:5240/api/album/album/${albumId}`)
    if (!response.ok) {
      throw new Error(`Ошибка при загрузке: статус ${response.status}`)
    }

    const data = await response.json()
    album.value = {
      id: data.id,
      title: data.name,
      cover: `/src/resources/albumCovers/${data.coverUrl}`,
      releaseDate: data.releaseDate,
      singer: data.singer.name,
      singerCover: `/src/resources/singerCovers/${data.singer.photoUrl}`,
      tracks: data.tracks.map(t => ({
        id: t.id,
        title: t.name,
        singer: t.singers.length ? t.singers.join(', ') : 'Неизвестный исполнитель',
        cover: t.coverUrl
          ? '/src/resources/trackCovers/' + t.coverUrl
          : '/src/resources/trackCovers/empty.png',
        audioUrl: `/src/resources/trackAudio/${t.audioUrl}`
      }))
    }
  } catch (error) {
    console.error('Ошибка при загрузке альбома:', error)
  }
}

async function toggleAlbumLibrary() {
  if (!isAuthorized.value) return

  if (inLibrary.value) {
    showRemoveConfirm()
  } else {
    await addAlbumToLibrary()
  }
}

async function addAlbumToLibrary() {
  try {
    const res = await fetch(`http://localhost:5240/api/user/library/add_album/${album.value.id}`, {
      method: 'POST',
      credentials: 'include'
    })
    if (!res.ok) throw new Error(await res.text())
    inLibrary.value = true

    await updateTrackLibraryFlags()

    toast.success('Альбом добавлен в медиатеку', { autoClose: 3000, position: 'bottom-center' })
  } catch (err) {
    toast.error(err.message || 'Ошибка при добавлении', { autoClose: 3000, position: 'bottom-center' })
  }
}

async function removeAlbumFromLibrary() {
  try {
    const res = await fetch(`http://localhost:5240/api/user/library/remove_album/${album.value.id}`, {
      method: 'DELETE',
      credentials: 'include'
    })
    if (!res.ok) throw new Error(await res.text())
    inLibrary.value = false

    await updateTrackLibraryFlags()

    toast.success('Альбом удалён из медиатеки', { autoClose: 3000, position: 'bottom-center' })
  } catch (err) {
    toast.error(err.message || 'Ошибка при удалении', { autoClose: 3000, position: 'bottom-center' })
  }
}

async function updateTrackLibraryFlags() {
  try {
    const res = await fetch('http://localhost:5240/api/user/library/tracks', {
      credentials: 'include'
    })

    if (!res.ok) throw new Error(await res.text())
    const trackList = await res.json()

    const trackIdsInLibrary = new Set(trackList.map(t => t.id))

    album.value.tracks.forEach(track => {
      track.inLibrary = trackIdsInLibrary.has(track.id)
    })
  } catch (err) {
    console.error('Не удалось обновить состояние сердечек треков:', err)
  }
}

function formatDuration(seconds) {
  const min = Math.floor(seconds / 60)
  const sec = seconds % 60
  return `${min}:${sec.toString().padStart(2, '0')}`
}

onMounted(async () => {
  await fetchCurrentUser()
  await loadAlbumData(route.params.id)
  if (isAuthorized.value) {
    await checkIfInLibrary()
  } 
})


function showRemoveConfirm() {
  toast(
    ({ closeToast }) => {
      setTimeout(() => closeToast(), 5000)

      return h('div', { class: 'flex flex-col gap-2' }, [
        h('div', { class: 'flex justify-center gap-4 items-center' }, [
          h('span', 'Удалить альбом из медиатеки?'),
          h(
            'button',
            {
              class: 'bg-gray text-gray-700 rounded-lg border-none px-2 py-1',
              style: 'width: 60px; height: 30px;',
              onClick: () => closeToast()
            },
            'Нет'
          ),
          h(
            'button',
            {
              class: 'bg-purple text-gray-700 rounded-lg border-none px-2 py-1',
              style: 'width: 60px; height: 30px;',
              onClick: async () => {
                await removeAlbumFromLibrary()
                closeToast()
              }
            },
            'Да'
          )
        ])
      ])
    },
    {
      position: 'bottom-center',
      autoClose: false,
      closeOnClick: false
    }
  )
}

</script>

<style scoped>
.cover-image {
  width: 150px;
  height: 150px;
  border-radius: 8%;
  object-fit: cover;
  border: 1px solid #1c1c1c;
}

.cover-singer-image {
  width: 40px;
  height: 40px;
  border-radius: 99%;
  object-fit: cover; 
  margin-right: 6px;
}

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

.btn:hover {
  background: #f5f5f5;
}

button:disabled {
  opacity: 0.3;
  cursor: default;
}
</style>
