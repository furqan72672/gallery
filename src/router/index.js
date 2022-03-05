import { createRouter, createWebHistory } from 'vue-router'
import AddCamera from "../views/AddCamera";
import MyDevices from "../views/MyDevices";
import Home from "../views/Home";
import SharedGalleryOptions from "../views/SharedGalleryOptions";
import SharedGalleryJoin from "../views/SharedGalleryJoin";
import MyPhotos from '../views/MyPhotos.vue'
import Album from '../views/Gallery'
import SharedGalleryCreate from "../views/SharedGalleryCreate";
import SharedGalleryList from "../views/SharedGalleryList";
import Gallery from "../views/Gallery";

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/gallery/options',
    component: SharedGalleryOptions
  },
  {
    path: '/gallery/join',
    component: SharedGalleryJoin
  },
  {
    path: '/gallery/manage',
    component: SharedGalleryCreate,
    children:[
      {
        path:':id',
        component: SharedGalleryCreate,
      }
    ]
  },
  {
    path: '/galleries',
    component: SharedGalleryList
  },
  {
    path: '/devices/register',
    component: AddCamera
  },
  {
    path: '/devices',
    component: MyDevices
  },
  {
    path: '/album',
    component: Album
  },
  {
    path: '/my-photos',
    component: MyPhotos
  },
  {
    path: '/gallery/:id',
    component: Gallery
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
