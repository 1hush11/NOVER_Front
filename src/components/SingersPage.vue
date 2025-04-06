<template>
  <div class="p-8">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Исполнители</h1>
    </div>

    <div class="flex flex-col gap-4">
      <SingerCard
        v-for="singer in filteredSingers"
        :key="singer.id"
        :singer="singer"
        @click="goToSinger(singer)"
      />
    </div>

    <div class="flex-1 overflow-y-auto">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import SingerCard from '../components/SingerCard.vue'

const router = useRouter()
const singers = ref([])

const filteredSingers = computed(() =>
  singers.value.filter(
    (s) => s.subscribersCount !== undefined && s.totalPlayCount !== undefined
  )
)

const fetchAllSingersWithStats = async () => {
  try {
    const baseUrl = 'http://localhost:5240/api/singer/singers'
    const baseDetailUrl = 'http://localhost:5240/api/singer/singers/'

    const response = await fetch(baseUrl)
    const basicSingers = await response.json()

    const detailedSingers = await Promise.all(
      basicSingers.map(async (singer) => {
        const detailRes = await fetch(`${baseDetailUrl}${singer.id}`)
        const detailData = await detailRes.json()

        const totalTracks = detailData.tracks.length
        const totalPlayCount = detailData.tracks.reduce(
          (sum, track) => sum + (track.playCount ?? 0),
          0
        )

        return {
          id: detailData.singer.id,
          name: detailData.singer.name,
          description: detailData.singer.description || 'Описание отсутствует',
          image: detailData.singer.photoUrl
            ? `/src/resources/singerCovers/${detailData.singer.photoUrl}`
            : '/src/icons/NOVER_icon.ico',
          subscribersCount: detailData.singer.subscribersCount ?? 0,
          viewCount: detailData.singer.viewCount ?? 0,
          totalTracks,
          totalPlayCount
        }
      })
    )

    singers.value = detailedSingers
  } catch (err) {
    console.error('Ошибка при получении данных исполнителей:', err)
  }
}

onMounted(() => {
  fetchAllSingersWithStats()
})

function goToSinger(singer) {
  router.push(`/singers/${singer.id}`)
}
</script>
