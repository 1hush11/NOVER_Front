<template>
  <li class="flex justify-between items-center">
    <div>
      <div class="font-medium">{{ name }}</div>
      <div class="text-xs text-gray-500">{{ followers }} Followers • {{ plays }} Plays</div>
    </div>
  </li>
</template>

<script setup>
defineProps({
  name: String,
  followers: String,
  plays: String
})
</script>

<link rel="stylesheet" href="./assets/style.css">
