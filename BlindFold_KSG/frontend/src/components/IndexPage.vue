<template>
    <div v-if="user">
        <h1>접속한 유저</h1>
        <p>아이디: {{ user.id }} </p>
        <p>비밀번호 : {{ user.password }} </p>
        <p>이름 : {{ user.name }} </p>
    </div>
</template>

<script>
export default {                  
    data() {
        return {                     //user 값 초기화
            user: null,
        };
        
    },
    created() {                                // 화면 생성시 실행
        this.$http.get('/api/login')           // /api/기타경로  호출시 frontend/config/index.js에 지정한 proxy 3000:으로 호출. => 
        .then((res) => {
            const user = res.data.user;        
            if(user) this.user = user;         // 백엔드에서 받은 정보를 화면에 출력.
        })
        .catch((err) => {
            console.error(err);
        });
    }}
</script>

<style></style>