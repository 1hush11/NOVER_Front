<template>
    <div>
        <div class="flex gap-4 mb-6">
            <button
                :class="['tab-btn', { active: activeTab === 'complaints' }]"
                @click="activeTab = 'complaints'"
            >
                Жалобы
            </button>
            <button
                :class="['tab-btn', { active: activeTab === 'feedback' }]"
                @click="activeTab = 'feedback'"
            >
                Отзывы
            </button>
            
            <button 
                class="btn bg-gray-200 ml-auto flex items-center" 
                style="height: 40px;" 
                @click="showBadWordModal = true"
            >
                + Добавить запрещенное слово
            </button>
        </div>

        <div v-if="activeTab === 'complaints'">
            <div class="flex items-center flex-wrap gap-4 mb-6">
            <div>
                <label class="ml-2">С даты:</label>
                <input type="date" v-model="dateFrom" class="ml-2"/>
            </div>
            <div>
                <label class="ml-2">По дату:</label>
                <input type="date" v-model="dateTo" class="ml-2"/>
            </div>

            <div class="ml-4">
                <label>Статус:</label>
                <select v-model="complaintStatusFilter" class="border rounded">
                    <option value="all">Все</option>
                    <option value="active">На рассмотрении</option>
                    <option value="approved">Рассмотрено</option>
                    <option value="rejected">Отклонено</option>
                </select>
            </div>

            <div>
                <label class="">Сортировать:</label>
                <select v-model="complaintSort" class="border rounded">
                    <option value="newest">Сначала новые</option>
                    <option value="oldest">Сначала старые</option>
                    <option value="track">По названию трека</option>
                </select>
            </div>
            </div>

            <div v-if="filteredComplaints.length" class="mb-6">
                <div
                    v-for="c in filteredComplaints"
                    :key="c.id"
                    class="flex items-center justify-between rounded-lg shadow p-4 mb-2"
                >
                    <div>
                        <p class="text-sm text-gray-600">
                            Жалоба №{{ c.id }} от {{ formatDate(c.createdAt) }}
                        </p>
                        <p class="mt-2">Пользователь: {{ c.userName }}</p>
                        <p class="mt-2 bg-purple opacity p-2">
                        Трек: <strong>{{ c.trackName }}</strong> | Исполнитель: <strong>{{ c.singerNames }}</strong></p>
                        <p class="mt-2">Текст жалобы: {{ c.content }}</p>
                    </div>
                <div class="flex items-center gap-4">
                    <button
                        v-if="!c.complaintDeleted"
                        @click="blockComplaint(c)"
                        class="btn bg-red text-red"
                    >
                        Заблокировать жалобу
                    </button>
                    <button
                        v-else
                        @click="unblockComplaint(c)"
                        class="btn bg-green text-green"
                    >
                        Разблокировать жалобу
                    </button>

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
                            @click="blockSinger(c)"
                            class="btn bg-red text-red"
                        >
                            Заблокировать исполнителя
                        </button>
                        <button
                            v-else
                            @click="unblockSinger(c)"
                            class="btn bg-green text-green"
                        >
                            Разблокировать исполнителя
                        </button>
                        </template>
                    </div>
                </div>
            </div>
        </div>
        <p v-else class="text-gray-500 mb-6">Нет жалоб для модерации.</p>
        </div>

        <div v-if="activeTab === 'feedback'">
            <div class="flex items-center flex-wrap gap-4 mb-6">
                <div>
                    <label class="ml-2">С даты:</label>
                    <input type="date" v-model="dateFrom" class="ml-2"/>
                </div>
                <div>
                    <label class="ml-2">По дату:</label>
                    <input type="date" v-model="dateTo" class="ml-2"/>
                </div>

                <div class="ml-4">
                    <label>Сортировать:</label>
                    <select v-model="feedbackSort" class="border rounded">
                        <option value="newest">Сначала новые</option>
                        <option value="oldest">Сначала старые</option>
                        <option value="track">По названию трека</option>
                    </select>
                </div>
                <div>
                    <label>Мин. рейтинг:</label>
                    <input type="number"
                        v-model.number="minRating"
                        min="1" max="5"
                        placeholder="1–5"
                        class="ml-2 border rounded-lg p-2" 
                    />
                </div>
            </div>

        <div v-if="filteredFeedback.length">
            <div
                v-for="f in filteredFeedback"
                :key="`${f.trackId}-${f.userId}`"
                class="flex items-center justify-between rounded-lg shadow p-4 mb-2"
                :class="{ 'bg-red-200' : f.totalBlockedCommentsByUser > 5 }"
            >
                <div >
                    <p class="text-sm text-gray-600">
                        Отзыв №{{ f.commentId }} от {{ formatDate(f.commentCreatedAt) }}
                    </p>

                    <p class="mt-2">Пользователь: {{ f.userName }} | Количество блокировок: {{ f.totalBlockedCommentsByUser}}</p>
                    
                    <p class="mt-2 bg-purple opacity p-2">
                    Трек: <strong>{{ f.trackName }}</strong> | Исполнитель: <strong>{{ f.singer }}</strong></p>

                    <div class="mt-2 flex items-center">
                        <span>Рейтинг:</span>
                        <span class="flex ml-2">
                            <span v-for="star in 5" :key="star">
                            <svg
                                v-if="star <= f.ratingValue"
                                fill="#eab308"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M22,9.81a1,1,0,0,0-.83-.69l-5.7-.78L12.88,3.53a1,1,0,0,0-1.76,0L8.57,8.34l-5.7.78a1,1,0,0,0-.82.69,1,1,0,0,0,.28,1l4.09,3.73-1,5.24A1,1,0,0,0,6.88,20.9L12,18.38l5.12,2.52a1,1,0,0,0,.44.1,1,1,0,0,0,1-1.18l-1-5.24,4.09-3.73A1,1,0,0,0,22,9.81Z"/>
                            </svg>
                            <svg
                                v-else
                                fill="none"
                                stroke="#eab308"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <polygon
                                points="12 4 9.22 9.27 3 10.11 7.5 14.21 6.44 20 12 17.27 17.56 20 16.5 14.21 21 10.11 14.78 9.27 12 4"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                />
                            </svg>
                            </span>
                        </span>
                        </div>

                    <p v-if="f.commentText"> Комментарий: {{ f.commentText }}</p>
                </div>

            <div class="flex items-center gap-4">
                <button
                    v-if="f.commentId && f.commentStatus ==='Заблокирован'"
                    @click="unblockComment(f)"
                    class="btn bg-green text-green mt-2"
                >
                    Восстановить комментарий
                </button>
                <button
                    v-else-if="f.commentStatus === 'Активен'"
                    @click="blockComment(f)"
                    class="btn bg-red text-red mt-2"
                >
                    Заблокировать комментарий
                </button>
                <button
                    v-if="f.commentId && f.userStatus === 'Активен'"
                    @click="blockUser(f)"
                    class="btn bg-red text-red mt-2"
                >
                    Заблокировать пользователя
                </button>
                <button
                    v-else-if="f.commentId && f.userStatus === 'Заблокирован'"
                    @click="unblockUser(f)"
                    class="btn bg-green text-green mt-2"
                >
                    Разблокировать пользователя
                </button>
            </div>
            </div>
        </div>
        <p v-else class="text-gray-500 italic">Нет отзывов и рейтингов.</p>
    </div>
    
    <AddBadWordModal
        :isVisible="showBadWordModal"
        @close="showBadWordModal = false"
        @submitted="handleBadWordAdded"
    />
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

import { useSearchStore } from '../../stores/searchStore.js'
import AddBadWordModal from './AddBadWordModal.vue'

const activeTab = ref('complaints')

const complaintSort = ref('newest')
const complaintStatusFilter = ref('all');

const feedbackSort = ref('newest')

const searchStore = useSearchStore()
const complaints = ref([])
const feedback = ref([])

const dateFrom         = ref(null)
const dateTo           = ref(null)
const minRating        = ref(null)
const onlyWithComments = ref(false)

const filteredComplaints = computed(() => {
    const q = searchStore.query.toLowerCase()

    let result = complaints.value.filter(c => {
        const dt = new Date(c.createdAt);
        if (dateFrom.value && dt < new Date(dateFrom.value)) return false;
        if (dateTo.value && dt > new Date(dateTo.value)) return false;

        if (complaintStatusFilter.value === 'active' && c.complaintDeleted) return false;
        if (complaintStatusFilter.value === 'approved' && (!c.trackStatus || c.trackStatus !== 'Заблокирован')) return false;
        if (complaintStatusFilter.value === 'rejected' && !c.complaintDeleted) return false;

        const matchesQuery =
            c.userName.toLowerCase().includes(q) ||
            c.content.toLowerCase().includes(q) ||
            c.trackName.toLowerCase().includes(q) ||
            c.singerNames.toLowerCase().includes(q);

        return matchesQuery;
    });


    result = result.slice().sort((a, b) => {
        if (complaintSort.value === 'newest') {
        return new Date(b.createdAt) - new Date(a.createdAt)
        } else if (complaintSort.value === 'oldest') {
        return new Date(a.createdAt) - new Date(b.createdAt)
        } else if (complaintSort.value === 'track') {
        return a.trackName.localeCompare(b.trackName)
        }
        return 0
    })

    return result
})

const filteredFeedback = computed(() => {
    const q = searchStore.query.toLowerCase()

    let result = feedback.value.filter(f => {
        const dt = f.createdAt ? new Date(f.createdAt) : null
        if (dateFrom.value && (!dt || dt < new Date(dateFrom.value))) return false
        if (dateTo.value && (!dt || dt > new Date(dateTo.value))) return false
        if (minRating.value && f.rating < minRating.value) return false
        if (onlyWithComments.value && !f.commentText) return false

        const matchesQuery =
        f.userName.toLowerCase().includes(q) ||
        f.trackName.toLowerCase().includes(q) ||
        (f.commentText && f.commentText.toLowerCase().includes(q)) ||
        f.singer.toLowerCase().includes(q) ||
        String(f.rating).includes(q)

        return matchesQuery
    })

    result = result.slice().sort((a, b) => {
        if (feedbackSort.value === 'newest') {
        return new Date(b.commentCreatedAt) - new Date(a.commentCreatedAt)
        } else if (feedbackSort.value === 'oldest') {
        return new Date(a.commentCreatedAt) - new Date(b.commentCreatedAt)
        } else if (feedbackSort.value === 'track') {
        return a.trackName.localeCompare(b.trackName)
        }
        return 0
    })

    return result
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
            complaintDeleted: false,
        }))
    } catch (err) {
        console.error(err.message)
    }
}

async function blockTrack(complaint) {
    try {
        const res = await fetch(
        `http://localhost:5240/api/admin/track/reject/${complaint.trackId}`,
        { method: 'POST', credentials: 'include' }
        )
        const resComplaint = await fetch(
            `http://localhost:5240/api/admin/complaint/approve/${complaint.id}`,
            { method: 'PUT', credentials: 'include' }
        )
        if (!res.ok) throw new Error('Не удалось заблокировать трек')
        complaint.trackStatus = 'Заблокирован'
        toast.success('Трек заблокирован', { position: 'bottom-center' })
    } catch {
        console.error(err.message)
    }
}
async function unblockTrack(complaint) {
    try {
        const res = await fetch(
        `http://localhost:5240/api/admin/track/approve/${complaint.trackId}`,
        { method: 'POST', credentials: 'include' }
        )
        if (!res.ok) throw new Error('Не удалось разблокировать трек')
        complaint.trackStatus = 'Активен'
        toast.success('Трек активен', { position: 'bottom-center' })
    } catch {
        console.error(err.message)
    }
}

async function blockSinger(complaint) {
    try {
        const res = await fetch(
            `http://localhost:5240/api/admin/singer/block/${complaint.singers[0].id}`,
            { method: 'POST', credentials: 'include' }
        )
        const resComplaint = await fetch(
            `http://localhost:5240/api/admin/complaint/approve/${complaint.id}`,
            { method: 'PUT', credentials: 'include' }
        )
        if (!res.ok) throw new Error('Не удалось заблокировать исполнителя')
        singer.Status = 'Заблокирован'
        toast.success('Исполнитель заблокирован', { position: 'bottom-center' })
    } catch {
        console.error(err.message)
    }
}
async function unblockSinger(complaint) {
    try {
        const res = await fetch(
        `http://localhost:5240/api/admin/singer/unblock/${complaint.singers[0].id}`,
        { method: 'POST', credentials: 'include' }
        )
        if (!res.ok) throw new Error('Не удалось разблокировать исполнителя')
        singer.Status = 'Активен'
        toast.success('Исполнитель разблокирован', { position: 'bottom-center' })
    } catch {
        console.error(err.message)
    }
}

async function fetchFeedback() {
    try {
    const res = await fetch('http://localhost:5240/api/admin/blocked_feedback', {
        credentials: 'include'
    })
    if (!res.ok) throw new Error('Не удалось загрузить отзывы и рейтинги')
    feedback.value = (await res.json()).map(f => ({
        ...f,
        singer: f.singers ? f.singers.join(', ') : 'Неизвестный исполнитель',
        commentDeleted: false
    }))
    } catch (err) {
        console.error(err.message)
    }
}

async function blockComplaint(complaint) {
    try {
    const res = await fetch(
        `http://localhost:5240/api/admin/complaint/block/${complaint.id}`,
        { method: 'PUT', credentials: 'include' }
    )
    if (!res.ok) throw new Error('Не удалось отклонить жалобу')
    complaint.complaintDeleted = true
    toast.success('Жалоба отклонена', { position: 'bottom-center' })
    } catch (err) {
        console.error(err.message)
    }
}
async function unblockComplaint(complaint) {
    try {
        const res = await fetch(
        `http://localhost:5240/api/admin/complaint/unblock/${complaint.id}`,
        { method: 'PUT', credentials: 'include' }
        )
        if (!res.ok) throw new Error('Не удалось разблокировать жалобу')
        complaint.complaintDeleted = false
        toast.success('Жалоба разблокирована', { position: 'bottom-center' })
    } catch {
        console.error(err.message)
    }
}

async function blockComment(comment) {
    try {
    const res = await fetch(
        `http://localhost:5240/api/admin/comment/block/${comment.commentId}`,
        { method: 'PUT', credentials: 'include' }
    )
    if (!res.ok) throw new Error('Не удалось удалить комментарий')
    comment.commentStatus = 'Заблокирован'
    if (typeof comment.totalBlockedCommentsByUser === 'number') {
        comment.totalBlockedCommentsByUser += 1
    } else {
        comment.totalBlockedCommentsByUser = 1
    }

    toast.success('Комментарий удалён', { position: 'bottom-center' })
    } catch (err) {
        console.error(err.message)
    }
}
async function unblockComment(comment) {
    try {
        const res = await fetch(
        `http://localhost:5240/api/admin/comment/unblock/${comment.commentId}`,
        { method: 'PUT', credentials: 'include' }
        )
        if (!res.ok) throw new Error('Не удалось восстановить комментарий')
        comment.commentStatus = 'Активен'
        if (typeof comment.totalBlockedCommentsByUser === 'number' && comment.totalBlockedCommentsByUser > 0) {
            comment.totalBlockedCommentsByUser -= 1
        }

        toast.success('Комментарий восстановлен', { position: 'bottom-center' })
    } catch {
        console.error(err.message)
    }
}

async function blockUser(comment) {
    try {
    const res = await fetch(
        `http://localhost:5240/api/admin/user/block/${comment.userId}`,
        { method: 'PUT', credentials: 'include' }
    )
        if (!res.ok) throw new Error('Не удалось заблокировать пользователя')
        comment.userStatus = 'Заблокирован'
        toast.success('Пользователь заблокирован, письмо отправлено', { position: 'bottom-center' })
    } catch (err) {
        console.error(err.message)
    }
}
async function unblockUser(comment) {
    try {
        const res = await fetch(
        `http://localhost:5240/api/admin/user/unblock/${comment.userId}`,
        { method: 'PUT', credentials: 'include' }
        )
        if (!res.ok) throw new Error('Не удалость разблокировать пользователя')
        comment.userStatus = 'Активен'
        toast.success('Пользователь разблокирован', { position: 'bottom-center' })
    } catch {
        console.error(err.message)
    }
}

const showBadWordModal = ref(false)

function handleBadWordAdded() {
    showBadWordModal.value = false
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

.tab-btn {
    padding: 0.5rem 1.25rem;
    border-radius: 9999px;
    background-color: #f1f5f9;
    font-weight: 500;
    font-size: 1rem;
    color: #1c1c1c;
    transition: all 0.2s ease;
    border: 2px solid transparent;
}

.tab-btn:hover {
    background-color: #e2e8f0;
}

.tab-btn.active {
    background-color: #e0c8fb;
    color: #1c1c1c;
    border-color: #e0c8fb;
}

.bg-gray-200 {
    background-color: #e2e8f0;
}
.bg-gray-200:hover {
    background-color: #cbd5e1;
}
</style>
