import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    meta: {layout: 'empty-layout'},
    component: () => import('../views/Login.vue')
  },
  {
    path: '/categories',
    name: 'Categories',
    meta: {layout: 'main-layout'},
    component: () => import('../views/Categories.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
