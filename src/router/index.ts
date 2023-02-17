import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'main',
    component: () => import('../pages/MainPage.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/:pathMatch(.*)',
    redirect: 'main',
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
