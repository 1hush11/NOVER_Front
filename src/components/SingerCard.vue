<template>
  <div class="flex shadow rounded-lg items-center gap-4 cursor-pointer hover:bg-gray-100 p-4 transition">
    <img :src="singer.image" alt="singer" class="cover-image" />
    <div class="w-1-3">
      <h2 class="text-lg font-semibold hover:underline">{{ singer.name }}</h2>
      <p class="text-sm text-gray-600">
        {{ formatNumber(singer.subscribersCount) }} подписчиков · {{ singer.totalTracks }} треков
      </p>
      <p class="text-sm text-gray-600">
        Прослушиваний: {{ formatNumber(singer.totalPlayCount) }}
      </p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  singer: {
    type: Object,
    required: true
  }
})

import { useRouter } from 'vue-router'
const router = useRouter()

function goToSinger(singer) {
  router.push(`/singers/${singer.id}`)
}

function formatNumber(value) {
  const num = Number(value)
  if (isNaN(num) || value === undefined || value === null) return '0'
  if (num >= 1_000_000_000) return (num / 1_000_000_000).toFixed(1) + 'B'
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + 'M'
  if (num >= 1_000) return (num / 1_000).toFixed(1) + 'K'
  return num.toString()
}

</script>

<style scoped>
.cover-image {
  width: 69px;
  height: 69px;
  border-radius: 99%;
  object-fit: cover;
}
</style>
