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
            <img :src="album.singerPhoto" alt="Singer cover" class="cover-singer-image" />
            <p class="text-purple-600 font-medium cursor-pointer hover:underline">
              {{ album.singer }}
            </p>
          </div>

          <p class="text-sm text-gray-500 mt-2">Дата выпуска: {{ album.releaseDate }}</p>
          <p class="text-sm text-gray-500" v-if="album.tracks.length">Треков: {{ album.tracks.length }}</p>
        </div>
      </div>
    </div>

    <div class="flex justify-center gap-4 mt-2">
      <button class="btn" @click="togglePlay" title="Воспроизвести / Пауза">
        <span v-if="!isThisAlbumPlaying">
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

      <button class="btn" @click="shuffleTracks" title="Перемешать">
        <svg width="24" height="24" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.3536 1.14645C12.1583 0.951184 11.8417 0.951184 11.6464 1.14645C11.4512 1.34171 11.4512 1.65829 11.6464 1.85355L12.7929 3H12C10.7037 3 9.71111 3.58423 8.87248 4.38931C8.20065 5.03427 7.59349 5.85684 6.99461 6.6682C6.86287 6.84668 6.73154 7.02462 6.6 7.2C5.10874 9.18835 3.49037 11 0.5 11C0.223858 11 0 11.2239 0 11.5C0 11.7761 0.223858 12 0.5 12C4.00963 12 5.89126 9.81165 7.4 7.8C7.54367 7.60845 7.6832 7.41962 7.81996 7.23454L7.82005 7.23443L7.82006 7.23441C8.41674 6.42695 8.96069 5.69085 9.56502 5.11069C10.2889 4.41577 11.0463 4 12 4H12.7929L11.6464 5.14645C11.4512 5.34171 11.4512 5.65829 11.6464 5.85355C11.8417 6.04882 12.1583 6.04882 12.3536 5.85355L14.3536 3.85355C14.5488 3.65829 14.5488 3.34171 14.3536 3.14645L12.3536 1.14645ZM0.5 3C3.35278 3 5.12992 4.44588 6.50548 6.06746L6.3762 6.24266C6.2483 6.4161 6.12293 6.58609 6 6.75C5.96397 6.79804 5.92798 6.84581 5.892 6.89331C4.57348 5.29306 3.02637 4 0.5 4C0.223858 4 0 3.77614 0 3.5C0 3.22386 0.223858 3 0.5 3ZM8.87248 10.6107C8.37284 10.131 7.90897 9.55314 7.45767 8.95468C7.64688 8.71693 7.82704 8.48061 8 8.25L8.08987 8.12987C8.58412 8.79402 9.05288 9.39766 9.56502 9.88931C10.2889 10.5842 11.0463 11 12 11H12.7929L11.6464 9.85355C11.4512 9.65829 11.4512 9.34171 11.6464 9.14645C11.8417 8.95118 12.1583 8.95118 12.3536 9.14645L14.3536 11.1464C14.5488 11.3417 14.5488 11.6583 14.3536 11.8536L12.3536 13.8536C12.1583 14.0488 11.8417 14.0488 11.6464 13.8536C11.4512 13.6583 11.4512 13.3417 11.6464 13.1464L12.7929 12H12C10.7037 12 9.71111 11.4158 8.87248 10.6107Z" 
            :fill="isShuffle ? '#e0c8fb' : '#000000'"/>
        </svg>
        Перемешать
      </button>

      <button class="btn" title="В избранное" @click="toggleAlbumLibrary">
        <svg :fill="inLibrary ? '#a896bc' : '#1c1c1'" width="30" height="30" viewBox="-2 -4 24 24" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin" class="jam jam-heart">
          <path d='M3.636 7.208L10 13.572l6.364-6.364a3 3 0 1 0-4.243-4.243L10 5.086l-2.121-2.12a3 3 0 0 0-4.243 4.242zM9.293 1.55l.707.707.707-.707a5 5 0 1 1 7.071 7.071l-7.07 7.071a1 1 0 0 1-1.415 0l-7.071-7.07a5 5 0 1 1 7.07-7.071z'/>
        </svg>
        В избранное
      </button>
    </div>

    <div class="p-8" v-if="album.tracks.length">
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
import { ref, onMounted, h, computed  } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import TrackCard from '/src/components/Cards/TrackCard.vue'

import { getAlbumCoverPath, getSingerPhotoPath, getTrackCoverPath, getTrackAudioPath } from '/src/utils/PathHelper.js'

import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

import { useAudioStore } from '@/useAudioStore'

const isAuthorized = ref(false)
const inLibrary = ref(false)

const audioStore = useAudioStore()

const { isShuffle, toggleShuffle, currentTrack, isPlaying, trackQueue } = audioStore

function handleTrackPlay({ track, index }) {
  const isSame = currentTrack.value?.id === track.id

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
  singerPhoto: '',
  tracks: []
})

const isThisAlbumPlaying = computed(() =>
  currentTrack.value?.albumId === album.id && isPlaying.value
)

function togglePlay() {
  const isSameAlbum =
    trackQueue.value.length === album.value.tracks.length &&
    trackQueue.value.every((track, index) => {
      return track.id === album.value.tracks[index]?.id
    })

  if (isSameAlbum) {
    audioStore.togglePlay()
  } else {
    audioStore.setQueue(album.value.tracks, 0)
    audioStore.playCurrent()
  }
}

function shuffleTracks() {
  toggleShuffle()
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

    const albumData = await response.json()
    album.value = {
      id: albumData.id,
      title: albumData.name,
      cover: getAlbumCoverPath(albumData.coverUrl),
      releaseDate: albumData.releaseDate,
      singer: albumData.singer.name,
      singerPhoto: getSingerPhotoPath(albumData.singer.photoUrl),
      tracks: albumData.tracks.map(t => ({
        id: t.id,
        title: t.name,
        singer: t.singers.length ? t.singers.join(', ') : 'Неизвестный исполнитель',
        cover: getTrackCoverPath(t.coverUrl),
        audio: getTrackAudioPath(t.audioUrl)
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
