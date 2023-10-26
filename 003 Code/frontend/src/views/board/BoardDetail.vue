<template>
    <div>

        <div class="container">
            <div class="outer">
                <div class="inner">
                    <strong>제목: {{ board.title }}</strong> - <i>작성자: {{ board.writer }}</i>
                            [{{ board.year }}.{{ board.month }}.{{ board.day }}]
                    <div class="centered">
                            <div class="border" id="lender">
                            {{ board.contents }}
                            </div>
                        
                            
                    <v-btn class="mr-4"  color="blue" @click="fnWrite" v-if ="$store.state.account.id">수정 </v-btn>
                    <v-btn class="mr-4"  color="red" @click="fndelete" v-if ="$store.state.account.id">삭제 </v-btn>
                    <v-btn class="mr-4"  color="red"  v-on:click="fnnofilter()">필터 제거 </v-btn>
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
                            <label for="contents" v-if ="$store.state.account.id">댓글 작성:</label>
                            <textarea input type="text" name="contents" cols="150" rows="3" required
                                v-model="comment_to_wirte.contents" class="form-control" style="resize: none;" v-if ="$store.state.account.id"></textarea>
                            <div class="border" v-else>{{"댓글을 작성하려면 로그인이 필요합니다."}}</div>
                            <button type="submit" v-if ="$store.state.account.id">댓글 등록</button>
                        </div>
                    </form>

                    <v-btn class="mr-4" color="grey darken-2" :to="{ name: 'List' }">돌아가기</v-btn>
                    
                </div>
            </div>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
var tf
export default {
    created: function () {
        var id = Number(this.$route.params.id);
        tf = this.$route.params.id
        if(tf >0)
        this.$http.get(`api/boardlist/id/${id}`).then(response => {
            this.board = response.data[0];
            var content = this.board.contents;
            content = content.replace(/snake\/[\w]*.[\w]*/gi, 
            'filters/filters_snake.png');
            content = content.replace(/Spider\/[\w]*.[\w]*/gi, 
            'filters/filters_snake.png');
            content = content.replace(/mouse\/[\w]*.[\w]*/gi, 
            'filters/filters_snake.png');
         
            this.board.contents = content;

            document.querySelector('#lender').innerHTML = this.board.contents;    
        });
        else{
            this.$http.get(`/api/boardlist/true/${id}`).then(response => {
            this.board = response.data[0];
            document.querySelector('#lender').innerHTML = this.board.contents;
        });

        }
    
        this.$http.get(`/api/commentlist`).then(response => {
            this.comments = response.data;
        });
    },
    data: function () {
        return {
            board: {},
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
                  alert("댓글이 등록되었습니다.")
              })
              .catch(err => {
                  console.error('upload fali!');
              });
              
          // go to list page
          this.$http.get("api/login").then(res => {
                    store.commit('setAccount', res.data.userid);
          })
          this.$router.go(this.$router.currentRoute);
      },
      fndelete(){
        var id = this.$route.params.id;
        this.$http.delete(`/api/boardlist/id/${id}`, this.board)
          .then(res => {
              console.log('delete success!');
              alert("게시글이 삭제되었습니다.")
          })
          .catch(err => {
              console.error('delete fail!', err);
              alert("게시글 삭제에 실패하였습니다.");
          });
       },

       fnnofilter() {
            var id = this.$route.params.id;
            this.$http.get(`/api/boardlist/true/${id}`).then(response => {
                this.board = response.data[0];
                document.querySelector('#lender').innerHTML = this.board.contents;
                alert("유해 이미지 필터가 해제되었습니다!");
                console.log("Successfully fetched unfiltered data:", response.data);
                this.$forceUpdate();
            });
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
  text-align: left;
}

.centered {
  position: relative;
  display: contents;

  width: 50%;
  padding: 1em;
  font-size: 1em;
  /* background: orange; */
  /* color: white; */
}
</style>