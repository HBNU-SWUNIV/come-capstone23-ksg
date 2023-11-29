<template>
    <div>
        <h1>상세 내용</h1>
        <div class="container">
            <div class="outer">
                <div class="inner">
                    <div class="centered">
                        <div>
                            <strong>{{book.bookname}}</strong> - <i>저자 {{book.author}}</i>- <i>출판사 {{book.publisher}}</i>- <i>{{book.writer}}</i>
                            [{{book.year}}:{{ book.month }}:{{ book.day }}]
                            <p>{{book.image}}</p>
                            <p>{{book.contents}}</p>
                            <router-link :to="{ name: 'bList' }">돌아가기</router-link>
                        </div>
                    </div>
                    <CommentList :id = "id"/>
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
        this.$http.get(`/api/booklist/${id}`).then(response => {
            this.book = response.data[0];
        });
    },
    data: function() {
        return {
            book: {}
        };
    }
  };
  </script>
