<template>
  <div class="p-8">
    <h1 class="text-2xl font-bold mb-6">Исполнители</h1>

    <div v-if="filteredSingers.length" class="flex flex-col gap-4">
      <SingerCard
        v-for="singer in filteredSingers"
        :key="singer.id"
        :singer="singer"
        @click="goToSinger(singer)"
      />
    </div>
    <p v-else class="text-gray-500">Исполнители не найдены.</p>

    <div class="flex-1 overflow-y-auto">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import SingerCard from './Cards/SingerCard.vue'

import { getSingerPhotoPath } from '/src/utils/PathHelper.js'

const router = useRouter()
const singers = ref([])

const filteredSingers = computed(() =>
  singers.value
    .filter(
      (s) => s.subscribersCount !== null && s.totalPlayCount !== null
    )
    .sort((a, b) => b.totalPlayCount - a.totalPlayCount)
)

const fetchSingers = async () => {
  try {
    const baseUrl = 'http://localhost:5240/api/singer/singers'

    const res = await fetch(baseUrl)

    if (!res.ok) throw new Error('Ошибка запроса')

    const singersData = await res.json()
    singers.value = singersData.map(s=> ({
      id: s.id,
      name: s.name,
      photo: getSingerPhotoPath(s.photoUrl),
      description: s.description,
      viewCount: s.viewCount,
      subscribersCount: s.subscribersCount,
      totalPlayCount: s.totalPlayCount,
      totalTracks: s.totalTracks,
    }))
  } catch (err) {
    console.error('Ошибка при получении данных исполнителей:', err)
  }
}

onMounted(() => {
  fetchSingers()
})

function goToSinger(singer) {
  router.push(`/singers/${singer.id}`)
}
</script>
