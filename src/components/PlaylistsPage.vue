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
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import PlaylistCard from '@/components/PlaylistCard.vue'

const router = useRouter()

function goToPlaylist(playlist) {
  console.log('sss')
  router.push(`/playlist/${playlist.id}`)
}

const itemsPerPage = 4

const currentArtistPage = ref(0)
const currentRecommendedPage = ref(0)
const currentUserPage = ref(0)

const artistPlaylists = ref([])
const recommendedPlaylists = ref([])
const userPlaylists = ref([])

onMounted(async () => {
  try {
    const res = await fetch('http://localhost:5240/api/user/library/playlists', {
      credentials: 'include'
    })

    if (!res.ok) {
      console.error('Ошибка загрузки плейлистов:', await res.text())
      return
    }

    const data = await res.json()

    artistPlaylists.value = (data?.saved ?? []).map(p => ({
      id: p.id,
      title: p.title,
      user: p.creator || 'Неизвестно',
      cover: `/src/resources/playlistCovers/${p.coverUrl}`
    }))

    userPlaylists.value = (data?.created ?? []).map(p => ({
      id: p.id,
      title: p.title,
      user: p.creator || 'Вы',
      cover: `/src/resources/playlistCovers/${p.coverUrl}`
    }))

    recommendedPlaylists.value = [
      {
        id: 100,
        title: 'Релаксовое утро',
        user: 'Platform',
        cover: '/src/resources/playlistCovers/Untitled7.png'
      },
      {
        id: 101,
        title: 'Бас-буст🔥',
        user: 'Platform',
        cover: '/src/resources/playlistCovers/Untitled8.png'
      },
      {
        id: 102,
        title: 'Late Night Vibes',
        user: 'Platform',
        cover: '/src/resources/playlistCovers/Untitled9.png'
      }
    ]
  } catch (e) {
    console.error('Ошибка получения плейлистов:', e)
  }
})


const pagedArtistPlaylists = computed(() =>
  artistPlaylists.value.slice(currentArtistPage.value, currentArtistPage.value + itemsPerPage)
)
const pagedRecommendedPlaylists = computed(() =>
  recommendedPlaylists.value.slice(currentRecommendedPage.value, currentRecommendedPage.value + itemsPerPage)
)
const pagedUserPlaylists = computed(() =>
  userPlaylists.value.slice(currentUserPage.value, currentUserPage.value + itemsPerPage)
)

const nextArtistPlaylist = () => {
  if (currentArtistPage.value + itemsPerPage < artistPlaylists.value.length) {
    currentArtistPage.value++
  }
}
const prevArtistPlaylist = () => {
  if (currentArtistPage.value > 0) {
    currentArtistPage.value--
  }
}

const nextRecommendedPlaylist = () => {
  if (currentRecommendedPage.value + itemsPerPage < recommendedPlaylists.value.length) {
    currentRecommendedPage.value++
  }
}
const prevRecommendedPlaylist = () => {
  if (currentRecommendedPage.value > 0) {
    currentRecommendedPage.value--
  }
}

const nextUserPlaylist = () => {
  if (currentUserPage.value + itemsPerPage < userPlaylists.value.length) {
    currentUserPage.value++
  }
}
const prevUserPlaylist = () => {
  if (currentUserPage.value > 0) {
    currentUserPage.value--
  }
}
</script>


<style scoped>
</style>
