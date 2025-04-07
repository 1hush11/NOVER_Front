<template>
  <div class="modal-overlay">
    <div class="modal-content">
      <div class="flex justify-end">
        <button @click="close" class="absolute hover:text-gray-700 text-xl bg-transparent border-none" aria-label="Закрыть">
        <svg width="24" height="24" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path fill="#1c1c1" d="M3.21878,2.15448L9.99679,8.92745L16.70268,2.22183C17.15981,1.81458 17.63394,2.05757 17.8219,2.26259C18.00986,2.46761 18.11719,2.95117 17.77817,3.29732L11.07079,10.0014L17.77817,16.7027C18.07648,16.9529 18.07648,17.4434 17.83701,17.7166C17.59753,17.9897 17.15756,18.1484 16.74155,17.8244L9.99679,11.0754L3.24361,17.8271C2.94835,18.092 2.46049,18.0382 2.21878,17.7746C1.97707,17.5111 1.88533,17.0549 2.19441,16.733L8.92279,10.0014L2.22183,3.29732C1.97729,3.02649 1.8919,2.53265 2.22183,2.22183C2.55175,1.911 3.04367,1.95438 3.21878,2.15448Z"/>
        </svg>
        </button>
    </div>  
      <h2 class="text-xl font-bold mb-4 text-center">Добавление трека</h2>

      <form @submit.prevent="submitTrack" class="flex flex-col">
        <div class="bg-purple rounded-lg p-2 mb-4">
            <label class="mt-2 mb-2 p-2 text-sm font-semibold text-gray-600">Вы публикуете трек под своим исполнением </label>
        </div>

        <label class="p-2 text-sm font-semibold text-gray-700">Название</label>
        <input v-model="form.name" class="input" type="text" required />

        <label class="p-2 text-sm font-semibold text-gray-700">Длительность (секунды)</label>
        <input v-model.number="form.duration" class="input" type="number" />

        <label class="p-2 text-sm font-semibold text-gray-700">Ссылка на аудио</label>
        <input v-model="form.audioUrl" class="input" type="text" />

        <label class="p-2 text-sm font-semibold text-gray-700">Обложка (URL)</label>
        <input v-model="form.coverUrl" class="input" type="text" />

        <label class="p-2 text-sm font-semibold text-gray-700">Жанр</label>
        <select v-model.number="form.genreId" class="input">
          <option disabled value="">Выберите жанр</option>
          <option v-for="genre in genres" :key="genre.id" :value="genre.id">
            {{ genre.name }}
          </option>
        </select>

        <label class="p-2 text-sm font-semibold text-gray-700">Альбом</label>
        <select v-model.number="form.albumId" class="input">
          <option disabled value="">Выберите альбом</option>
          <option v-for="album in albums" :key="album.id" :value="album.id">
            {{ album.name }} — {{ album.singer.name }}
          </option>
        </select>

        <button type="submit" class="mt-4 bg-purple-600 text-md rounded-lg hover:bg-purple-700 transition border-none" style="height: 40px;">
          Добавить
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

const emit = defineEmits(['close', 'trackAdded'])

const form = ref({
    name: '',
    singer: '',
    duration: 0,
    audioUrl: '',
    coverUrl: '',
    releaseDate: '',
    genreId: null,
    albumId: null,
    status: ''
})

const genres = ref([])
const albums = ref([])

async function fetchData() {
    const [genresRes, albumsRes] = await Promise.all([
    fetch('http://localhost:5240/api/genre/genres', { credentials: 'include' }),
    fetch('http://localhost:5240/api/album/albums', { credentials: 'include' })
    ])

    if (genresRes.ok) genres.value = await genresRes.json()
    if (albumsRes.ok) albums.value = await albumsRes.json()
}

async function submitTrack() {
    const payload = {
        name: form.value.name,
        albumId: form.value.albumId,
        duration: form.value.duration,
        genreId: form.value.genreId,
        releaseDate: form.value.releaseDate || null,
        playCount: 0,
        audioUrl: form.value.audioUrl,
        coverUrl: form.value.coverUrl,
        status: form.value.status,
        singers: []
    }

    try {
        const res = await fetch('http://localhost:5240/api/user/add_track', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(payload)
    })

    if (!res.ok) {
        const err = await res.text()
        throw new Error(err)
    }

    const addedTrack = await res.json()
    toast.success('Трек успешно добавлен!', {
        position: toast.POSITION.BOTTOM_CENTER,
        autoClose: 3000,
    })

    emit('trackAdded', addedTrack)
    emit('close')
    } catch (error) {
        toast.error(error.message || 'Ошибка при добавлении трека', {
            position: toast.POSITION.BOTTOM_CENTER,
            autoClose: 3000,
    })
    }
}

function close() {
  emit('close')
}

onMounted(fetchData)
</script>


<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}
.modal-content {
  width: 400px;
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  position: relative;
  box-shadow: 0 0 20px rgba(0,0,0,0.2);
}
.input {
  border: 1px solid #ccc;
  padding: 0.5rem;
  border-radius: 8px;
}
.btn {
  padding: 0.5rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}
</style>
