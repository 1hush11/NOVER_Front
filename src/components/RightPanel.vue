<template>
  <div class="p-4 cursor-pointer">
    <h2 class="text-xl font-bold mb-2">ТОП исполнители</h2>
    <div class="flex flex-col gap-4 transition rounded-lg shadow">
      <div
        v-for="(singer, index) in topSingers"
        :key="index"
        class="flex items-center" @click="goToSinger(singer)"
      >
        <img
          :src="singer.image"
          alt="singer"
          class="cover-image ml-2"
        />
        <div class="flex flex-col ml-2">
          <p class="text-base font-semibold hover:underline">{{ singer.name }}</p>
          <div class="text-xs text-gray-500 flex gap-3">
            <span>
              <svg width="16" height="16" viewBox="0 0 48 25" fill="#1c1c1c" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M16 19C18.7629 19 21 16.7629 21 14C21 11.2371 18.7629 9 16 9C13.2371 9 11 11.2371 11 14C11 16.7629 13.2371 19 16 19ZM16 21C19.8675 21 23 17.8675 23 14C23 10.1325 19.8675 7 16 7C12.1325 7 9 10.1325 9 14C9 17.8675 12.1325 21 16 21Z"
                  fill="#1c1c1c"/>
                <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M5.76618 28.0846C5.14556 28.6486 5 29.0826 5 29.4V33H27V29.4C27 29.0826 26.8544 28.6486 26.2338 28.0846C25.6009 27.5095 24.6268 26.9511 23.3932 26.4645C20.924 25.4906 17.9234 25 16 25C14.0766 25 11.076 25.4906 8.60682 26.4645C7.37322 26.9511 6.39908 27.5095 5.76618 28.0846ZM16 23C11.6612 23 3 25.144 3 29.4V35H29V29.4C29 25.144 20.3387 23 16 23Z"
                  fill="#1c1c1c"/>
              </svg>
              {{ singer.followers }} Подписаны
            </span>
            

            <span>
              <svg width="16" height="16" viewBox="0 0 255 200" fill="#1c1c1c" xmlns="http://www.w3.org/2000/svg">
                <path d="M249.9,189.1h-16V129c0-55.9-47.3-101.4-105.4-101.4C70.4,27.6,23.2,73,23.2,129l0,8c0,12,0,35.3,0,52.2h-16L7.2,129
                  c0-64.7,54.4-117.4,121.3-117.4c66.9,0,121.4,52.7,121.4,117.4V189.1z"/>
                <path d="M72.4,235.6H39.5v-94.4h32.9C89.4,185,72.4,235.6,72.4,235.6z"/>
                <path d="M184.1,141.2H217v94.4h-32.9C167.1,191.8,184.1,141.2,184.1,141.2z"/>
              </svg>
              {{ singer.plays }} Прослушали
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';

const topSingers = [
  {
    id: 1,
    name: 'Agust D',
    followers: '12k',
    plays: '25M',
    image: '/src/resources/singerCovers/agustd.jpg'
  },
  {
    id: 2,
    name: 'Jimin',
    followers: '50k',
    plays: '2M',
    image: '/src/resources/singerCovers/jimin.jpg'
  },
  {
    id: 3,
    name: 'BTS',
    followers: '2.3M',
    plays: '32B',
    image: '/src/resources/singerCovers/bts.jpg'
  },
  {
    id: 4,
    name: 'J-Hope',
    followers: '21M',
    plays: '12B',
    image: '/src/resources/singerCovers/jhope.jpg'
  },
  {
    id: 5,
    name: 'Jung Kook',
    followers: '2M',
    plays: '50M',
    image: '/src/resources/singerCovers/jungkook.jpg'
  },
  {
    id: 6,
    name: 'V',
    followers: '25M',
    plays: '10B',
    image: '/src/resources/singerCovers/v.jpg'
  }
]


const router = useRouter()

function goToSinger(singer) {
  router.push(`/singers/${singer.id}`)
}
</script>

<style>
.cover-image {
  width: 69px;
  height: 69px;
  border-radius: 99%;
  object-fit: cover;
}
</style>