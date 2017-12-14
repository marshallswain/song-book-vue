//Import components here.
import home from './Components/Home.vue'
import signup from './Components/Auth and management/Signup.vue'
import login from './Components/Auth and management/Login.vue'
import settings from './Components/Auth and management/Settings.vue'
import songHome from './Components/Songs/SongHome.vue'
import songList from './Components/Songs/SongList.vue'
import songCreation from './Components/Songs/SongCreation.vue'
import songDetails from './Components/Songs/SongDetails.vue'

//Setup paths
export const routes = [
       { path: '/', component: home },
       { path: '/signup', component: signup },
       { path: '/login', component: login },
       { path: '/settings', component: settings},
       { path: '/songs', components: { default: songHome }, children: [
        { path: 'create', component: songCreation},
        { path: 'all', component: songList},
        { path: ':id', component: songDetails},
    ] },
]