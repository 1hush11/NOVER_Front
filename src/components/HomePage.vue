<template>
  <div class="flex h-screen">
    <Sidebar />
    <div class="flex-1 flex flex-col">
      <Header />
      <div class="flex flex-1 overflow-hidden">
        <TrackDetail class="flex-1 overflow-y-auto" />

        <RightPanel class="w-1-4 border-l" />
      </div>
    </div>
  </div>
</template>

<script setup>
import Sidebar from '@/components/Sidebar.vue'
import Header from '@/components/Header.vue'
import MainContent from '@/components/MainContent.vue'
import RightPanel from '@/components/RightPanel.vue'
import TrackDetail from './TrackDetail.vue'
</script>
