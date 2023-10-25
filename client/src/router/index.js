import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import LoginPage from '../views/LoginPage.vue'
import RegisterPage from '../views/RegisterPage.vue'
import DetailPage from '../views/DetailPage.vue'
import MyStockPage from '../views/MyStockPage.vue'
import TestXendit from '../views/TestXendit.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: "login",
      component: LoginPage
    },
    {
      path: '/register',
      name: "register",
      component: RegisterPage
    },
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/stocks/:ticker',
      name: "detail",
      component: DetailPage
    },
    {
      path: '/mystocks',
      name: "mystock",
      component: MyStockPage
    },
    {
      path: '/test',
      name: 'test',
      component: TestXendit
    }
  ]
})

// router.beforeEach((to, from, next) => {
//   if(to.path !== '/login' && !localStorage.access_token){
//     next({path: '/login'})
//   } else if(to.path === '/login' && localStorage.access_token){
//     next({path: '/'})
//   } else {
//     next()
//   }
// })

export default router
