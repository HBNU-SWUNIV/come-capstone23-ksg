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
      id: 0
    }
  }
  },
  mutations: {
    setAccount(state,payload){
      state.account.id = payload;
    }
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
