import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/components/HomePage.vue'
import MainContent from '@/components/MainContent.vue'
import TrackDetail from '@/components/TrackDetail.vue'
import GenresPage from '@/components/GenresPage.vue'
import GenreDetail from '@/components/GenreDetail.vue'
import SingersPage from '@/components/SingersPage.vue'
import SingerDetail from '@/components/SingerDetail.vue'


const routes = [
    {
        path: '/',
        component: HomePage,
        children: [
            { path: '', name: 'MainContent', component: MainContent },
            {
                path: 'genres',
                component: GenresPage,
                children: [
                    { path: ':id', name: 'GenreDetail', component: GenreDetail, props: true }
                ]
            },
            { path: 'singers', name: 'SingersPage', component: SingersPage },
            { path: 'singers/:id', name: 'SingerDetail', component: SingerDetail, props: true },
            { path: 'track/:id', name: 'TrackDetail', component: TrackDetail }
        ]
    }
]


const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
