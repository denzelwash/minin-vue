import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from 'firebase/app'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    meta: {layout: 'empty-layout'},
    component: () => import('../views/Login.vue')
  },
  {
    path: '/registration',
    name: 'Registration',
    meta: {layout: 'empty-layout'},
    component: () => import('../views/Registration.vue')
  },
  {
    path: '/',
    name: 'Home',
    meta: {layout: 'main-layout', auth: true},
    component: () => import('../views/Home.vue')
  },
  {
    path: '/categories',
    name: 'Categories',
    meta: {layout: 'main-layout', auth: true},
    component: () => import('../views/Categories.vue')
  },
  {
    path: '/detail/:id',
    name: 'Detail',
    meta: {layout: 'main-layout', auth: true},
    component: () => import('../views/Detail.vue')
  },
  {
    path: '/history',
    name: 'History',
    meta: {layout: 'main-layout', auth: true},
    component: () => import('../views/History.vue')
  },
  {
    path: '/planning',
    name: 'Planning',
    meta: {layout: 'main-layout', auth: true},
    component: () => import('../views/Planning.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    meta: {layout: 'main-layout', auth: true},
    component: () => import('../views/Profile.vue')
  },
  {
    path: '/record',
    name: 'Record',
    meta: {layout: 'main-layout', auth: true},
    component: () => import('../views/Record.vue')
  },
  {
    path: '*',
    meta: {layout: 'main-layout', auth: true},
    component: () => import('../views/Home.vue')
  }
  ]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const auth = to.meta.auth
  const user = firebase.auth().currentUser
  if (auth && !user) {
    next({
      name: 'Login',
      query: { message: 'authRequired' }
    })
  } else {
    next()
  }
})

export default router
