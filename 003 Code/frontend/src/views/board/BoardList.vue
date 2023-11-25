<template>
  <div class="container">
    <!-- 최상단 분류 -->
    <div class="board-header">
      <span>번호</span>
      <span>제목</span>
      <span>작성자</span>
      <span>등록일</span>
    </div>

    <!-- 게시글 목록 -->
    <div v-if="items && items.length > 0">
      <ul>
        <li v-for="item in items" :key="item.id" class="board-item">
          <span class="id">{{ item.id }}</span>
          <span class="title" @click="goToPost(item.id)">{{ item.title }}</span>
          <span class="writer">{{ item.writer }}</span>
          <span class="date">{{ `${item.year}-${item.month}-${item.day}` }}</span>
        </li>
      </ul>
    </div>
    <div v-else>
      <p>게시글이 없습니다.</p>
    </div>

    <v-btn class="mr-4" color="grey darken-2" @click="fnWrite">글쓰기</v-btn>

    <!-- 검색창 -->
    <div class="post-search">
      <v-text-field input type="text" name="contents" cols="3" rows="3" required v-model="searchbar"
        class="w3-input w3-border" style="resize: none;"></v-text-field>
      <select v-model="searchoption">
        <option>ID</option>
        <option>작성자</option>
      </select>
      <v-btn class="btn btn-primary" color="grey darken-2" @click="searchbutton">검색</v-btn>
    </div>

    <!-- 페이징 컴포넌트 -->
    <v-pagination
      v-model="currentPage"
      :length="totalPages"
      @input="fetchData"
    ></v-pagination>
  </div>
</template>

<script>
export default {
  created() {
    this.fetchData();
  },
  data() {
    return {
      fields: [
        {
          key: 'id',
          label: '게시글 번호'
        },
        {
          key: 'writer',
          label: '작성자'
        },
        {
          key: 'title',
          label: '제목'
        },
        {
          key: 'id',
          label: '게시글 번호'
        },
        {
          key: 'year',
          label: '년도'
        },
        {
          key: 'month',
          label: '월'
        },
        {
          key: 'day',
          label: '일'
        }
      ],
      items: [],
      boards: [],
      searchbar: "",
      searchoption: "",

      currentPage: 1,
      totalPages: 0, // 총 페이지 수
      perPage: 10, // 페이지당 게시글 수
    };
  },
  methods: {
    Click(item, index,e) {                               // 글쓰기 버튼 누르면 BoardWrite.vue로 이동
      this.$router.push({
        path: `/board/detail/${item.id}`
      })
    },

    fnWrite() {                               // 글쓰기 버튼 누르면 BoardWrite.vue로 이동
      this.$router.push({
        path: './write'
      })
    },
    searchbutton() {                            // 검색 버튼이 눌렸을 시
      var key = this.searchbar;

      if (this.searchoption === "ID") {                                       ///게시글 ID 로 검색시 해당 게시글만
        this.$http.get(`/api/boardlist/id/${key}`).then(response => {
          
          this.items = response.data;
        });
      } else {                                                                 /// 게시글 작성자로 검색시 해당 작성자의 모든 글을
        this.$http.get(`/api/boardlist/writer/${key}`).then(response => {
          this.items = response.data;
        });
      }
    },
    fetchData() {
    console.log(`Fetching data for page: ${this.currentPage}`);

    this.$http.get(`/api/boardlist?page=${this.currentPage}&limit=${this.perPage}`)
        .then(response => {
            console.log('Server response:', response.data);

            if (Array.isArray(response.data)) {
                // 서버에서 받은 데이터를 날짜 기준으로 내림차순 정렬하고, 날짜가 같을 경우 ID로 정렬
                const sortedData = response.data.sort((a, b) => {
                    const dateA = new Date(a.year, a.month - 1, a.day);
                    const dateB = new Date(b.year, b.month - 1, b.day);
                    
                    if (dateB - dateA === 0) {
                        return b.id - a.id;
                    }
                    return dateB - dateA;
                });

                // 페이지에 해당하는 게시글만을 items에 할당
                const start = (this.currentPage - 1) * this.perPage;
                const end = start + this.perPage;
                this.items = sortedData.slice(start, end);
                
                // 총 페이지 수 계산
                this.totalPages = Math.ceil(sortedData.length / this.perPage);
            } else {
                console.error("Unexpected response structure:", response.data);
                this.items = [];
                this.totalPages = 0;
            }
        })
        .catch(error => {
            console.error("Error fetching data:", error);
            this.items = [];
            this.totalPages = 0;
        });
},
goToPost(postId) {
      this.$router.push(`/board/detail/${postId}`);
    },
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
.board-header, .board-item {
  display: grid;
  grid-template-columns: 0.5fr 2fr 1fr 1fr; /* 열 너비 비율 조정 */
  align-items: center;
}

.board-header {
  font-weight: bold;
  padding: 10px 0;
  border-bottom: 2px solid #ddd;
}

.board-item {
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
}

.board-item span {
  text-align: center;
}

.board-item .id {
  padding-right: 62px;
}
.board-item .title {
  padding-right: 43px;
}
.board-item .writer {
  padding-right: 22px;
}
.board-item .date {
  padding-right: 8px;
}

.v-pagination__item--active {
background-color: #1976D2 !important; /* 원하는 배경색 */
color: white !important; /* 원하는 글자색 */
}

.board-item .title {
  cursor: pointer;
  text-decoration: none;
}
.board-item .title:hover {
  text-decoration: underline;
}
</style>
