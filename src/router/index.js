import Vue from 'vue'
import VueRouter from 'vue-router'
import Beach from '../views/Beach.vue'
import Startup from '../views/Startup.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/beach',
    name: 'Beach',
    component: Beach
  },
  {
    path: '/',
    name: 'Startup',
    component: Startup
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
