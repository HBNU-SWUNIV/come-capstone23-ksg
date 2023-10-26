<template>
  <div id="nav">
    <router-link class="menu" to="/">Home</router-link>
    <router-link to="/about">소개</router-link>
    <router-link to="/board/list">게시판</router-link>
    <router-link to="/login" v-if ="!$store.state.account.id">로그인</router-link>
    <v-btn outlined class="mr-4" color="grey darken-2" @click="fnlogout" v-else>로그아웃</v-btn>
  </div>
</template>

<template>
<div>
  <b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand>
      <router-link to="/" class="navbar-brand-link">
        <img src= "http://localhost:3000/uploads/assets/logo_bf.png" class="navbar-brand-image">
        BlindFold
      </router-link>
    </b-navbar-brand>
    <b-navbar-toggle target="nav_collapse"/>
    <b-collapse is-nav id="nav_collapse">
      <b-navbar-nav class="flex-grow-1"> <!-- 헤더 좌측 부분 -->
        <b-nav-item to="/about">소개</b-nav-item>
        <b-nav-item to="/board/list">게시판</b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav> <!-- 헤더 우측 부분 -->
        <b-nav-item to="/login" v-if ="!$store.state.account.id">로그인</b-nav-item>
        <b-nav-item to="/" @click="fnlogout" v-else>로그아웃</b-nav-item>
      </b-navbar-nav>
    </b-collapse>  
  </b-navbar>
</div>
</template>

<script>

import { store } from '../main';
export default {
methods: {
  fnlogout(){

    this.$http.delete('/api/login').then(res => {
        alert("로그아웃 하였습니다.")
    });
    store.commit('setAccount', 0);
    this.$router.push({
      path: './'
    })
  },
  

}
}
</script>

<style scoped>
.navbar-brand-image {
  height: 30px;
  width: 60px;
  margin-left: 3px;
  margin-right: 1px;
}
.navbar-brand-link {
  text-decoration: none;
  color: inherit;
}

</style>
