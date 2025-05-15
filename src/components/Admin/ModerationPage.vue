<template>
    <div>
    <h2 class="text-xl font-semibold mb-4">Модерация жалоб и спорных материалов</h2>

    <div v-if="reports.length" class="space-y-4">
        <div
        v-for="report in reports"
        :key="report.id"
        class="flex items-center justify-between rounded-lg shadow p-4"
        >

        <div>
            <p class="text-sm text-gray-600">
            Жалоба №{{ report.id }} от {{ formatDate(report.createdAt) }}
            </p>
            <p class="mt-1"><strong>Пользователь:</strong> {{ report.userName }}</p>
            <p class="mt-1"><strong>Текст жалобы:</strong> {{ report.content }}</p>
            <template v-if="report.trackId">
            <p class="mt-1"><strong>Трек:</strong> {{ report.trackName || report.trackId }}</p>
            </template>
            <template v-if="report.commentId">
            <p class="mt-1"><strong>Комментарий ID:</strong> {{ report.commentId }}</p>
            </template>
        </div>
        <div class="flex flex-wrap gap-3 mb-3 md:mb-0">
            <button
            v-if="report.trackId && !report.trackBlocked"
            @click="handleBlockTrack(report)"
            class="btn bg-red"
            >
            Заблокировать трек
            </button>
            <button
            v-if="report.trackId && report.trackBlocked"
            disabled
            class="btn opacity-50 cursor-not-allowed"
            >
            Трек заблокирован
            </button>

            <button
            v-if="report.commentId && !report.commentDeleted"
            @click="handleDeleteComment(report)"
            class="btn bg-red text-red"
            >
            Удалить комментарий
            </button>
            <button
            v-if="report.commentId && report.commentDeleted"
            disabled
            class="btn opacity-50 cursor-not-allowed"
            >
            Комментарий удалён
            </button>

            <button
            @click="removeReport(report.id)"
            class="btn bg-gray-200 hover:bg-gray-300 text-black"
            >
            Удалить жалобу
            </button>
        </div>
        </div>
    </div>

    <p v-else class="text-gray-500 italic">Нет жалоб для модерации.</p>
    </div>
</template>


<script setup>
import { ref, onMounted } from 'vue'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

const reports = ref([])

function formatDate(iso) {
    return new Date(iso).toLocaleString('ru-RU', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
    })
}

async function fetchReports() {
    try {
    const res = await fetch('http://localhost:5240/api/admin/complaints', {
        credentials: 'include'
    })
    if (!res.ok) throw new Error('Не удалось загрузить жалобы')
    const data = await res.json()
    reports.value = data.map(r => ({
        ...r,
        trackBlocked: false,
        commentDeleted: false
    }))
    } catch (err) {
        toast.error(err.message || 'Ошибка при загрузке жалоб', { position: 'bottom-center' })
    }
}

async function removeReport(id) {
    try {
    const res = await fetch(`http://localhost:5240/api/admin/complaint/${id}`, {
        method: 'DELETE',
        credentials: 'include'
    })
    if (!res.ok) throw new Error('Не удалось удалить жалобу')
    toast.success('Жалоба удалена', { position: 'bottom-center' })
    reports.value = reports.value.filter(r => r.id !== id)
    } catch (err) {
    toast.error(err.message || 'Ошибка при удалении жалобы')
    }
}

async function handleBlockTrack(report) {
    try {
    const res = await fetch(`http://localhost:5240/api/admin/track/reject/${report.trackId}`, {
        method: 'POST',
        credentials: 'include'
    })
    if (!res.ok) throw new Error('Не удалось заблокировать трек')
    toast.success('Трек заблокирован', { position: 'bottom-center' })
    report.trackBlocked = true
    } catch (err) {
    toast.error(err.message || 'Ошибка при блокировке трека')
    }
}

async function handleDeleteComment(report) {
    try {
    const res = await fetch(`http://localhost:5240/api/admin/comment/${report.commentId}`, {
        method: 'DELETE',
        credentials: 'include'
    })
    if (!res.ok) throw new Error('Не удалось удалить комментарий')
    toast.success('Комментарий удалён', { position: 'bottom-center' })
    report.commentDeleted = true
    } catch (err) {
    toast.error(err.message || 'Ошибка при удалении комментария')
    }
}

onMounted(fetchReports)
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

.bg-red:hover {
    background-color: #f5c2c7;
}

.bg-gray-200 {
    background-color: #e2e8f0;
}

.bg-gray-200:hover {
    background-color: #cbd5e1;
}
</style>
