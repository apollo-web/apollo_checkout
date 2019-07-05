import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '/',
      redirect: '/subscribe',
    },
    {
      path: '/subscribe',
      name: 'subscribe',
      component: _ => {
        return import('@/views/Subscribe.vue')
      },
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: _ => {
        return import('@/views/Checkout.vue')
      },
    },
  ],

  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition)
      return savedPosition
    else {
      return {
        x: 0,
        y: 0,
      }
    }
  },
})
