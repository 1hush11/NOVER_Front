<template>
  <div class="flex-1 overflow-y-auto p-8 bg-white">
    <div class="flex items-start">
      <img :src="track.cover" alt="track cover" class="cover-image m-6" />

      <div class="flex-1">
        <h1 class="text-4xl font-bold mb-4 mt-6">{{ track.title }}</h1>
        <p class="text-lg text-gray-700 mb-4">
          <router-link :to="`/artist/${track.artist}`" class="text-base font-semibold text-gray-700 hover:underline">
            {{ track.artist }}
          </router-link>
        </p>
        <p class="text-md text-purple-500 mb-4 mt-1">
          <router-link :to="`/genre/${track.genre}`" class="text-lg text-gray-500 hover:underline">
            {{ track.genre }}
          </router-link>
        </p>
        <input
          type="range"
          min="0"
          max="100"
          v-model="progress"
          class="track-slider"
        />
          <!-- Progress bar -->
        <div class="w-full flex justify-between h-1 bg-gray-300 rounded mt-4">
          <span class="h-1 rounded">00:00</span>
          <span class="h-1 rounded">03:41</span>
        </div>

        <div class="flex justify-center items-center gap-6 mt-6 ml-4">
          <!-- Shuffle -->
          <button class="bg-transparent border-none"  @click="toggleShuffle" title="Перемешать">
            <!-- вставка shuffle SVG -->
            <svg width="24" height="24" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M12.3536 1.14645C12.1583 0.951184 11.8417 0.951184 11.6464 1.14645C11.4512 1.34171 11.4512 1.65829 11.6464 1.85355L12.7929 3H12C10.7037 3 9.71111 3.58423 8.87248 4.38931C8.20065 5.03427 7.59349 5.85684 6.99461 6.6682C6.86287 6.84668 6.73154 7.02462 6.6 7.2C5.10874 9.18835 3.49037 11 0.5 11C0.223858 11 0 11.2239 0 11.5C0 11.7761 0.223858 12 0.5 12C4.00963 12 5.89126 9.81165 7.4 7.8C7.54367 7.60845 7.6832 7.41962 7.81996 7.23454L7.82005 7.23443L7.82006 7.23441C8.41674 6.42695 8.96069 5.69085 9.56502 5.11069C10.2889 4.41577 11.0463 4 12 4H12.7929L11.6464 5.14645C11.4512 5.34171 11.4512 5.65829 11.6464 5.85355C11.8417 6.04882 12.1583 6.04882 12.3536 5.85355L14.3536 3.85355C14.5488 3.65829 14.5488 3.34171 14.3536 3.14645L12.3536 1.14645ZM0.5 3C3.35278 3 5.12992 4.44588 6.50548 6.06746L6.3762 6.24266C6.2483 6.4161 6.12293 6.58609 6 6.75C5.96397 6.79804 5.92798 6.84581 5.892 6.89331C4.57348 5.29306 3.02637 4 0.5 4C0.223858 4 0 3.77614 0 3.5C0 3.22386 0.223858 3 0.5 3ZM8.87248 10.6107C8.37284 10.131 7.90897 9.55314 7.45767 8.95468C7.64688 8.71693 7.82704 8.48061 8 8.25L8.08987 8.12987C8.58412 8.79402 9.05288 9.39766 9.56502 9.88931C10.2889 10.5842 11.0463 11 12 11H12.7929L11.6464 9.85355C11.4512 9.65829 11.4512 9.34171 11.6464 9.14645C11.8417 8.95118 12.1583 8.95118 12.3536 9.14645L14.3536 11.1464C14.5488 11.3417 14.5488 11.6583 14.3536 11.8536L12.3536 13.8536C12.1583 14.0488 11.8417 14.0488 11.6464 13.8536C11.4512 13.6583 11.4512 13.3417 11.6464 13.1464L12.7929 12H12C10.7037 12 9.71111 11.4158 8.87248 10.6107Z"
                fill="#000000"
              />
            </svg>
          </button>

          <!-- Previous -->
          <button class="bg-transparent border-none" @click="prevTrack" title="Назад">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g transform="scale(-1,1) translate(-24,0)">
                <path d="M3.76 7.22V16.79C3.76 18.75 5.89 19.98 7.59 19L11.74 16.61L15.89 14.21C17.59 13.23 17.59 10.78 15.89 9.8L11.74 7.4L7.59 5.01C5.89 4.03 3.76 5.25 3.76 7.22Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M20.24 18.18V5.82" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </g>
            </svg>
          </button>

          <!-- Play / Pause -->
          <button class="play-button" @click="togglePlay" title="Воспроизвести / Пауза">
            <span v-if="!isPlaying">
              <svg width="40" height="40" viewBox="0 0 24 20" fill="currentColor">
                <path d="M8 5v14l11-7-11-7z" />
              </svg>
            </span>
            <span v-else>
              <svg width="40" height="40" viewBox="0 0 24 20" fill="currentColor">
                <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
              </svg>
            </span>
          </button>

            <!-- Next -->
          <button class="bg-transparent border-none" @click="nextTrack" title="Вперёд">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3.76 7.22V16.79C3.76 18.75 5.89 19.98 7.59 19L11.74 16.61L15.89 14.21C17.59 13.23 17.59 10.78 15.89 9.8L11.74 7.4L7.59 5.01C5.89 4.03 3.76 5.25 3.76 7.22Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M20.24 18.18V5.82" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>

          <!-- Repeat -->
          <button class="bg-transparent border-none" @click="toggleRepeat" title="Повтор">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20.924 5.617a.997.997 0 0 0-.217-.324l-3-3a1 1 0 1 0-1.414 1.414L17.586 5H8a5 5 0 0 0-5 5v2a1 1 0 1 0 2 0v-2a3 3 0 0 1 3-3h9.586l-1.293 1.293a1 1 0 0 0 1.414 1.414l3-3a.997.997 0 0 0 .217-1.09zM3 18.383a.997.997 0 0 0 .217 1.09l3 3a1 1 0 0 0 1.414-1.414L6.414 19H16a5 5 0 0 0 5-5v-2a1 1 0 1 0-2 0v2a3 3 0 0 1-3 3H6.414l1.293-1.293a1 1 0 1 0-1.414-1.414l-3 3z"
                    fill="currentColor" />
            </svg>
          </button>
        </div>

        <!-- Bottom buttons -->
        
      </div>
    </div>

    <div class="flex gap-4 mt-4 mb-6">
          <!-- Favorite -->
      <button class="btn" title="В избранное">
        <svg fill="#1c1c1c" width="30" height="30" viewBox="-2 -4 24 24" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin" class="jam jam-heart">
          <path d='M3.636 7.208L10 13.572l6.364-6.364a3 3 0 1 0-4.243-4.243L10 5.086l-2.121-2.12a3 3 0 0 0-4.243 4.242zM9.293 1.55l.707.707.707-.707a5 5 0 1 1 7.071 7.071l-7.07 7.071a1 1 0 0 1-1.415 0l-7.071-7.07a5 5 0 1 1 7.07-7.071z'/>
        </svg>
        В избранное
      </button>

      <!-- Playlist -->
      <button class="btn" title="Добавить в плейлист">
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 18H20M22 18H20M20 18V16M20 18V20" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M2 11L20 11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M2 17L14 17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M2 5L20 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>

        В плейлист
      </button>

      <!-- Album -->
      <router-link :to="`/album/${track.album}`" class="btn" title="Альбом">
        <svg width="30" height="30" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
              <g id="页面-1" stroke="none" fill="none" fill-rule="evenodd">
                  <g id="Media" fill-rule="nonzero">
                      <g id="album_line">
                          <path d="M24,0 L24,24 L0,24 L0,0 L24,0 Z M12.5934901,23.257841 L12.5819402,23.2595131 L12.5108777,23.2950439 L12.4918791,23.2987469 L12.4918791,23.2987469 L12.4767152,23.2950439 L12.4056548,23.2595131 C12.3958229,23.2563662 12.3870493,23.2590235 12.3821421,23.2649074 L12.3780323,23.275831 L12.360941,23.7031097 L12.3658947,23.7234994 L12.3769048,23.7357139 L12.4804777,23.8096931 L12.4953491,23.8136134 L12.4953491,23.8136134 L12.5071152,23.8096931 L12.6106902,23.7357139 L12.6232938,23.7196733 L12.6232938,23.7196733 L12.6266527,23.7031097 L12.609561,23.275831 C12.6075724,23.2657013 12.6010112,23.2592993 12.5934901,23.257841 L12.5934901,23.257841 Z M12.8583906,23.1452862 L12.8445485,23.1473072 L12.6598443,23.2396597 L12.6498822,23.2499052 L12.6498822,23.2499052 L12.6471943,23.2611114 L12.6650943,23.6906389 L12.6699349,23.7034178 L12.6699349,23.7034178 L12.678386,23.7104931 L12.8793402,23.8032389 C12.8914285,23.8068999 12.9022333,23.8029875 12.9078286,23.7952264 L12.9118235,23.7811639 L12.8776777,23.1665331 C12.8752882,23.1545897 12.8674102,23.1470016 12.8583906,23.1452862 L12.8583906,23.1452862 Z M12.1430473,23.1473072 C12.1332178,23.1423925 12.1221763,23.1452606 12.1156365,23.1525954 L12.1099173,23.1665331 L12.0757714,23.7811639 C12.0751323,23.7926639 12.0828099,23.8018602 12.0926481,23.8045676 L12.108256,23.8032389 L12.3092106,23.7104931 L12.3186497,23.7024347 L12.3186497,23.7024347 L12.3225043,23.6906389 L12.340401,23.2611114 L12.337245,23.2485176 L12.337245,23.2485176 L12.3277531,23.2396597 L12.1430473,23.1473072 Z" id="MingCute" fill-rule="nonzero"/>
                          <path d="M12,2 C17.5228,2 22,6.47715 22,12 C22,17.5228 17.5228,22 12,22 C6.47715,22 2,17.5228 2,12 C2,6.47715 6.47715,2 12,2 Z M12,4 C7.58172,4 4,7.58172 4,12 C4,16.4183 7.58172,20 12,20 C16.4183,20 20,16.4183 20,12 C20,7.58172 16.4183,4 12,4 Z M12,10 C13.1046,10 14,10.8954 14,12 C14,13.1046 13.1046,14 12,14 C10.8954,14 10,13.1046 10,12 C10,10.8954 10.8954,10 12,10 Z M11.4402,6.50687 C11.6243,7.02759 11.3514,7.59891 10.8306,7.78296 C9.70239,8.18174 8.75788,8.97573 8.1657,9.99943 C7.88916,10.4775 7.27743,10.6409 6.79937,10.3643 C6.32131,10.0878 6.15794,9.47604 6.43449,8.99798 C7.26199,7.56747 8.58138,6.45671 10.1642,5.89728 C10.6849,5.71323 11.2562,5.98615 11.4402,6.50687 Z" fill="currentColor"/>
                      </g>
                  </g>
              </g>
          </svg>
        Альбом
      </router-link>

      <!-- Review -->
      <button class="btn">
        <svg fill="#1c1c1" width="25px" height="25px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" stroke-width="0.5">
          <path d="M8.2881437,19.1950792 C8.38869181,19.1783212 8.49195996,19.1926955 8.58410926,19.2362761 C9.64260561,19.7368747 10.8021412,20 12,20 C16.418278,20 20,16.418278 20,12 C20,7.581722 16.418278,4 12,4 C7.581722,4 4,7.581722 4,12 C4,13.7069096 4.53528582,15.3318588 5.51454846,16.6849571 C5.62010923,16.830816 5.63909672,17.022166 5.5642591,17.1859256 L4.34581002,19.8521348 L8.2881437,19.1950792 Z M3.58219949,20.993197 C3.18698783,21.0590656 2.87870208,20.6565881 3.04523765,20.2921751 L4.53592782,17.0302482 C3.54143337,15.5576047 3,13.818993 3,12 C3,7.02943725 7.02943725,3 12,3 C16.9705627,3 21,7.02943725 21,12 C21,16.9705627 16.9705627,21 12,21 C10.707529,21 9.4528641,20.727055 8.30053434,20.2068078 L3.58219949,20.993197 Z"/>
        </svg>
        Отзыв
      </button>
    </div>
    <div class="mt-6">
      <h2 class="text-2xl font-bold mb-4">Отзывы ({{ reviews.length }})</h2>
      <div v-for="(review, index) in reviews" :key="index" class="mb-4">
        <div class="bg-gray-100 p-4 rounded-lg shadow-sm">
          <p class="font-semibold">⭐️⭐️⭐️⭐️⭐️ {{ review.username }}</p>
          <p class="mt-1 text-sm text-gray-700">{{ review.text }}</p>
          <p class="text-xs text-gray-400 mt-1">❤️ {{ review.likes }}</p>
        </div>
      </div>
    </div>

    <div class="mt-12">
      <h2 class="text-2xl font-bold mb-4">Похожие треки</h2>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <TrackCard v-for="(item, index) in similarTracks" :key="index" :track="item" />
      </div>
    </div>
  </div>
</template>

<script setup>
import TrackCard from '@/components/TrackCard.vue'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const track = ref({
  id: route.params.id,
  title: 'Life Goes On',
  artist: 'BTS',
  genre: 'K-Pop',
  album: 'BE',
  cover: '/src/resources/trackCovers/life_goes_on.jpg',
  duration: '3:30'
})

const reviews = ref([
  {
    username: 'username',
    text: 'Трек просто огонь! Перелескиваю весь альбом в плейлист.',
    likes: 12
  }
])

const similarTracks = ref([
  { title: 'Track 1', artist: 'Artist', cover: '...' },
  { title: 'Track 2', artist: 'Artist', cover: '...' }
])

const isPlaying = ref(false)
const currentTime = ref('1:45')

const togglePlay = () => (isPlaying.value = !isPlaying.value)
const prevTrack = () => {}
const nextTrack = () => {}
const toggleShuffle = () => {}
const toggleRepeat = () => {}

</script>

<style scoped>
.btn {
  width: 190px;
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

.play-button {
  width: 65px;
  height: 65px;
  background: #1c1c1c;
  color: white;
  border: none;
  border-radius: 50%;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.cover-image {
  border: 1px solid #1c1c1c;
  width: 200px;
  height: 200px;
  border-radius: 8%;
  object-fit: cover;
}

.track-slider {
  appearance: none;
  width: 100%;
  height: 6px;
  border-radius: 3px;
  background: linear-gradient(to right, #1c1c1c var(--progress, 0%), #e4e4e4 var(--progress, 0%));
  transition: background 0.3s ease;
  outline: none;
  cursor: pointer;
}

.track-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 14px;
  height: 14px;
  background-color: #1c1c1c;
  border-radius: 50%;
  border: 2px solid white;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  margin-top: -5px;
}

.track-slider::-moz-range-thumb {
  width: 14px;
  height: 14px;
  background-color: #a179d9;
  border-radius: 50%;
  border: 2px solid white;
  cursor: pointer;
}



.track-slider::-moz-range-thumb {
  width: 10px;
  height: 10px;
  background: #1c1c1c58;
  border-radius: 50%;
  cursor: pointer;
}
</style>