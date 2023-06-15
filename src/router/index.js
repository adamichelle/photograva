import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView
    },
    {
      path: '/create-photo-book',
      name: 'CreatePhotoBook',
      component: () => import('../views/CreatePhotoBookView.vue')
    },
    {
      path: '/photo-books/:id',
      name: 'PhotoBook',
      component: () => import('../views/PhotoBookView.vue'),
      props: route => ({ id: route.params.id, query: route.query })
    },
    {
      path: '/search',
      name: 'Search',
      component: () => import('../views/SearchView.vue')
    },
    { path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('../views/NotFoundView.vue') },
  ]
})

export default router
