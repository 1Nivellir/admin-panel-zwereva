import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: 'Home',
      },
      children: [
        {
          path: '/applications',
          name: 'applications',
          component: () => import('../views/ApplicationsView.vue'),
          meta: {
            title: 'Заявки',
          },
        },
        {
          path: '/portfolio',
          name: 'portfolio',
          component: () => import('../views/PortfolioView.vue'),
          meta: {
            title: 'Портфолио',
          },
        },{
          path: '/teams',
          name: 'teams',
          component: () => import('../views/EmployeeView.vue'),
          meta: {
            title: 'Сотрудники',
          },
        },
        {
          path: '/about',
          name: 'about',
          component: () => import('../views/AboutView.vue'),
          meta: {
            title: 'О нас',
          },
        },{
          path: '/practice',
          name: 'practice',
          component: () => import('../views/PracticeView.vue'),
          meta: {
            title: 'Практика',
          },
        },

      ]
    },
    {
      path: '/auth',
      name: 'auth',
      meta: {
        title: 'Авторизация',
      },
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AuthView.vue'),
    },
  ],
})

export default router
