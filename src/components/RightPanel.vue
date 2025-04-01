<template>
    <div class="w-1-4 flex flex-col gap-4 border-l p-4">
      <h2 class="text-xl font-bold mb-4">Топ артисты</h2>
      <div v-for="(artist, index) in topArtists" :key="index" class="flex items-center gap-3 hover:bg-gray-50 transition rounded-lg p-2 cursor-pointer">
        <img :src="artist.avatar" alt="artist" class="w-12 h-12 rounded-full" />
        <div>
          <p class="text-md font-semibold text-gray-700">{{ artist.name }}</p>
          <p class="text-sm text-gray-500">🔥 {{ artist.popularity }}</p>
        </div>
      </div>
    </div>
</template>

<script setup>

const topArtists = [
  { name: 'The Weeknd', popularity: '98%', avatar: 'https://via.placeholder.com/100' },
  { name: 'Billie Eilish', popularity: '95%', avatar: 'https://via.placeholder.com/100' },
  { name: 'Drake', popularity: '92%', avatar: 'https://via.placeholder.com/100' },
]
</script>