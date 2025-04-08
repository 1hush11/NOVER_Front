import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/components/HomePage.vue'
import MainContent from '@/components/MainContent.vue'
import TrackDetail from '@/components/TrackDetail.vue'
import GenresPage from '@/components/GenresPage.vue'
import GenreDetail from '@/components/GenreDetail.vue'
import SingersPage from '@/components/SingersPage.vue'
import SingerDetail from '@/components/SingerDetail.vue'
import LibraryPage from '@/components/LibraryPage.vue'
import PlaylistsPage from '@/components/PlaylistsPage.vue'
import PlaylistDetail from '@/components/PlaylistDetail.vue'
import AlbumCard from '@/components/AlbumCard.vue'
import AlbumDetail from '@/components/AlbumDetail.vue'
import SearchResult from '@/components/SearchResult.vue'


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
            { path: 'track/:id', name: 'TrackDetail', component: TrackDetail },
            { path: 'library', name: 'LibraryPage', component: LibraryPage },
            { path: 'playlists', name: 'PlaylistsPage', component: PlaylistsPage},
            { path: 'playlist/:id', name: 'PlaylistDetail', component: PlaylistDetail},
            { path: 'albums/:id', name: 'AlbumDetail', component: AlbumDetail},
            { path: 'search', name: 'SearchResult', component: SearchResult }
        ]
    }
]


const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
