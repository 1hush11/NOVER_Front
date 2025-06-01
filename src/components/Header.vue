<template>
  <header class="flex justify-between items-center p-4 border-b">
    <div class="flex items-center gap-4">
      <router-link to="/">
        <h1 class="text-black text-l uppercase cursor-pointer font-bold">Nover</h1>
      </router-link>
    </div>

    <div class="flex items-center gap-4">
    <template v-if="user">
      <button class="flex items-center btn" @click="showProfile = true">
        <span>{{ user.username }}</span>
        <img :src="user.avatar" alt="User Avatar" class="cover-image" />
      </button>
    </template>
    <template v-else>
      <button class="user-button flex items-center gap-2" @click="openLoginModal">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM6 8a6 6 0 1 1 12 0A6 6 0 0 1 6 8zm2 10a3 3 0 0 0-3 3 1 1 0 1 1-2 0 5 5 0 0 1 5-5h8a5 5 0 0 1 5 5 1 1 0 1 1-2 0 3 3 0 0 0-3-3H8z" fill="#1c1c1c"/>
        </svg>
      </button>
    </template>

    <ProfileModal
      :isVisible="showProfile"
      :user="user"
      @close="showProfile = false"
      @updated="handleProfileUpdate"
      @logout="showLogoutConfirm"
    />


    <LoginModal
      :isVisible="showLogin"
      @close="closeLoginModal"
      @switchToRegister="openRegisterModal"
      @login="loginUser"
    />

    <SignUpModal
      :isVisible="showRegister"
      @close="closeRegisterModal"
      @switchToLogin="openLoginModal"
      @register="registerUser"
    />

    <button v-if="user && user.role === 'Пользователь'" @click="showAddTrackModal = true" class="user-button" title="Добавить трек">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 55 32" class="w-6 h-6 fill-white" width="35px" height="35px" fill="#9483a8" stroke="currentColor" stroke-width="2" style="margin-left: 0.5rem;">
        <path d="M33.958,12.988C33.531,6.376,28.933,0,20.5,0C12.787,0,6.839,5.733,6.524,13.384
          C2.304,14.697,0,19.213,0,22.5C0,27.561,4.206,32,9,32h6.5c0.276,0,0.5-0.224,0.5-0.5S15.776,31,15.5,31H9
          c-4.262,0-8-3.972-8-8.5C1,19.449,3.674,14,9,14h1.5c0.276,0,0.5-0.224,0.5-0.5S10.776,13,10.5,13H9
          c-0.509,0-0.99,0.057-1.459,0.139C7.933,7.149,12.486,1,20.5,1C29.088,1,33,7.739,33,14v1.5c0,0.276,0.224,0.5,0.5,0.5
          s0.5-0.224,0.5-0.5V14c0-0.003,0-0.006,0-0.009c3.019,0.331,7,3.571,7,8.509c0,3.826-3.691,8.5-8,8.5h-7.5
          c-3.238,0-4.5-1.262-4.5-4.5V12.783l4.078,4.07C25.176,16.951,25.304,17,25.432,17s0.256-0.049,0.354-0.146
          c0.195-0.195,0.195-0.513,0-0.707l-4.461-4.452c-0.594-0.592-1.055-0.592-1.648,0l-4.461,4.452c-0.195,0.194-0.195,0.512,0,0.707
          s0.512,0.195,0.707,0L20,12.783V26.5c0,3.804,1.696,5.5,5.5,5.5H33c4.847,0,9-5.224,9-9.5C42,17.333,37.777,13.292,33.958,12.988z"/>
      </svg>
    </button>
    <AddTrackModal
      v-if="showAddTrackModal"
      @close="showAddTrackModal = false"
      @openAlbum="openAlbumModalFromTrack"
    />

    <AddAlbumModal 
      v-if="showAddAlbumModal"
      @close="showAddAlbumModal = false" 
    />


    <div v-if="!user || user.role !== 'Администратор'" class="flex items-center mr-4 bg-white w-full">
      <SearchBar class="ml-2" />
    </div>
    </div>
  </header>
</template>


<script setup>
import { ref, onMounted, h, computed } from 'vue'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import { useRouter } from 'vue-router'

import SearchBar from './SearchBar.vue'
import ProfileModal from './Modals/ProfileModal.vue'
import LoginModal from './Modals/LoginModal.vue'
import SignUpModal from './Modals/SignUpModal.vue'
import AddTrackModal from './Modals/AddTrackModal.vue'
import AddAlbumModal from './Modals/AddAlbumModal.vue'

import { getUserAvatarPath } from '/src/utils/PathHelper.js'


import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()
const user = computed(() => userStore.user)

const router = useRouter()

const showLogin = ref(false)
const showRegister = ref(false)
const showAddTrackModal = ref(false)
const showAddAlbumModal = ref(false)

const loginError = ref('')

const showProfile = ref(false)

function showLogoutConfirm() {
  toast(
    ({ closeToast }) => {
      setTimeout(closeToast, 5000)

      return h('div', { class: 'flex flex-col gap-2' }, [
        h('div', { class: 'flex justify-center gap-4 items-center' }, [
          h('span', 'Выйти из аккаунта?'),
          h('button', {
            class: 'bg-gray text-gray-700 rounded-lg border-none px-2 py-1',
            style: 'width: 60px; height: 30px;',
            onClick: closeToast
          }, 'Нет'),
          h('button', {
            class: 'bg-purple text-gray-700 rounded-lg border-none px-2 py-1',
            style: 'width: 60px; height: 30px;',
            onClick: async () => {
              await logoutUser()
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

onMounted(() => {
  userStore.fetchCurrentUser()
})

function openLoginModal() {
  showRegister.value = false
  showLogin.value = true
}
function closeLoginModal() {
  showLogin.value = false
}
function openRegisterModal() {
  showLogin.value = false
  showRegister.value = true
}
function closeRegisterModal() {
  showRegister.value = false
}
function openAlbumModalFromTrack() {
  showAddTrackModal.value = false
  showAddAlbumModal.value = true
}

async function loginUser({ login, password }) {
  try {
    await userStore.login(login, password)
    toast.success(`Добро пожаловать, ${user.value.username}!`, {
      position: 'bottom-center',
    })

    if (userStore.user.role === 'Администратор') {
      router.push('/admin')
    }

    closeLoginModal()
  } catch (err) {
    toast.error(err.message || 'Ошибка входа', {
      position: 'bottom-center',
    })
  }
}


async function registerUser(formData) {
  try {
    await userStore.register(formData)
    toast.success('Успешная регистрация', {
      position: 'bottom-center',
    })
    closeRegisterModal()
  } catch (err) {
    toast.error(err.message || 'Ошибка регистрации')
  }
}

async function logoutUser() {
  await userStore.logout()
  toast.success('Вы вышли из аккаунта', {
    position: 'bottom-center',
  })
}

function handleProfileUpdate(updatedUser) {
  updatedUser.avatar = getUserAvatarPath(updatedUser.avatar)
  user.value = updatedUser
  showProfile.value = false
}
</script>

<style scoped>
.btn {
  height: 48px;
  color: #1c1c1c;
  background: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5rem;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: 1s;
  &:hover {
    background: #1c1c1c;
    color: #e0c8fb;
  }
}

.user-button {
  background: transparent;
  border: transparent;
  height: 48px;
  width: 68px;
  display: grid;
  grid-auto-flow: column;
  grid-gap: .5em;
  justify-items: center;
  align-content: center;
  border: .1em solid #e0c8fb;
  background: #e0c8fb;
  color: #1c1c1c;
  border-radius: 5em;
  transition: 1s;
  &:hover, &:focus, &:active {
    background: #1c1c1c;
    color: #e0c8fb;
  }
}

.cover-image {
  width: 48px;
  height: 48px;
  border-radius: 99px;
  object-fit: cover;
}

</style>