<template>
    <div class="flex justify-between items-center mb-6">
        <h2 class="text-xl font-bold">Метаданные треков</h2>
    </div>

    <div>
        <table class="min-w-full shadow rounded-lg overflow-hidden gap-4">
        <thead>
            <tr>
            <th class="px-4 py-2 text-left text-sm font-medium">#</th>
            <th class="px-4 py-2 text-left text-sm font-medium">Название</th>
            <th class="px-4 py-2 text-left text-sm font-medium">Исполнители</th>
            <th class="px-4 py-2 text-left text-sm font-medium">Альбом</th>
            <th class="px-4 py-2 text-left text-sm font-medium">Жанр</th>
            <th class="px-4 py-2 text-left text-sm font-medium">Дата релиза</th>
            <th class="px-4 py-2 text-left text-sm font-medium">Длительность</th>
            <th class="px-4 py-2 text-center text-sm font-medium">Действия</th>
            </tr>
        </thead>
        <tbody>
            <tr
            v-for="(track, idx) in tracks"
            :key="track.id"
            class="hover:bg-gray-50 transition"
            >
            <td class="px-4 py-2 text-sm">{{ idx + 1 }}</td>
            <td class="px-4 py-2 text-sm">{{ track.name }}</td>
            <td class="px-4 py-2 text-sm">{{ track.singers.join(', ') }}</td>
            <td class="px-4 py-2 text-sm">{{ track.albumName }}</td>
            <td class="px-4 py-2 text-sm">{{ track.genreName }}</td>
            <td class="px-4 py-2 text-sm">{{ track.releaseDate }}</td>
            <td class="px-4 py-2 text-sm">{{ track.duration }}</td>
            <td class="px-4 py-2 text-center">
                <button
                    @click="openEditModal(track)"
                    class="btn bg-green border-none"
                >
                Изменить
                </button>
            </td>
            </tr>
        </tbody>
        </table>
    </div>

    <div v-if="showEdit" class="modal-overlay">
        <div class="modal">
        <h3 class="text-xl font-semibold mb-4">Редактировать метаданные</h3>
        <form @submit.prevent="updateTrack" class="space-y-4">
            <div>
            <label class="text-sm font-medium mb-2">Название</label>
            <input v-model="editTrack.name" type="text" class="mb-4" required />
            </div>

            <div>
            <label class="text-sm font-medium mb-2">Исполнители (через запятую)</label>
            <input v-model="editTrack.singersCSV" type="text" class="mb-4" />
            </div>

            <div>
            <label class="block text-sm font-medium mb-2">Альбом</label>
            <input v-model="editTrack.albumName" type="text" class="mb-4" />
            </div>

            <div>
            <label class="block text-sm font-medium mb-2">Жанр</label>
            <input v-model="editTrack.genreName" type="text" class="mb-4" />
            </div>

            <div>
            <label class="block text-sm font-medium mb-2">Дата релиза</label>
            <input v-model="editTrack.releaseDate" type="date" class="mb-4" />
            </div>

            <div>
            <label class="block text-sm font-medium mb-2">Длительность (мм:сс)</label>
            <input v-model="editTrack.duration" type="text" class="mb-4" />
            </div>

            <div class="flex justify-center gap-4">
            <button type="button" @click="closeEditModal" class="btn border-none">
                Отмена
            </button>
            <button type="submit" class="btn bg-green border-none">
                Сохранить
            </button>
            </div>
        </form>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

const tracks   = ref([])
const showEdit = ref(false)
const editTrack = ref({
    id: null,
    name: '',
    singersCSV: '',
    singers: [],
    albumName: '',
    genreName: '',
    releaseDate: '',
    duration: '',
    audioUrl: '',
    coverUrl: ''
})

async function fetchTracks() {
    try {
    const res = await fetch('http://localhost:5240/api/admin/tracks', {
        credentials: 'include'
    })
    if (!res.ok) throw new Error('Не удалось загрузить треки')

    const data = await res.json()
    tracks.value = data.map(t => ({
        id: t.id,
        name: t.name,
        singers: t.singers,
        albumName: t.albumName,
        genreName: t.genreName,
        releaseDate: t.releaseDate,
        duration: t.duration,
        audioUrl: t.audioUrl,
        coverUrl: t.coverUrl,
    }))
    } catch (err) {
    toast.error(err.message)
    }
}

function openEditModal(track) {
    editTrack.value = {
    id: track.id,
    name: track.name,
    singersCSV: track.singers.join(', '),
    singers: [...track.singers],
    albumName: track.albumName,
    genreName: track.genreName,
    releaseDate: track.releaseDate,
    duration: track.duration,
    audioUrl: track.audioUrl,
    coverUrl: track.coverUrl,
    }
    showEdit.value = true
}

function closeEditModal() {
    showEdit.value = false
}

async function updateTrack() {
    try {
        const [mm, ss] = editTrack.value.duration
        .split(':')
        .map(x => parseInt(x, 10));
        const durationSec = mm * 60 + ss;

        const dto = {
        Name:        editTrack.value.name,
        Singers:     editTrack.value.singersCSV.split(',').map(s => s.trim()),
        AlbumTitle:  editTrack.value.albumName,
        GenreName:   editTrack.value.genreName,
        ReleaseDate: editTrack.value.releaseDate,
        Duration:    durationSec,
        AudioUrl:    editTrack.value.audioUrl,
        CoverUrl:    editTrack.value.coverUrl,
        Status:      editTrack.value.status
        };

        const res = await fetch(
        `http://localhost:5240/api/admin/track/update/${editTrack.value.id}`,
        {
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(dto)
        }
        );

        if (!res.ok) throw new Error(await res.text());
        toast.success('Метаданные сохранены', { position: 'bottom-center' });
        closeEditModal();
        await fetchTracks();
    } catch (err) {
        toast.error(err.message || 'Ошибка при сохранении');
    }
}

onMounted(fetchTracks)
</script>

<style scoped>
.btn {
    color: #3e6748;
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    font-size: 0.875rem;
    transition: background-color 0.2s;
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
    max-width: 500px;
    box-shadow: 0 10px 25px rgba(0,0,0,0.1);
}

table {
    border-collapse: separate;
    border-spacing: 1rem 0.5rem; 
    background-color: rgba(167, 167, 167, 0.484);
}
</style>
