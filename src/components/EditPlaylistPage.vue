<template>
  <div class="flex-1 overflow-y-auto p-8">
    <div v-if="playlist" class="flex justify-end">
      <button class="bg-transparent border-none mt-4 mr-4" @click="close">
        <svg width="24" height="24" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fill="#1c1c1" d="M3.21878,2.15448L9.99679,8.92745L16.70268,2.22183C17.15981,1.81458 17.63394,2.05757 17.8219,2.26259C18.00986,2.46761 18.11719,2.95117 17.77817,3.29732L11.07079,10.0014L17.77817,16.7027C18.07648,16.9529 18.07648,17.4434 17.83701,17.7166C17.59753,17.9897 17.15756,18.1484 16.74155,17.8244L9.99679,11.0754L3.24361,17.8271C2.94835,18.092 2.46049,18.0382 2.21878,17.7746C1.97707,17.5111 1.88533,17.0549 2.19441,16.733L8.92279,10.0014L2.22183,3.29732C1.97729,3.02649 1.8919,2.53265 2.22183,2.22183C2.55175,1.911 3.04367,1.95438 3.21878,2.15448Z"/>
        </svg>
      </button>
    </div>

    <div v-if="playlist" class="flex gap-6 mt-6-">
      <img :src="playlist.cover" class="cover-image" />
      <div class="flex flex-col gap-4">
        <h1 class="text-xl font-bold">Редактирование плейлиста</h1>
        <input v-model="editable.name" type="text" class="input-underline"/>
        <textarea v-model="editable.description" class="input-underline" rows="2" />
        <div class="flex items-center gap-2">
          <label class="text-sm font-medium mr-4">Тип:</label>
          <select v-model="editable.type" class="input-underline">
            <option value="public">Публичный</option>
            <option value="private">Приватный</option>
          </select>
        </div>
        <div class="flex items-center gap-2">
          <label class="text-sm font-medium mr-4">Обложка:</label>
          <input v-model="editable.coverUrl" type="text" class="input-underline" />
        </div>
        <button 
          @click="saveChanges" 
          class="bg-purple-600 text-md rounded-lg hover:bg-purple-700 transition border-none"
          style="height: 40px;">
          Сохранить изменения
        </button>
      </div>
    </div>

    <div v-if="playlist" class="mt-8">
      <h2 class="text-xl font-semibold mb-4">Треки</h2>
      <div v-if="playlist.tracks.length" class="flex flex-col gap-3">
        <div
          v-for="(track, index) in playlist.tracks"
          :key="track.id"
          class="flex flex-col gap-3"
        >
        <div class="flex items-center justify-between rounded-lg shadow p-4 w-full">
          <div class="flex items-center gap-4">
            <p class="text-sm text-gray-600 text-center">0{{ index + 1 }}</p>
            <img :src="track.cover" :alt="track.title + ' cover'" class="cover-track-image" />
            <div>
              <p
                class="text-md font-semibold hover:underline cursor-pointer"
                @click.stop="goToTrackPage"
              >
                {{ track.title }}
              </p>
              <p class="text-sm text-gray-600 cursor-default">{{ track.singer }}</p>
            </div>
          </div>

          <button class="bg-transparent border-none p-2" @click="removeTrack(index)">
            <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill="#1c1c1" d="M3.21878,2.15448L9.99679,8.92745L16.70268,2.22183C17.15981,1.81458 17.63394,2.05757 17.8219,2.26259C18.00986,2.46761 18.11719,2.95117 17.77817,3.29732L11.07079,10.0014L17.77817,16.7027C18.07648,16.9529 18.07648,17.4434 17.83701,17.7166C17.59753,17.9897 17.15756,18.1484 16.74155,17.8244L9.99679,11.0754L3.24361,17.8271C2.94835,18.092 2.46049,18.0382 2.21878,17.7746C1.97707,17.5111 1.88533,17.0549 2.19441,16.733L8.92279,10.0014L2.22183,3.29732C1.97729,3.02649 1.8919,2.53265 2.22183,2.22183C2.55175,1.911 3.04367,1.95438 3.21878,2.15448Z"/>
            </svg>
          </button>
        </div>
        </div>        
      </div>
      <p v-else class="text-gray-500">Нет треков в этом плейлисте.</p>
    </div>
    <div class="mt-6 flex justify-center">
      <button 
        @click="showDeleteConfirm"
        class="bg-gray text-gray-700 rounded-lg border-none px-2 py-1"
        style="width: 800px; height: 30px;"
      >
        Удалить плейлист
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, h } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { toast } from 'vue3-toastify'

import { getPlaylistCoverPath, getSingerPhotoPath, getTrackCoverPath, getTrackAudioPath } from '/src/utils/PathHelper.js'

const router = useRouter()
const route = useRoute()

const playlist = ref(null)
const editable = ref({
  name: '',
  description: '',
  coverUrl: '',
  type: '',
})

onMounted(async () => {
  const res = await fetch(`http://localhost:5240/api/playlist/playlists/${route.params.id}`, {
    credentials: 'include',
  })
  const playlistData = await res.json()
  playlist.value = {
    id: playlistData.id,
    name: playlistData.title,
    description: playlistData.description,
    cover: getPlyalistCoverPath(playlistData.coverUrl),
    type: playlistData.type,
    tracks: playlistData.tracks.map(t => ({
      id: t.id,
      title: t.name,
      singer: t.singers?.join(', ') || 'Неизвестный исполнитель',
      cover: getTrackCoverPath(t.coverUrl),
      audio: getTrackAudioPath(t.audioUrl)
    })),
  }
  editable.value = {
    name: playlistData.title,
    description: playlistData.description,
    cover: playlistData.cover,
    type: playlistData.type,
  }
})

async function removeTrack(index) {
  const trackId = playlist.value.tracks[index].id

  try {
    const res = await fetch(`http://localhost:5240/api/playlist/playlists/${playlist.value.id}/remove`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(trackId),
    })

    if (!res.ok) throw new Error(await res.text())

    playlist.value.tracks.splice(index, 1)

    toast.success('Трек удалён из плейлиста', {
      autoClose: 2000,
      position: 'bottom-center',
    })
  } catch (err) {
    toast.error('Ошибка при удалении: ' + err.message, {
      autoClose: 3000,
      position: 'bottom-center',
    })
  }
}


async function saveChanges() {
  const res = await fetch(`http://localhost:5240/api/playlist/playlists/${route.params.id}/edit`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({
      title: editable.value.name,
      description: editable.value.description,
      coverUrl: editable.value.coverUrl,
      type: editable.value.type,
    }),
  })

  if (res.ok) {
    toast.success('Плейлист обновлён!', { 
      autoClose: 2000,
      position: 'bottom-center',
    })
    router.back()
  } else {
    const error = await res.text()
    toast.error('Ошибка: ' + error)
  }
}

async function deletePlaylist() {
  try {
    const res = await fetch(`http://localhost:5240/api/playlist/playlists/${playlist.value.id}`, {
      method: 'DELETE',
      credentials: 'include'
    })

    if (!res.ok) throw new Error(await res.text())

    toast.success('Плейлист удалён', { autoClose: 2000 })
    router.push('/playlists')
  } catch (err) {
    toast.error('Ошибка удаления: ' + err.message, { autoClose: 3000 })
  }
}

function showDeleteConfirm() {
  toast(
    ({ closeToast }) => {
      setTimeout(() => closeToast(), 5000)

      return h('div', { class: 'flex flex-col gap-2' }, [
        h('div', { class: 'flex justify-center gap-4 items-center' }, [
          h('span', 'Удалить плейлист?'),
          h('button', {
            class: 'bg-gray text-gray-700 rounded-lg border-none px-2 py-1',
            style: 'width: 60px; height: 30px;',
            onClick: () => closeToast()
          }, 'Нет'),
          h('button', {
            class: 'bg-purple text-gray-700 rounded-lg border-none px-2 py-1',
            style: 'width: 60px; height: 30px;',
            onClick: async () => {
              await deletePlaylist()
              closeToast()
            }
          }, 'Да')
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

function close() {
  router.back()
}
</script>

<style scoped>
.cover-image {
  width: 150px;
  height: 150px;
  border-radius: 8%;
  object-fit: cover;
}
.cover-track-image {
  width: 48px;
  height: 48px;
  border-radius: 25%;
  object-fit: cover;
}

.input-underline {
  position: relative;
  border: none;
  border-bottom: 2px solid #ccc;
  background-color: transparent;
  padding: 6px 0;
  font-size: 1rem;
  width: 100%;
  transition: border-color 0.3s;
}

.input-underline:focus {
  outline: none;
  border-bottom: 2px solid #e0c8fb;
}

.input-underline::placeholder {
  color: #bbb;
}
</style>
