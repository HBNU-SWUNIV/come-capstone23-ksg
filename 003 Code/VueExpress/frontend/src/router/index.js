import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/PageHome.vue'
import List from "@/views/board/BoardList"
import Detail from "@/views/board/BoardDetail"
import Write from "@/views/board/BoardWrite"
import Login from "@/views/common/Login"
import Register from "@/views/common/Register"
import Search from "@/views/board/BoardSearch"

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
      component: Login  //로그인 컴포넌트 추가
    },
    {
      path: '/about',
      name: 'About',
      component: () => import( '../views/PageAbout.vue')
    },
    {
      path: '/board/list',
      name: 'List',
      component: List
    },
    {
      path: '/board/detail',
      name: 'Detail',
      component: Detail
    },
    {
      path: '/board/write',
      name: 'Write',
      component: Write
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/board/search',
      name: 'Search',
      component: Search
    }
  ]
})
