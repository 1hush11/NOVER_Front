<template>
  <div class="bg-orange-200 rounded-lg p-4 w-1-3 shadow hover:shadow-lg transition">
    <div class="text-md font-semibold">{{ title }}</div>
    <div class="text-sm text-gray-700">🎶 {{ tracks }} Tracks</div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  tracks: Number
})
</script>

<link rel="stylesheet" href="./assets/style.css">
