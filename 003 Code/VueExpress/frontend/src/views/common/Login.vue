<template>
  <div>
    <div>
      <div id="loginForm">
        <form @submit.prevent="fnLogin">
          <div class="mb-3 mt-3" align ="left">
            <label for="id">아이디:</label>
            <input class="form-control" name="uid" id="id" placeholder="아이디" v-model="user.id" type="text">
          </div>
          <div class="mb-3" align ='left'>
            <label for="pw">비밀번호:</label>
            <input name="password" class="form-control" id="pw" placeholder="비밀번호" v-model="user.pw" type="password">
          </div>
          <p>
            <button type="submit" class="btn btn-primary">로그인</button>
          </p>
        </form>
        <p>
          <button type="button" class="w3-button w3-blue-grey w3-round" v-on:click="fnRegister">회원가입</button>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import {store}  from '../../main.js';
export default {
  data() {
    return {
      user: {
                id: '',
                pw: '',
                name: ''
            },
        };
  },
  methods: {
    fnLogin() {
      if (this.user.id === '') {
        alert('아이디를 입력해주세요.')
        return
      }

      else if (this.user.pw === '') {
        alert('비밀번호를 입력해주세요.')
        return
      }

      else {

        this.$http.post("/api/login", this.user)
                .then(res => {
                    console.log('send success!');
                    store.commit('setAccount', res.data.id);
                    alert(store.state.account.id)
                    this.$router.push({
                     path: '/'
                    })
                    // const users = res.user;        
                    // if(user) this.user = user;         // 백엔드에서 받은 정보를 화면에 출력. this.user 는 현재 유저 칸 정보
                    //console.log('전송 확인 \n아이디 : '+ user.id  +  '\n비밀번호 : ' + user.pw + "\n이름 : " + user.name)
                    //alert('전송 확인 \n아이디 : '+ user.id  +  '\n비밀번호 : ' + user.pw + "\n이름 : " + user.name)

                })
                .catch(() => {
                    console.error('send fali!');
                    alert("존재하지않는 id 혹은 비밀번호가 일치하지 않습니다.");
                });
            // go to list page
         //   this.$router.push({ name: "갈 곳 이름" });


        // this.$http.get('/api/login')           // /api/기타경로  호출시 frontend/config/index.js에 지정한 proxy 3000:으로 호출. => 
        // .then((res) => {
        // const user = res.data.user;        
        // if(user) this.user = user;         // 백엔드에서 받은 정보를 화면에 출력.
        // alert('로그인 되었습니다. \n아이디 : '+ user.id  +  '\n비밀번호 : ' + user.password + "\n이름 : " + user.name)
        // })
        // .catch((err) => {
        //     console.error(err);
        // });

    }

    },
    fnRegister() {                                // 회원 가입 버튼 누르면 Register.vue 로 전환.
      this.$router.push({
        path: '/register'
      })
    }
  }
}
</script>

<style>
#loginForm {
  width: 500px;
  margin: auto;
}
</style>
