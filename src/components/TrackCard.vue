<template>
  <div class="flex items-center justify-between rounded-lg shadow p-4 w-full">
    <div class="flex items-center gap-4">
      <p class="text-sm text-gray-600 text-center">0{{ index + 1 }}</p>

      <img :src="track.cover" :alt="track.title + ' cover'" class="cover-image" />
      <div>
        <p class="text-md font-semibold hover:underline cursor-pointer">
          {{ track.title }}
        </p>
        <p class="text-sm text-gray-600 cursor-pointer">{{ track.singer }}</p>
      </div>
    </div>

    <div class="flex items-center gap-4">
      <button class="play-button" @click="togglePlay">
        <span v-if="!isPlaying">
          <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 20">
            <path d="M8 5v14l11-7-11-7z"/>
          </svg>
        </span>
        <span v-else>
          <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 20">
            <path d="M6 5h4v14H6zM14 5h4v14h-4z"/>
          </svg>
        </span>
      </button>

      <button class="p-2 bg-transparent border-none cursor-pointer transition items-center">
        <svg fill="#1c1c1" width="25px" height="25px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" stroke-width="0.5">
          <path d="M8.2881437,19.1950792 C8.38869181,19.1783212 8.49195996,19.1926955 8.58410926,19.2362761 C9.64260561,19.7368747 10.8021412,20 12,20 C16.418278,20 20,16.418278 20,12 C20,7.581722 16.418278,4 12,4 C7.581722,4 4,7.581722 4,12 C4,13.7069096 4.53528582,15.3318588 5.51454846,16.6849571 C5.62010923,16.830816 5.63909672,17.022166 5.5642591,17.1859256 L4.34581002,19.8521348 L8.2881437,19.1950792 Z M3.58219949,20.993197 C3.18698783,21.0590656 2.87870208,20.6565881 3.04523765,20.2921751 L4.53592782,17.0302482 C3.54143337,15.5576047 3,13.818993 3,12 C3,7.02943725 7.02943725,3 12,3 C16.9705627,3 21,7.02943725 21,12 C21,16.9705627 16.9705627,21 12,21 C10.707529,21 9.4528641,20.727055 8.30053434,20.2068078 L3.58219949,20.993197 Z"/>
        </svg>
      </button>

      <button class="p-2 bg-transparent border-none cursor-pointer transition items-center">
        <svg fill="#1c1c1" width="25px" height="25px" viewBox="-2 -4 24 24" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin">
          <path d='M3.636 7.208L10 13.572l6.364-6.364a3 3 0 1 0-4.243-4.243L10 5.086l-2.121-2.12a3 3 0 0 0-4.243 4.242zM9.293 1.55l.707.707.707-.707a5 5 0 1 1 7.071 7.071l-7.07 7.071a1 1 0 0 1-1.415 0l-7.071-7.07a5 5 0 1 1 7.07-7.071z'/>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue';

  const isPlaying = ref(false);
  const sliderValue = ref(0);

  function togglePlay() {
    isPlaying.value = !isPlaying.value;
  }

const props = defineProps({
  index: Number,
  track: {
    type: Object,
    required: true,
    default: () => ({
      title: 'METAMORPHOSIS Slowed - Reverb',
      artist: 'INTERWORLD',
      cover: '/src/icons/NOVER_icon.ico',
      plays: '69k',
    }),
  },
})
</script>

<style scoped>
.material-symbols-outlined {
  font-size: 18px;
  line-height: 1;
}

.cover-image {
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
