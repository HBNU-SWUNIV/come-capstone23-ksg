<template>
  <v-app>
    <div class="book-list">
      <h1>서적평가 목록</h1>
      <div class="container">
        <th>번호 </th>
        <th>작성자 </th>
        <th>등록일 </th>
        <th>제목 </th>
        <th>저자 </th>
        <th>출판사 </th>
        <div class="outer">
          <div class="inner">
            <div class="centered" v-for="book in books" :key="book.bookid">
                      <div>
                          {{book.bookid}} - 
                          <router-link :to="{ name: 'bDetail', params: { id: book.bookid } }"> {{ book.bookname }}</router-link>
                           - <i>{{book.author}}</i> - <i>{{book.publisher}}</i> - [{{book.year}}:{{ book.month }}:{{ book.day }}] 
                      </div>
            </div>
          </div>
          <v-btn outlined class="mr-4" color="grey darken-2" @click="fnWrite">평가하기</v-btn>
        </div>

        <div class="post-search">
          <v-text-field input type="text" name="contents" cols="3" rows="3" required v-model="searchbar"
            class="w3-input w3-border" style="resize: none;"></v-text-field>
          <select v-model="searchoption">
            <option>ID</option>
            <option>작성자</option>
          </select>
          <v-btn outlined class="mr-4" color="grey darken-2" @click="searchbutton">검색</v-btn>
        </div>
      </div>
    </div>
  </v-app>
</template>

<script>
//        <v-btn type="button" class="w3-button w3-round w3-blue-gray" v-on:click="searchbutton">검색</v-btn>
/* eslint-disable */
export default {
  created() {                                              // 조건 : 게시판에 들어왔을때 , 결과 : 백엔드에 게시글 목록 요청.
    this.$http.get("/api/booklist").then(response => {
      this.books = response.data;                       // 번호, 제목, 작성자, 등록일
    });
  },
  data() {
    return {
      books: [],
      searchbar: "",
      searchoption: "",
    };
  },
  methods: {
    fnWrite() {                               // 글쓰기 버튼 누르면 bookWrite.vue 로 이동.
      this.$router.push({
        path: './write'
      })
    },
    searchbutton() {                            // 검색 버튼이 눌렸을 시
      var key = this.searchbar;

      if (this.searchoption === "ID") {                                       ///게시글 ID 로 검색시 해당 게시글만
        this.$http.get(`/api/booklist/bookid/${key}`).then(response => {
          this.books = response.data;
        });

      } else {                                                                 /// 게시글 작성자로 검색시 해당 작성자의 모든 글을
        this.$http.get(`/api/booklist/writer/${key}`).then(response => {
          this.books = response.data;
        });
      }

    }
  }
}
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
