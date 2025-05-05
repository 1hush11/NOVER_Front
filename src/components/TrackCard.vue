<template>
  <div class="flex items-center justify-between rounded-lg shadow p-4 w-full">
    <div class="flex items-center gap-4">
      <p class="text-sm text-gray-600 text-center">{{ formattedIndex }}</p>

      <img :src="track.cover" :alt="track.title + ' cover'" class="cover-image" />

      <div>
        <p
          class="text-md font-semibold hover:underline cursor-pointer"
          @click.stop="goToTrackPage"
        >
          {{ track.title }}
        </p>
        <p class="text-sm text-gray-600 cursor-default">{{ track.singer }}</p>
      </div>
    </div>

    <div class="flex items-center gap-4">
      <button class="play-button"  @click.stop="$emit('play')" title="Воспроизвести/Остановить">
        <span v-if="!isThisTrackPlaying">
          <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 20">
            <path d="M8 5v14l11-7-11-7z" />
          </svg>
        </span>
        <span v-else>
          <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 20">
            <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
          </svg>
        </span>
      </button>

      <button
        class="p-2 bg-transparent border-none cursor-pointer transition items-center"
        @click.stop="handleLibraryToggle"
        :title="inLibrary ? 'Удалить из медиатеки' : 'Добавить в медиатеку'"
      >
        <svg
          width="25px"
          height="25px"
          viewBox="-2 -4 24 24" 
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMinYMin"
        >
          <path
            :fill="inLibrary ? '#9686a8' : '#1c1c1'"
            d="M3.636 7.208L10 13.572l6.364-6.364a3 3 0 1 0-4.243-4.243L10 5.086l-2.121-2.12a3 3 0 0 0-4.243 4.242zM9.293 1.55l.707.707.707-.707a5 5 0 1 1 7.071 7.071l-7.07 7.071a1 1 0 0 1-1.415 0l-7.071-7.07a5 5 0 1 1 7.07-7.071z"
        />
        </svg>

      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, h } from 'vue'
import { useRouter } from 'vue-router'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

import { useAudioStore } from '@/useAudioStore'

const emit = defineEmits(['play', 'remove'])

function emitPlay() {
  emit('play', { track, index })
}

const props = defineProps({
  index: Number,
  track: {
    type: Object,
    required: true
  }
})

const inLibrary = ref(false)
const isChecking = ref(true)

const router = useRouter()
const audioStore = useAudioStore()

const isThisTrackPlaying = computed(() =>
  audioStore.currentTrack.value?.id === props.track.id && audioStore.isPlaying.value
)

function goToTrackPage() {
  router.push(`/track/${props.track.id}`)
}

onMounted(async () => {
  try {
    const res = await fetch('http://localhost:5240/api/user/library/tracks', {
      credentials: 'include'
    })

    if (!res.ok) throw new Error(await res.text())

    const data = await res.json()
    inLibrary.value = data.some(t => t.id === props.track.id)
  } catch (err) {
    console.error('Ошибка проверки медиатеки:', err)
  } finally {
    isChecking.value = false
  }
})

async function handleLibraryToggle() {
  if (inLibrary.value) {
    showRemoveConfirm()
  } else {
    await addToLibrary()
    inLibrary.value = true
  }
}

async function addToLibrary() {
  try {
    const res = await fetch(`http://localhost:5240/api/user/library/add_track/${props.track.id}`, {
      method: 'POST',
      credentials: 'include'
    })
    if (!res.ok) throw new Error(await res.text())

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
    const res = await fetch(`http://localhost:5240/api/user/library/remove_track/${props.track.id}`, {
      method: 'DELETE',
      credentials: 'include'
    })
    if (!res.ok) throw new Error(await res.text())

    await removeFromLibrary()
    emit('remove', props.track.id)


    toast.success('Трек удалён из медиатеки', {
      autoClose: 3000,
      position: 'bottom-center'
    })

    inLibrary.value = false
  } catch (err) {
    console.error(err.message || 'Ошибка удаления', {
      autoClose: 3000,
      position: 'bottom-center'
    })
  }
}

function showRemoveConfirm() {
  toast(
    ({ closeToast }) => {
      setTimeout(() => {
        closeToast()
      }, 5000)

      return h(
        'div',
        { class: 'flex flex-col gap-2' },
        [
          h('div', { class: 'flex justify-center gap-4 items-center' }, [
            h('span', 'Удалить трек из медиатеки?'),
            h('button', {
              class: 'bg-gray text-gray-700 rounded-lg border-none px-2 py-1',
              style: 'width: 60px; height: 30px;',
              onClick: () => {
                closeToast()
              }
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
        ]
      )
    },
    {
      position: 'bottom-center',
      autoClose: false,
      closeOnClick: false
    }
  )
}


const formattedIndex = computed(() => {
  const idx = props.index + 1
  return idx < 10 ? `0${idx}` : idx.toString()
})
</script>


<style scoped>
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
