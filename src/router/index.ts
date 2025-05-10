import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      children: [
        {
          path: '/applications',
          name: 'applications',
          component: () => import('../views/ApplicationsView.vue')
        },
        {
          path: '/portfolio',
          name: 'portfolio',
          component: () => import('../views/PortfolioView.vue')
        },{
          path: '/teams',
          name: 'teams',
          component: () => import('../views/EmployeeView.vue')
        },{
          path: '/about',
          name: 'about',
          component: () => import('../views/AboutView.vue')
        },{
          path: '/practice',
          name: 'practice',
          component: () => import('../views/PracticeView.vue')
        },

      ]
    },
    {
      path: '/auth',
      name: 'auth',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AuthView.vue'),
    },
  ],
})

export default router
