import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/components/HomePage.vue'
import MainContent from '@/components/MainContent.vue'
import TrackDetail from '@/components/Details/TrackDetail.vue'
import GenresPage from '@/components/GenresPage.vue'
import GenreDetail from '@/components/Details/GenreDetail.vue'
import SingersPage from '@/components/SingersPage.vue'
import SingerDetail from '@/components/Details/SingerDetail.vue'
import LibraryPage from '@/components/LibraryPage.vue'
import PlaylistsPage from '@/components/PlaylistsPage.vue'
import PlaylistDetail from '@/components/Details/PlaylistDetail.vue'
import EditPlaylistPage from '@/components/EditPlaylistPage.vue'
import AlbumDetail from '@/components/Details/AlbumDetail.vue'
import SearchResult from '@/components/SearchResult.vue'
import SubscriptionsPage from '@/components/SubscriptionsPage.vue'

import AdminPage from '@/components/Admin/AdminPage.vue'
import TrackApprovalPage from '@/components/Admin/TrackApprovalPanel.vue'
import GenreManagementPage from '@/components/Admin/GenreManagementPage.vue'
import TrackMetadataPage from '@/components/Admin/TrackMetadataPage.vue'
import ModerationPage from '@/components/Admin/ModerationPage.vue'
import TopTracksPage from '@/components/Admin/TopTracksPage.vue'
import UserManagementPage from '@/components/Admin/UserManagementPage.vue'
import AdminSearchResults from '@/components/Admin/AdminSearchResults.vue'

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
            { path: 'playlist/:id/edit', name: 'EditPlaylist', component: EditPlaylistPage},
            { path: 'albums/:id', name: 'AlbumDetail', component: AlbumDetail},
            { path: 'search', name: 'SearchResult', component: SearchResult },
            { path: 'subscriptions', name: 'SubscriptionsPage', component: SubscriptionsPage },
        ]
    },
    {
        path: '/admin',
        component: AdminPage,
        children: [
            { path: '', redirect: '/admin/approval' },
            { path: 'approval', name: 'TrackApproval', component: TrackApprovalPage },
            { path: 'users', name: 'UserManagement', component: UserManagementPage },
            { path: 'genres', name: 'GenreManagement', component: GenreManagementPage },
            { path: 'tracks', name: 'TrackMetadata', component: TrackMetadataPage },
            { path: 'moderation', name: 'Moderation', component: ModerationPage },
            { path: 'top', name: 'TopTracks', component: TopTracksPage },
            {
                path: 'search',
                name: 'AdminSearch',
                component: AdminSearchResults,
                props: route => ({ q: route.query.q })
            }
        ]
    }
]


const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
