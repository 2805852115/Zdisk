import {createRouter, createWebHashHistory,createWebHistory} from 'vue-router'
import login from '/src/views/login/login'
import register from '/src/views/register/register'
import index from '/src/views/index/index'
import images from '/src/views/images/images'
const routes = [
  {
    path: '/',
    name: 'Home',
    component: login
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/index',
    name: 'index',
    component: index
  },
  {
    path:'/register',
    name:'register',
    component: register
  },
      {
    path:'/images',
    name:'images',
    component: images
  }
]

const router = createRouter({

  routes,     //（缩写）相当于 routes: routes
  history:createWebHistory()

})

export default router
