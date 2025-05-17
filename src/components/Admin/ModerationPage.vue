<template>
    <div>
    <div class="filters flex flex-wrap gap-4 mb-6">
    <div>
        <label class="ml-2">С даты:</label>
        <input type="date" v-model="dateFrom" class="ml-2"/>
    </div>
    <div>
        <label class="ml-2">По дату:</label>
        <input type="date" v-model="dateTo" class="ml-2"/>
    </div>
    <div class="flex items-center">
        <label>Мин. рейтинг:</label>
        <input type="number"
            v-model.number="minRating"
            min="1" max="5"
            placeholder="1–5"
            class="ml-2 w-1-3 border rounded-lg p-2" />
    </div>
    <div class="flex items-center">
        <input type="checkbox" v-model="onlyWithComments" id="with-cmt" />
        <label for="with-cmt" class="ml-2">Только с комментарием</label>
    </div>
    </div>
    <h2 class="text-xl font-semibold mb-4">Жалобы</h2>
    <div v-if="filteredComplaints.length" class="mb-6">
        <div
            v-for="c in filteredComplaints"
            :key="c.id"
            class="flex items-center justify-between rounded-lg shadow p-4"
        >
        <div>
            <p class="text-sm text-gray-600">
                Жалоба №{{ c.id }} от {{ formatDate(c.createdAt) }}
            </p>
            <p class="mt-2">Пользователь: {{ c.userName }}</p>
            <p class="mt-2 bg-purple opacity p-2">
            Трек: <strong>{{ c.trackName }}</strong> Исполнитель: <strong>{{ c.singerNames }}</strong></p>
            <p class="mt-2">Текст жалобы: {{ c.content }}</p>
        </div>
        <div class="flex flex-col gap-2">
            <button
                v-if="c.trackStatus !== 'Заблокирован'"
                @click="blockTrack(c)"
                class="btn bg-red text-red mb-2"
            >
                Заблокировать трек
            </button>
            <button
                v-else
                @click="unblockTrack(c)"
                class="btn bg-green text-green mb-2"
            >
                Разблокировать трек
            </button>

            <template v-if="c.singers.length">
                <button
                    v-if="c.singers[0].Status !== 'Заблокирован'"
                    @click="blockSinger(c.singers[0])"
                    class="btn bg-red text-red"
                >
                    Заблокировать исполнителя
                </button>
                <button
                    v-else
                    @click="unblockSinger(c.singers[0])"
                    class="btn bg-green text-green"
                >
                    Разблокировать исполнителя
                </button>
            </template>
        </div>
        </div>
    </div>
    <p v-else class="text-gray-500 mb-6">Нет жалоб для модерации.</p>

    <h2 class="text-xl font-semibold mb-4">Отзывы и рейтинги</h2>
    <div v-if="filteredFeedback.length">
        <div
            v-for="f in filteredFeedback"
            :key="`${f.trackId}-${f.userId}`"
            class="flex items-center justify-between rounded-lg shadow p-4"
        >
            <div>
                <p class="text-sm text-gray-600">
                    Отзыв №{{ f.id }} от {{ formatDate(f.commentCreatedAt) }}
                </p>

                <p class="mt-2">Пользователь: {{ f.userName }}</p>
                <p class="mt-2 bg-purple opacity p-2">
                Трек: <strong>{{ f.trackName }}</strong> Исполнитель: <strong>{{ f.singer }}</strong></p>

                <p class="mt-2">Рейтинг: {{ f.rating }}★</p>

                <p v-if="f.commentText"> Комментарий: {{ f.commentText }}
                </p>
            </div>

        <div class="flex flex-wrap gap-3">
            <button
                v-if="f.commentId && !f.commentDeleted"
                @click="deleteComment(f)"
                class="btn bg-red text-red mt-2"
            >
                Удалить комментарий
            </button>
            <button
                v-else-if="f.commentId && f.commentDeleted"
                disabled
                class="btn cursor-not-allowed mt-2"
            >
                Комментарий удалён
            </button>
        </div>
        
        </div>
    </div>
    <p v-else class="text-gray-500 italic">Нет отзывов и рейтингов.</p>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import { useSearchStore } from '../../stores/searchStore.js'

const searchStore = useSearchStore()
const complaints = ref([])
const feedback = ref([])

const dateFrom         = ref(null)
const dateTo           = ref(null)
const minRating        = ref(null)
const onlyWithComments = ref(false)

const filteredComplaints = computed(() => {
    const q = searchStore.query.toLowerCase()
    return complaints.value.filter(c =>{
        const dt = new Date(c.createdAt)
        if (dateFrom.value && dt < new Date(dateFrom.value)) return false
        if (dateTo.value && dt > new Date(dateTo.value)) return false
        c.userName.toLowerCase().includes(q) ||
        c.content.toLowerCase().includes(q) ||
        c.trackName.toLowerCase().includes(q) ||
        c.singer.toLowerCase().includes(q)
        return true
    })
})

const filteredFeedback = computed(() => {
    const q = searchStore.query.toLowerCase()
    return feedback.value.filter(f => {
        const dt = f.createdAt ? new Date(f.createdAt) : null
        if (dateFrom.value && (!dt || dt < new Date(dateFrom.value))) return false
        if (dateTo.value   && (!dt || dt > new Date(dateTo.value)))   return false
        if (minRating.value && f.rating < minRating.value)            return false
        if (onlyWithComments.value && !f.commentText)                 return false
        
        f.userName.toLowerCase().includes(q) ||
        f.trackName.toLowerCase().includes(q) ||
        (f.commentText && f.commentText.toLowerCase().includes(q)) ||
        f.singer.toLowerCase().includes(q) ||
        String(f.rating).includes(q)

        return true
    })
})

function formatDate(iso) {
    return new Date(iso).toLocaleString('ru-RU', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
    })
}

async function fetchComplaints() {
    try {
        const res = await fetch('http://localhost:5240/api/admin/complaints', {
            credentials: 'include'
        })
        if (!res.ok) throw new Error('Не удалось загрузить жалобы')
        const complaintsData = await res.json()
        complaints.value = complaintsData.map(c => ({
            ...c,
            singerNames: c.singerNames?.length ? c.singerNames.join(', ') : 'Неизвестный исполнитель',
        }))
    } catch (err) {
        toast.error(err.message, { position: 'bottom-center' })
    }
}

async function blockTrack(complaint) {
    try {
        const res = await fetch(
        `http://localhost:5240/api/admin/track/reject/${complaint.trackId}`,
        { method: 'POST', credentials: 'include' }
        )
        if (!res.ok) throw new Error()
        complaint.trackStatus = 'Заблокирован'
        toast.success('Трек заблокирован', { position: 'bottom-center' })
    } catch {
        toast.error('Не удалось заблокировать трек', { position: 'bottom-center' })
    }
}
async function unblockTrack(complaint) {
    try {
        const res = await fetch(
        `http://localhost:5240/api/admin/track/approve/${complaint.trackId}`,
        { method: 'POST', credentials: 'include' }
        )
        if (!res.ok) throw new Error()
        complaint.trackStatus = 'Активен'
        toast.success('Трек активен', { position: 'bottom-center' })
    } catch {
        toast.error('Не удалось разблокировать трек', { position: 'bottom-center' })
    }
}

async function blockSinger(singer) {
    try {
        const res = await fetch(
        `http://localhost:5240/api/admin/singer/block/${singer.id}`,
        { method: 'POST', credentials: 'include' }
        )
        if (!res.ok) throw new Error()
        singer.Status = 'Заблокирован'
        toast.success('Исполнитель заблокирован', { position: 'bottom-center' })
    } catch {
        toast.error('Не удалось заблокировать исполнителя', { position: 'bottom-center' })
    }
}
async function unblockSinger(singer) {
    try {
        const res = await fetch(
        `http://localhost:5240/api/admin/singer/unblock/${singer.id}`,
        { method: 'POST', credentials: 'include' }
        )
        if (!res.ok) throw new Error()
        singer.Status = 'Активен'
        toast.success('Исполнитель разблокирован', { position: 'bottom-center' })
    } catch {
        toast.error('Не удалось разблокировать исполнителя', { position: 'bottom-center' })
    }
}

async function fetchFeedback() {
    try {
    const res = await fetch('http://localhost:5240/api/admin/feedback', {
        credentials: 'include'
    })
    if (!res.ok) throw new Error('Не удалось загрузить отзывы и рейтинги')
    feedback.value = (await res.json()).map(f => ({
        ...f,
        singer: f.singers ? f.singers.join(', ') : 'Неизвестный исполнитель',
        commentDeleted: false
    }))
    } catch (err) {
    toast.error(err.message, { position: 'bottom-center' })
    }
}

async function removeComplaint(id) {
    try {
    const res = await fetch(
        `http://localhost:5240/api/admin/complaint/${id}`,
        { method: 'DELETE', credentials: 'include' }
    )
    if (!res.ok) throw new Error('Не удалось удалить жалобу')
    complaints.value = complaints.value.filter(c => c.id !== id)
    toast.success('Жалоба удалена', { position: 'bottom-center' })
    } catch (err) {
    toast.error(err.message, { position: 'bottom-center' })
    }
}

async function deleteComment(item) {
    try {
    const res = await fetch(
        `http://localhost:5240/api/admin/comment/${item.commentId}`,
        { method: 'DELETE', credentials: 'include' }
    )
    if (!res.ok) throw new Error('Не удалось удалить комментарий')
    item.commentDeleted = true
    toast.success('Комментарий удалён', { position: 'bottom-center' })
    } catch (err) {
    toast.error(err.message, { position: 'bottom-center' })
    }
}

onMounted(() => {
    fetchComplaints()
    fetchFeedback()
})
</script>

<style scoped>
.btn {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 6px;
    font-size: 0.875rem;
    cursor: pointer;
    transition: background-color 0.2s;
}
.bg-gray-200 {
    background-color: #e2e8f0;
}
.bg-gray-200:hover {
    background-color: #cbd5e1;
}
</style>
