<template>
  <div>
    <div>
      <h2>로그인</h2>
      <div id="loginForm">
        <form @submit.prevent="fnLogin">
          <p>
            <input class="w3-input" name="uid" placeholder="아이디" v-model="user.id" type="text"><br>
          </p>
          <p>
            <input name="password" class="w3-input" placeholder="비밀번호" v-model="user.pw" type="text">
          </p>
          <p>
            <button type="submit" class="w3-button w3-green w3-round">로그인</button>
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
                    alert("환영합니다.")
                    const users = res.data.user;  
                    console.log(users.id);
                    console.log(users.pw);
                    console.log(users.name);
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
