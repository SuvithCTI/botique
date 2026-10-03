import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue')
  },
  {
    path: '/women',
    name: 'women',
    component: () => import('@/views/WomenView.vue')
  },
  {
    path: '/men',
    name: 'men',
    component: () => import('@/views/MenView.vue')
  },
  {
    path: '/bridal',
    name: 'bridal',
    component: () => import('@/views/BridalView.vue')
  },
  {
    path: '/accessories',
    name: 'accessories',
    component: () => import('@/views/AccessoriesView.vue')
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('@/views/ContactView.vue')
  },
  {
    path: '/product/:id',
    name: 'product',
    component: () => import('@/views/ProductView.vue')
  },
  {
    path: '/checkout',
    name: 'checkout',
    component: () => import('@/views/CheckoutView.vue')
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('@/views/AdminView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0 }
  }
})

export default router
