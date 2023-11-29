<template>
  <div class="container">
    <!-- 최상단 분류 -->
    <div>
        <label><input type="checkbox" value="지네" v-model="checked">지네</label>   
        <label><input type="checkbox" value="뱀" v-model="checked">뱀</label>
        <label><input type="checkbox" value="전갈" v-model="checked">전갈</label>
        <label><input type="checkbox" value="거미" v-model="checked">거미</label>
        <label><input type="checkbox" value="지렁이" v-model="checked">지렁이</label>
        <label><input type="checkbox" value="쥐" v-model="checked">쥐</label>
        <v-btn class="mr-4" color="grey darken-2" @click="fnsetting">설정</v-btn>
    </div>
    <div class="board-header">
      <span>번호</span>
      <span>주제</span>
      <span>제목</span>
      <span>작성자</span>
      <span>등록일</span>
    </div>

    <!-- 게시글 목록 -->
    <div v-if="items && items.length > 0">
      <ul>
        <li v-for="item in items" :key="item.id" class="board-item">
          <span class="id">{{ item.id }}</span>
          <span class="subject">{{ item.subject }}</span>
          <span class="title" @click="goToPost(item.id)">{{ item.title }}</span>
          <span class="writer">{{ item.writer }}</span>
          <span class="date">{{ `${item.year}-${item.month}-${item.day}` }}</span>
        </li>
      </ul>
    </div>
    <div v-else>
      <p>잠시만 기다려 주세요...</p>
    </div>

    <v-btn class="mr-4" color="grey darken-2" @click="fnWrite" v-if="$store.state.account.id">글쓰기</v-btn>
    <v-btn class="mr-6"  color="grey darken-2" @click="TopicSort">주제 추출 </v-btn>

    <!-- 검색 창 -->
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
    <div class="pagination-container">
      <v-btn @click="goToFirstPageGroup">처음</v-btn>
      <v-btn @click="goToPreviousPageGroup">&lt;&lt;</v-btn>
      <v-btn v-for="pageNum in visiblePageNumbers" :key="pageNum" :class="{ 'active': pageNum === currentPage }" @click="updatePage(pageNum)">
        {{ pageNum }}
      </v-btn>
      <v-btn @click="goToNextPageGroup">&gt;&gt;</v-btn>
      <v-btn @click="goToLastPageGroup">마지막</v-btn>
    </div>
  </div>
</template>

<script>
import {store}  from '../../main.js';
export default {
  created() {
    if(store.state.account.snake)
    {
      this.checked.push('뱀');
    }
    if(store.state.account.centipede)
    {
      this.checked.push('지네');
    }
    if(store.state.account.mouse)
    {
      this.checked.push('쥐');
    }
    if(store.state.account.scorpion)
    {
      this.checked.push('전갈');
    }
    if(store.state.account.spider)
    {
      this.checked.push('거미');
    }
    if(store.state.account.worm)
    {
      this.checked.push('지렁이');
    }
    
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
      checked: [],
      items: [],
      boards: [],
      searchbar: "",
      searchoption: "",

      currentPage: 1,
      totalPages: 0, // 총 페이지 수
      perPage: 10, // 페이지당 게시글 수
      currentPageGroupStart: 1, // 현재 페이지 그룹의 시작 페이지 번호
    };
  },

  computed: {
    visiblePageNumbers() {
      const end = Math.min(this.currentPageGroupStart + 9, this.totalPages);
      return Array.from({ length: end - this.currentPageGroupStart + 1 }, (_, i) => i + this.currentPageGroupStart);
    },
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

    TopicSort() {                               
        this.$http.get("/api/boardlist/topic").then(response => {
        let res_log = response.data
        console.log(res_log)
      })}
      ,  

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
    
    updatePageGroup(pageNumber) {
      this.currentPageGroup = Math.ceil(pageNumber / 10);
      this.currentPage = pageNumber;
      this.fetchData();
    },
    updatePage(pageNumber) {
      this.currentPage = pageNumber;
      this.fetchData();
    },

    goToNextPageGroup() {
      this.updateCurrentPageGroupStart(this.currentPageGroupStart + 10);
    },
    goToPreviousPageGroup() {
      this.updateCurrentPageGroupStart(Math.max(this.currentPageGroupStart - 10, 1));
    },
    goToFirstPageGroup() {
    this.updateCurrentPageGroupStart(1);
    },
    goToLastPageGroup() {
      // 마지막 페이지 그룹의 시작 페이지 계산
      const lastPageGroupStart = Math.floor((this.totalPages - 1) / 10) * 10 + 1;
      // 마지막 페이지 그룹의 마지막 페이지 계산
      const lastPageInGroup = Math.min(lastPageGroupStart + 9, this.totalPages);

      this.updateCurrentPageGroupStart(lastPageGroupStart);
      this.currentPage = lastPageInGroup;
      this.fetchData();
    },

    updateCurrentPageGroupStart(pageNumber) {
      this.currentPageGroupStart = pageNumber;
      // 선택한 페이지 그룹의 첫 페이지로 현재 페이지 설정
      this.currentPage = pageNumber;
      this.fetchData();
    },
    fnsetting() {                               
      if (this.checked.includes('뱀'))
      {
        store.commit('setsnake', 1);
      }
      else{
        store.commit('setsnake', 0);
      }
      if (this.checked.includes('지렁이'))
      {
        store.commit('setworm', 1);
      }
      else{
        store.commit('setworm', 0);
      }
      if (this.checked.includes('지네'))
      {
        store.commit('setcentipede', 1);
      }
      else{
        store.commit('setcentipede', 0);
      }
      if (this.checked.includes('전갈'))
      {
        store.commit('setscorpion', 1);
      }
      else{
        store.commit('setscorpion', 0);
      }
      if (this.checked.includes('쥐'))
      {
        store.commit('setmouse', 1);
      }
      else{
        store.commit('setmouse', 0);
      }
      if (this.checked.includes('거미'))
      {
        store.commit('setspider', 1);
      }
      else{
        store.commit('setspider', 0);
      }
      alert("설정되었습니다.");
    },

  },
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
  grid-template-columns: 0.5fr 1fr 2.5fr 0.7fr 0.7fr; /* 열 너비 비율 조정 */
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
  padding-right: 60px;
}
.board-item .subject {
  padding-right: 30px;
}
.board-item .title {
  padding-right: 33px;
}
.board-item .writer {
  padding-right: 12px;
}
.board-item .date {
  padding-right: 5px;
}

.board-item .title {
  cursor: pointer;
  text-decoration: none;
}
.board-item .title:hover {
  text-decoration: underline;
}

.pagination-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
.pagination-container .v-btn {
  margin-right: 4px;
  text-align: center;
}
.pagination-container .v-btn.active {
  background-color: #1976D2;
  color: white;
}
</style>
