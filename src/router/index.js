import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/components/HomePage.vue'
import TrackDetail from '@/components/TrackDetail.vue'

const routes = [
    { path: '/', name: 'Home', component: HomePage },
    { path: '/track/:id', name: 'TrackDetail', component: TrackDetail }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
