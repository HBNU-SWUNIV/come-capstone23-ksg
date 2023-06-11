<template>
    <div>
        <h1>상세 내용</h1>
        <div class="container">
            <div class="outer">
                <div class="inner">
                    <div class="centered">
                        <div>
                            <strong>{{ board.title }}</strong> - <i>{{ board.writer }}</i>
                            [{{ board.year }}:{{ board.month }}:{{ board.day }}]
                            <p>{{ board.contents }}</p>
                        </div>
                    </div>

                    <div class="comment" v-for="comment in comments" :key="comment.id">
                        <div class="list">
                            <li v-if="comment.id === board.id">
                                <strong>{{ comment.writer }}</strong> -
                                [{{ comment.year }}:{{ comment.month }}:{{ comment.day }}] : {{ comment.contents }}
                            </li>
                        </div>
                    </div>

                    <form method="post" @submit.stop.prevent="mySubmit">
                        <div class="wirte">
                            <p></p>
                            <textarea input type="text" name="contents" cols="150" rows="2" required
                                v-model="comment_to_wirte.contents" class="w3-input w3-border" style="resize: none;"></textarea>
                            <button type="submit" v-if ="$store.state.account.id">댓글 등록</button>
                        </div>
                    </form>

                    <router-link :to="{ name: 'List' }">돌아가기</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
export default {
    created: function () {
        var id = this.$route.params.id;
        this.$http.get(`/api/boardlist/id/${id}`).then(response => {
            this.board = response.data[0];
        });
        this.$http.get(`/api/commentlist`).then(response => {
            this.comments = response.data;
        });
    },
    data: function () {
        return {
            board: {}
            ,
            comments: {},
            comment_to_wirte:{
                id: 0,
                writer: "",
                year: 0,
                month: 0,
                day: 0,
                contents: "",
            }
        };
    },

  methods: {
      mySubmit() {
          var id = this.$route.params.id;
          var today = new Date();

          var year = today.getFullYear();
          var month = ('0' + (today.getMonth() + 1)).slice(-2);
          var day = ('0' + today.getDate()).slice(-2);

          this.comment_to_wirte.year = year;
          this.comment_to_wirte.month = month;
          this.comment_to_wirte.day = day;
          this.comment_to_wirte.writer = "익명"                       /// 이 부분 후에 로그인 한 id와 연동하여, 작성자로 변경 필요
          this.comment_to_wirte.id = id;

          console.log(id);

          this.$http.post("api/commentlist/upload", this.comment_to_wirte)
              .then(res => {
                  console.log('upload success!');
              })
              .catch(err => {
                  console.error('upload fali!');
              });
          // go to list page
          router.go(1);
      },
  }
  
};


</script>