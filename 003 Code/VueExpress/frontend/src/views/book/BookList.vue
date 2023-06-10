<template>
  <div class="book-list">
      <h1>서적평가 목록</h1>
      <div class="common-buttons">
        <button type="button" class="w3-button w3-round w3-blue-gray" v-on:click="fnWrite">평가하기</button>
      </div>
      <div class="container">
        <th>번호</th>
        <th>도서명</th>
        <th>저자</th>
        <th>출판사</th>
        <th>등록일</th>
        <th>작성자</th>
          <div class="outer">
              <div class="inner">
                  <div class="centered" v-for="book in books" :key="book.id">                                       
                      <div>
                          {{book.id}} - <i>{{book.bookname}}</i> - <i>{{book.author}}</i> - <i>{{book.publisher}}</i>
                           - [{{book.year}}:{{ book.month }}:{{ book.day }}] -
                          <router-link :to="{ name: 'bDetail', params: { bookid: book.id }}"> {{ book.writer }}</router-link>
                      </div>
                  </div>
              </div>
            <div>
              <select v-model="search_key">
                <option value="bookname">도서명</option>
                <option value="author">저자</option>
                <option value="publisher">출판사</option>
                <option value="writer">작성자</option>
                <option value="bookid">번호</option>
              </select>
              &nbsp;
              <input type="text" v-model="search_value" @keyup.enter="search()">
              &nbsp;
              <button @click="search()">검색</button>
            </div>
          </div>
      </div>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  created() {                                              // 조건 : 게시판에 들어왔을때 , 결과 : 백엔드에 게시글 목록 요청.
      this.$http.get("/api/booklist").then(response => {           
          this.books = response.data;                       // 번호, 제목, 도서명, 등록일 등
      });
  },
  data() {
      return {
         books: [],
         search_key:"writer"
      };
  },
  methods : {
    fnWrite() {                               // 글쓰기 버튼 누르면 bookWrite.vue 로 이동
        this.$router.push({
          path: './write'
        })
      },
      search(){
        if(search_key=="bookname") {
          this.$router.push({
          path: ':/bookname'
        })
      }
      else if(search_key=="author") {
          this.$router.push({
          path: ':/writer'
        })
      }
      else if(search_key=="writer") {
          this.$router.push({
          path: ':/author'
        })
      }
      else if(search_key=="publisher") {
          this.$router.push({
          path: ':/publisher'
        })
      }
      else if(search_key=="bookid") {
          this.$router.push({
          path: ':/bookid'
        })
      }
    },
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
