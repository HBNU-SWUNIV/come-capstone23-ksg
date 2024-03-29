import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/PageHome.vue'
import List from "@/views/board/BoardList"
import Detail from "@/views/board/BoardDetail"
import Modify from "@/views/board/Boardmodify"
import Write from "@/views/board/BoardWrite"
import Login from "@/views/common/Login"
import Register from "@/views/common/Register"
import About from '@/views/PageAbout.vue'
import Mypage from '@/views/MyPage.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/board/list',
      name: 'List',
      component: List
    },
    {
      path: '/board/detail/:id',
      name: 'Detail',
      component: Detail
    },
    {
      path: '/board/write',
      name: 'Write',
      component: Write
    },
    {
      path: '/board/modify/:id',
      name: 'Modify',
      component: Modify
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/mypage',
      name: 'Mypage',
      component: Mypage
    },
  ]
})
