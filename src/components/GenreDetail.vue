<template>
  <div class="flex-1 p-4 ml-2 bg-gray-50">
    <div class="flex justify-end">
    <button class="bg-transparent border-none" @click="toGenresPage">
        <svg width="24" height="24" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path fill="#1c1c1" d="M3.21878,2.15448L9.99679,8.92745L16.70268,2.22183C17.15981,1.81458 17.63394,2.05757 17.8219,2.26259C18.00986,2.46761 18.11719,2.95117 17.77817,3.29732L11.07079,10.0014L17.77817,16.7027C18.07648,16.9529 18.07648,17.4434 17.83701,17.7166C17.59753,17.9897 17.15756,18.1484 16.74155,17.8244L9.99679,11.0754L3.24361,17.8271C2.94835,18.092 2.46049,18.0382 2.21878,17.7746C1.97707,17.5111 1.88533,17.0549 2.19441,16.733L8.92279,10.0014L2.22183,3.29732C1.97729,3.02649 1.8919,2.53265 2.22183,2.22183C2.55175,1.911 3.04367,1.95438 3.21878,2.15448Z"/>
        </svg>
    </button>
    </div>

    <h1 class="text-2xl font-bold mb-4 mt-6-">{{ genre.name }}</h1>
    <p class="text-gray-700 mb-6">{{ genre.description }}</p>

    <h2 class="text-xl font-semibold mb-4">Лучшие исполнители</h2>
    <div class="flex flex-wrap gap-4 mb-6">
      <div
        v-for="artist in genre.artists"
        :key="artist"
        class="flex flex-col items-center w-24 cursor-pointer transition hover:scale-105"
      >
        <img
          :src="`/src/resources/singerCovers/${artist.replace(/\s+/g, '').toLowerCase()}.jpg`"
          :alt="artist"
          class="cover-image"
        />
        <p class="mt-2 text-center text-sm text-gray-700 font-medium mt-2">{{ artist }}</p>
      </div>
    </div>

    <h2 class="text-xl font-semibold mb-2">Популярные треки</h2>
    <div class="flex flex-col gap-3">
        <TrackCard v-for="(song, index) in genre.tracks" :key="index" :track="song" :index="index" />
    </div>
  </div>
</template>
<script setup>
import TrackCard from './TrackCard.vue'

import { useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'

const router = useRouter()
const route = useRoute()

function toGenresPage() {
    router.push('/genres')
}

const genreMap = {
  1: {
    name: 'Pop',
    description: 'Поп-музыка — это жанр популярной музыки с акцентом на мелодичность и коммерческую привлекательность.',
    artists: ['Taylor Swift', 'Adele'],
    tracks: [
      {
        title: 'Shake It Off',
        artist: 'Taylor Swift',
        cover: '/src/resources/trackCovers/shake_it_off.jpg'
      },
      {
        title: 'Hello',
        artist: 'Adele',
        cover: '/src/resources/trackCovers/hello.jpg'
      }
    ]
  },
  2: {
    name: 'K-Pop',
    description: 'Южнокорейская поп-музыка с глобальным влиянием.',
    artists: ['BTS', 'V'],
    tracks: [
      {
        title: 'Life Goes On',
        artist: 'BTS',
        cover: '/src/resources/trackCovers/life_goes_on.jpg'
      },
      {
        title: 'Rainy Days',
        artist: 'V',
        cover: '/src/resources/trackCovers/rainy_days.jpg'
      }
    ]
  },
  3: {
    name: 'Классика',
    description: 'Вечная музыка великих композиторов, вдохновляющая и неподвластная времени.',
    artists: ['Бетховен', 'Моцарт'],
    tracks: [
      {
        title: 'Symphony No. 9',
        artist: 'Бетховен',
        cover: '/src/resources/trackCovers/beethoven_9.jpg'
      },
      {
        title: 'Eine kleine Nachtmusik',
        artist: 'Моцарт',
        cover: '/src/resources/trackCovers/mozart_nachtmusik.jpg'
      }
    ]
  },
  4: {
    name: 'Фонк',
    description: 'Грязный бит, ретро вайб и тёмная эстетика улиц.',
    artists: ['KSLV Noh', 'Freddie Dredd'],
    tracks: [
      {
        title: 'Doomshop',
        artist: 'KSLV Noh',
        cover: '/src/resources/trackCovers/doomshop.jpg'
      },
      {
        title: 'Cha Cha',
        artist: 'Freddie Dredd',
        cover: '/src/resources/trackCovers/cha_cha.jpg'
      }
    ]
  },
  5: {
    name: 'Hip Hop',
    description: 'Культура улиц, глубокие тексты и качающие биты.',
    artists: ['Kendrick Lamar', 'J. Cole'],
    tracks: [
      {
        title: 'HUMBLE.',
        artist: 'Kendrick Lamar',
        cover: '/src/resources/trackCovers/humble.jpg'
      },
      {
        title: 'No Role Modelz',
        artist: 'J. Cole',
        cover: '/src/resources/trackCovers/no_role_modelz.jpg'
      }
    ]
  },
  6: {
    name: 'Rock',
    description: 'Энергия, гитары и культовые рифы от классики до альтернативы.',
    artists: ['Nirvana', 'Queen'],
    tracks: [
      {
        title: 'Smells Like Teen Spirit',
        artist: 'Nirvana',
        cover: '/src/resources/trackCovers/smells_like_teen_spirit.jpg'
      },
      {
        title: 'Bohemian Rhapsody',
        artist: 'Queen',
        cover: '/src/resources/trackCovers/bohemian_rhapsody.jpg'
      }
    ]
  },
  7: {
    name: 'EDM',
    description: 'Электронная музыка для фестивалей и вечеринок.',
    artists: ['Martin Garrix', 'Avicii'],
    tracks: [
      {
        title: 'Animals',
        artist: 'Martin Garrix',
        cover: '/src/resources/trackCovers/animals.jpg'
      },
      {
        title: 'Wake Me Up',
        artist: 'Avicii',
        cover: '/src/resources/trackCovers/wake_me_up.jpg'
      }
    ]
  },
  8: {
    name: 'Jazz',
    description: 'Импровизация, глубина и утончённость звука.',
    artists: ['Miles Davis', 'John Coltrane'],
    tracks: [
      {
        title: 'So What',
        artist: 'Miles Davis',
        cover: '/src/resources/trackCovers/so_what.jpg'
      },
      {
        title: 'My Favorite Things',
        artist: 'John Coltrane',
        cover: '/src/resources/trackCovers/my_favorite_things.jpg'
      }
    ]
  }
}

const genre = computed(() => {
  const id = Number(route.params.id)
  return genreMap[id] || {}
})
</script>

<style scoped>
.cover-image {
    width: 69px;
    height: 69px;
    border-radius: 99%;
    object-fit: cover;
}
.cover-track-image {
  width: 48px;
  height: 48px;
  border-radius: 25%;
  object-fit: cover;
}

.play-button {
  width: 45px;
  height: 45px;
  background: #e0c8fb;
  color: #1c1c1c;
  border: none;
  border-radius: 50%;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
</style>
