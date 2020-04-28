import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import("../views/index.vue")
  },
  {
    path: '/users',
    name: 'Users',
    component: () => import("../views/users/index.vue")
  },
  {
    path: '/users/:id',
    name: 'User',
    component: () => import("../views/users/_id/index.vue")
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
