<template>
  <div class="flex h-full p-8">
    <div class="overflow-y-auto transition-all duration-300">
      <h1 class="text-2xl font-bold mb-6">Жанры</h1>
      <div class="grid">
        <div
          v-for="genre in genres"
          :key="genre.id"
          :class="[
            'flex gap-4 p-2 shadow rounded-lg cursor-pointer transition',
            activeGenre === genre.id ? 'active bg-purple-600' : 'bg-white text-gray-800'
          ]"
          @click="goToGenre(genre)"
        >

          <img :src="genre.coverUrl" alt="genre cover" class="cover-image"/>
          <div v-if="!route.params.id" class="mt-2">
            <h2 class="text-lg font-semibold text-gray-800 mt-4">{{ genre.name }}</h2>
            <p class="text-sm text-gray-600 mt-4">{{ genre.description }}</p>
          </div>
        </div>
      </div>
    </div>

    <div v-if="route.params.id" class="flex-1 overflow-y-auto">
      <router-view />
    </div>
  </div>
</template>


<script setup>
import { useRoute, useRouter } from 'vue-router'
import { ref, computed, onMounted } from 'vue'

const activeGenre = ref(null)
const genres = ref([])

const router = useRouter()
const route = useRoute()
const isCollapsed = computed(() => !!route.params.id)

async function fetchGenres() {
  try {
    const res = await fetch('http://localhost:5240/api/genre/genres')
    if (!res.ok) throw new Error('Ошибка запроса')
    const data = await res.json()
    genres.value = data.map(genre => ({
      id: genre.id,
      name: genre.name,
      description: genre.description,
      coverUrl: genre.coverUrl 
        ? `/src/resources/genreCovers/${genre.coverUrl}` 
        : '/src/icons/NOVER_icon.ico'
    }))
  } catch (err) {
    console.error('Ошибка при получении жанров:', err)
  }
}

function goToGenre(genre) {
  activeGenre.value = genre.id
  router.push(`/genres/${genre.id}`)
}

onMounted(fetchGenres)
</script>


<style scoped>
.cover-image {
    width: 140px;
    height: 140px;
    border-radius: 25%;
    object-fit: cover;
}

.genres-sidebar {
    width: 33.333%;
    padding: 2rem;
    overflow-y: auto;
    transition: width 0.3s ease;
}

.genres-sidebar.collapsed {
    width: 150px;
    padding: 1rem;
}

.genre-card .text {
    display: block;
    transition: opacity 0.3s ease;
}

.collapsed .genre-card .text {
    display: none;
}

</style>