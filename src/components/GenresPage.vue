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

          <img :src="genre.image" alt="genre cover" class="cover-image"/>
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
import { ref, computed } from 'vue'

const activeGenre = ref(null)

const router = useRouter()
const route = useRoute()

const isCollapsed = computed(() => !!route.params.id)

const genres = [
  {
    id: 1, 
    name: 'Pop',
    image: '/src/resources/genreCovers/pop.png',
    description: 'Поп-музыка — это жанр популярной музыки с акцентом на мелодичность и коммерческую привлекательность.',
  },
  {
    id: 2,
    name: 'K-Pop',
    image: '/src/resources/genreCovers/kpop.png',
    description: 'Южнокорейская поп-культура с мощной энергетикой.',
  },
  {
    id: 3,
    name: 'Классика',
    image: '/src/resources/genreCovers/classical.png',
    description: 'Вечная музыка великих композиторов.',
  },
  {
    id: 4,
    name: 'Фонк',
    image: '/src/resources/genreCovers/phonk.png',
    description: 'Грязный бит, ретро вайб и тёмная эстетика.',
  },
  {
    id: 5,
    name: 'Hip Hop',
    image: '/src/resources/genreCovers/hiphop.png',
    description: 'Биты, рифмы и культура улиц.',
  },
  {
    id: 6,
    name: 'Rock',
    image: '/src/resources/genreCovers/rock.png',
    description: 'От классики до альт-рока — всё здесь.',
  },
  {
    id: 7,
    name: 'EDM',
    image: '/src/resources/genreCovers/edm.png',
    description: 'Электронная танцевальная музыка для рейвов.',
  },
  {
    id: 8,
    name: 'Jazz',
    image: '/src/resources/genreCovers/jazz.png',
    description: 'Импровизация, свинг и глубокий саунд.',
  }
]

function goToGenre(genre) {
  activeGenre.value = genre.id
  router.push(`/genres/${genre.id}`)
}
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