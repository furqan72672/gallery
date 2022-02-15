import { createRouter, createWebHistory } from 'vue-router'
import AddCamera from "../views/AddCamera";
import MyDevices from "../views/MyDevices";

const routes = [
  {
    path: '/',
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
