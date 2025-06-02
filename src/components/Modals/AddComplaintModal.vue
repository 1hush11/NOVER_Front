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

        <h2 class="text-2lg font-bold mb-4 text-center">Отправить жалобу</h2>

        <form @submit.prevent="submit" class="flex flex-col">
        <textarea
            class="mt-2 border rounded p-2"
            v-model="form.content"
            rows="4"
            placeholder="Опишите вашу жалобу..."
        ></textarea>

        <button
            type="submit"
            class="bg-purple-200 border-none text-black rounded-lg hover:bg-purple-300 transition mt-4"
            style="height: 40px;"
        >
            Отправить
        </button>
        </form>
    </div>
    </div>
</template>

<script setup>
import { reactive } from 'vue'
import { toast } from 'vue3-toastify'

const props = defineProps({
    isVisible: Boolean,
    trackId: {
    type: [Number, String],
    required: true
    }
})
const emit = defineEmits(['close', 'submitted'])

const form = reactive({
    content: ''
})

function close() {
    emit('close')
}

async function submit() {
    if (!form.content.trim()) {
    toast.error('Пожалуйста, введите текст жалобы.', {
        autoClose: 2000,
        position: 'bottom-center'
    })
    return
    }

    try {
    const payload = {
        trackId: Number(props.trackId),
        content: form.content.trim()
    }

    const response = await fetch('http://localhost:5240/api/user/add_complaint', {
        method: 'POST',
        credentials: 'include',          // <<< здесь обязательно
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })

    if (!response.ok) {
        const errorText = await response.text()
        throw new Error(errorText || 'Не удалось отправить жалобу.')
    }

    const result = await response.json()
    emit('submitted', result)
    close()
    } catch (err) {
    toast.error(err.message, {
        autoClose: 2000,
        position: 'bottom-center'
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
