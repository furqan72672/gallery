import { createRouter, createWebHistory } from 'vue-router'
<<<<<<< HEAD
import AddCamera from "../views/AddCamera";
import MyDevices from "../views/MyDevices";
import HomeScreen from "../views/HomeScreen";
import SharedGalleryOptions from "../views/SharedGalleryOptions";
import SharedGalleryJoin from "../views/SharedGalleryJoin";
=======
import Home from '../views/Home.vue'
import Album from '@/views/Album'
>>>>>>> origin/muqeet-image

const routes = [
  {
    path: '/',
    name: 'Home',
<<<<<<< HEAD
    component: HomeScreen
  },
  {
    path: '/gallery/options',
    name: 'GalleryOptions',
    component: SharedGalleryOptions
  },
  {
    path: '/gallery/join',
    name: 'GalleryJoin',
    component: SharedGalleryJoin
  },
  {
    path: '/devices/register',
    name: 'AddCamera',
    component: AddCamera
  },
  {
    path: '/devices',
    name: 'MyDevices',
    component: MyDevices
  },
=======
    component: Home
  },
  {
    path: '/album',
    name: 'Album',
    component: Album
  }
>>>>>>> origin/muqeet-image
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
