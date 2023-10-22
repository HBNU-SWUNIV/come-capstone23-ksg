<template>
  <body>
    <div>
      <div class="form-group" align="left">
        <label>제목</label>
        <input class="form-control" id="title" placeholder="제목을 입력해주세요" maxlength="20" required v-model="board.title" type="text">
      </div>
    </div>
    <div id="editor" ref="edit"></div>
    <div>
      <v-btn class="mr-4" color="grey darken-2" @click="savePost()">글쓰기 </v-btn>
    </div>
  </body>
</template>

<script>
import Editor from '@toast-ui/editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import "@toast-ui/editor/dist/i18n/ko-kr";
import axios from 'axios';

export default {
  data() {
    return {
      board: {
        id: "",
        writer: "",
        year: 0,
        month: 0,
        day: 0,
        title: "",
        contents: "",
        image_tag: null // 이미지의 유해 여부를 판단
      },
      editor: null
    };
  },

  mounted() {
    this.fnGetList();
    this.editor = new Editor({
      el: document.querySelector('#editor'),
      language: 'ko',
      height: '500px',
      initialEditType: 'markdown',
      previewStyle: 'vertical',
      hooks: {
        async addImageBlobHook(blob, callback) {
          try {
            const formData = new FormData();
            formData.append('image', blob);
            const response = await axios.post('api/imgupload/imgtest', formData);
            const filename = await response.data;
            alert(`${response.data} 이미지가 등록되었습니다`);
            const imageUrl = `http://localhost:3000/uploads/${filename}`;
            callback(imageUrl, 'image ');
          } catch (error) {
            console.error(error);
            alert("이미지 파일 업로드 실패");
          }
        }
      }
    });
  },

  methods: {
  async savePost() {
    const TARGET_CLASSES = ['person', 'car', 'motorcycle']; // 유해 이미지로 판단할 타겟(다른 타겟을 사용할 거라면 수정 필요)
    const imgTagRegex = /<img.*?src=["'](.*?)["'].*?>/g;
    const matches = [...this.board.contents.matchAll(imgTagRegex)];

    // image_tag를 기본적으로 normal로 설정
    this.board.image_tag = "normal";

    if (matches.length > 0) {
      for (let match of matches) {
        const imgUrl = match[1];
        
        try {
          const imageResponse = await axios.get(imgUrl, { responseType: 'arraybuffer' });
          const blob = new Blob([imageResponse.data], { type: imageResponse.headers['content-type'] });
          
          const formData = new FormData();
          formData.append('file', blob);

          const detectionResponse = await axios.post('http://localhost:5000/detect', formData);
          if (detectionResponse.data.some(item => TARGET_CLASSES.includes(item.labels))) {
            // 탐지된 객체가 TARGET_CLASSES에 속하면 image_tag를 warning으로 변경
            this.board.image_tag = "warning";
            break;
          }
        } catch (error) {
          console.error("Error in image detection:", error);
        }
      }
    }

    var today = new Date();
    var year = today.getFullYear();
    var month = ('0' + (today.getMonth() + 1)).slice(-2);
    var day = ('0' + today.getDate()).slice(-2);

    this.board.year = year;
    this.board.month = month;
    this.board.day = day;
    this.board.contents = this.editor.getHTML();

    try {
      const response = await axios.post('api/boardlist/upload', this.board);
      alert("게시글이 저장되었습니다.");
    } catch (error) {
      alert("업로드 실패!");
    }

    this.$router.push({ name: "List" });
  },

    fnGetList() {
      this.$http.get('api/boardlist').then(response => {
        const boards = response.data;
        this.board.id = boards.length + 1;
      });
    }
  }
}
</script>
