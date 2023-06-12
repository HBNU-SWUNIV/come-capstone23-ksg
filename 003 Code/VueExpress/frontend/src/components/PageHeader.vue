<template>
    <div id="nav">
      <router-link class="menu" to="/">Home</router-link>
      <router-link to="/scedule">나만의 시간표</router-link>
      <router-link to="/board/list">게시판</router-link>
      <router-link to="/book/list">서적평가</router-link>
      <router-link to="/login" v-if ="!$store.state.account.id">로그인</router-link>
      <v-btn outlined class="mr-4" color="grey darken-2" @click="fnlogout" v-else>로그아웃</v-btn>
    </div>
</template>



<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand to="/"> Major League </b-navbar-brand>
      <b-navbar-toggle target="nav_collapse"/>
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <b-nav-item to="/schedule">나만의 시간표</b-nav-item>
          <b-nav-item to="/board/list">게시판</b-nav-item>
          <b-nav-item to="/book/list">서적평가</b-nav-item>
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

</style>

