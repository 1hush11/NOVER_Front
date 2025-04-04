<template>
  <div class="flex flex-col h-screen overflow-hidden p-8">
    <div class="flex-1 overflow-y-auto">
      <div class="flex items-start mb-6">
        <div>
            <img src="/src/resources/hearts/heart1.jpg" alt="Heart" class="cover-image mr-4" />
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
        </div>
        <div class="flex flex-col ml-2">
          <div class="text-2xl font-bold mt-6 mb-6">Медиатека</div>
          <div class="text-lg font-semibold mt-2">@username</div>
          <div class="text-sm text-gray-600 mt-2">24 трека</div>
        </div>
      </div>

      <div class="flex flex-col gap-3 mb-10">
        <TrackCard v-for="(track, index) in tracks" :key="index" :track="track" :index="index" @click="goToTrackPage(track)"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import TrackCard from './TrackCard.vue'


const router = useRouter()
function goToTrackPage(track) {
  router.push(`/track/${track.id}`)
}

    const isPlaying = ref(false);

    function togglePlay() {
    isPlaying.value = !isPlaying.value;
    }

const tracks = [
  { id: 1, title: 'Life Goes On', artist: 'BTS', cover: '/src/resources/trackCovers/life_goes_on.jpg' },
  { id: 2, title: 'Like Crazy', artist: 'Jimin', cover: '/src/resources/trackCovers/like_crazy.jpg' },
  { id: 3, title: 'Arson', artist: 'J-Hope', cover: '/src/resources/trackCovers/arson.jpg' },
  { id: 4, title: 'Butter', artist: 'BTS', cover: '/src/resources/trackCovers/butter.jpg' },
  { id: 5, title: 'Set Me Free Pt.2', artist: 'Jimin', cover: '/src/resources/trackCovers/set_me_free.jpg' },
  { id: 6, title: 'MORE', artist: 'J-Hope', cover: '/src/resources/trackCovers/more.jpg' },
  { id: 7, title: 'Dynamite', artist: 'BTS', cover: '/src/resources/trackCovers/dynamite.jpg' },
  { id: 8, title: 'Seven', artist: 'Jung Kook', cover: '/src/resources/trackCovers/seven.jpg' },
  { id: 9, title: 'Rainy Days', artist: 'V', cover: '/src/resources/trackCovers/rainy_days.jpg' },
]
</script>

<style scoped>
.cover-image {
  width: 190px;
  height: 190px;
  border-radius: 4%;
  object-fit: cover;
}

.play-button {
position: relative;
margin-left: 30%;
margin-top: -20%;
width: 65px;
height: 65px;
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
