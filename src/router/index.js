import { createWebHashHistory, createRouter } from 'vue-router'

const routes = [
  {
    name: 'home',
    path: '/home',
    component: ()=> import('../views/Home.vue'),
  },
  {
    name: 'sanpang',
    path: '/sanpang',
    component: ()=> import('../views/Sanpang.vue'),
  },
  {
    name: 'jixie',
    path: '/jixie',
    component: ()=> import('../views/Jixie.vue'),
  },
  {
    name: '/',
    path: '/',
    redirect: '/sanpang',
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router