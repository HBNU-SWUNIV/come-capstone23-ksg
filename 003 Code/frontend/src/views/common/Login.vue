<template>
  <div>
    <div>
      <h2>로그인</h2>
      <div id="loginForm">
        <form @submit.prevent="fnLogin">
          <p>
            <input class="w3-input" name="uid" placeholder="아이디" v-model="user_id"><br>
          </p>
          <p>
            <input name="password" class="w3-input" placeholder="비밀번호" v-model="user_pw" type="password">
          </p>
          <p>
            <button type="submit" class="w3-button w3-green w3-round">로그인</button>
          </p>
          <p>
            <button type="button" class="w3-button w3-blue-grey w3-round">회원가입(미구현)</button>
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      user_id: '',
      user_pw: ''
    }
  },
  methods: {
    fnLogin() {
      if (this.user_id === '') {
        alert('아이디를 입력해주세요.')
        return
      }

      if (this.user_pw === '') {
        alert('비밀번호를 입력해주세요.')
        return
      }

      alert('로그인 되었습니다.')
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