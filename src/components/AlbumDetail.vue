<template>
  <div class="p-8">
    <div class="flex gap-6 justify-center">
      <img :src="album.cover" alt="Album cover" class="cover-image" />

      <div class="flex flex-col justify-between">
        <div>
          <h1 class="text-3xl font-bold">{{ album.title }}</h1>

          <div class="flex items-center gap-4 mt-2">
            <img :src="album.artistAvatar" alt="Artist avatar" class="cover-singer-image" />
            <p class="text-purple-600 font-medium cursor-pointer hover:underline">{{ album.artist }}</p>
          </div>

          <p class="text-sm text-gray-500 mt-2">Дата выпуска: {{ album.releaseDate }}</p>
          <p class="text-sm text-gray-500">Треков: {{ album.tracks.length }}</p>
        </div>
      </div>
    </div>
    <div class="flex justify-center gap-4 mt-4 mb-6">
      <button class="btn" @click="togglePlay" title="Воспроизвести / Пауза">
        <span v-if="!isPlaying">
          <svg width="24" height="24" viewBox="0 0 24 20" fill="currentColor">
            <path d="M8 5v14l11-7-11-7z" />
          </svg>
        </span>
        <span v-else>
          <svg width="24" height="24" viewBox="0 0 24 20" fill="currentColor">
            <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
          </svg>
        </span>
        Воспроизвести
      </button>
      <button class="btn"  @click="toggleShuffle" title="Перемешать">
        <svg width="24" height="24" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M12.3536 1.14645C12.1583 0.951184 11.8417 0.951184 11.6464 1.14645C11.4512 1.34171 11.4512 1.65829 11.6464 1.85355L12.7929 3H12C10.7037 3 9.71111 3.58423 8.87248 4.38931C8.20065 5.03427 7.59349 5.85684 6.99461 6.6682C6.86287 6.84668 6.73154 7.02462 6.6 7.2C5.10874 9.18835 3.49037 11 0.5 11C0.223858 11 0 11.2239 0 11.5C0 11.7761 0.223858 12 0.5 12C4.00963 12 5.89126 9.81165 7.4 7.8C7.54367 7.60845 7.6832 7.41962 7.81996 7.23454L7.82005 7.23443L7.82006 7.23441C8.41674 6.42695 8.96069 5.69085 9.56502 5.11069C10.2889 4.41577 11.0463 4 12 4H12.7929L11.6464 5.14645C11.4512 5.34171 11.4512 5.65829 11.6464 5.85355C11.8417 6.04882 12.1583 6.04882 12.3536 5.85355L14.3536 3.85355C14.5488 3.65829 14.5488 3.34171 14.3536 3.14645L12.3536 1.14645ZM0.5 3C3.35278 3 5.12992 4.44588 6.50548 6.06746L6.3762 6.24266C6.2483 6.4161 6.12293 6.58609 6 6.75C5.96397 6.79804 5.92798 6.84581 5.892 6.89331C4.57348 5.29306 3.02637 4 0.5 4C0.223858 4 0 3.77614 0 3.5C0 3.22386 0.223858 3 0.5 3ZM8.87248 10.6107C8.37284 10.131 7.90897 9.55314 7.45767 8.95468C7.64688 8.71693 7.82704 8.48061 8 8.25L8.08987 8.12987C8.58412 8.79402 9.05288 9.39766 9.56502 9.88931C10.2889 10.5842 11.0463 11 12 11H12.7929L11.6464 9.85355C11.4512 9.65829 11.4512 9.34171 11.6464 9.14645C11.8417 8.95118 12.1583 8.95118 12.3536 9.14645L14.3536 11.1464C14.5488 11.3417 14.5488 11.6583 14.3536 11.8536L12.3536 13.8536C12.1583 14.0488 11.8417 14.0488 11.6464 13.8536C11.4512 13.6583 11.4512 13.3417 11.6464 13.1464L12.7929 12H12C10.7037 12 9.71111 11.4158 8.87248 10.6107Z"
            fill="#000000"
          />
        </svg>
        Перемешать
      </button>
      <button class="btn" title="В избранное">
      <svg fill="#1c1c1c" width="30" height="30" viewBox="-2 -4 24 24" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin" class="jam jam-heart">
        <path d='M3.636 7.208L10 13.572l6.364-6.364a3 3 0 1 0-4.243-4.243L10 5.086l-2.121-2.12a3 3 0 0 0-4.243 4.242zM9.293 1.55l.707.707.707-.707a5 5 0 1 1 7.071 7.071l-7.07 7.071a1 1 0 0 1-1.415 0l-7.071-7.07a5 5 0 1 1 7.07-7.071z'/>
      </svg>
      В избранное
      </button>
    </div>
    <div class="mt-8">
      <h2 class="text-xl font-semibold mb-4">Треки альбома</h2>
      <TrackCard
        v-for="(track, index) in album.tracks"
        :key="index"
        class="flex justify-between items-center p-3 bg-white rounded-lg shadow hover:shadow-md transition"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import TrackCard from './TrackCard.vue';

const album = ref({
  title: 'The Glow Pt. 2',
  artist: 'The Microphones',
  artistAvatar: '/src/resources/singerCovers/jhope.jpg',
  cover: '/src/resources/trackCovers/arson.jpg',
  releaseDate: '12 августа 2001',
  tracks: [
    { title: 'I Want Wind to Blow', duration: '5:32' },
    { title: 'The Glow Pt. 2', duration: '4:10' },
    { title: 'The Moon', duration: '3:45' },
    { title: 'Headless Horseman', duration: '4:05' },
    { title: 'My Roots Are Strong and Deep', duration: '2:44' }
  ]
})
</script>

<style scoped>
.cover-image {
  width: 150px;
  height: 150px;
  border-radius: 8%;
  object-fit: cover;
}

.cover-singer-image {
  width: 40px;
  height: 40px;
  border-radius: 99%;
  object-fit: cover;    
}

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
</style>
