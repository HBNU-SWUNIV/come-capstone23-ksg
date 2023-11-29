<template>
	<div class="container">
		<form @submit.prevent="fnSubmit">
            <div class="form-group" align ="left">
				<label for="ID">아이디</label>
				<input class="form-control" id="ID" placeholder="아이디를 입력해주세요" maxlength="20" v-model="regi.IDcheck" type="text">
			</div>
			    <v-btn class="mr-4" color="grey darken-2" @click="fnidcheck">ID중복확인</v-btn>
            <div>
                <span v-if="!idValid">잘못된 아이디입니다.</span>
				<span v-if="!overlapFlag">중복된 아이디입니다. 다른 아이디를 사용해주세요</span>
            </div>
			현재 설정된 아이디: {{ regi.ID }}

            <div class="form-group" align ="left">
				
				<label for="password">비밀번호</label>
				<input class="form-control" type="password" id="password" placeholder="비밀번호를 입력해주세요" maxlength="16" @blur="pwValid" v-model="regi.password" />
			</div>
			<div>
                <span v-if="!pwValidFlag">비밀번호는 8~16자리, 영문/숫자/특수문자가 포함되어야 합니다.</span>
            </div>

            <div class="form-group" align ="left">
				<label for="passwordCheck">비밀번호 확인</label>
				<input class="form-control" type="password" id="passwordCheck" placeholder="비밀번호 확인" maxlength="16" @blur="pwCheckValid" v-model="passwordCheck" />
			</div>
			<div>
                <span v-if="!pwCheckFlag">비밀번호가 동일하지 않습니다.</span>
            </div>

            <div class="form-group" align ="left">
				<label for="name">닉네임</label>
				<input class="form-control" type="text" id="name" placeholder="닉네임을 입력해주세요" maxlength="16" @blur="nameValid" v-model="regi.checkname" />
			</div>
						    <v-btn class="mr-4" color="grey darken-2" @click="fnnicknamecheck">닉네임중복확인</v-btn>

			<div>
                <span v-if="!nameValidFlag">닉네임을 입력해주세요.</span>
				<span v-if="!overlapFlagnickname">중복된 닉네임입니다. 다른 닉네임을 사용해주세요</span>
            </div>
			현재 설정된 닉네임: {{ regi.name }}
            <div class="form-group" align ="left">
				<label for="email">이메일</label>
				<input class="form-control" type="text" id="email" placeholder="이메일을 입력해주세요" maxlength="100" @blur="emailValid" v-model="regi.email" />
			</div>
          	<div>
                <span v-if="!emailValidFlag">잘못된 이메일입니다.</span>
			</div>

            <button type="submit" class="btn btn-primary">회원가입</button>

		</form>
	</div>
</template>

<script>
export default {
	name: 'RegisterForm',
	data() {
		return {
            regi: {
				IDcheck: null,
                ID: null,
			    password: null,
			    name: null,
				checkname:null,
                email: null,
            },
			passwordCheck: null,
            pwValidFlag: true,
			pwCheckFlag: true,
			nameValidFlag: true,
			emailValidFlag: true,
			RegisterFlag: true,
			overlapFlag: true,
			overlapFlagnickname: true,
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
            if (/^.{1,20}$/.test(this.regi.checkname)) {
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
			if (/* !this.isEmpty(this.regi.ID) &&
				!this.isEmpty(this.regi.password) &&
				!this.isEmpty(this.regi.passwordCheck) &&
				!this.isEmpty(this.regi.name) &&
				!this.isEmpty(this.regi.email) &&*/
				this.pwValidFlag == true &&
				this.pwCheckFlag == true &&
				this.nameValidFlag == true &&
				this.overlapFlag == true &&
				this.overlapFlagnickname == true &&
				this.emailValidFlag == true ) {
					this.RegisterFlag = true
					console.log('submit')}
			else { this.RegisterFlag = false }
			if(this.RegisterFlag == true)
			{
				this.$http.post('/api/register', this.regi).then(res => {
         		 alert("회원가입이 완료되었습니다.")
      			});
				  this.$router.push({
                     path: '/'
                    })
			}

			
		},
		fnidcheck() {
			this.$http.post('/api/register/check', this.regi).then(res => {
				 this.overlapFlag = true;
				 this.regi.ID = this.regi.IDcheck;
         		 alert("사용가능한 아이디입니다.");
      			}).catch(() => {
					this.overlapFlag = false;
                    alert("id가 이미 존재합니다.");
                });

		},

		fnnicknamecheck() {
			this.$http.post('/api/register/checknickname', this.regi).then(res => {
				 this.overlapFlagnickname = true;
				 this.regi.name = this.regi.checkname;
         		 alert("사용가능한 닉네임입니다.");
      			}).catch(() => {
					this.overlapFlagnickname = false;
                    alert("닉네임이 이미 존재합니다.");
                });
		}

		// 아이디 이미 존재하는 지 비교 여부 필요 
	},
    
    computed: {
        idValid() {
            return /^[A-Za-z0-9]+$/.test(this.regi.ID)
        }
    }
};
</script>

<style scoped></style>