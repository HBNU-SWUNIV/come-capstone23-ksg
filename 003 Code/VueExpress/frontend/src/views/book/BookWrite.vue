<template>
    <form method="post" @submit.stop.prevent="mySubmit">
        <div>
            <label for="bookname">도서명</label>
            <input type="text" name="bookname" required v-model="book.bookname">
        </div>
        <div>
            <label for="writer">작성자</label>
            <input type="text" name="writer" required v-model="book.writer">
        </div>
        <div>
            <label for="author">저자</label>
            <input type="text" name="author" required v-model="book.author">
            <label for="publisher">출판사</label>
            <input type="text" name="publisher" required v-model="book.publisher">
        </div>
        <div>
            <label for="image">이미지</label>
            <input multiple @change='InputImage()' ref="serveryImage" type="file" accept="image/*"/>
        </div>
        <div>
            <label for="contents">내용</label>
            <textarea input type="text" name="contents" cols="30" rows="10" required v-model="book.contents" class="w3-input w3-border" style="resize: none;">
            </textarea>
        </div>
        
        <div>
            <button type="submit">등록하기</button>
        </div>
    </form>
  </template>
  
  <script>
  /* eslint-disable */
  export default {
    data() {
        return {
            book: {
                id: "",
                writer: "",
                year: 0 ,
                month: 0 ,
                day : 0 ,
                bookname: "",
                contents: "",
                image: "",
            },
            response: ""
        };
    },
  
    mounted() {
        this.fnGetList()
      },
  
    methods: {
        InputImage() {
            this.book.image = this.$refs.serveyImage.files
            console.log('input image!');
        },
        mySubmit() {
          
            var today = new Date();
  
            var year = today.getFullYear();
            var month = ('0' + (today.getMonth() + 1)).slice(-2);
            var day = ('0' + today.getDate()).slice(-2);
  
            this.book.year = year;
            this.book.month = month;
            this.book.day = day;
  
            this.$http.post("api/booklist/upload", this.book)
                .then(res => {
                    console.log('upload success!');
                })
                .catch(err => {
                    console.error('upload fali!');
                });
            // go to list page
            this.$router.push({ name: "bList" });
        },
  
        fnGetList() {
          // get 게시판 내용
        this.$http.get('api/booklist').then(response => {
            const books = response.data;
            this.book.id = books.length + 1;
        });
    }
    }
  }
  
  </script>
