<template>
  <body>
    <div>
      <div class="form-group" align ="left">
				<label>제목</label>
				<input class="form-control" id="title" placeholder="제목을 입력해주세요" maxlength="20"  required v-model="board.title" type="text">
			</div>
    </div>
  <div id="editor" ref="edit"></div>
  <div v-if="$store.state.account.id">
    <v-btn class="mr-4"  color="grey darken-2" @click="savePost()">글쓰기 </v-btn>
  </div>

</body>
</template>

<script>
/* eslint-disable */

import Editor from '@toast-ui/editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import "@toast-ui/editor/dist/i18n/ko-kr";
import axios from 'axios';
export default {
  created() {
    
    this.fetchData();
  },
  
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
              image_tag:"",
              subject:"",
          },
          response: "",
          editor: null
      };
  },

  mounted() {
    this.fnGetList()
      this.editor = new Editor({
        el: document.querySelector('#editor'),
        language:'ko',
        height: '500px',
        initialEditType: 'markdown',
        previewStyle: 'vertical',  
        hooks:{
            async addImageBlobHook(blob, callback){
              const formData = new FormData();
                formData.append('image', blob);
           
       

        try{
          
            const response = await axios.post('api/imgupload/classfication', formData)

               try{
     
            const response = await axios.post('api/imgupload/img', formData)

            const filename = await response.data;
            alert(`이미지가 등록되었습니다`);
            const imageUrl = `http://localhost:3000/uploads/${filename}`;
               callback(imageUrl, 'image '); 
          } 
          catch(error){
         console.error(error);
         alert("이미지 파일 업로드 실패")
      }
          } 
          catch(error){
         console.error(error);
         alert("이미지 파일 업로드 실패")
      }
        
        }
    },
    
    });
    
    
  },
  methods:{
    

    savePost() {

      var today = new Date();

          var year = today.getFullYear();
          var month = ('0' + (today.getMonth() + 1)).slice(-2);
          var day = ('0' + today.getDate()).slice(-2);

          this.board.year = year;
          this.board.month = month;
          this.board.day = day;
          this.board.contents = this.editor.getHTML();
      try{
        const response = axios.post('api/boardlist/upload', this.board)
        alert("게시글이 저장되었습니다.")
      }
      catch(error){
        alert("업로드 실패!");
      }
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
/*var number=1;
                const blo = new Blob([JSON.stringify(number)], {
                  type: 'application/json',
                });
                formData.append('data', blo);
                

                // Content-Type 지정
                const config = {
                  headers: {
                    'Content-Type': 'multipart/form-data',
                  },
                };
              
                */
/*
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
*/
</script>