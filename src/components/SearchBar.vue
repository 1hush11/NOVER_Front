<template>
  <div class="flex items-center border-2 border-purple-200 rounded-full px-4 py-2 text-purple-300 bg-white w-full max-w-md">
    <input
      type="text"
      v-model="query"
      @input="performSearch"
      placeholder="Искать"
      class="rounded-lg"
    />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const query = ref('')
const router = useRouter()

function performSearch() {
  if (!query.value.trim()) return 
  router.push({ name: 'SearchResult', query: { q: query.value.trim() } })
}

watch(query, (newQuery) => {
  if (!newQuery.trim()) {
    router.push({ name: 'SearchResult', query: {} }) 
  }
})
</script>

<style scoped>

</style>
