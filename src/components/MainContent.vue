<template>
  <div class="flex flex-1 flex-col p-4">
    <div class="flex-col flex">
      <div>
        <h2 class="text-xl font-bold mb-4">Жанры</h2>
        <div class="flex items-center gap-2">
          <div class="flex overflow-hidden transition gap-2 rounded-lg shadow p-2">
            <button @click="prev" :disabled="currentPage === 0" class="text-2xl text-bold bg-transparent border-none">‹</button>

            <div
              v-for="(genre, index) in pagedGenres"
              :key="index"
              class="flex-shrink-0 text-center cursor-pointer transition hover:shadow-lg rounded-lg p-4 w-24"
            >
              <img :src="genre.image" alt="genre" class="cover-image" />
              <p class="text-md font-semibold text-gray-700">{{ genre.name }}</p>
              <p class="text-sm text-gray-600">Top 50</p>
            </div>
            
            <button @click="next" :disabled="currentPage + pagedGenres.length >= genres.length" class="text-2xl text-bold bg-transparent border-none">›</button>
          </div>
        </div>
        </div>
      </div>

    <div class="mt-6">
      <h2 class="text-xl font-bold mb-4">Популярное сейчас</h2>
      <div class="flex flex-col gap-3">
        <TrackCard v-for="(song, index) in popularSongs" :key="index" :track="song" :index="index" />
      </div>
    </div>
  </div>
</template>

<script setup>
import TrackCard from './TrackCard.vue'
import { ref, computed, onMounted, watch } from 'vue'

const itemsPerPage = 5
const currentPage = ref(0)

const genres = [
  { name: 'Pop', image: '/src/resources/genreCovers/pop.png' },
  { name: 'K-Pop', image: '/src/resources/genreCovers/kpop.png' },
  { name: 'Классика', image: '/src/resources/genreCovers/classical.png' },
  { name: 'Фонк', image: '/src/resources/genreCovers/phonk.png' },
  { name: 'Hip Hop', image: '/src/resources/genreCovers/hiphop.png' },
  { name: 'Rock', image: '/src/resources/genreCovers/rock.png' },
  { name: 'EDM', image: '/src/resources/genreCovers/edm.png' },
  { name: 'Country', image: '/src/resources/genreCovers/country.png' },
  { name: 'Jazz', image: '/src/resources/genreCovers/jazz.png' },
]

const pagedGenres = computed(() => genres.slice(currentPage.value, currentPage.value + itemsPerPage))

const next = () => {
  if (currentPage.value + itemsPerPage < genres.length) {
    currentPage.value += 1
  }
}

const prev = () => {
  if (currentPage.value > 0) {
    currentPage.value -= 1
  }
}

const popularSongs = [
  { title: 'Astronaut In The Ocean', artist: 'Masked Wolf', cover: '/src/icons/NOVER_icon.ico' },
  { title: 'Stay', artist: 'The Kid LAROI & Justin Bieber', cover: '/src/icons/NOVER_icon.ico' },
  { title: 'Industry Baby', artist: 'Lil Nas X', cover: '/src/icons/NOVER_icon.ico' },
]

const track = {
  title: 'METAMORPHOSIS Slowed - Reverb',
  artist: 'INTERWORLD',
  cover: 'https://your-cover-image.jpg',
  plays: '69k',
}
</script>


<style scoped>
.cover-image {
  width: 130px;
  height: 130px;
  border-radius: 25%;
  object-fit: cover;
}

button:disabled {
  opacity: 0.3;
  cursor: default;
}
</style>
