<template>
  <div class="board-list">
      <h1>게시글 목록</h1>
      <div class="container">
        <th>번호</th>
        <th>작성자</th>
        <th>등록일</th>
        <th>제목</th>
          <div class="outer">
              <div class="inner">
                  <div class="centered" v-for="board in boards" :key="board.id">                                       
                      <div>
                          {{board.id}} - <i>{{board.writer}}</i>
                           - [{{board.year}}:{{ board.month }}:{{ board.day }}] -
                          <router-link :to="{ name: 'Detail', params: { id: board.id }}"> {{ board.title }}</router-link>
                      </div>
                  </div>
              </div>
              
              <div class="common-buttons">
                <button type="button" class="w3-button w3-round w3-blue-gray" v-on:click="fnWrite">글쓰기</button>
              </div>
              
          </div>
      </div>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  created() {                                              // 조건 : 게시판에 들어왔을때 , 결과 : 백엔드에 게시글 목록 요청.
      this.$http.get("/api/boardlist").then(response => {           
          this.boards = response.data;                       // 번호, 제목, 작성자, 등록일
      });
  },
  data() {
      return {
         boards: []
      };
  },
  methods : {
    fnWrite() {                               // 글쓰기 버튼 누르면 BoardWrite.vue 로 이동.
        this.$router.push({
          path: './write'
        })
      }
  }
};
</script>

<style>
.outer {
  display: table;
  width: 100%;
  height: 100%;
}
.inner {
  display: table-cell;
  vertical-align: middle;
  text-align:left;
}
.centered {
  position:relative;
  display:contents;

  width: 50%;
  padding: 1em;
  font-size: 1em;
  /* background: orange; */
  /* color: white; */
}
</style>