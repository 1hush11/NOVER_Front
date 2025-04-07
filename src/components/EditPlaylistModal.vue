<template>
    <div class="modal-overlay">
    <div class="modal-content">
        <div class="flex justify-end">
            <button @click="$emit('close')" class="absolute hover:text-gray-700 text-xl bg-transparent border-none">
            <svg width="24" height="24" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fill="#1c1c1" d="M3.21878,2.15448L9.99679,8.92745L16.70268,2.22183C17.15981,1.81458 17.63394,2.05757 17.8219,2.26259C18.00986,2.46761 18.11719,2.95117 17.77817,3.29732L11.07079,10.0014L17.77817,16.7027C18.07648,16.9529 18.07648,17.4434 17.83701,17.7166C17.59753,17.9897 17.15756,18.1484 16.74155,17.8244L9.99679,11.0754L3.24361,17.8271C2.94835,18.092 2.46049,18.0382 2.21878,17.7746C1.97707,17.5111 1.88533,17.0549 2.19441,16.733L8.92279,10.0014L2.22183,3.29732C1.97729,3.02649 1.8919,2.53265 2.22183,2.22183C2.55175,1.911 3.04367,1.95438 3.21878,2.15448Z"/>
            </svg>
            </button>
        </div>

        <h2 class="text-xl font-bold mb-4 text-center">Редактировать плейлист</h2>

        <form @submit.prevent="submitChanges" class="flex flex-col gap-3">
        <label>Название</label>
        <input v-model="form.title" type="text" class="input" required />

        <label>Описание</label>
        <textarea v-model="form.description" class="input"></textarea>

        <label>Тип</label>
        <select v-model="form.type" class="input">
            <option>public</option>
            <option>private</option>
        </select>

        <label>Обложка (URL)</label>
        <input v-model="form.coverUrl" type="text" class="input" />

        <button type="submit" class="bg-purple-600 text-md rounded-lg hover:bg-purple-700 transition border-none" style="height: 40px;">Сохранить</button>
        </form>
    </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

const props = defineProps({ playlist: Object })
const emit = defineEmits(['close', 'updated'])

const form = ref({
    title: '',
    description: '',
    type: '',
    coverUrl: ''
})

onMounted(() => {
    form.value.title = props.playlist.name
    form.value.description = props.playlist.description
    form.value.type = props.playlist.type || 'public'
    form.value.coverUrl = props.playlist.cover?.split('/').pop() || ''
})

async function submitChanges() {
  const payload = {
    id: props.playlist.id,
    title: form.value.title,
    description: form.value.description,
    type: form.value.type,
    coverUrl: form.value.coverUrl
  }

  try {
    const response = await fetch(`http://localhost:5240/api/playlist/playlists/${props.playlist.id}/edit`, {
      method: 'PUT',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })

    if (!response.ok) {
      const errText = await response.text()
      throw new Error(errText)
    }

    toast.success('Плейлист обновлён!', {
      position: toast.POSITION.BOTTOM_CENTER,
      autoClose: 3000,
    })

    emit('updated', payload)
    emit('close')
  } catch (error) {
    toast.error(error.message || 'Ошибка обновления плейлиста', {
      position: toast.POSITION.BOTTOM_CENTER,
      autoClose: 3000,
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
    background: white;
    padding: 2rem;
    border-radius: 1rem;
    width: 400px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    position: relative;
}
</style>
