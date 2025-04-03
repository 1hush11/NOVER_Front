<template>
  <div class="flex h-screen">
    <div class="flex-1 flex flex-col overflow-hidden cursor-pointer">
      <div class="flex justify-end">
        <button class="bg-transparent border-none mt-4 mr-4" @click="goSingersPage">
            <svg width="24" height="24" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fill="#1c1c1" d="M3.21878,2.15448L9.99679,8.92745L16.70268,2.22183C17.15981,1.81458 17.63394,2.05757 17.8219,2.26259C18.00986,2.46761 18.11719,2.95117 17.77817,3.29732L11.07079,10.0014L17.77817,16.7027C18.07648,16.9529 18.07648,17.4434 17.83701,17.7166C17.59753,17.9897 17.15756,18.1484 16.74155,17.8244L9.99679,11.0754L3.24361,17.8271C2.94835,18.092 2.46049,18.0382 2.21878,17.7746C1.97707,17.5111 1.88533,17.0549 2.19441,16.733L8.92279,10.0014L2.22183,3.29732C1.97729,3.02649 1.8919,2.53265 2.22183,2.22183C2.55175,1.911 3.04367,1.95438 3.21878,2.15448Z"/>
            </svg>
        </button>
      </div>
      <router-view/>
      <div class="flex-1 overflow-y-auto p-8 bg-white text-gray-900">
        <div id="profile" class="flex items-center gap-6 mb-10 mt-6-">
          <img :src="singer.image" alt="Artist Image" class="cover-image" />
          <div>
            <h1 class="text-3xl font-bold mb-2">{{ singer.name }}</h1>
            <p class="text-sm text-gray-500 mb-4">
                <svg width="20" height="20" viewBox="0 0 48 25" fill="#1c1c1c" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M16 19C18.7629 19 21 16.7629 21 14C21 11.2371 18.7629 9 16 9C13.2371 9 11 11.2371 11 14C11 16.7629 13.2371 19 16 19ZM16 21C19.8675 21 23 17.8675 23 14C23 10.1325 19.8675 7 16 7C12.1325 7 9 10.1325 9 14C9 17.8675 12.1325 21 16 21Z"
                  fill="#1c1c1c"/>
                <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M5.76618 28.0846C5.14556 28.6486 5 29.0826 5 29.4V33H27V29.4C27 29.0826 26.8544 28.6486 26.2338 28.0846C25.6009 27.5095 24.6268 26.9511 23.3932 26.4645C20.924 25.4906 17.9234 25 16 25C14.0766 25 11.076 25.4906 8.60682 26.4645C7.37322 26.9511 6.39908 27.5095 5.76618 28.0846ZM16 23C11.6612 23 3 25.144 3 29.4V35H29V29.4C29 25.144 20.3387 23 16 23Z"
                  fill="#1c1c1c"/>
              </svg>
              {{ singer.followers }} подписчиков</p>
            <span>{{ singer.description }}</span>

            <div class="flex gap-4 mt-2">
              <button class="btn flex justify-center">Подписаться</button>
              <button class="btn flex justify-center">Поделиться</button>
            </div>
          </div>
        </div>

        <div class="mb-6 mt-4">
          <h2 class="text-xl font-semibold mb-2">Популярные треки</h2>
          <div class="space-y-4">
            <TrackCard v-for="(track, index) in topTracks" :key="index" :track="track" :index="index" @click="goToTrackPage(track)"/>
          </div>
        </div>

        <div class="mb-6">
          <h2 class="text-xl font-semibold mb-2">Альбомы</h2>
          <div class="flex justify-center overflow-hidden transition gap-2 rounded-lg p-2">
            <button @click="prev" :disabled="currentPage === 0" class="text-2xl text-bold bg-transparent border-none">‹</button>
            <div v-for="(album, index) in pagedAlbums" :key="index" class="text-center cursor-pointer transition hover:shadow-lg rounded-lg p-2 w-24">
              <img :src="album.cover" alt="Album Cover" class="cover-album-image" />
              <p class="font-semibold">{{ album.title }}</p>
              <p class="text-sm text-gray-500">{{ album.year }}</p>
            </div>
            <button @click="next" :disabled="currentPage + pagedAlbums.length >= albums.length" class="text-2xl text-bold bg-transparent border-none">›</button>
          </div>
        </div>

        <div class="mb-6">
          <h2 class="text-xl font-semibold mb-4">Похожие исполнители</h2>
          <div class="flex gap-4 overflow-x-auto">
            <div class="flex flex-col gap-4" style="width: 800px;" >
              <SingerCard
                v-for="singer in similarArtists"
                :key="singer.id"
                :singer="singer"
                @click="goToSinger(singer)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import TrackCard from './TrackCard.vue'
import SingerCard from './SingerCard.vue'
import SingersPage from './SingersPage.vue'


const route = useRoute()

const singers = {
  1: {
    name: 'Agust D',
    image: '/src/resources/singerCovers/agustd.jpg',
    followers: '12k',
    description: 'Agust D — сольный проект SUGA из BTS. Его музыка сочетает агрессивный рэп, глубокую лирику и сильную эмоциональность.',
  },
  2: {
    name: 'Jimin',
    image: '/src/resources/singerCovers/jimin.jpg',
    followers: '50k',
    description: 'Jimin — вокалист BTS, известный своим воздушным голосом и сценическим обаянием. Его сольные треки — это смесь попа и R&B.',
  },
  3: {
    name: 'BTS',
    image: '/src/resources/singerCovers/bts.jpg',
    followers: '2.3M',
    description: 'BTS — южнокорейский бой-бэнд, который завоевал сердца миллионов по всему миру. Их музыка затрагивает темы любви, психического здоровья и саморазвития.',
  },
  4: {
    name: 'J-Hope',
    image: '/src/resources/singerCovers/jhope.jpg',
    followers: '21M',
    description: 'J-Hope — энергичный рэпер и танцор из BTS. В его сольных проектах преобладают фанк, хип-хоп и яркая атмосфера.',
  },
  5: {
    name: 'Jung Kook',
    image: '/src/resources/singerCovers/jungkook.jpg',
    followers: '2M',
    description: 'Jung Kook — главный вокалист BTS. Его сольные работы варьируются от попа и R&B до электроники.',
  },
  6: {
    name: 'V',
    image: '/src/resources/singerCovers/v.jpg',
    followers: '25M',
    description: 'V — вокалист BTS, известный своим бархатистым тембром и джазовыми влияниями. Его сольные песни — это кинематографичный нео-соул.',
  },
  7: {
    name: 'Bachelor',
    image: '/src/resources/singerCovers/bachelor.jpg',
    followers: '1.2M',
    description: 'Bachelor — экспериментальный дуэт из Калифорнии, сочетающий в себе инди, рок и нео-соул. Их музыка отличается глубокими текстами и атмосферным звучанием.',
  }
}


const singer = computed(() => {
  const id = Number(route.params.id)
  return singers[id] || {}
})

const topTracks = [
  { id: 1, title: 'Daechwita', artist: 'Agust D', cover: '/src/resources/trackCovers/daechwita.jpg' },
  { id: 2, title: 'Agust D', artist: 'Agust D', cover: '/src/resources/trackCovers/agustd.jpg' },
  { id: 3, title: 'Like Crazy', artist: 'Jimin', cover: '/src/resources/trackCovers/like_crazy.jpg' },
  { id: 4, title: 'Set Me Free Pt.2', artist: 'Jimin', cover: '/src/resources/trackCovers/set_me_free.jpg' },
  { id: 5, title: 'Life Goes On', artist: 'BTS', cover: '/src/resources/trackCovers/life_goes_on.jpg' },
  { id: 6, title: 'Dynamite', artist: 'BTS', cover: '/src/resources/trackCovers/dynamite.jpg' },
  { id: 7, title: 'Butter', artist: 'BTS', cover: '/src/resources/trackCovers/butter.jpg' },
  { id: 8, title: 'MORE', artist: 'J-Hope', cover: '/src/resources/trackCovers/more.jpg' },
  { id: 9, title: 'Arson', artist: 'J-Hope', cover: '/src/resources/trackCovers/arson.jpg' },
]



const albums = [
  { title: 'Electric Dreams', year: '2022', cover: '/src/resources/trackCovers/arson.jpg' },
  { title: 'Inner Universe', year: '2021', cover: '/src/resources/trackCovers/arson.jpg' },
  { title: 'Mood Swings', year: '2020', cover: '/src/resources/trackCovers/arson.jpg'  },
  { title: 'Mood Swings', year: '2020', cover: '/src/resources/trackCovers/arson.jpg'  },
  { title: 'Mood Swings', year: '2020', cover: '/src/resources/trackCovers/arson.jpg'  },
  { title: 'Mood Swings', year: '2020', cover: '/src/resources/trackCovers/arson.jpg'  },
  { title: 'Mood Swings', year: '2020', cover: '/src/resources/trackCovers/arson.jpg'  },

  { title: 'Late Nights', year: '2019', cover: '/src/resources/trackCovers/arson.jpg'  }
]

const similarArtists = [
  { id: 1, name: 'BTS', listeners: '48M', tracks: 150, image: '/src/resources/singerCovers/bts.jpg' },
  { id: 2, name: 'Jimin', listeners: '20M', tracks: 48, image: '/src/resources/singerCovers/jimin.jpg' },
  { id: 3, name: 'J-Hope', listeners: '18M', tracks: 32, image: '/src/resources/singerCovers/jhope.jpg' },
  { id: 4, name: 'Agust D', listeners: '12M', tracks: 24, image: '/src/resources/singerCovers/agustd.jpg' },
  { id: 5, name: 'Jung Kook', listeners: '22M', tracks: 40, image: '/src/resources/singerCovers/jungkook.jpg' },
  { id: 6, name: 'V', listeners: '25M', tracks: 36, image: '/src/resources/singerCovers/v.jpg' },
]

const itemsPerPage = 4
const currentPage = ref(0)

const pagedAlbums = computed(() => albums.slice(currentPage.value, currentPage.value + itemsPerPage))

const next = () => {
  if (currentPage.value + itemsPerPage < albums.length) {
    currentPage.value += 1
  }
}

const prev = () => {
  if (currentPage.value > 0) {
    currentPage.value -= 1
  }
}


const router = useRouter()

function goSingersPage() {
  router.push('/singers')
}

function goToSinger(singer) {
  router.push(`/singers/${singer.id}`).then(() => {
    setTimeout(() => {
      scrollToAnchor('profile')
    }, 100)
  })
}

function goToTrackPage(track) {
  router.push(`/track/${track.id}`)
}

const scrollToAnchor = (id) => {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

</script>

<style scoped>
.cover-image {
    width: 180px;
    height: 180px;
    border-radius: 99%;
    object-fit: cover;
}
.cover-album-image {
    width: 150px;
    height: 150px;
    border-radius: 8%;
    object-fit: cover;
}
.btn {
  width: 120px;
  color: #1c1c1c;
  background: white;
  border: 1px solid #ccc;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: 0.2s;
}

.btn:hover {
  background: #f5f5f5;
}
</style>