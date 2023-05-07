<template>
  <div>
      <h1>상세 내용</h1>
      <div class="container">
          <div class="outer">
              <div class="inner">
                  <div class="centered">
                      <div>
                          <strong>{{board.title}}</strong> - <i>{{board.writer}}</i>
                          [{{board.year}}:{{ board.month }}:{{ board.day }}]
                          <p>{{board.contents}}</p>
                          <router-link :to="{ name: 'List' }">돌아가기</router-link>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  created: function() {
      var id = this.$route.params.id;
      this.$http.get(`/api/boardlist/${id}`).then(response => {
          this.board = response.data[0];
      });
  },
  data: function() {
      return {
          board: {}
      };
  }
};
</script>