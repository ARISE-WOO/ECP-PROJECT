import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/Home.vue'),
    meta: { title: 'ECP Assistant - Automatisez votre Community Management' }
  },
  {
    path: '/auth/callback',
    name: 'oauth-callback',
    component: () => import('@/views/OAuthCallback.vue'),
    meta: { title: 'Connexion en cours...' }
  },
  // Redirection de toutes les routes inconnues vers la home
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    if (to.hash) {
      return { 
        el: to.hash, 
        behavior: 'smooth',
        top: 80 // Offset pour le header fixed
      }
    }
    return { top: 0, behavior: 'smooth' }
  }
})

// Mise à jour du titre de la page pour chaque route
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'ECP Assistant'
  next()
})

export default router