<template>
  <div class="p-4 mr-4 cursor-pointer">
    <h2 class="text-xl font-bold mb-4">Top Artist</h2>
    <div class="flex flex-col gap-4">
      <div
        v-for="(artist, index) in topArtists"
        :key="index"
        class="flex items-center gap-4"
      >
        <img
          :src="artist.image"
          alt="artist"
          class="cover-image"
        />
        <div class="flex flex-col">
          <p class="text-base font-semibold hover:underline">{{ artist.name }}</p>
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

              {{ artist.followers }}
            </span>
            
            <span class="flex items-center justify-center text-xs text-gray-400 select-none">•</span>

            <span>
              <svg width="16" height="16" viewBox="0 0 255 200" fill="#1c1c1c" xmlns="http://www.w3.org/2000/svg">
                <path d="M249.9,189.1h-16V129c0-55.9-47.3-101.4-105.4-101.4C70.4,27.6,23.2,73,23.2,129l0,8c0,12,0,35.3,0,52.2h-16L7.2,129
                  c0-64.7,54.4-117.4,121.3-117.4c66.9,0,121.4,52.7,121.4,117.4V189.1z"/>
                <path d="M72.4,235.6H39.5v-94.4h32.9C89.4,185,72.4,235.6,72.4,235.6z"/>
                <path d="M184.1,141.2H217v94.4h-32.9C167.1,191.8,184.1,141.2,184.1,141.2z"/>
              </svg>
              {{ artist.plays }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const topArtists = [
  {
    name: 'Agust D',
    image: '/src/resources/singerCovers/agustd.jpg',
    followers: '12k Подписаны',
    plays: '25M Прослушали',
  },
  {
    name: 'Jimin',
    image: '/src/resources/singerCovers/jimin.jpg',
    followers: '50k Подписаны',
    plays: '2M Прослушали',
  },
  {
    name: 'BTS',
    image: '/src/resources/singerCovers/bts.jpg',
    followers: '2.3M Подписаны',
    plays: '32B Прослушали',
  },
  {
    name: 'J-Hope',
    image: '/src/resources/singerCovers/jhope.jpg',
    followers: '21M Подписаны',
    plays: '12B Прослушали',
  },
  {
    name: 'Jung Kook',
    image: '/src/resources/singerCovers/jungkook.jpg',
    followers: '2M Подписаны',
    plays: '50M Прослушали',
  },
  {
    name: 'V',
    image: '/src/resources/singerCovers/v.jpg',
    followers: '25M Подписаны',
    plays: '10B Прослушали',
  },
]
</script>

<style>
.cover-image {
  width: 69px;
  height: 69px;
  border-radius: 25%;
  object-fit: cover;
}
</style>