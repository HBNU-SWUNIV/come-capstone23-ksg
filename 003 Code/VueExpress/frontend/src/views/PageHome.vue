<!-- PageHome.vue -->
<template>
    <div class="home">
      <img alt="Vue logo" src="../assets/hanbat_logo.png">
      <HelloWorld msg="컴공 모여라, 메이저 리거 홈페이지"/>
    </div>
  </template>
  
  <script>
  // @ is an alias to /src
  import HelloWorld from '@/components/HelloWorld.vue'
  
  export default {
    name: 'PageHome',
    components: {
      HelloWorld
    }
  }
  </script>