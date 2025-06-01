<template>
  <div class="flex h-screen">
    <div class="w-3 bg-black text-white p-4 flex flex-col">
      <div class="logo-container shadow ">
        <img class="logo" src="/src/icons/NOVER_logo_transparent.png" alt="Logo">
      </div>
      <p class="text-sm mt-6 mb-4 uppercase font-bold">Меню</p>
      <ul class="no-list-style">
        <li>
          <button
            class="menu-btn"
            :class="{ 'active-tab': route.path.startsWith('/admin/approval') }"
            @click="() => router.push('/admin/approval')">
            Одобрение треков
          </button>
        </li>
        <li>
          <button
            class="menu-btn"
            :class="{ 'active-tab': route.path.startsWith('/admin/genres') }"
            @click="() => router.push('/admin/genres')">
            Жанры
          </button>
        </li>
        <li>
          <button
            class="menu-btn"
            :class="{ 'active-tab': route.path.startsWith('/admin/moderation') }"
            @click="() => router.push('/admin/moderation')">
            Модерация
          </button>
        </li>
        <li>
          <button
            class="menu-btn"
            :class="{ 'active-tab': route.path.startsWith('/admin/top') }"
            @click="() => router.push('/admin/top')">
            Топ треков
          </button>
        </li>
      </ul>
    </div>

    <div class="flex-1 overflow-y-auto">
      <Header/>
      <div class="p-6">
        <div class="flex items-center justify-between mb-6">
        <h1 class="text-2xl font-bold">Панель администратора</h1>
        <div class="flex items-center gap-2">
          <input
            v-model="searchStore.query"
            type="text"
            placeholder="Поиск…"
            class="border rounded px-3 py-1 text-black"
          />
        </div>
      </div>
        <router-view />
        <audio ref="audioElement" preload="auto" />
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { useSearchStore } from '../../stores/searchStore.js'

import { useRoute, useRouter } from 'vue-router'

import Header from '@/components/Header.vue'

const route = useRoute()
const router = useRouter()

const userStore = useUserStore()
const searchStore = useSearchStore()

import { useAudioStore } from '@/stores/audioStore.js'

const audioElement = ref(null)
const { setAudioRef } = useAudioStore()

onMounted(() => {
  setAudioRef(audioElement.value)

  if (userStore.user?.role !== 'Администратор') {
    router.push('/')
  }
})
</script>

<style>
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
  height: 30px;
  color: white;
  font-size: 16px;
  display: flex;
  align-items: center;
  background-color: transparent;
  border: none;
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

.active-tab {
  color: #1c1c1c;
  background-color: rgba(255, 255, 255, 0.1); 
  border-left: 3px solid rgb(128, 114, 142);
  transition: background-color 0.3s, border-left 0.3s;
  background-image: linear-gradient(to right, #e0c8fb, rgba(255, 255, 255, 0)); 
  background-color: transparent;
}
</style>