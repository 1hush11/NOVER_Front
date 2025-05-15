<template>
    <div class="flex justify-between items-center mb-6">
        <h2 class="text-xl font-bold">Управление жанрами</h2>
        <div class="mr-4">
            <button @click="openAddModal" class="btn text-md bg-purple">
                Добавить жанр
            </button>
        </div>
    </div>

    <div v-if="genres.length" class="genres-grid">
        <div
        v-for="genre in genres"
        :key="genre.id"
        class="flex flex-col bg-white shadow rounded-lg overflow-hidden"
        >
        <div class="p-4 flex-1 flex flex-col">
            <img :src="genre.cover" alt="cover" class="cover-image" />
            <h3 class="text-lg font-semibold mb-2">{{ genre.name }}</h3>
            <p class="text-sm text-gray-600 mb-4 flex-1">{{ genre.description }}</p>
            <div class="flex justify-center gap-4 mt-auto">
            <button @click="openEditModal(genre)" class="btn bg-blue-500 text-gray-500">
                Изменить
            </button>
            <button @click="showDeleteConfirm(genre.id)" class="btn bg-red text-red">
                Удалить
            </button>
            </div>
        </div>
        </div>
    </div>
    <p v-else class="text-gray-500">Жанры не найдены.</p>

    <div v-if="showAdd" class="modal-overlay">
        <div class="modal">
        <h3 class="text-xl font-semibold mb-4">Добавить жанр</h3>
        <form @submit.prevent="addGenre" class="space-y-4">
            <label class="mb-2">Название</label>
            <input
                v-model="newGenre.name"
                type="text"
                placeholder="Название"
                required
                class="mb-4"
            />

            <label class="mb-2">Описание</label>
            <textarea
                v-model="newGenre.description"
                placeholder="Описание"
                required
                class="mb-4"
            />
            <label class="mb-2">Обложка</label>
            <input
                v-model="newGenre.coverUrl"
                type="text"
                placeholder="URL обложки"
                class="mb-6"
            />
            <div class="flex justify-center gap-4">
            <button type="button" @click="closeAddModal" class="btn">
                Отмена
            </button>
            <button type="submit" class="btn bg-green text-green">
                Создать
            </button>
            </div>
        </form>
        </div>
    </div>

    <div v-if="showEdit" class="modal-overlay">
        <div class="modal">
        <h3 class="text-xl font-semibold mb-4">Редактировать жанр</h3>
        <form @submit.prevent="updateGenre" class="space-y-4">
            <label class="mb-2">Название</label>
            <input
                v-model="editGenre.name"
                type="text"
                placeholder="Название"
                required
                class="mb-4"
            />

            <label class="mb-2">Описание</label>
            <textarea
                v-model="editGenre.description"
                placeholder="Описание"
                required
                class="mb-4"
            />

            <label class="mb-2">Обложка</label>
            <input
                v-model="editGenre.coverUrl"
                type="text"
                placeholder="URL обложки"
                class="mb-6"
            />
            <div class="flex justify-center gap-4">
            <button type="button" @click="closeEditModal" class="btn">
                Отмена
            </button>
            <button type="submit" class="btn bg-green text-green">
                Сохранить
            </button>
            </div>
        </form>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, h } from 'vue'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import { getGenreCoverPath } from '/src/utils/PathHelper.js'

const genres    = ref([])
const showAdd   = ref(false)
const showEdit  = ref(false)

const newGenre = ref({
    name: '',
    description: '',
    coverUrl: ''
})

const editGenre = ref({
    id: null,
    name: '',
    description: '',
    coverUrl: ''
})

async function fetchGenres() {
    try {
    const res = await fetch('http://localhost:5240/api/genre/genres')
    if (!res.ok) throw new Error('Не удалось загрузить жанры')
    const data = await res.json()
    genres.value = data.map(g => ({
        id: g.id,
        name: g.name,
        description: g.description,
        cover: getGenreCoverPath(g.coverUrl)
    }))
    } catch (err) {
    toast.error(err.message, {
        position: 'bottom-center',
    })
    }
}

function openAddModal() {
    showAdd.value = true
    newGenre.value = { name: '', description: '', coverUrl: '' }
}
function closeAddModal() {
    showAdd.value = false
}
function openEditModal(g) {
    editGenre.value = {
    id: g.id,
    name: g.name,
    description: g.description,
    coverUrl: g.cover
    }
    showEdit.value = true
}
function closeEditModal() {
    showEdit.value = false
}

async function addGenre() {
    try {
    const res = await fetch('http://localhost:5240/api/admin/genre/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
        name: newGenre.value.name,
        description: newGenre.value.description,
        coverUrl: newGenre.value.coverUrl
        })
    })
    if (!res.ok) throw new Error(await res.text())
    toast.success('Жанр добавлен', {
        position: 'bottom-center',
    })
    closeAddModal()
    await fetchGenres()
    } catch (err) {
    toast.error(err.message, {
        position: 'bottom-center',
    })
    }
}

async function updateGenre() {
    try {
    const { id, name, description, coverUrl } = editGenre.value
    const res = await fetch(`http://localhost:5240/api/admin/genre/update/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ name, description, coverUrl })
    })
    if (!res.ok) throw new Error(await res.text())
    toast.success('Жанр обновлён', {
        position: 'bottom-center',
    })
    closeEditModal()
    await fetchGenres()
    } catch (err) {
    toast.error(err.message, {
        position: 'bottom-center',
    })
    }
}

async function deleteGenre(id) {
    try {
        const res = await fetch(`http://localhost:5240/api/admin/genre/delete/${id}`, {
        method: 'DELETE',
        credentials: 'include'
        })
        if (!res.ok) throw new Error(await res.text())
        toast.success('Жанр удалён', {
        position: 'bottom-center',
    })
        await fetchGenres()
    } catch (err) {
        toast.error(err.message, {
            position: 'bottom-center',
        })
    }
}

function showDeleteConfirm(id) {
    toast(
        ({ closeToast }) => {
        setTimeout(closeToast, 5000)

        return h('div', { class: 'flex flex-col gap-2' }, [
            h('div', { class: 'flex justify-center gap-4 items-center' }, [
            h('span', 'Удалить жанр?'),
            h('button', {
                class: 'bg-gray text-gray-700 rounded-lg border-none px-2 py-1',
                style: 'width: 60px; height: 30px;',
                onClick: closeToast
            }, 'Нет'),
            h('button', {
                class: 'bg-purple text-white rounded-lg border-none px-2 py-1',
                style: 'width: 60px; height: 30px;',
                onClick: async () => {
                await deleteGenre(id)
                closeToast()
                }
            }, 'Да')
            ])
        ])
        },
        {
        position: 'bottom-center',
        autoClose: false,
        closeOnClick: false
        }
    )
}


onMounted(fetchGenres)
</script>

<style scoped>
.genres-grid {
    display: grid;
    grid-template-columns: repeat(1, minmax(0, 1fr));
    gap: 1.5rem;
}

@media (min-width: 768px) {
.genres-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
}
}

@media (min-width: 1024px) {
.genres-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
}
}

.cover-image {
    width: 140px;
    height: 140px;
    border-radius: 25%;
    object-fit: cover;
    display: block;
    margin: 0 auto;
}
.btn {
    border: 1px solid #ccc;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    transition: 0.2s;
}

.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 50;
}
.modal {
    background: white;
    padding: 1.5rem;
    border-radius: 0.5rem;
    width: 100%;
    max-width: 400px;
    box-shadow: 0 10px 25px rgba(0,0,0,0.1);
}
</style>
