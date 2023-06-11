<template>
  <form method="post" @submit.stop.prevent="mySubmit">
      <div>
          <label for="title">제목</label>
          <input type="text" name="title" required v-model="board.title">
      </div>
      
      <div>
          <label for="contents">내용</label>
          <textarea input type="text" name="contents" cols="30" rows="10" required v-model="board.contents" class="w3-input w3-border" style="resize: none;">
          </textarea>
      </div>
      
      <div>
          <button type="submit">올리기</button>
      </div>
  </form>
</template>

<script>
/* eslint-disable */
export default {
  data() {
      return {
          board: {
              id: "",
              writer: "",
              year: 0 ,
              month: 0 ,
              day : 0 ,
              title: "",
              contents: "",
          },
          response: ""
      };
  },

  mounted() {
      this.fnGetList()
    },

  methods: {
      mySubmit() {
        
          var today = new Date();

          var year = today.getFullYear();
          var month = ('0' + (today.getMonth() + 1)).slice(-2);
          var day = ('0' + today.getDate()).slice(-2);

          this.board.year = year;
          this.board.month = month;
          this.board.day = day;

          this.$http.post("api/boardlist/upload", this.board)
              .then(res => {
                  console.log('upload success!');
              })
              .catch(err => {
                  console.error('upload fali!');
              });
          // go to list page
          this.$router.push({ name: "List" });
      },

      fnGetList() {
        // get 게시판 내용
      this.$http.get('api/boardlist').then(response => {
          const boards = response.data;
          this.board.id = boards.length + 1;
      });
  }
  }
}

</script>