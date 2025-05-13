<template>
    <div class="modal-overlay">
    <div class="modal-content">
        <div class="flex justify-end">
        <button @click="close" class="absolute hover:text-gray-700 text-xl bg-transparent border-none" aria-label="Закрыть">
            <svg width="24" height="24" viewBox="0 0 20 20">
            <path fill="#1c1c1" d="M3.21878,2.15448L9.99679,8.92745L16.70268,2.22183C17.15981,1.81458 17.63394,2.05757 17.8219,2.26259C18.00986,2.46761 18.11719,2.95117 17.77817,3.29732L11.07079,10.0014L17.77817,16.7027C18.07648,16.9529 18.07648,17.4434 17.83701,17.7166C17.59753,17.9897 17.15756,18.1484 16.74155,17.8244L9.99679,11.0754L3.24361,17.8271C2.94835,18.092 2.46049,18.0382 2.21878,17.7746C1.97707,17.5111 1.88533,17.0549 2.19441,16.733L8.92279,10.0014L2.22183,3.29732C1.97729,3.02649 1.8919,2.53265 2.22183,2.22183C2.55175,1.911 3.04367,1.95438 3.21878,2.15448Z"/>
            </svg>
        </button>
        </div>
        <h2 class="text-2lg font-bold mb-4 text-center">Добавление альбома</h2>

        <form @submit.prevent="submitAlbum" class="flex flex-col gap-2">
        <label class="p-2 text-sm font-semibold text-gray-700">Название альбома</label>
        <input v-model="form.albumName" type="text" required />

        <label class="p-2 text-sm font-semibold text-gray-700">Обложка (файл)</label>
        <input class="custom-file-input" type="file" @change="handleCoverUpload" accept="image/*" />

        <label class="p-2 text-sm font-semibold text-gray-700">Жанр</label>
        <select v-model.number="form.genreId">
            <option disabled value="">Выберите жанр</option>
            <option v-for="genre in genres" :key="genre.id" :value="genre.id">{{ genre.name }}</option>
        </select>

        <div class="mt-4">
            <h3 class="font-semibold mb-2">Треки альбома</h3>
            <div v-for="(track, index) in form.tracks" :key="index" class="flex gap-2 mb-2 items-center">
            <input v-model="track.name" class="input" type="text" placeholder="Название трека" />
            <input
                type="file"
                class="custom-file-input ml-2"
                @change="e => {
                    track.file = e.target.files[0]
                    track.fileName = e.target.files[0]?.name || ''
                }"
                accept="audio/*"
            />
            <span v-if="track.fileName" class="text-sm text-gray-600 truncate w-2">{{ track.fileName }}</span>

            <button type="button" class="bg-transparent border-none p-2" @click="removeTrack(index)">
                <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill="#1c1c1" d="M3.21878,2.15448L9.99679,8.92745L16.70268,2.22183C17.15981,1.81458 17.63394,2.05757 17.8219,2.26259C18.00986,2.46761 18.11719,2.95117 17.77817,3.29732L11.07079,10.0014L17.77817,16.7027C18.07648,16.9529 18.07648,17.4434 17.83701,17.7166C17.59753,17.9897 17.15756,18.1484 16.74155,17.8244L9.99679,11.0754L3.24361,17.8271C2.94835,18.092 2.46049,18.0382 2.21878,17.7746C1.97707,17.5111 1.88533,17.0549 2.19441,16.733L8.92279,10.0014L2.22183,3.29732C1.97729,3.02649 1.8919,2.53265 2.22183,2.22183C2.55175,1.911 3.04367,1.95438 3.21878,2.15448Z"/>
                </svg>
            </button>
            </div>
            <button type="button" class="bg-gray mt-4 text-gray-700 rounded-lg border-none" style="width: 430px; height: 25px;" @click="addTrack">
            + Добавить трек
            </button>
        </div>

        <button type="submit" class="mt-4 bg-purple-600 text-md rounded-lg hover:bg-purple-700 transition border-none" style="width: 430px; height: 40px;">
            Опубликовать альбом
        </button>
        </form>
    </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

const emit = defineEmits(['close'])

const form = ref({
    albumName: '',
    releaseDate: '',
    coverUrl: '',
    genreId: null,
    tracks: []
})

const genres = ref([])

function addTrack() {
    form.value.tracks.push({ name: '', file: null, fileName: '' })
}
function removeTrack(index) {
    form.value.tracks.splice(index, 1)
}
function close() {
    emit('close')
}

const coverFile = ref(null)

function handleCoverUpload(event) {
    const file = event.target.files[0]
    if (file) {
        coverFile.value = file
    }
}

async function fetchGenres() {
    const res = await fetch('http://localhost:5240/api/genre/genres', { credentials: 'include' })
    if (res.ok) genres.value = await res.json()
}

async function submitAlbum() {
    if (form.value.tracks.length === 0) {
        toast.error('Добавьте хотя бы один трек', { position: toast.POSITION.BOTTOM_CENTER })
        return
    }

    try {
        const albumData = new FormData()
        albumData.append('albumName', form.value.albumName)
        albumData.append('genreId', form.value.genreId ?? '')
        if (coverFile.value) {
            albumData.append('coverFile', coverFile.value)
        }

        const res = await fetch('http://localhost:5240/api/user/publish_album', {
        method: 'POST',
        body: albumData,
        credentials: 'include'
        })

        if (!res.ok) throw new Error(await res.text())
        const { id: albumId } = await res.json()

        for (const track of form.value.tracks) {
        const trackForm = new FormData()
        trackForm.append('name', track.name)
        trackForm.append('albumId', albumId)
        trackForm.append('genreId', form.value.genreId ?? '')
        trackForm.append('coverUrl', form.value.coverUrl)
        trackForm.append('file', track.file)

        const trackRes = await fetch('http://localhost:5240/api/user/publish_track', {
            method: 'POST',
            body: trackForm,
            credentials: 'include'
        })

        if (!trackRes.ok) {
            const msg = await trackRes.text()
            throw new Error(`Ошибка при загрузке трека "${track.name}": ${msg}`)
        }
        }

        toast.success('Альбом и треки успешно опубликованы!', { position: toast.POSITION.BOTTOM_CENTER })
        emit('close')
    } catch (error) {
        toast.error(error.message || 'Ошибка при добавлении альбома', { position: toast.POSITION.BOTTOM_CENTER })
    }
}


onMounted(fetchGenres)
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
    width: 500px;
    background: white;
    padding: 2rem;
    border-radius: 1rem;
    position: relative;
    box-shadow: 0 0 20px rgba(0,0,0,0.2);
    max-height: 90vh;
    overflow-y: auto;
}
.input {
    border: 1px solid #ccc;
    padding: 0.5rem;
    border-radius: 8px;
    width: 100%;
}
.btn {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 8px;
    cursor: pointer;
}
</style>
