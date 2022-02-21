import { createRouter, createWebHistory } from 'vue-router'
import AddCamera from "../views/AddCamera";
import MyDevices from "../views/MyDevices";
import HomeScreen from "../views/HomeScreen";
import SharedGalleryOptions from "../views/SharedGalleryOptions";
import SharedGalleryJoin from "../views/SharedGalleryJoin";

const routes = [
  {
    path: '/',
    name: 'Home',
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
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
