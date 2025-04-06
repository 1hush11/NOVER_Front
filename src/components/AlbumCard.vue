<template>
    <div class="text-center cursor-pointer transition hover:shadow-lg rounded-lg p-4 w-24">
        <img :src="album.cover" alt="Album Cover" class="cover-image" />
        <p class="font-semibold">{{ album.title }}</p>
        <p class="text-sm text-gray-500">{{ album.year }}</p>
    </div>
</template>
<script setup>
defineProps({
  album: Object
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