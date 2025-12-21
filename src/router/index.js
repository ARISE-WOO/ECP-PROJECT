import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/auth/telegram',
    name: 'telegram-auth',
    component: () => import('@/views/TelegramLoginWidget.vue') // ✅ Nom correct
  },
  {
    path: '/auth/callback',
    name: 'oauth-callback',
    component: () => import('@/views/OAuthCallback.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    }
    return { top: 0 }
  }
})

export default router