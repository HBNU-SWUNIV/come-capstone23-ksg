// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import Vuex from 'vuex';
import Vuetify from 'vuetify'		// <-- 추가
import  BootstrapVue from 'bootstrap-vue'
import 'vuetify/dist/vuetify.min.css'	// <-- 추가
import createPersistedState from 'vuex-persistedstate';
import 'material-design-icons-iconfont/dist/material-design-icons.css' // <-- 추가

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(Vuex);
Vue.use(Vuetify);
Vue.use(BootstrapVue);

export const store = new Vuex.Store({
  state() {
    return{
    account:{
      id: 0,
      snake: 1,
      mouse: 1,
      scorpion: 1,
      spider: 1,
      worm: 1,
      centipede: 1,
    }
  }
  },
  mutations: {
    setAccount(state,payload){
      state.account.id = payload;
    },
    setsnake(state,payload){
      state.account.snake = payload;
    },
    setscorpion(state,payload){
      state.account.scorpion = payload;
    },
    setmouse(state,payload){
      state.account.mouse = payload;
    },
    setspider(state,payload){
      state.account.spider = payload;
    },
    setcentipede(state,payload){
      state.account.centipede = payload;
    },
    setworm(state,payload){
      state.account.worm = payload;
    },
  },

  plugins: [
    createPersistedState({
    })
  ],

});
Vue.prototype.$http = axios

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  vuetify : new Vuetify(),
  Vuetify,
  icons: {
    iconfont: 'md',
  },
  router,
  store: store,
  components: { App },
  template: '<App/>'
})



