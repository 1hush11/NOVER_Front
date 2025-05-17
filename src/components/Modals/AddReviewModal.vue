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

        <h2 class="text-2lg font-bold mb-4 text-center">Оставить отзыв</h2>

        <form @submit.prevent="submit" class="flex flex-col">
        <div class="flex items-center justify-center gap-4">
            <svg
                v-for="n in 5"
                :key="n"
                @click="form.rating = n"
                @mouseover="hoverRating = n"
                @mouseleave="hoverRating = 0"
                :fill="n <= (hoverRating || form.rating) ? '#facc15' : '#e5e7eb'"
                class="w-20 h-20"
                viewBox="0 0 20 20"
            >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.121 3.455a1 1 0 00.95.69h3.64c.969 0 1.371 1.24.588 1.81l-2.947 2.14a1 1 0 00-.364 1.118l1.121 3.455c.3.921-.755 1.688-1.54 1.118l-2.947-2.14a1 1 0 00-1.176 0l-2.947 2.14c-.784.57-1.838-.197-1.539-1.118l1.121-3.455a1 1 0 00-.364-1.118L2.34 8.882c-.783-.57-.38-1.81.588-1.81h3.64a1 1 0 00.95-.69l1.121-3.455z"/>
            </svg>
        </div>

        <textarea class="mt-2" v-model="form.comment" rows="4" placeholder="Ваш комментарий..."/>

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
import { ref, reactive, h } from 'vue'
import { toast } from 'vue3-toastify'

const props = defineProps({
    isVisible: Boolean,
    trackId: String
})
const emit = defineEmits(['close', 'submitted'])

const form = reactive({
    rating: 0,
    comment: ''
})

const hoverRating = ref(0)

function close() {
    emit('close')
}

async function submit() {
    try {
        const reviewData = {
            trackId: props.trackId,
            rating: form.rating,
            comment: form.comment
        }

        const res = await fetch('http://localhost:5240/api/user/review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reviewData),
        credentials: 'include'
        })

        if (res.status === 400) {
        const errorText = await res.text()
        if (errorText.includes('оценили')) {
            showUpdateConfirm()
            return
        } else {
            throw new Error(errorText)
        }
        }

        if (!res.ok) throw new Error(await res.text())

        const result = await res.text()
        emit('submitted', result)
        close()
    } catch (err) {
        toast.error(err.message, {
        autoClose: 2000,
        position: 'bottom-center'
        })
    }
}

async function updateReview() {
    try {
        const updateData = {
        trackId: props.trackId,
        rating: form.rating,
        comment: form.comment
        }

        const res = await fetch('http://localhost:5240/api/user/update_review', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData),
        credentials: 'include'
        })

        if (!res.ok) throw new Error(await res.text())

        const result = await res.text()
        toast.success('Отзыв обновлён', { autoClose: 2000, position: 'bottom-center' })
        emit('submitted', result)
        close()
    } catch (err) {
        toast.error(err.message, {
        autoClose: 2000,
        position: 'bottom-center'
        })
    }
}

function showUpdateConfirm() {
    toast(
        ({ closeToast }) => {
        setTimeout(closeToast, 6000)

        return h('div', { class: 'lex flex-col gap-3' }, [
            h('span', 'Вы уже оценивали этот трек. Обновить отзыв?'),
            h('button', {
                class: 'mr-2 bg-gray text-gray-700 rounded-lg border-none px-2 py-1',
                style: 'width: 40px; height: 30px;',
                onClick: closeToast
            }, 'Нет'),
            h('button', {
                class: 'bg-purple text-gray-700 rounded-lg border-none px-2 py-1',
                style: 'width: 60px; height: 30px;',
                onClick: async () => {
                await updateReview()
                closeToast()
                }
            }, 'Обновить')
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
