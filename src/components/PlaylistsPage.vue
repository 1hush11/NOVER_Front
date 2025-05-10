<template>
  <div class="p-8 space-y-8">
    <router-view/>
    <h1 class="text-2xl font-bold mb-6">Плейлисты</h1>
    <section>
      <h2 class="text-xl font-semibold mb-2">Плейлисты других пользователей</h2>
      <div class="flex justify-center overflow-hidden transition gap-2 rounded-lg p-2">
        <button @click="prevOtherPlaylists" :disabled="currentOtherPage === 0" class="text-2xl text-bold bg-transparent border-none">‹</button>
        <PlaylistCard
          v-for="(playlist, index) in pagedOtherPlaylists"
          :key="'artist-' + index"
          :playlist="playlist" 
          @click="goToPlaylist(playlist)"
        />
        <button @click="nextOtherPlaylists" :disabled="currentOtherPage + pagedOtherPlaylists.length >= otherPlaylists.length" class="text-2xl text-bold bg-transparent border-none">›</button>
      </div>
    </section>

    <section>
      <h2 class="text-xl font-semibold mb-2">Рекомендованные</h2>
      <div class="flex justify-center overflow-hidden transition gap-2 rounded-lg p-2">
        <button @click="prevRecPlaylist" :disabled="currentRecPage === 0" class="text-2xl text-bold bg-transparent border-none">‹</button>
        <PlaylistCard
          v-for="(playlist, index) in pagedRecPlaylists"
          :key="'recommended-' + index"
          :playlist="playlist"
          @click="goToPlaylist(playlist)"
        />
        <button @click="nextRecPlaylist" :disabled="currentRecPage + pagedRecPlaylists.length >= recPlaylists.length" class="text-2xl text-bold bg-transparent border-none">›</button>
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

import { getPlaylistCoverPath, getTrackCoverPath, getTrackAudioPath } from '/src/utils/PathHelper.js'

const router = useRouter()

function goToPlaylist(playlist) {
  router.push(`/playlist/${playlist.id}`)
}

const itemsPerPage = 4

const currentOtherPage = ref(0)
const currentRecPage = ref(0)
const currentUserPage = ref(0)

const otherPlaylists = ref([])
const userPlaylists = ref([])
const recPlaylists = ref([])


onMounted(async () => {
  try {
    const [othersRes, savedRes, recRes] = await Promise.all([
      fetch('http://localhost:5240/api/user/playlists/others', { credentials: 'include' }),
      fetch('http://localhost:5240/api/user/library/saved_playlists', { credentials: 'include' }),
      fetch('http://localhost:5240/api/playlist/playlists/recommended', { credentials: 'include' })
    ]);

    if (!othersRes.ok || !savedRes.ok || !recRes.ok) {
      throw new Error('Ошибка загрузки плейлистов');
    }

    const othersData = await othersRes.json();
    const savedData = await savedRes.json();
    const recData = await recRes.json();

    otherPlaylists.value = othersData.map(p => ({
      id: p.id,
      title: p.title,
      description: p.description,
      user: p.creator || 'Неизвестно',
      isOwner: false,
      cover: getPlaylistCoverPath(p.coverUrl),
    }));

    userPlaylists.value = savedData.map(p => ({
      id: p.id,
      title: p.title,
      description: p.description,
      user: p.creator || 'Неизвестно',
      isOwner: false,
      cover: getPlaylistCoverPath(p.coverUrl),
    }));

    recPlaylists.value = recData.map(p => ({
      id: p.id,
      title: p.title,
      description: p.description,
      user: p.creator || 'Неизвестно',
      isOwner: false,
      cover: getPlaylistCoverPath(p.coverUrl),
    }));
  } catch (e) {
    console.error('Ошибка получения плейлистов:', e);
  }
});


const pagedOtherPlaylists = computed(() =>
  otherPlaylists.value.slice(currentOtherPage.value, currentOtherPage.value + itemsPerPage)
)
const pagedRecPlaylists = computed(() =>
  recPlaylists.value.slice(currentRecPage.value, currentRecPage.value + itemsPerPage)
)
const pagedUserPlaylists = computed(() =>
  userPlaylists.value.slice(currentUserPage.value, currentUserPage.value + itemsPerPage)
)

const nextOtherPlaylists = () => {
  if (currentOtherPage.value + itemsPerPage < otherPlaylists.value.length) {
    currentOtherPage.value++
  }
}
const prevOtherPlaylists = () => {
  if (currentOtherPage.value > 0) {
    currentOtherPage.value--
  }
}

const nextRecPlaylist = () => {
  if (currentRecPage.value + itemsPerPage < recPlaylists.value.length) {
    currentRecPage.value++
  }
}
const prevRecPlaylist = () => {
  if (currentRecPage.value > 0) {
    currentRecPage.value--
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
