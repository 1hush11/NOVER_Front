<template>
  <div class="flex-1 p-4 ml-2">
    <div class="flex justify-end">
    <button class="bg-transparent border-none" @click="close">
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
        v-for="singer in genre.singers"
        :key="singer"
        class="flex flex-col items-center w-24 cursor-pointer transition hover:scale-105"
        @click="goToSinger(singer)"
      >
        <img
          :src="singer.image"
          :alt="singer"
          class="cover-image"
        />
        <p class="mt-2 text-center text-sm text-gray-700 font-medium mt-2">{{ singer.name }}</p>
      </div>
    </div>

    <h2 class="text-xl font-semibold mb-2">Популярные треки</h2>
    <div class="flex flex-col gap-3">
      <TrackCard v-for="(track, index) in genre.tracks" :key="index" :track="track" :index="index" @click="goToTrackPage(track)"/>
    </div>
  </div>
</template>
<script setup>
import TrackCard from './TrackCard.vue'
import SingerDetail from './SingerDetail.vue'

import { useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'

const router = useRouter()
const route = useRoute()

function goToTrackPage(track) {
  router.push(`/track/${track.id}`)
}
function close() {
  router.back()
}
function goToSinger(singer) {
  router.push(`/singers/${singer.id}`)
  }

const genreMap = {
  1: {
    name: 'Pop',
    description: 'Поп-музыка — это жанр популярной музыки с акцентом на мелодичность и коммерческую привлекательность.',
    singers: [
      {
        id: 1,
        name: 'Taylor Swift',
        image: '/src/resources/singerCovers/taylor_swift.jpg',
        listeners: '100M',
        tracksCount: 150,
        description: 'Taylor Swift — американская певица и автор песен, икона современной поп-музыки.'
      },
      {
        id: 2,
        name: 'Adele',
        image: '/src/resources/singerCovers/adele.jpg',
        listeners: '80M',
        tracksCount: 50,
        description: 'Adele — британская певица с душевным вокалом и мощной эмоциональной подачей.'
      }
    ],
    tracks: [
      {
        id: 1,
        title: 'Shake It Off',
        singer: 'Taylor Swift',
        cover: '/src/resources/trackCovers/shake_it_off.jpg'
      },
      {
        id: 2,
        title: 'Hello',
        singer: 'Adele',
        cover: '/src/resources/trackCovers/hello.jpg'
      }
    ]
  },
  2: {
    name: 'K-Pop',
    description: 'Южнокорейская поп-музыка с глобальным влиянием.',
    singers: [
      {
        id: 3,
        name: 'BTS',
        image: '/src/resources/singerCovers/bts.jpg',
        listeners: '70M',
        tracksCount: 200,
        description: 'BTS — всемирно известная K-pop группа из Южной Кореи.'
      },
      {
        id: 4,
        name: 'V',
        image: '/src/resources/singerCovers/v.jpg',
        listeners: '25M',
        tracksCount: 30,
        description: 'V — вокалист BTS с бархатистым голосом и уникальным стилем.'
      }
    ],
    tracks: [
      {
        id: 3,
        title: 'Life Goes On',
        singer: 'BTS',
        cover: '/src/resources/trackCovers/life_goes_on.jpg'
      },
      {
        id: 4,
        title: 'Rainy Days',
        singer: 'V',
        cover: '/src/resources/trackCovers/rainy_days.jpg'
      }
    ]
  },
  3: {
    name: 'Классика',
    description: 'Вечная музыка великих композиторов, вдохновляющая и неподвластная времени.',
    singers: [
      {
        id: 5,
        name: 'Бетховен',
        image: '/src/resources/singerCovers/beethoven.jpg',
        listeners: '10M',
        tracksCount: 100,
        description: 'Людвиг ван Бетховен — один из величайших классических композиторов.'
      },
      {
        id: 6,
        name: 'Моцарт',
        image: '/src/resources/singerCovers/mozart.jpg',
        listeners: '9M',
        tracksCount: 200,
        description: 'Вольфганг Амадей Моцарт — гений эпохи классицизма.'
      }
    ],
    tracks: [
      {
        id: 5,
        title: 'Symphony No. 9',
        singer: 'Бетховен',
        cover: '/src/resources/trackCovers/beethoven_9.jpg'
      },
      {
        id: 6,
        title: 'Eine kleine Nachtmusik',
        singer: 'Моцарт',
        cover: '/src/resources/trackCovers/mozart_nachtmusik.jpg'
      }
    ]
  },
  4: {
    name: 'Фонк',
    description: 'Грязный бит, ретро вайб и тёмная эстетика улиц.',
    singers: [
      {
        id: 7,
        name: 'KSLV Noh',
        image: '/src/resources/singerCovers/kslv_noh.jpg',
        listeners: '5M',
        tracksCount: 45,
        description: 'KSLV Noh — один из заметных представителей новой волны фонка.'
      },
      {
        id: 8,
        name: 'Freddie Dredd',
        image: '/src/resources/singerCovers/freddie_dredd.jpg',
        listeners: '12M',
        tracksCount: 60,
        description: 'Freddie Dredd — трэш-фонк с мрачной подачей и винтажной эстетикой.'
      }
    ],
    tracks: [
      {
        id: 7,
        title: 'Doomshop',
        singer: 'KSLV Noh',
        cover: '/src/resources/trackCovers/doomshop.jpg'
      },
      {
        id: 8,
        title: 'Cha Cha',
        singer: 'Freddie Dredd',
        cover: '/src/resources/trackCovers/cha_cha.jpg'
      }
    ]
  },
  5: {
    name: 'Hip Hop',
    description: 'Культура улиц, глубокие тексты и качающие биты.',
    singers: [
      {
        id: 9,
        name: 'Kendrick Lamar',
        image: '/src/resources/singerCovers/kendrick.jpg',
        listeners: '55M',
        tracksCount: 90,
        description: 'Kendrick Lamar — лауреат Пулитцеровской премии, один из лучших рэперов современности.'
      },
      {
        id: 10,
        name: 'J. Cole',
        image: '/src/resources/singerCovers/jcole.jpg',
        listeners: '48M',
        tracksCount: 85,
        description: 'J. Cole — рэпер с социальным посланием и глубокими текстами.'
      }
    ],
    tracks: [
      {
        id: 9,
        title: 'HUMBLE.',
        singer: 'Kendrick Lamar',
        cover: '/src/resources/trackCovers/humble.jpg'
      },
      {
        id: 10,
        title: 'No Role Modelz',
        singer: 'J. Cole',
        cover: '/src/resources/trackCovers/no_role_modelz.jpg'
      }
    ]
  },
  6: {
    name: 'Rock',
    description: 'Энергия, гитары и культовые рифы от классики до альтернативы.',
    singers: [
      {
        id: 11,
        name: 'Nirvana',
        image: '/src/resources/singerCovers/nirvana.jpg',
        listeners: '35M',
        tracksCount: 60,
        description: 'Nirvana — икона гранжа и 90-х.'
      },
      {
        id: 12,
        name: 'Queen',
        image: '/src/resources/singerCovers/queen.jpg',
        listeners: '50M',
        tracksCount: 100,
        description: 'Queen — легендарная рок-группа во главе с Фредди Меркьюри.'
      }
    ],
    tracks: [
      {
        id: 11,
        title: 'Smells Like Teen Spirit',
        singer: 'Nirvana',
        cover: '/src/resources/trackCovers/smells_like_teen_spirit.jpg'
      },
      {
        id: 12,
        title: 'Bohemian Rhapsody',
        singer: 'Queen',
        cover: '/src/resources/trackCovers/bohemian_rhapsody.jpg'
      }
    ]
  },
  7: {
    name: 'EDM',
    description: 'Электронная музыка для фестивалей и вечеринок.',
    singers: [
      {
        id: 13,
        name: 'Martin Garrix',
        image: '/src/resources/singerCovers/garrix.jpg',
        listeners: '45M',
        tracksCount: 70,
        description: 'Martin Garrix — молодой лидер EDM-сцены.'
      },
      {
        id: 14,
        name: 'Avicii',
        image: '/src/resources/singerCovers/avicii.jpg',
        listeners: '60M',
        tracksCount: 65,
        description: 'Avicii — новатор электронной сцены и автор хитов на века.'
      }
    ],
    tracks: [
      {
        id: 13,
        title: 'Animals',
        singer: 'Martin Garrix',
        cover: '/src/resources/trackCovers/animals.jpg'
      },
      {
        id: 14,
        title: 'Wake Me Up',
        singer: 'Avicii',
        cover: '/src/resources/trackCovers/wake_me_up.jpg'
      }
    ]
  },
  8: {
    name: 'Jazz',
    description: 'Импровизация, глубина и утончённость звука.',
    singers: [
      {
        id: 15,
        name: 'Miles Davis',
        image: '/src/resources/singerCovers/miles.jpg',
        listeners: '20M',
        tracksCount: 80,
        description: 'Miles Davis — пионер модерн-джаза.'
      },
      {
        id: 16,
        name: 'John Coltrane',
        image: '/src/resources/singerCovers/coltrane.jpg',
        listeners: '18M',
        tracksCount: 75,
        description: 'John Coltrane — саксофонист и легенда джазовой импровизации.'
      }
    ],
    tracks: [
      {
        id: 15,
        title: 'So What',
        singer: 'Miles Davis',
        cover: '/src/resources/trackCovers/so_what.jpg'
      },
      {
        id: 16,
        title: 'My Favorite Things',
        singer: 'John Coltrane',
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
