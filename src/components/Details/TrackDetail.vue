<template>
  <div class="flex-1 p-4" ref="scrollContainer">
    <div class="flex justify-end">
      <button class="bg-transparent border-none mt-4 mr-4" @click="close">
        <svg width="24" height="24" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fill="#1c1c1" d="M3.21878,2.15448L9.99679,8.92745L16.70268,2.22183C17.15981,1.81458 17.63394,2.05757 17.8219,2.26259C18.00986,2.46761 18.11719,2.95117 17.77817,3.29732L11.07079,10.0014L17.77817,16.7027C18.07648,16.9529 18.07648,17.4434 17.83701,17.7166C17.59753,17.9897 17.15756,18.1484 16.74155,17.8244L9.99679,11.0754L3.24361,17.8271C2.94835,18.092 2.46049,18.0382 2.21878,17.7746C1.97707,17.5111 1.88533,17.0549 2.19441,16.733L8.92279,10.0014L2.22183,3.29732C1.97729,3.02649 1.8919,2.53265 2.22183,2.22183C2.55175,1.911 3.04367,1.95438 3.21878,2.15448Z"/>
        </svg>
      </button>
    </div>

    <div class="flex">
      <img v-if="track.cover" :src="track.cover" alt="track cover" class="cover-image ml-2 mr-4" />
      <div class="flex-1 ml-2">
        <h1 class="text-4xl font-bold mb-4">{{ track.title }}</h1>
        <div class="flex flex-col items-start mb-4">
          <button class="bg-transparent border-none text-lg font-semibold text-gray-700 hover:underline" @click="goToSinger(track.singer)">
            {{ track.singer }}
          </button>
          <button class="bg-transparent border-none text-lg text-gray-500 hover:underline mt-1" @click="goToGenre(track.genre)">
            {{ track.genre }}
          </button>
        </div>

        <div class="flex items-center gap-6 ml-4">
          <button class="bg-transparent border-none" @click="shuffleTracks" title="Перемешать">
            <svg width="24" height="24" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.3536 1.14645C12.1583 0.951184 11.8417 0.951184 11.6464 1.14645C11.4512 1.34171 11.4512 1.65829 11.6464 1.85355L12.7929 3H12C10.7037 3 9.71111 3.58423 8.87248 4.38931C8.20065 5.03427 7.59349 5.85684 6.99461 6.6682C6.86287 6.84668 6.73154 7.02462 6.6 7.2C5.10874 9.18835 3.49037 11 0.5 11C0.223858 11 0 11.2239 0 11.5C0 11.7761 0.223858 12 0.5 12C4.00963 12 5.89126 9.81165 7.4 7.8C7.54367 7.60845 7.6832 7.41962 7.81996 7.23454L7.82005 7.23443L7.82006 7.23441C8.41674 6.42695 8.96069 5.69085 9.56502 5.11069C10.2889 4.41577 11.0463 4 12 4H12.7929L11.6464 5.14645C11.4512 5.34171 11.4512 5.65829 11.6464 5.85355C11.8417 6.04882 12.1583 6.04882 12.3536 5.85355L14.3536 3.85355C14.5488 3.65829 14.5488 3.34171 14.3536 3.14645L12.3536 1.14645ZM0.5 3C3.35278 3 5.12992 4.44588 6.50548 6.06746L6.3762 6.24266C6.2483 6.4161 6.12293 6.58609 6 6.75C5.96397 6.79804 5.92798 6.84581 5.892 6.89331C4.57348 5.29306 3.02637 4 0.5 4C0.223858 4 0 3.77614 0 3.5C0 3.22386 0.223858 3 0.5 3ZM8.87248 10.6107C8.37284 10.131 7.90897 9.55314 7.45767 8.95468C7.64688 8.71693 7.82704 8.48061 8 8.25L8.08987 8.12987C8.58412 8.79402 9.05288 9.39766 9.56502 9.88931C10.2889 10.5842 11.0463 11 12 11H12.7929L11.6464 9.85355C11.4512 9.65829 11.4512 9.34171 11.6464 9.14645C11.8417 8.95118 12.1583 8.95118 12.3536 9.14645L14.3536 11.1464C14.5488 11.3417 14.5488 11.6583 14.3536 11.8536L12.3536 13.8536C12.1583 14.0488 11.8417 14.0488 11.6464 13.8536C11.4512 13.6583 11.4512 13.3417 11.6464 13.1464L12.7929 12H12C10.7037 12 9.71111 11.4158 8.87248 10.6107Z" 
                :fill="isShuffle ? '#e0c8fb' : '#000000'"/>
            </svg>
          </button>
          <button class="bg-transparent border-none" @click="prevTrack" title="Назад">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g transform="scale(-1,1) translate(-24,0)">
                <path d="M3.76 7.22V16.79C3.76 18.75 5.89 19.98 7.59 19L11.74 16.61L15.89 14.21C17.59 13.23 17.59 10.78 15.89 9.8L11.74 7.4L7.59 5.01C5.89 4.03 3.76 5.25 3.76 7.22Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M20.24 18.18V5.82" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </g>
            </svg>
          </button>
          <button class="play-button" @click.stop="toggleTrackPlay" title="Воспроизвести/Остановить">
            <span v-if="!isThisTrackPlaying">
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
          <button class="bg-transparent border-none" @click="nextTrack" title="Вперёд">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3.76 7.22V16.79C3.76 18.75 5.89 19.98 7.59 19L11.74 16.61L15.89 14.21C17.59 13.23 17.59 10.78 15.89 9.8L11.74 7.4L7.59 5.01C5.89 4.03 3.76 5.25 3.76 7.22Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M20.24 18.18V5.82" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          <button class="relative bg-transparent border-none" @click="toggleRepeatMode" title="Повтор">
            <svg v-if="repeatMode === 'off'" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.924 5.617a.997.997 0 0 0-.217-.324l-3-3a1 1 0 1 0-1.414 1.414L17.586 5H8a5 5 0 0 0-5 5v2a1 1 0 1 0 2 0v-2a3 3 0 0 1 3-3h9.586l-1.293 1.293a1 1 0 0 0 1.414 1.414l3-3a.997.997 0 0 0 .217-1.09zM3 18.383a.997.997 0 0 0 .217 1.09l3 3a1 1 0 0 0 1.414-1.414L6.414 19H16a5 5 0 0 0 5-5v-2a1 1 0 1 0-2 0v2a3 3 0 0 1-3 3H6.414l1.293-1.293a1 1 0 1 0-1.414-1.414l-3 3z"/>
            </svg>

            <svg v-else-if="repeatMode === 'all'" width="24" height="24" viewBox="0 0 24 24" fill="#e0c8fb">
              <path d="M20.924 5.617a.997.997 0 0 0-.217-.324l-3-3a1 1 0 1 0-1.414 1.414L17.586 5H8a5 5 0 0 0-5 5v2a1 1 0 1 0 2 0v-2a3 3 0 0 1 3-3h9.586l-1.293 1.293a1 1 0 0 0 1.414 1.414l3-3a.997.997 0 0 0 .217-1.09zM3 18.383a.997.997 0 0 0 .217 1.09l3 3a1 1 0 0 0 1.414-1.414L6.414 19H16a5 5 0 0 0 5-5v-2a1 1 0 1 0-2 0v2a3 3 0 0 1-3 3H6.414l1.293-1.293a1 1 0 1 0-1.414-1.414l-3 3z"/>
            </svg>

            <div v-else-if="repeatMode === 'one'" class="relative">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#e0c8fb">
                <path d="M20.924 5.617a.997.997 0 0 0-.217-.324l-3-3a1 1 0 1 0-1.414 1.414L17.586 5H8a5 5 0 0 0-5 5v2a1 1 0 1 0 2 0v-2a3 3 0 0 1 3-3h9.586l-1.293 1.293a1 1 0 0 0 1.414 1.414l3-3a.997.997 0 0 0 .217-1.09zM3 18.383a.997.997 0 0 0 .217 1.09l3 3a1 1 0 0 0 1.414-1.414L6.414 19H16a5 5 0 0 0 5-5v-2a1 1 0 1 0-2 0v2a3 3 0 0 1-3 3H6.414l1.293-1.293a1 1 0 1 0-1.414-1.414l-3 3z"/>
              </svg>
              <span
                class="absolute text-xs text-purple-500"
                style="top: -2px; left: -3px;"
              >
                1
              </span>
            </div>
          </button>

        </div>
      </div>
    </div>

    <div class="flex gap-4 mt-4 mb-6">
      <button class="btn" title="В избранное" @click="handleLibraryToggle">
        <svg :fill="inLibrary ? '#a896bc' : '#1c1c1'" width="30" height="30" viewBox="-2 -4 24 24" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin" class="jam jam-heart">
          <path d='M3.636 7.208L10 13.572l6.364-6.364a3 3 0 1 0-4.243-4.243L10 5.086l-2.121-2.12a3 3 0 0 0-4.243 4.242zM9.293 1.55l.707.707.707-.707a5 5 0 1 1 7.071 7.071l-7.07 7.071a1 1 0 0 1-1.415 0l-7.071-7.07a5 5 0 1 1 7.07-7.071z'/>
        </svg>
        В избранное
      </button>

      <button class="btn" title="Добавить в плейлист" @click.stop="openPlaylistMenu($event)">
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 18H20M22 18H20M20 18V16M20 18V20" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M2 11L20 11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M2 17L14 17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M2 5L20 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        В плейлист
      </button>
      <div
        v-if="showPlaylistMenu"
        :style="{ position: 'absolute', top: menuPosition.top + 'px', left: menuPosition.left + 'px', zIndex: 1000 }"
        class="border rounded-lg shadow bg-white w-3 p-4 mt-2 cursor-pointer"
        @click.stop
      >
        <p class="font-semibold text-md mb-4">Выберите плейлист</p>
        <ul class="max-h-60 overflow-y-auto">
          <li
            v-for="pl in playlists"
            :key="pl.id"
            class="border-b text-md"
            style="height: 25px;"
            @click="addTrackToPlaylist(pl.id)"
          >
            {{ pl.title }}
          </li>
        </ul>
        <div class="border-t mt-2 pt-2">
          <button @click="createNewPlaylist" class="bg-purple-600 w-2-7 text-md rounded-lg hover:bg-purple-700 transition border-none" style="height: 40px;">
            + Создать новый плейлист
          </button>
        </div>
      </div>

      <AddPlaylistModal
        :isVisible="isCreateModalOpen"
        @close="isCreateModalOpen = false"
        @created="handleNewPlaylist"
      />

      <button class="btn" title="Альбом" @click="goToAlbum" :disabled="!track.albumId">
        <svg width="30" height="30" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
              <g stroke="none" fill="none" fill-rule="evenodd">
                  <g fill-rule="nonzero">
                      <g id="album_line">
                          <path d="M24,0 L24,24 L0,24 L0,0 L24,0 Z M12.5934901,23.257841 L12.5819402,23.2595131 L12.5108777,23.2950439 L12.4918791,23.2987469 L12.4918791,23.2987469 L12.4767152,23.2950439 L12.4056548,23.2595131 C12.3958229,23.2563662 12.3870493,23.2590235 12.3821421,23.2649074 L12.3780323,23.275831 L12.360941,23.7031097 L12.3658947,23.7234994 L12.3769048,23.7357139 L12.4804777,23.8096931 L12.4953491,23.8136134 L12.4953491,23.8136134 L12.5071152,23.8096931 L12.6106902,23.7357139 L12.6232938,23.7196733 L12.6232938,23.7196733 L12.6266527,23.7031097 L12.609561,23.275831 C12.6075724,23.2657013 12.6010112,23.2592993 12.5934901,23.257841 L12.5934901,23.257841 Z M12.8583906,23.1452862 L12.8445485,23.1473072 L12.6598443,23.2396597 L12.6498822,23.2499052 L12.6498822,23.2499052 L12.6471943,23.2611114 L12.6650943,23.6906389 L12.6699349,23.7034178 L12.6699349,23.7034178 L12.678386,23.7104931 L12.8793402,23.8032389 C12.8914285,23.8068999 12.9022333,23.8029875 12.9078286,23.7952264 L12.9118235,23.7811639 L12.8776777,23.1665331 C12.8752882,23.1545897 12.8674102,23.1470016 12.8583906,23.1452862 L12.8583906,23.1452862 Z M12.1430473,23.1473072 C12.1332178,23.1423925 12.1221763,23.1452606 12.1156365,23.1525954 L12.1099173,23.1665331 L12.0757714,23.7811639 C12.0751323,23.7926639 12.0828099,23.8018602 12.0926481,23.8045676 L12.108256,23.8032389 L12.3092106,23.7104931 L12.3186497,23.7024347 L12.3186497,23.7024347 L12.3225043,23.6906389 L12.340401,23.2611114 L12.337245,23.2485176 L12.337245,23.2485176 L12.3277531,23.2396597 L12.1430473,23.1473072 Z" id="MingCute" fill-rule="nonzero"/>
                          <path d="M12,2 C17.5228,2 22,6.47715 22,12 C22,17.5228 17.5228,22 12,22 C6.47715,22 2,17.5228 2,12 C2,6.47715 6.47715,2 12,2 Z M12,4 C7.58172,4 4,7.58172 4,12 C4,16.4183 7.58172,20 12,20 C16.4183,20 20,16.4183 20,12 C20,7.58172 16.4183,4 12,4 Z M12,10 C13.1046,10 14,10.8954 14,12 C14,13.1046 13.1046,14 12,14 C10.8954,14 10,13.1046 10,12 C10,10.8954 10.8954,10 12,10 Z M11.4402,6.50687 C11.6243,7.02759 11.3514,7.59891 10.8306,7.78296 C9.70239,8.18174 8.75788,8.97573 8.1657,9.99943 C7.88916,10.4775 7.27743,10.6409 6.79937,10.3643 C6.32131,10.0878 6.15794,9.47604 6.43449,8.99798 C7.26199,7.56747 8.58138,6.45671 10.1642,5.89728 C10.6849,5.71323 11.2562,5.98615 11.4402,6.50687 Z" fill="currentColor"/>
                      </g>
                  </g>
              </g>
          </svg>
        Альбом
      </button>
      
      <button class="btn" @click="isReviewModalOpen = true">
        <svg fill="#1c1c1" width="25px" height="25px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" stroke-width="0.5">
          <path d="M8.2881437,19.1950792 C8.38869181,19.1783212 8.49195996,19.1926955 8.58410926,19.2362761 C9.64260561,19.7368747 10.8021412,20 12,20 C16.418278,20 20,16.418278 20,12 C20,7.581722 16.418278,4 12,4 C7.581722,4 4,7.581722 4,12 C4,13.7069096 4.53528582,15.3318588 5.51454846,16.6849571 C5.62010923,16.830816 5.63909672,17.022166 5.5642591,17.1859256 L4.34581002,19.8521348 L8.2881437,19.1950792 Z M3.58219949,20.993197 C3.18698783,21.0590656 2.87870208,20.6565881 3.04523765,20.2921751 L4.53592782,17.0302482 C3.54143337,15.5576047 3,13.818993 3,12 C3,7.02943725 7.02943725,3 12,3 C16.9705627,3 21,7.02943725 21,12 C21,16.9705627 16.9705627,21 12,21 C10.707529,21 9.4528641,20.727055 8.30053434,20.2068078 L3.58219949,20.993197 Z"/>
        </svg>
        Отзыв
      </button>

      <AddReviewModal
        :isVisible="isReviewModalOpen"
        :trackId="String(track.id)"
        @close="isReviewModalOpen = false"
        @submitted="() => toast.success('Спасибо за отзыв!', {
          autoClose: 2000,
          position: 'bottom-center'
        })"
      />

    </div>

    <div class="mt-6">
      <h2 class="text-xl font-bold mb-4">Похожие треки</h2>
      <div v-if="similarTracks.length" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <TrackCard 
          v-for="(track, index) in similarTracks" 
          :key="index" 
          :track="track" 
          :index="index" 
          @play="() => handleTrackPlay({ track, index })"
        />
      </div>
      <p v-else class="text-gray-500 italic">Похожие треки не найдены.</p>
    </div>
    <div class="mt-6 cursor-pointer">
      <h2 class="text-xl font-bold mb-4">Отзывы</h2>
      <ul v-if="reviews.length" class="no-list-style ml-2">
      <li v-for="(review, index) in reviews" :key="index" class="flex flex-col gap-3">
        <div class="flex justify-between items-center w-full">
          <div class="flex items-center gap-4">
            <span class="font-semibold">{{ review.user }}</span>
            <div class="text-yellow-500 text-sm flex items-center">
              <span v-for="star in 5" :key="star">
                <span v-if="star <= review.rating">
                  <svg fill="#eab308" width="15" height="15" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22,9.81a1,1,0,0,0-.83-.69l-5.7-.78L12.88,3.53a1,1,0,0,0-1.76,0L8.57,8.34l-5.7.78a1,1,0,0,0-.82.69,1,1,0,0,0,.28,1l4.09,3.73-1,5.24A1,1,0,0,0,6.88,20.9L12,18.38l5.12,2.52a1,1,0,0,0,.44.1,1,1,0,0,0,1-1.18l-1-5.24,4.09-3.73A1,1,0,0,0,22,9.81Z"/>
                  </svg>
                </span>
                <span v-else>
                  <svg fill="#eab308" width="15" height="15" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <polygon points="12 4 9.22 9.27 3 10.11 7.5 14.21 6.44 20 12 17.27 17.56 20 16.5 14.21 21 10.11 14.78 9.27 12 4"
                      fill="none" stroke="#eab308" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                  </svg>
                </span>
              </span>
            </div>
          </div>
          <span class="text-sm text-gray-600">{{ new Date(review.createdAt).toLocaleString() }}</span>
        </div>
        <div class="border-b mb-4">{{ review.comment }}</div>
      </li>
    </ul>
    <p v-else class="text-gray-500 italic">Отзывов пока нет.</p>
    </div>
    
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { ref, onMounted, computed, watch, h } from 'vue'

import TrackCard from '/src/components/Cards/TrackCard.vue'
import AddPlaylistModal from '/src/components/Modals/AddPlaylistModal.vue'
import AddReviewModal from '/src/components/Modals/AddReviewModal.vue'

import { useAudioStore } from '@/useAudioStore'

import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

import { getTrackCoverPath, getTrackAudioPath } from '/src/utils/PathHelper.js'

const isAuthorized = ref(false)

const showPlaylistMenu = ref(false)
const playlists = ref([])
const menuPosition = ref({ top: 0, left: 0 })

const isCreateModalOpen = ref(false)
const isReviewModalOpen = ref(false)

const inLibrary = ref(false)

const audioStore = useAudioStore()
const {
  currentTrack,
  isPlaying,
  play,
  togglePlay,
  playNext,
  playPrev,
  setQueue,
  isShuffle,
  toggleShuffle,
  shuffleArray,
  repeatMode,
  toggleRepeatMode,
} = audioStore

function handleTrackPlay({ track, index }) {
  const isSame = audioStore.currentTrack.value?.id === track.id
  const isPlaying = audioStore.isPlaying.value

  if (isSame && isPlaying) {
    audioStore.pause()
  } else if (isSame && !isPlaying) {
    audioStore.togglePlay()
  } else {
    audioStore.setQueue(similarTracks.value, index)
    audioStore.playCurrent()
  }
}

async function fetchCurrentUser() {
  try {
    const res = await fetch('http://localhost:5240/api/user/me', {
      credentials: 'include'
    })

    if (!res.ok) {
      isAuthorized.value = false
      return
    }

    await res.json()
    isAuthorized.value = true
  } catch (err) {
    isAuthorized.value = false
    console.error('Ошибка получения текущего пользователя:', err)
  }
}

const scrollContainer = ref(null)
const route = useRoute()
const router = useRouter()

const track = ref({
  id: null,
  title: '',
  singer: '',
  albumId: '',
  genre: '',
  cover: '',
  duration: 0,
  audioUrl: '',
})

const similarTracks = ref([])

const isThisTrackPlaying = computed(() =>
  currentTrack.value?.id === track.value.id && isPlaying.value
)

function toggleTrackPlay() {
  if (isThisTrackPlaying.value) {
    togglePlay()
  } else {
    if (isShuffle.value) {
      const tracks = [track.value, ...shuffleArray(similarTracks.value.filter(t => t.id !== track.value.id))]
      setQueue(tracks, 0)
    } else {
      setQueue([track.value], 0)
    }
    play(track.value)

    try {
      fetch(`http://localhost:5240/api/track/set_current/${track.value.id}`, {
        method: 'POST',
        credentials: 'include'
      })
    } catch (err) {
      console.error('Ошибка установки текущего трека:', err)
    }
  }
}

function prevTrack() {
  playPrev()
}
function nextTrack() {
  playNext()
}
function shuffleTracks() {
  toggleShuffle()
}
function goToAlbum() {
  if (track.value.albumId) {
    router.push(`/albums/${track.value.albumId}`)
  } else {
    console.warn('albumId отсутствует')
  }
}
function close() {
  router.back()
}

function scrollToTop() {
  if (scrollContainer.value) {
    scrollContainer.value.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

async function checkIfInLibrary() {
  try {
    const res = await fetch('http://localhost:5240/api/user/library/tracks', {
      credentials: 'include'
    })

    if (res.status === 401) {
      isAuthorized.value = false
      return
    }

    if (!res.ok) throw new Error(await res.text())
    const data = await res.json()
    inLibrary.value = data.some(t => t.id === track.value.id)
  } catch (err) {
    console.error('Ошибка проверки медиатеки:', err)
    isAuthorized.value = false
  }
}

async function handleLibraryToggle() {
  if (!isAuthorized.value) {
    toast.info('Войдите в аккаунт, чтобы добавлять в медиатеку', {
      autoClose: 3000,
      position: 'bottom-center'
    })
    return
  }

  if (inLibrary.value) {
    showRemoveConfirm()
  } else {
    await addToLibrary()
    inLibrary.value = true
  }
}

async function addToLibrary() {
  try {
    const res = await fetch(`http://localhost:5240/api/user/library/add_track/${track.value.id}`, {
      method: 'POST',
      credentials: 'include'
    })
    if (!res.ok) throw new Error(await res.text())

    inLibrary.value = true

    toast.success('Трек добавлен в медиатеку', {
      autoClose: 3000,
      position: 'bottom-center'
    })
  } catch (err) {
    toast.error(err.message || 'Ошибка добавления', {
      autoClose: 3000,
      position: 'bottom-center'
    })
  }
}

async function removeFromLibrary() {
  try {
    const res = await fetch(`http://localhost:5240/api/user/library/remove_track/${track.value.id}`, {
      method: 'DELETE',
      credentials: 'include'
    })
    if (!res.ok) throw new Error(await res.text())

    inLibrary.value = false

    toast.success('Трек удалён из медиатеки', {
      autoClose: 3000,
      position: 'bottom-center'
    })
  } catch (err) {
    toast.error(err.message || 'Ошибка удаления', {
      autoClose: 3000,
      position: 'bottom-center'
    })
  }
}

function showRemoveConfirm() {
  toast(
    ({ closeToast }) => {
      setTimeout(closeToast, 5000)

      return h('div', { class: 'flex flex-col gap-2' }, [
        h('div', { class: 'flex justify-center gap-4 items-center' }, [
          h('span', 'Удалить трек из медиатеки?'),
          h('button', {
            class: 'bg-gray text-gray-700 rounded-lg border-none px-2 py-1',
            style: 'width: 60px; height: 30px;',
            onClick: closeToast
          }, 'Нет'),
          h('button', {
            class: 'bg-purple text-gray-700 rounded-lg border-none px-2 py-1',
            style: 'width: 60px; height: 30px;',
            onClick: async () => {
              await removeFromLibrary()
              closeToast()
            }
          }, 'Да')
        ])
      ])
    },
    {
      position: 'bottom-center',
      autoClose: false,
      closeOnClick: false
    }
  )
}

async function loadData(id) {
  try {
    const res = await fetch(`http://localhost:5240/api/track/tracks/${id}`)
    if (!res.ok) throw new Error(await res.text())
    const trackData = await res.json()

    track.value = {
      id: trackData.id,
      title: trackData.name,
      singer: trackData.singers?.join(', ') || 'Неизвестный исполнитель',
      albumId: trackData.albumId,
      genre: trackData.genreName,
      cover: getTrackCoverPath(trackData.coverUrl),
      audio: getTrackAudioPath(trackData.audioUrl),
      duration: trackData.duration,
    }

    const similarRes = await fetch(`http://localhost:5240/api/track/similar/${id}?count=5`)
    if (!similarRes.ok) throw new Error(await similarRes.text())

    const similarData = await similarRes.json()
    similarTracks.value = similarData.map(t => ({
      id: t.id,
      title: t.name,
      singer: t.singers.length ? t.singers.join(', ') : 'Неизвестный исполнитель',
      albumId: t.albumId,
      cover: getTrackCoverPath(t.coverUrl),
      audio: getTrackAudioPath(t.audioUrl),
    }))

    await loadTrackReviews(id)

  } catch (err) {
    console.error('Ошибка загрузки трека и похожих треков:', err)
  }
}

watch(() => route.params.id, async (newId) => {
  await loadData(newId)
  scrollToTop()
})

async function openPlaylistMenu(event) {
  const rect = event.currentTarget.getBoundingClientRect()
  menuPosition.value = {
    top: rect.bottom + window.scrollY,
    left: rect.left + window.scrollX
  }

  showPlaylistMenu.value = true

  try {
    const res = await fetch('http://localhost:5240/api/user/library/playlists', {
      credentials: 'include'
    })
    if (!res.ok) throw new Error(await res.text())

    const data = await res.json()
    playlists.value = data.created 
  } catch (err) {
    toast.error('Не удалось загрузить плейлисты')
  }
}

const reviews = ref([])

async function loadTrackReviews(trackId) {
  try {
    const res = await fetch(`http://localhost:5240/api/review/track/${trackId}`)
    if (!res.ok) throw new Error(await res.text())
    reviews.value = await res.json()
  } catch (err) {
    console.error('Ошибка загрузки отзывов:', err)
    toast.error('Не удалось загрузить отзывы', {
      autoClose: 3000,
      position: 'bottom-center'
    })
  }
}

onMounted(async () => {
  await fetchCurrentUser()
  await loadData(route.params.id)

  if (isAuthorized.value) {
    await checkIfInLibrary()
  }
})

onMounted(() => {
  document.addEventListener('click', () => {
    showPlaylistMenu.value = false
  })
})

async function addTrackToPlaylist(playlistId) {
  try {
    const res = await fetch(`http://localhost:5240/api/playlist/playlists/${playlistId}/add`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(track.value.id)
    })

    if (!res.ok) throw new Error(await res.text())
    toast.success('Трек добавлен в плейлист', {
      autoClose: 2000,
      position: 'bottom-center',
  })
    showPlaylistMenu.value = false
  } catch (err) {
    toast.error(err.message, {
      autoClose: 2000,
      position: 'bottom-center',
    })
  }
}

function createNewPlaylist() {
  isCreateModalOpen.value = true
}

async function handleNewPlaylist(newPlaylist) {
  playlists.value.push({
    id: newPlaylist.id,
    title: newPlaylist.title,
    coverUrl: newPlaylist.coverUrl,
    description: newPlaylist.description,
    createdAt: new Date().toISOString(),
    type: newPlaylist.type,
    creator: '',
    isOwner: true
  })

  try {
    const res = await fetch(`http://localhost:5240/api/playlist/playlists/${newPlaylist.id}/add`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(track.value.id)
    })

    if (!res.ok) throw new Error(await res.text())

    toast.success('Плейлист создан и трек добавлен', {
      autoClose: 3000,
      position: 'bottom-center'
    })
  } catch (err) {
    toast.error('Ошибка при добавлении трека в плейлист: ' + err.message, {
      autoClose: 3000,
      position: 'bottom-center'
    })
  }
}
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

.play-button {
  width: 65px;
  height: 65px;
  background: #e0c8fb;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
}

.cover-image {
  width: 200px;
  height: 200px;
  border-radius: 8%;
  object-fit: cover;
  border: 1px solid #1c1c1c;
}

.track-slider {
  appearance: none;
  -webkit-appearance: none;
  width: 100%;
  height: 6px;
  border-radius: 3px;
  background: linear-gradient(to right, #e0c8fb var(--progress, 0%), #e4e4e4 var(--progress, 0%));
  outline: none;
  cursor: pointer;
  transition: background 0.3s ease;
}

.track-slider::-webkit-slider-thumb {
  appearance: none;
  -webkit-appearance: none;
  appearance: none;
  width: 14px;
  height: 14px;
  background-color: #e0c8fb;
  border: 2px solid #e0c8fb;
  border-radius: 50%;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  margin-top: -5px;
}

.track-slider::-moz-range-thumb {
  width: 14px;
  height: 14px;
  background-color: #e0c8fb;
  border: 2px solid #e0c8fb;
  border-radius: 50%;
  cursor: pointer;
}
</style>
