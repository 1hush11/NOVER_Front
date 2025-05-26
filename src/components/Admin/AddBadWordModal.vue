<template>
    <div v-if="isVisible" class="modal-overlay">
    <div class="modal-content">
        <div class="flex justify-end">
        <button @click="close" class="absolute hover:text-gray-700 text-xl bg-transparent border-none">
            ✕
        </button>
        </div>

        <h2 class="text-lg font-bold mb-4 text-center">Добавить запрещённое слово</h2>

        <form @submit.prevent="submit" class="flex flex-col gap-3">
        <input
            v-model="word"
            type="text"
            placeholder="Введите слово"
            class="border rounded px-3 py-2"
            required
        />
        <button
            type="submit"
            class="bg-purple-200 border-none text-black rounded-lg hover:bg-purple-300 transition"
            style="height: 40px;"
        >
            Добавить
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
const emit = defineEmits(['close', 'submitted'])

const word = ref('')

function close() {
    emit('close')
}

async function submit() {
    try {
    const res = await fetch('http://localhost:5240/api/admin/add_bad_word', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ word: word.value.trim() }),
        credentials: 'include'
    })
    if (!res.ok) throw new Error(await res.text())
    toast.success('Слово добавлено', { position: 'bottom-center' })
    emit('submitted')
    close()
    } catch (err) {
    toast.error(err.message, { position: 'bottom-center' })
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
