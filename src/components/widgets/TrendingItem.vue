<template>
  <div class="flex justify-between items-center p-2 border rounded hover:bg-gray-50">
    <div class="flex items-center gap-3">
      <div class="text-sm font-bold w-6">{{ rank }}</div>
      <div>
        <div class="text-sm font-semibold">{{ title }}</div>
        <div class="text-xs text-gray-600">{{ artist }}</div>
      </div>
    </div>
    <div class="flex items-center gap-2">
      <span class="text-xs text-gray-500">{{ duration }}</span>
      <button class="text-orange-500">▶</button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  rank: String,
  title: String,
  artist: String,
  duration: String
})
</script>

<link rel="stylesheet" href="./assets/style.css">
