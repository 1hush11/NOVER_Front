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
    <router-view/>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import SingerCard from '../components/SingerCard.vue'

const router = useRouter()

const searchQuery = ref('')

const singers = ref([
  { id: 1, name: 'BTS', listeners: '48M', tracks: 150, image: '/src/resources/singerCovers/bts.jpg' },
  { id: 2, name: 'Jimin', listeners: '20M', tracks: 48, image: '/src/resources/singerCovers/jimin.jpg' },
  { id: 3, name: 'J-Hope', listeners: '18M', tracks: 32, image: '/src/resources/singerCovers/jhope.jpg' },
  { id: 4, name: 'Agust D', listeners: '12M', tracks: 24, image: '/src/resources/singerCovers/agustd.jpg' },
  { id: 5, name: 'Jung Kook', listeners: '22M', tracks: 40, image: '/src/resources/singerCovers/jungkook.jpg' },
  { id: 6, name: 'V', listeners: '25M', tracks: 36, image: '/src/resources/singerCovers/v.jpg' },
])

const filteredSingers = computed(() =>
  singers.value.filter(singer =>
    singer.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
)

    function goToSinger(singer) {
    router.push(`/singers/:${singer.id}`)
    }
</script>
