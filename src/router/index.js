import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Album from '@/views/Album'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/album',
    name: 'Album',
    component: Album
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
