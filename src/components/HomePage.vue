<template>
  <div class="flex h-screen">
    <Sidebar v-if="!isAdmin" />
    <div class="flex-1 flex flex-col">
      <Header/>
      <div class="flex flex-1 overflow-hidden">
        <router-view v-if="!isAdmin" class="flex-1 overflow-y-auto" />
        <RightPanel v-if="!isAdmin" class="w-1/4 border-l" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useUserStore } from '@/userStore'

import Sidebar from '@/components/Sidebar.vue'
import Header from '@/components/Header.vue'
import RightPanel from '@/components/RightPanel.vue'

const userStore = useUserStore()

const isAdmin = computed(() => userStore.user?.role === 'Администратор')

onMounted(async () => {
  if (!userStore.user) {
    await userStore.fetchCurrentUser()
  }
  isLoading.value = false
})
</script>
