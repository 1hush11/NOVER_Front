<template>
  <div class="w-3 bg-black text-white p-4 flex flex-col justify-between cursor-pointer">
    <div>
      <div class="logo-container shadow ">
        <img class="logo" src="/src/icons/NOVER_logo_transparent.png" alt="Logo">
      </div>
      <nav>
        <p class="text-sm mb-2 uppercase text-bold">Меню</p>
        <ul class="no-list-style">
          <li class="mb-2">
            <button
              class="menu-btn"
              :class="{ 'active-tab': route.path === ('/') }"
              @click="goHome"
            >
              <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
              viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve" width="30" height="30">
                <polyline fill="none" stroke="#FFFFFF" opacity="0.25" stroke-width="2" stroke-miterlimit="10" points="3,17 16,4 29,17 "/>
                <polyline fill="none" stroke="#FFFFFF" opacity="0.25" stroke-width="2" stroke-miterlimit="10" points="6,14 6,27 13,27 13,17 19,17 19,27 26,27 
                  26,14 "/>
              </svg>
              Главная
            </button>
          </li>
          <li class="mb-2">
            <button 
              class="menu-btn"
              :class="{ 'active-tab': route.path.startsWith('/genres') }"
              @click="goGenresPage">
              <svg width="30" height="30" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <g id="icomoon-ignore"/>
                <path d="M16.003 22.377c3.231 0 5.851-2.619 5.851-5.851v-10.639c0-3.231-2.62-5.85-5.851-5.85s-5.851 2.619-5.851 5.85v10.639c0 3.231 2.62 5.851 5.851 5.851zM11.216 5.888c0-2.639 2.147-4.786 4.787-4.786s4.787 2.147 4.787 4.786v10.639c0 2.64-2.147 4.787-4.787 4.787s-4.787-2.147-4.787-4.787v-10.639z" fill="#FFFFFF" opacity="0.25" stroke="currentColor" stroke-width="1"/>
                <path d="M23.978 11.207v5.319c0 4.399-3.579 7.978-7.978 7.978s-7.978-3.579-7.978-7.978v-5.319h-1.064v5.319c0 4.83 3.81 8.776 8.581 9.018h-0.068v5.354h-4.79v1.064h10.637v-1.064h-4.784v-5.354h-0.073c4.771-0.243 8.581-4.189 8.581-9.018v-5.319h-1.064z" fill="#FFFFFF" opacity="0.25" stroke="currentColor" stroke-width="1"/>
              </svg>
              Жанры
            </button>
          </li>
          <li class="mb-2">
            <button
              class="menu-btn"
              :class="{ 'active-tab': route.path.startsWith('/singers') }"  
              @click="goSingersPage">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_429_11111)">
                  <circle cx="12" cy="7" r="3" stroke="#FFFFFF" stroke-opacity="0.25" stroke-width="1.5"/>
                  <circle cx="18" cy="18" r="2" stroke="#FFFFFF" stroke-opacity="0.25" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M12.3414 20H6C4.89543 20 4 19.1046 4 18C4 15.7909 5.79086 14 8 14H13.5278" stroke="#FFFFFF" stroke-opacity="0.25" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M20 18V11L22 13" stroke="#FFFFFF" stroke-opacity="0.25" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </g>
              </svg>
              Исполнители
            </button>
        </li>
        </ul>
        <p class="text-sm mt-6 mb-2 uppercase text-bold">Медиатека</p>
        <ul class="no-list-style">
          <li class="mb-2">
            <button 
              class="menu-btn"
              :class="{ 'active-tab': route.path.startsWith('/library') }"
              @click="goLibraryPage">
              <svg fill="#FFFFFF" opacity="0.25" width="30" height="30" viewBox="-2 -4 24 24" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin" class="jam jam-heart">
                <path d='M3.636 7.208L10 13.572l6.364-6.364a3 3 0 1 0-4.243-4.243L10 5.086l-2.121-2.12a3 3 0 0 0-4.243 4.242zM9.293 1.55l.707.707.707-.707a5 5 0 1 1 7.071 7.071l-7.07 7.071a1 1 0 0 1-1.415 0l-7.071-7.07a5 5 0 1 1 7.07-7.071z'/>
              </svg>
              Моя медиатека
            </button>
          </li>
          <li class="mb-2">
            <button
              class="menu-btn"
              :class="{ 'active-tab': route.path.startsWith('/playlists') }"
              @click="goPlaylistsPage">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 11L16 11" fill="#FFFFFF" opacity="0.25" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M2 17L13 17" fill="#FFFFFF" opacity="0.25" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M2 5L20 5" fill="#FFFFFF" opacity="0.25" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M20 18.5C20 19.3284 19.3284 20 18.5 20C17.6716 20 17 19.3284 17 18.5C17 17.6716 17.6716 17 18.5 17C19.3284 17 20 17.6716 20 18.5Z" fill="#FFFFFF" opacity="0.25"/>
                <path d="M20 18.5C20 19.3284 19.3284 20 18.5 20C17.6716 20 17 19.3284 17 18.5C17 17.6716 17.6716 17 18.5 17C19.3284 17 20 17.6716 20 18.5ZM20 18.5V10.6C20 10.2686 20.2686 10 20.6 10H22" fill="#FFFFFF" opacity="0.25" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
              Плейлисты
            </button>
          </li>
          <li class="mb-2">
            <button
              class="menu-btn"
              :class="{ 'active-tab': route.path.startsWith('/subscriptions') }"
              @click="goSubscriptionsPage">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 7.16C17.94 7.15 17.87 7.15 17.81 7.16C16.43 7.11 15.33 5.98 15.33 4.58C15.33 3.15 16.48 2 17.91 2C19.34 2 20.49 3.16 20.49 4.58C20.48 5.98 19.38 7.11 18 7.16Z" stroke="#FFFFFF" stroke-opacity="0.25"  stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M16.9699 14.44C18.3399 14.67 19.8499 14.43 20.9099 13.72C22.3199 12.78 22.3199 11.24 20.9099 10.3C19.8399 9.59004 18.3099 9.35003 16.9399 9.59003" stroke="#FFFFFF" stroke-opacity="0.25" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M5.96998 7.16C6.02998 7.15 6.09998 7.15 6.15998 7.16C7.53998 7.11 8.63998 5.98 8.63998 4.58C8.63998 3.15 7.48998 2 6.05998 2C4.62998 2 3.47998 3.16 3.47998 4.58C3.48998 5.98 4.58998 7.11 5.96998 7.16Z" stroke="#FFFFFF" stroke-opacity="0.25"  stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M6.99994 14.44C5.62994 14.67 4.11994 14.43 3.05994 13.72C1.64994 12.78 1.64994 11.24 3.05994 10.3C4.12994 9.59004 5.65994 9.35003 7.02994 9.59003" stroke="#FFFFFF" stroke-opacity="0.25"  stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M12 14.63C11.94 14.62 11.87 14.62 11.81 14.63C10.43 14.58 9.32996 13.45 9.32996 12.05C9.32996 10.62 10.48 9.46997 11.91 9.46997C13.34 9.46997 14.49 10.63 14.49 12.05C14.48 13.45 13.38 14.59 12 14.63Z" fill="#FFFFFF" opacity="0.25" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M9.08997 17.78C7.67997 18.72 7.67997 20.26 9.08997 21.2C10.69 22.27 13.31 22.27 14.91 21.2C16.32 20.26 16.32 18.72 14.91 17.78C13.32 16.72 10.69 16.72 9.08997 17.78Z" fill="#FFFFFF" opacity="0.25" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              Подписки
            </button>
          </li>
        </ul>
      </nav>
    </div>
    <div class="player-wrapper">
      <audio
        ref="audio"
        :src="currentTrack?.audioUrl"
        @timeupdate="updateProgress"
        @loadedmetadata="initDuration"
        autoplay
      />

      <div class="slider-container">
        <span class="text-xs">{{ currentTimeFormatted }}</span>
        <input
          type="range"
          min="0"
          max="100"
          v-model="sliderValue"
          class="track-slider"
          @change="seekAudio"
        />
        <span class="text-xs">{{ formattedDuration }}</span>
      </div>


      <div class="player-container cursor-pointer" @click="goToTrack">
        <div class="play-button-wrapper">
          <button class="play-button" @click.stop="togglePlay" title="Воспроизвести/Остановить">
            <span v-if="!isThisTrackPlaying">
              <svg width="24" height="24" viewBox="0 0 24 20" fill="currentColor">
                <path d="M8 5v14l11-7-11-7z" />
              </svg>
            </span>
            <span v-else>
              <svg width="24" height="24" viewBox="0 0 24 20" fill="currentColor">
                <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
              </svg>
            </span>
          </button>
        </div>

        <div class="player-content">
          <button class="nav-button"  @click.stop="prevTrack" title="Назад">
            <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g transform="scale(-1,1) translate(-24,0)">
                <path d="M3.76001 7.22005V16.7901C3.76001 18.7501 5.89 19.98 7.59 19L11.74 16.61L15.89 14.21C17.59 13.23 17.59 10.78 15.89 9.80004L11.74 7.40004L7.59 5.01006C5.89 4.03006 3.76001 5.25005 3.76001 7.22005Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M20.24 18.1801V5.82007" stroke="#1c1c1c" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </g>
            </svg>
          </button>
          <div class="song-box">
            <img :src="currentTrack?.cover || '/src/resources/trackCovers/empty.png'" class="cover-image" />
            <div class="song-info">
              <div class="title">{{ currentTrack?.title || 'Неизвестно' }}</div>
              <div class="singer">{{ currentTrack?.singer || 'Неизвестный' }}</div>
            </div>
          </div>

          <button class="nav-button" @click.stop="nextTrack" title="Вперёд">
            <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3.76001 7.22005V16.7901C3.76001 18.7501 5.89 19.98 7.59 19L11.74 16.61L15.89 14.21C17.59 13.23 17.59 10.78 15.89 9.80004L11.74 7.40004L7.59 5.01006C5.89 4.03006 3.76001 5.25005 3.76001 7.22005Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M20.24 18.1801V5.82007" stroke="#1c1c1c" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

import { useAudioStore } from '@/useAudioStore'
const audioStore = useAudioStore()

const audio = ref(null)

const { currentTrack, playNext, playPrev, currentTime, duration, setCurrentTime, setDuration } = useAudioStore()

const sliderValue = computed(() => (duration.value ? (currentTime.value / duration.value) * 100 : 0))

const currentTimeFormatted = computed(() => {
  const min = Math.floor(currentTime.value / 60)
  const sec = Math.floor(currentTime.value % 60)
  return `${min}:${sec.toString().padStart(2, '0')}`
})

const formattedDuration = computed(() => {
  const min = Math.floor(duration.value / 60)
  const sec = Math.floor(duration.value % 60)
  return `${min}:${sec.toString().padStart(2, '0')}`
})

function updateProgress() {
  if (audio.value && duration.value) {
    setCurrentTime(audio.value.currentTime)
  }
}

function seekAudio(event) {
  if (audio.value && duration.value) {
    const newTime = (event.target.value / 100) * duration.value
    audio.value.currentTime = newTime
    setCurrentTime(newTime)
  }
}

function initDuration() {
  if (audio.value?.duration) {
    setDuration(Math.floor(audio.value.duration))
  }
}

const isThisTrackPlaying = computed(() =>
  audioStore.currentTrack.value?.id === currentTrack.value?.id && audioStore.isPlaying.value
)

async function togglePlay() {
  if (audioStore.currentTrack.value?.id && audioStore.isPlaying.value) {
    audio.value.pause()
    audioStore.togglePlay()
    return
  }

  audio.value.play()
  audioStore.togglePlay()
}

function prevTrack() {
  playPrev()
}

function nextTrack() {
  playNext()
}

const router = useRouter()
const route = useRoute() 

function goToTrack() {
  if (currentTrack.value?.id) {
    router.push(`/track/${currentTrack.value.id}`)
  }
}

function goHome() {
  router.push('/')
}
function goGenresPage() {
  router.push('/genres')
}
function goSingersPage() {
  router.push('/singers')
}
function goLibraryPage() {
  router.push('/library')
}
function goPlaylistsPage() {
  router.push('/playlists')
}
function goSubscriptionsPage() {
  router.push('/subscriptions')
}

async function fetchCurrentTrack() {
  try {
    const res = await fetch('http://localhost:5240/api/track/current', {
      credentials: 'include'
    })

    if (res.ok) {
      const data = await res.json()
      currentTrack.value = {
        id: data.id,
        title: data.name || 'Неизвестно',
        singer: data.singers?.join(', ') || 'Неизвестный',
        albumId: t.albumId,
        cover: t.coverUrl
          ? '/src/resources/trackCovers/' + t.coverUrl
          : '/src/resources/trackCovers/empty.png',
        audioUrl: '/src/resources/trackAudio/' + data.audioUrl,
        duration: data.duration
      }
    }
  } catch (err) {
    console.error('Ошибка загрузки текущего трека:', err)
  }
}
onMounted(() => {
  audioStore.setAudioRef(audio.value)
})

</script>

<style scoped>
.logo-container {
  width: 150px;
  height: 150px; 
  background: radial-gradient(circle, #aa96c1, rgba(184, 164, 207, 0.659), rgba(224, 200, 251, 0.4), rgba(224, 200, 251, 0.2), rgba(224, 200, 251, 0.05), rgba(224, 200, 251, 0.02), rgba(224, 200, 251, 0.01));
  background-size: cover;
  background-position: center;
  border-radius: 99%;
  border: none; 
  display: flex;
  margin-left: 20%;
  margin-bottom: 1rem;
}

.logo-container img {
  width: 100%;
  height: 100%;
  border-radius: 15px;
  object-fit: cover;
}

.menu-btn {
  color: white;
  font-size: 16px;
  display: flex;
  align-items: center;
  background-color: transparent;
  border: none;
  padding: 0;
  width: 100%;
  text-align: left;
  cursor: pointer;
  transition: background-color 0.3s, border-left 0.3s;
}

.menu-btn:hover {
  color: #1c1c1c;
  background-color: rgba(255, 255, 255, 0.1); 
  border-left: 2px solid rgb(128, 114, 142);
  transition: background-color 0.3s, border-left 0.3s;
  background-image: linear-gradient(to right, #e0c8fb, rgba(255, 255, 255, 0)); 
  background-color: transparent;
}

.menu-btn svg {
  margin-right: 10px;
}

.active-tab {
  color: #1c1c1c;
  background-color: rgba(255, 255, 255, 0.1); 
  border-left: 3px solid rgb(128, 114, 142);
  transition: background-color 0.3s, border-left 0.3s;
  background-image: linear-gradient(to right, #e0c8fb, rgba(255, 255, 255, 0)); 
  background-color: transparent;
}

.player-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.slider-container{
  background: #444444;
  width: 90%;
  border-radius: 20px 20px 0px 0px;
  padding: 20px;
  color: white; 
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.track-slider {
  width: 100%;
  max-width: 100%;
  height: 4px;
  cursor: pointer;
  appearance: none;
  background: #fff;
  border-radius: 2px;
  outline: none;
}

.track-slider::-webkit-slider-thumb {
  appearance: none;
  width: 10px;
  height: 10px;
  background: #1c1c1c;
  border-radius: 50%;
  cursor: pointer;
}

.track-slider::-moz-range-thumb {
  width: 10px;
  height: 10px;
  background: #1c1c1c;
  border-radius: 50%;
  cursor: pointer;
}

.player-container {
  position: relative;
  background: #e0c8fb;
  border-radius: 20px;
  width: 270px;
  padding: 40px 20px 20px 20px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  box-sizing: border-box;
  font-family: sans-serif;
  color: white;
}

.play-button-wrapper {
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  background: #e0c8fb;
  border-radius: 50%;
  padding: 5px;
}

.play-button {
  width: 45px;
  height: 45px;
  background: #1c1c1c;
  color: #e0c8fb;
  border: none;
  border-radius: 50%;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.player-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  transition: transform 0.5s ea, box-shadow 0.5s ease-in-out;
}
.player-container:hover {
  transform: scale(1.03);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); 
}

.nav-button {
  background: transparent;
  border: none;
  color: #1c1c1c;
  font-size: 20px;
  cursor: pointer;
}

.song-box {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.cover-image {
  width: 48px;
  height: 48px;
  border-radius: 10px;
  object-fit: cover;
}

.song-info {
  width: 110px;
  display: flex;
  flex-direction: column;
}

.title {
  font-weight: bold;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 120px;
  color: #1c1c1c;
}

.singer {
  font-size: 12px;
  color: #1c1c1c;
  opacity: 0.8;
}
</style>