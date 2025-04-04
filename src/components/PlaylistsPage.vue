<template>
  <div class="p-8 space-y-8">
    <router-view/>
    <h1 class="text-2xl font-bold mb-6">Плейлисты</h1>
    <section>
      <h2 class="text-xl font-semibold mb-2">Плейлисты других пользователей</h2>
      <div class="flex justify-center overflow-hidden transition gap-2 rounded-lg p-2">
        <button @click="prevArtistPlaylist" :disabled="currentArtistPage === 0" class="text-2xl text-bold bg-transparent border-none">‹</button>
        <PlaylistCard
          v-for="(playlist, index) in pagedArtistPlaylists"
          :key="'artist-' + index"
          :playlist="playlist" 
          @click="goToPlaylist(playlist)"
        />
        <button @click="nextArtistPlaylist" :disabled="currentArtistPage + pagedArtistPlaylists.length >= artistPlaylists.length" class="text-2xl text-bold bg-transparent border-none">›</button>
      </div>
    </section>

    <section>
      <h2 class="text-xl font-semibold mb-2">Рекомендованные</h2>
      <div class="flex justify-center overflow-hidden transition gap-2 rounded-lg p-2">
        <button @click="prevRecommendedPlaylist" :disabled="currentRecommendedPage === 0" class="text-2xl text-bold bg-transparent border-none">‹</button>
        <PlaylistCard
          v-for="(playlist, index) in pagedRecommendedPlaylists"
          :key="'recommended-' + index"
          :playlist="playlist"
          @click="goToPlaylist(playlist)"
        />
        <button @click="nextRecommendedPlaylist" :disabled="currentRecommendedPage + pagedRecommendedPlaylists.length >= recommendedPlaylists.length" class="text-2xl text-bold bg-transparent border-none">›</button>
      </div>
    </section>

    <section>
      <h2 class="text-xl font-semibold mb-2">Мои плейлисты</h2>
      <div class="flex justify-center overflow-hidden transition gap-2 rounded-lg p-2">
        <button @click="prevUserPlaylist" :disabled="currentUserPage === 0" class="text-2xl text-bold bg-transparent border-none">‹</button>
        <PlaylistCard
          v-for="(playlist, index) in pagedUserPlaylists"
          :key="'user-' + index"
          :playlist="playlist"
          @click="goToPlaylist(playlist)"
        />
        <button @click="nextUserPlaylist" :disabled="currentUserPage + pagedUserPlaylists.length >= userPlaylists.length" class="text-2xl text-bold bg-transparent border-none">›</button>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
import PlaylistCard from '@/components/PlaylistCard.vue'

function goToPlaylist(playlist) {
  router.push(`/playlist/${playlist.id}`)
}

const itemsPerPage = 4
const currentArtistPage = ref(0)
const currentRecommendedPage = ref(0)
const currentUserPage = ref(0)

const pagedArtistPlaylists = computed(() => artistPlaylists.slice(currentArtistPage.value, currentArtistPage.value + itemsPerPage))
const pagedRecommendedPlaylists = computed(() => recommendedPlaylists.slice(currentRecommendedPage.value, currentRecommendedPage.value + itemsPerPage))
const pagedUserPlaylists = computed(() => userPlaylists.slice(currentUserPage.value, currentUserPage.value + itemsPerPage))

const nextArtistPlaylist = () => {
  if (currentRecommendedPage.value + itemsPerPage < artistPlaylists.length) {
    currentArtistPage.value += 1
  }
}

const prevArtistPlaylist = () => {
  if (currentRecommendedPage.value > 0) {
    currentRecommendedPage.value -= 1
  }
}

const nextRecommendedPlaylist = () => {
  if (currentRecommendedPage.value + itemsPerPage < recommendedPlaylists.length) {
    currentRecommendedPage.value += 1
  }
}

const prevRecommendedPlaylist = () => {
  if (currentRecommendedPage.value > 0) {
    currentRecommendedPage.value -= 1
  }
}
const nextUserPlaylist = () => {
  if (currentUserPage.value + itemsPerPage < userPlaylists.length) {
    currentUserPage.value += 1
  }
}

const prevUserPlaylist = () => {
  if (currentUserPage.value > 0) {
    currentUserPage.value -= 1
  }
}


const artistPlaylists = [
  { id: 1, title: 'K-Pop Hits', user: 'Blackpink', cover: '/src/resources/playlistCovers/Untitled1.jpg' },
  { id: 2, title: 'Hip-Hop Flow', user: 'Drake', cover: '/src/resources/playlistCovers/Untitled2.jpg' },
  { id: 3, title: 'Pop Queens', user: 'Ariana Grande', cover: '/src/resources/playlistCovers/Untitled3.jpg' },
  { id: 4, title: 'RnB Essentials', user: 'The Weeknd', cover: '/src/resources/playlistCovers/Untitled4.jpg' },
  { id: 5, title: 'Latin Vibes', user: 'Bad Bunny', cover: '/src/resources/playlistCovers/Untitled5.jpg' },
  { id: 6, title: 'Rock Revival', user: 'Imagine Dragons', cover: '/src/resources/playlistCovers/Untitled6.jpg' }
]

const recommendedPlaylists = [
  { id: 1, title: 'Fresh Drops', user: 'Platform', cover: '/src/resources/playlistCovers/Untitled7.png' },
  { id: 2, title: 'Evening Chill', user: 'Platform', cover: '/src/resources/playlistCovers/Untitled8.png' },
  { id: 3, title: 'Morning Boost', user: 'Platform', cover: '/src/resources/playlistCovers/Untitled9.png' },
  { id: 4, title: 'Focus Zone', user: 'Platform', cover: '/src/resources/playlistCovers/Untitled10.png' },
  { id: 5, title: 'Weekend Vibes', user: 'Platform', cover: '/src/resources/playlistCovers/Untitled11.png' },
  { id: 6, title: 'Deep House', user: 'Platform', cover: '/src/resources/playlistCovers/Untitled12.png' }
]

const userPlaylists = [
  { id: 1, title: 'Favorites', user: 'You', cover: '/src/resources/playlistCovers/Untitled13.png' },
  { id: 2, title: 'Workout Beats', user: 'You', cover: '/src/resources/playlistCovers/Untitled14.png' },
  { id: 3, title: 'Lo-Fi Study', user: 'You', cover: '/src/resources/playlistCovers/Untitled15.png' },
  { id: 4, title: 'Party Mode', user: 'You', cover: '/src/resources/playlistCovers/Untitled16.png' },
  { id: 5, title: 'Sleep Time', user: 'You', cover: '/src/resources/playlistCovers/Untitled17.png' },
  { id: 6, title: 'Retro Mix', user: 'You', cover: '/src/resources/playlistCovers/Untitled18.png' }
]

</script>

<style scoped>
</style>
