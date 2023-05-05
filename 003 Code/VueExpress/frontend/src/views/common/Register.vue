<template>
	<div class="container">
		<form @submit.prevent="fnSubmit">
            <div>
				<label for="ID">아이디</label>
				<input type="text" id="ID" maxlength="20" v-model="regi.ID" />
			</div>
            <div>
                <span v-if="!idValid">잘못된 아이디입니다.</span>
            </div>

			<div>
				<label for="password">비밀번호</label>
				<input type="password" id="password" maxlength="16" @blur="pwValid" v-model="regi.password" />
			</div>
			<div>
                <span v-if="!pwValidFlag">비밀번호는 8~16자리, 영문/숫자/특수문자가 포함되어야 합니다.</span>
            </div>

			<div>
				<label for="passwordCheck">비밀번호 확인</label>
				<input type="password" id="passwordCheck" @blur="pwCheckValid" v-model="passwordCheck" />
			</div>
			<div>
                <span v-if="!pwCheckFlag">비밀번호가 동일하지 않습니다.</span>
            </div>

            <div>
				<label for="name">닉네임</label>
				<input type="text" id="name" maxlength="20" @blur="nameValid" v-model="regi.name" />
			</div>
			<div>
                <span v-if="!nameValidFlag">닉네임을 입력해주세요.</span>
            </div>

            <div>
				<label for="email">이메일</label>
				<input type="text" id="email" maxlength="100" @blur="emailValid" v-model="regi.email" />
			</div>
          	<div>
                <span v-if="!emailValidFlag">잘못된 이메일입니다.</span>
			</div>

			<button type="submit">회원가입</button>

		</form>
	</div>
</template>

<script>
export default {
	name: 'RegisterForm',
	data() {
		return {
            regi: {
                ID: null,
			    password: null,
			    name: null,
                email: null,
            },
			passwordCheck: null,
            pwValidFlag: true,
			pwCheckFlag: true,
			nameValidFlag: true,
			emailValidFlag: true,
			RegisterFlag: true
		}
	},
	methods: {
        pwValid () { // 영문, 숫자, 특문을 모두 포함한 8자리 이상이 아니면 false
            if (/^(?=.*[A-Za-z])(?=.*[^])(?=.*[0-9]).{8,16}$/.test(this.regi.password)) {
                this.pwValidFlag = true
            } else {
                this.pwValidFlag = false
            }
        },
		pwCheckValid () {
      		if (this.regi.password == this.passwordCheck) {
        		this.pwCheckFlag = true
      		} else {
        		this.pwCheckFlag = false
      		}
    	},
		nameValid () { // 입력하지 않으면 false
            if (/^.{1,20}$/.test(this.regi.name)) {
                this.nameValidFlag = true
            } else {
                this.nameValidFlag = false
            }
        },
		emailValid () {
            if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(this.regi.email)) {
                this.emailValidFlag = true
            } else {
                this.emailValidFlag = false
            }
        },
		fnSubmit() {
			if (!this.isEmpty(this.regi.ID) &&
				!this.isEmpty(this.regi.password) &&
				!this.isEmpty(this.regi.passwordCheck) &&
				!this.isEmpty(this.regi.name) &&
				!this.isEmpty(this.regi.email) &&
				this.pwValidFlag == true &&
				this.pwCheckFlag == true &&
				this.nameValidFlag == true &&
				this.emailValidFlag == true ) {
					this.RegisterFlag = true
					console.log('submit')}
			else { this.RegisterFlag = false }
		},
	},
    
    computed: {
        idValid() {
            return /^[A-Za-z0-9]+$/.test(this.regi.ID)
        }
    }
};
</script>

<style scoped></style>