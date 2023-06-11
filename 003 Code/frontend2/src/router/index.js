import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/PageHome.vue'
import List from "@/views/board/BoardList"
import Detail from "@/views/board/BoardDetail"
import Write from "@/views/board/BoardWrite"
import Login from "@/views/common/Login"
import Register from "@/views/common/Register"
import Schedule from "@/views/Schedule"
import bList from "@/views/book/BookList"
import bWrite from "@/views/book/BookWrite"
import bDetail from "@/views/book/BookDetail"

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
      path: '/scedule',
      name: 'Schedule',
      component: Schedule
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
      path: '/register',
      name: 'Register',
      component: Register
    },
        {
      path: '/book/list',
      name: 'bList',
      component: bList
    },
    {
      path: '/book/write',
      name: 'bWrite',
      component: bWrite
    },
    {
      path: '/book/detail',
      name: 'bDetail',
      component: bDetail
    },
  ]
})
