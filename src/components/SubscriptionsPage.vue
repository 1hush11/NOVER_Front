<template>
    <div class="p-8 bg-white text-gray-900">
    <h1 class="text-3xl font-bold mb-6">Мои подписки</h1>

    <section class="mb-6">
    <h2 class="text-xl font-semibold mb-4">Исполнители</h2>
    <div class="flex justify-center overflow-hidden transition gap-2 rounded-lg p-2">
        <button
            @click="prevSinger" 
            :disabled="currentPageSinger === 0"
            class="text-2xl text-bold p-4 bg-transparent border-none" 
        >
        ‹
        </button>
        <div class="flex gap-4 min-w-max pb-2">
            <div
                v-for="singer in pagedSingers"
                :key="singer.id"
                class="flex flex-col items-center min-w-[96px] cursor-pointer transition hover:scale-105"
                @click="goToSinger(singer)"
            >
            <img :src="singer.photo" :alt="singer.name" class="singer-avatar" />
            <p class="mt-2 text-center text-sm text-gray-700 font-medium">{{ singer.name }}</p>
            </div>
        </div>
        <button
            class="text-2xl text-bold p-4 bg-transparent border-none"
            @click="nextSinger"
            :disabled="currentPageSinger + itemsPerPageSinger >= subscribedSingers.length"
        >
        ›
        </button>
    </div>
    </section>

    <section class="mb-6">
    <h2 class="text-xl font-semibold mb-2">Новые альбомы</h2>
    <div class="flex justify-center overflow-hidden transition gap-2 rounded-lg p-2">
        <button
            @click="prevAlbum" 
            :disabled="currentPageAlbum === 0"
            class="text-2xl text-bold p-4 bg-transparent border-none" 
        >
        ‹
        </button>
        <AlbumCard
            v-for="album in pagedAlbums"
            :key="album.id"
            :album="album"
            @click="goToAlbum(album)"
        />
        <button
            class="text-2xl text-bold p-4 bg-transparent border-none"
            @click="nextAlbum"
            :disabled="currentPageAlbum + itemsPerPageAlbum >= newAlbums.length"
        >
        ›
        </button>
    </div>
    </section>


    <section class="mb-6">
        <h2 class="text-xl font-semibold mb-4">Новые популярные треки</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <TrackCard
            v-for="(track, index) in popularTracks"
            :key="track.id"
            :track="track"
            :index="index"
            @play="() => handleTrackPlay({ track, index })"
        />
        </div>
    </section>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'

import AlbumCard from '@/components/AlbumCard.vue'
import TrackCard from '@/components/TrackCard.vue'

import { useAudioStore } from '@/useAudioStore'

import { getAlbumCoverPath, getSingerPhotoPath, getTrackCoverPath, getTrackAudioPath } from '/src/utils/PathHelper.js'

const subscribedSingers = ref([])
const newAlbums = ref([])
const popularTracks = ref([])

const audioStore = useAudioStore()
const router = useRouter()

function goToSinger(singer) {
    router.push(`/singers/${singer.id}`)
}

function goToAlbum(album) {
    router.push(`/albums/${album.id}`)
}

function handleTrackPlay({ track, index }) {
    const isSame = audioStore.currentTrack.value?.id === track.id
    const isPlaying = audioStore.isPlaying.value

    if (isSame && isPlaying) {
        audioStore.pause()
    } else if (isSame && !isPlaying) {
        audioStore.togglePlay()
    } else {
        audioStore.setQueue(popularTracks.value, index)
        audioStore.playCurrent()
    }
}

onMounted(async () => {
    try {
        const singerRes = await fetch('http://localhost:5240/api/user/subscriptions', {
        credentials: 'include'
        })
        if (singerRes.ok) {
        const singersData = await singerRes.json()
        subscribedSingers.value = singersData.map(s => ({
            id: s.id,
            name: s.name,
            photo: getSingerPhotoPath(s.photoUrl),
            followers: Number(s.subscribersCount) || 0,
            description: s.description
            }))
        }

        const albumsRes = await fetch('http://localhost:5240/api/user/subscribed_albums', {
        credentials: 'include'
        })
        if (albumsRes.ok) {
        const albumsData = await albumsRes.json()
        newAlbums.value = albumsData.map(a => ({
            id: a.id,
            name: a.name,
            year: new Date(a.releaseDate).getFullYear(),
            cover: getAlbumCoverPath(a.coverUrl),
            tracks: a.tracks,
        }))
        }

        const tracksRes = await fetch('http://localhost:5240/api/user/subscribed_tracks', {
        credentials: 'include'
        })
        if (tracksRes.ok) {
        const tracks = await tracksRes.json()
        popularTracks.value = tracks.map(t => ({
            id: t.id,
            title: t.name,
            singer: t.singers.length ? t.singers.join(', ') : 'Неизвестный исполнитель',
            albumId: t.albumId,
            cover: getTrackCoverPath(t.coverUrl),
            audio: getTrackAudioPath(t.audioUrl),
        }))
        }
    } catch (err) {
        console.error('Ошибка загрузки подписок:', err)
    }
})

const itemsPerPageAlbum = 4
const currentPageAlbum = ref(0)
const pagedAlbums = computed(() =>
    newAlbums.value.slice(currentPageAlbum.value, currentPageAlbum.value + itemsPerPageAlbum)
)
function nextAlbum() {
    if (currentPageAlbum.value + itemsPerPageAlbum < newAlbums.value.length) currentPageAlbum.value++
}
function prevAlbum() {
    if (currentPageAlbum.value > 0) currentPageAlbum.value--
}
const itemsPerPageSinger = 5
const currentPageSinger = ref(0)
const pagedSingers = computed(() =>
    subscribedSingers.value.slice(currentPageSinger.value, currentPageSinger.value + itemsPerPageSinger)
)

function nextSinger() {
    if (currentPageSinger.value + itemsPerPageSinger < subscribedSingers.value.length) currentPageSinger.value++
}
function prevSinger() {
    if (currentPageSinger.value > 0) currentPageSinger.value--
}
</script>

<style scoped>
.singer-avatar {
    width: 96px;
    height: 96px;
    border-radius: 50%;
    object-fit: cover;
}
</style>
