import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import WomenView from '@/views/WomenView.vue'
import MenView from '@/views/MenView.vue'
import BridalView from '@/views/BridalView.vue'
import AccessoriesView from '@/views/AccessoriesView.vue'
import ContactView from '@/views/ContactView.vue'
import ProductView from '@/views/ProductView.vue'
import AdminView from '@/views/AdminView.vue'
import CheckoutView from '@/views/CheckoutView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/women',
    name: 'women',
    component: WomenView
  },
  {
    path: '/men',
    name: 'men',
    component: MenView
  },
  {
    path: '/bridal',
    name: 'bridal',
    component: BridalView
  },
  {
    path: '/accessories',
    name: 'accessories',
    component: AccessoriesView
  },
  {
    path: '/contact',
    name: 'contact',
    component: ContactView
  },
  {
    path: '/product/:id',
    name: 'product',
    component: ProductView
  },
  {
    path: '/checkout',
    name: 'checkout',
    component: CheckoutView
  },
  {
    path: '/admin',
    name: 'admin',
    component: AdminView
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
