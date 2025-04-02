<template>
  <div class="w-64 bg-black text-white p-4 flex flex-col justify-between cursor-pointer">
    <div>
      <div class="logo-container">
        <img class="logo" src="/src/icons/NOVER_logo_transparent.png" alt="Logo">
      </div>
      <nav>
        <p class="text-sm mb-2 uppercase text-bold">Меню</p>
        <ul class="no-list-style">
          <li class="mb-2">
            <button class="menu-btn" @click="goHome">
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
            <button class="menu-btn" @click="goGenresPage">
              <svg width="30" height="30" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <g id="icomoon-ignore"/>
                <path d="M16.003 22.377c3.231 0 5.851-2.619 5.851-5.851v-10.639c0-3.231-2.62-5.85-5.851-5.85s-5.851 2.619-5.851 5.85v10.639c0 3.231 2.62 5.851 5.851 5.851zM11.216 5.888c0-2.639 2.147-4.786 4.787-4.786s4.787 2.147 4.787 4.786v10.639c0 2.64-2.147 4.787-4.787 4.787s-4.787-2.147-4.787-4.787v-10.639z" fill="#FFFFFF" opacity="0.25" stroke="currentColor" stroke-width="1"/>
                <path d="M23.978 11.207v5.319c0 4.399-3.579 7.978-7.978 7.978s-7.978-3.579-7.978-7.978v-5.319h-1.064v5.319c0 4.83 3.81 8.776 8.581 9.018h-0.068v5.354h-4.79v1.064h10.637v-1.064h-4.784v-5.354h-0.073c4.771-0.243 8.581-4.189 8.581-9.018v-5.319h-1.064z" fill="#FFFFFF" opacity="0.25" stroke="currentColor" stroke-width="1"/>
              </svg>
              Жанры
            </button>
          </li>
          <li class="mb-2">
            <button class="menu-btn" @click="goSingersPage">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_429_11111)">
                  <circle cx="12" cy="7" r="3" stroke="#FFFFFF" stroke-opacity="0.25" stroke-width="1.5"/>
                  <circle cx="18" cy="18" r="2" stroke="#FFFFFF" stroke-opacity="0.25" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M12.3414 20H6C4.89543 20 4 19.1046 4 18C4 15.7909 5.79086 14 8 14H13.5278" stroke="#FFFFFF" stroke-opacity="0.25" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M20 18V11L22 13" stroke="#FFFFFF" stroke-opacity="0.25" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </g>
                <defs>
                  <clipPath id="clip0_429_11111">
                    <rect width="24" height="24" fill="white"/>
                  </clipPath>
                </defs>
              </svg>
              Исполнители
            </button>
        </li>
        </ul>
        <p class="text-sm mt-6 mb-2 uppercase text-bold">Медиатека</p>
        <ul class="no-list-style">
          <li class="mb-2">
            <button class="menu-btn">
              <svg fill="#FFFFFF" opacity="0.25" width="30" height="30" viewBox="-2 -4 24 24" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin" class="jam jam-heart">
                <path d='M3.636 7.208L10 13.572l6.364-6.364a3 3 0 1 0-4.243-4.243L10 5.086l-2.121-2.12a3 3 0 0 0-4.243 4.242zM9.293 1.55l.707.707.707-.707a5 5 0 1 1 7.071 7.071l-7.07 7.071a1 1 0 0 1-1.415 0l-7.071-7.07a5 5 0 1 1 7.07-7.071z'/>
              </svg>
              Избранное
            </button>
          </li>
          <li class="mb-2">
            <button class="menu-btn"> 
              <svg width="30" height="30" viewBox="0 0 512 512" version="1.1" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <g id="Layer_1">
                  <g id="Layer_2">
                    <path class="st0" d="M256,43.5C138.64,43.5,43.5,138.64,43.5,256c0,117.36,95.14,212.5,212.5,212.5S468.5,373.36,468.5,256    C468.5,138.64,373.36,43.5,256,43.5z M175.32,340.77h-52.08v-92.02h52.08V340.77z M282.04,340.77h-52.08V141h52.08V340.77z     M388.77,340.77h-52.08V195.64h52.08V340.77z" fill="#FFFFFF" opacity="0.25"/>
                  </g>
                </g>
              </svg>
              Популярное
            </button>
          </li>
          <li class="mb-2">
            <button class="menu-btn">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 11L16 11" fill="#FFFFFF" opacity="0.25" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M2 17L13 17" fill="#FFFFFF" opacity="0.25" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M2 5L20 5" fill="#FFFFFF" opacity="0.25" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M20 18.5C20 19.3284 19.3284 20 18.5 20C17.6716 20 17 19.3284 17 18.5C17 17.6716 17.6716 17 18.5 17C19.3284 17 20 17.6716 20 18.5Z" fill="#FFFFFF" opacity="0.25"/>
                <path d="M20 18.5C20 19.3284 19.3284 20 18.5 20C17.6716 20 17 19.3284 17 18.5C17 17.6716 17.6716 17 18.5 17C19.3284 17 20 17.6716 20 18.5ZM20 18.5V10.6C20 10.2686 20.2686 10 20.6 10H22" fill="#FFFFFF" opacity="0.25" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
              Мои плейлисты
            </button>
          </li>
        </ul>
      </nav>
    </div>
    <div class="player-wrapper">
      <div class="slider-container">
        <span class="text-xs">1:30</span>
        <input type="range" min="0" max="100" v-model="sliderValue" class="track-slider" id="songSlider">
        <span class="text-xs">3:30</span>
      </div>
        
      <div class="player-container cursor-pointer" @click="goToTrackPage">
        <div class="play-button-wrapper">
          <button class="play-button" @click.stop="togglePlay">
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
        </div>

        <div class="player-content">
          <button class="nav-button">
            <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g transform="scale(-1,1) translate(-24,0)">
                <path d="M3.76001 7.22005V16.7901C3.76001 18.7501 5.89 19.98 7.59 19L11.74 16.61L15.89 14.21C17.59 13.23 17.59 10.78 15.89 9.80004L11.74 7.40004L7.59 5.01006C5.89 4.03006 3.76001 5.25005 3.76001 7.22005Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M20.24 18.1801V5.82007" stroke="#1c1c1c" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </g>
            </svg>
          </button>
          <div class="song-box">
            <img src="/src/resources/trackCovers/life_goes_on.jpg" class="cover-image" />
            <div class="song-info">
              <div class="title">Life Goes On</div>
              <div class="artist">BTS</div>
            </div>
          </div>

          <button class="nav-button">
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
  import { ref } from 'vue'

  const isPlaying = ref(false);
  const sliderValue = ref(0);

  function togglePlay() {
    isPlaying.value = !isPlaying.value;
  }

  import { useRouter } from 'vue-router'

  const router = useRouter()


  function goHome () {
    router.push('/')
  }
  function goToTrackPage() {
    const trackId = 1 
    router.push(`/track/${trackId}`)
  }
  function goGenresPage() {
    router.push('/genres')
  }
  function goSingersPage() {
    router.push('/singers')
  }
</script>



<style scoped>
.logo-container {
  width: 150px;
  height: 150px; 
  background: radial-gradient(circle, #aa96c1, rgba(184, 164, 207, 0.659), rgba(224, 200, 251, 0.4), #ffffff00, #ffffff00);
  background-size: cover;
  background-position: center;
  border-radius: 15px; 
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
  background-color: rgba(255, 255, 255, 0.1); 
  border-left: 4px solid #e0c8fb;
  transition: background-color 0.3s, border-left 0.3s;
    background-image: linear-gradient(to right, #e0c8fb, rgba(255, 255, 255, 0)); 
  background-color: transparent;
  border-left: 4px solid #e0c8fb;
}

.menu-btn svg {
  margin-right: 10px;
}

li {
  margin-bottom: 0.5rem;
  font-size: 16px;
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
  transform: scale(1.03); /* немного увеличивает */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); /* тень для эффекта */
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
  gap: 5px;
}

.cover-image {
  width: 48px;
  height: 48px;
  border-radius: 10px;
  object-fit: cover;
}

.song-info {
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

.artist {
  font-size: 12px;
  color: #1c1c1c;
  opacity: 0.8;
}
</style>