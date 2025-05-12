<template>
    <div v-if="isVisible" class="modal-overlay">
    <div class="modal-content">
        <div class="flex justify-end">
        <button @click="close" class="absolute hover:text-gray-700 text-xl bg-transparent border-none">
            <svg width="24" height="24" viewBox="0 0 20 20">
            <path fill="#1c1c1" d="M3.21878,2.15448L9.99679,8.92745L16.70268,2.22183C17.15981,1.81458 17.63394,2.05757 17.8219,2.26259C18.00986,2.46761 18.11719,2.95117 17.77817,3.29732L11.07079,10.0014L17.77817,16.7027C18.07648,16.9529 18.07648,17.4434 17.83701,17.7166C17.59753,17.9897 17.15756,18.1484 16.74155,17.8244L9.99679,11.0754L3.24361,17.8271C2.94835,18.092 2.46049,18.0382 2.21878,17.7746C1.97707,17.5111 1.88533,17.0549 2.19441,16.733L8.92279,10.0014L2.22183,3.29732C1.97729,3.02649 1.8919,2.53265 2.22183,2.22183C2.55175,1.911 3.04367,1.95438 3.21878,2.15448Z"/>
            </svg>
        </button>
        </div>

        <h2 class="text-2lg font-bold mb-4 text-center">Создание плейлиста</h2>

        <form @submit.prevent="submit" class="flex flex-col">
            <label for="name" class="p-2 mt-2 text-sm font-semibold text-gray-700">Название</label>
            <input id="name" class="p-2 w-3-5 border-gray-300 rounded-lg" v-model="form.title" type="text" placeholder="Название плейлиста" required />
            
            <label for="description" class="p-2 mt-2 text-sm font-semibold text-gray-700">Описание</label>
            <textarea id="description" class="p-2 w-3-5 border-gray-300 rounded-lg" v-model="form.description" rows="2" placeholder="Описание (необязательно)"/>
            
            <label for="type" class="p-2 mt-2 text-sm font-semibold text-gray-700">Тип плейлиста</label>
            <select id="type"class="p-2 w-3-5 border-gray-300" v-model="form.type">
                <option value="public">Публичный</option>
                <option value="private">Приватный</option>
            </select>

            <label for="cover" class="p-2 mt-2 text-sm font-semibold text-gray-700">Обложка</label>
            <input id="cover" class="custom-file-input mb-6" type="file" @change="handleFileChange" accept="image/*" />

            <button
                type="submit"
                class="bg-purple-600 border-none text-md rounded-lg hover:bg-purple-700 transition"
                style="height: 40px;"
            >
                Создать
            </button>
        </form>
    </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { toast } from 'vue3-toastify'

const props = defineProps({
    isVisible: Boolean
})
const emit = defineEmits(['close', 'created'])

const form = ref({
    title: '',
    description: '',
    type: 'public',
})
const coverFile = ref(null)

function handleFileChange(e) {
    coverFile.value = e.target.files[0]
}

function close() {
    emit('close')
}

async function submit() {
    try {
        const playlistData = new FormData()
        playlistData.append('title', form.value.title)
        playlistData.append('description', form.value.description)
        playlistData.append('type', form.value.type)
        if (coverFile.value) {
            playlistData.append('coverUrl', coverFile.value)
        }

        const res = await fetch('http://localhost:5240/api/playlist/add_playlist', {
        method: 'POST',
        body: playlistData,
        credentials: 'include'
        })

        if (!res.ok) throw new Error(await res.text())

        const result = await res.json()
        emit('created', result)
        close()
    } catch (err) {
        toast.error(err.message, {
        autoClose: 2000,
        position: 'bottom-center',
        })
    }
}
</script>

<style scoped>
.modal-overlay {
    position: fixed;
    display: flex;
    align-items: center;
    inset: 0;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.4);
    z-index: 9999;
}
.modal-content {
    width: 400px;
    border-radius: 4%;
    background-color: white;
    padding: 1.5rem;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    position: relative;
}
</style>
