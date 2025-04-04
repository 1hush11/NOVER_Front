<template>
  <div class="text-center cursor-pointer transition hover:shadow-lg rounded-lg p-2 w-1-3">
    <img :src="playlist.cover" alt="playlist cover" class="cover-image" />
    <p class="text-md font-semibold truncate">{{ playlist.title }}</p>
    <p class="text-sm text-gray-500 truncate">от {{ playlist.user }}</p>
  </div>
</template>

<script setup>
defineProps({
  playlist: Object
})
</script>

<style scoped>
.cover-image {
  width: 150px;
  height: 150px;
  border-radius: 8%;
  object-fit: cover;
}
</style>