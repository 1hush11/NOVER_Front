<template>
  <div class="flex h-screen">
    <div class="flex-1 flex flex-col overflow-hidden">
      <div class="flex-1 overflow-y-auto p-8 bg-white text-gray-900">
        <div class="flex items-center gap-6 mb-10">
          <img :src="singer.image" alt="Artist Image" class="w-32 h-32 rounded-full object-cover" />
          <div>
            <h1 class="text-3xl font-bold">{{ singer.name }}</h1>
            <p class="text-sm text-gray-500">{{ singer.followers }} подписчиков</p>
            <div class="flex gap-4 mt-2">
              <button class="bg-purple-500 text-white px-4 py-2 rounded-full">Подписаться</button>
              <button class="bg-gray-100 text-gray-700 px-4 py-2 rounded-full">Поделиться</button>
            </div>
          </div>
        </div>

        <div class="mb-12">
          <h2 class="text-xl font-semibold mb-4">Популярные треки</h2>
          <div class="space-y-4">
            <TrackCard v-for="(track, index) in topTracks" :key="index" :track="track" :index="index" />
          </div>
        </div>

        <div class="mb-12">
          <h2 class="text-xl font-semibold mb-4">Альбомы</h2>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div v-for="(album, index) in albums" :key="index" class="bg-gray-100 rounded-lg p-4">
              <img :src="album.cover" alt="Album Cover" class="w-full h-40 object-cover rounded mb-2" />
              <p class="font-semibold">{{ album.title }}</p>
              <p class="text-sm text-gray-500">{{ album.year }}</p>
            </div>
          </div>
        </div>

        <div class="mb-12">
          <h2 class="text-xl font-semibold mb-4">О исполнителе</h2>
          <p class="text-md leading-relaxed max-w-3xl">
            {{ singer.description }}
          </p>
        </div>
        <div class="mb-6">
          <h2 class="text-xl font-semibold mb-4">Похожие исполнители</h2>
          <div class="flex gap-4 overflow-x-auto">
            <div v-for="(similar, index) in similarArtists" :key="index" class="min-w-[150px] text-center">
              <img :src="similar.image" alt="Artist Image" class="w-24 h-24 object-cover rounded-full mx-auto mb-2" />
              <p class="text-sm font-medium">{{ similar.name }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import TrackCard from './TrackCard.vue'

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
    { title: 'Daechwita', artist: 'Agust D', cover: '/src/resources/trackCovers/daechwita.jpg' },
    { title: 'Agust D', artist: 'Agust D', cover: '/src/resources/trackCovers/agustd.jpg' },
    { title: 'Like Crazy', artist: 'Jimin', cover: '/src/resources/trackCovers/like_crazy.jpg' },
    { title: 'Set Me Free Pt.2', artist: 'Jimin', cover: '/src/resources/trackCovers/set_me_free.jpg' },
    { title: 'Life Goes On', artist: 'BTS', cover: '/src/resources/trackCovers/life_goes_on.jpg' },
    { title: 'Dynamite', artist: 'BTS', cover: '/src/resources/trackCovers/dynamite.jpg' },
    { title: 'Butter', artist: 'BTS', cover: '/src/resources/trackCovers/butter.jpg' },
    { title: 'MORE', artist: 'J-Hope', cover: '/src/resources/trackCovers/more.jpg' },
    { title: 'Arson', artist: 'J-Hope', cover: '/src/resources/trackCovers/arson.jpg' },
]


const albums = [
  { title: 'Electric Dreams', year: '2022' },
  { title: 'Inner Universe', year: '2021' },
  { title: 'Mood Swings', year: '2020' },
  { title: 'Late Nights', year: '2019' }
]

const similarArtists = [
  { name: 'Arlo Parks' },
  { name: 'Phoebe Bridgers' },
  { name: 'Tame Impala' },
  { name: 'King Princess' },
  { name: 'Mitski' }
]

</script>
