import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import loginView from '../views/loginView.vue'
import profileView from '../views/profileView.vue'
import startView from '../views/startView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/emissions',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }, 
    {
      path: '/login',
      name: 'login',
      component: loginView
    },
    {
      path: '/profile',
      name: 'profile',
      component: profileView
    },
    {
      path: '/start',
      name: 'start',
      component: startView
    },
    {
      path: '/camera',
      name: 'camera',
      component: () => import('../views/CameraView.vue')
    }
  ]
})

export default router
