<template>
  <div class="flex items-center gap-4 cursor-pointer hover:bg-gray-100 p-4 rounded transition">
    <img :src="singer.image" alt="singer" class="cover-image" />
    <div>
      <h2 class="text-lg font-semibold">{{ singer.name }}</h2>
      <p class="text-sm text-gray-600">
        {{ singer.listeners }} слушателей · {{ singer.tracks }} треков
      </p>
    </div>
  </div>
</template>

<script setup>
    defineProps({
    singer: Object
    })

    import { useRouter } from 'vue-router'
    const router = useRouter()
</script>

<style scoped>
.cover-image {
    width: 69px;
    height: 69px;
    border-radius: 99%;
    object-fit: cover;
}
</style>