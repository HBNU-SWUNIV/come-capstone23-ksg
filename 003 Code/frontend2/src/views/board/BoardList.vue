<template>
  <v-app>
    <div class="board-list">
      <h1>게시글 목록</h1>
      <div class="container">
        <th>번호</th>
        <th>작성자</th>
        <th>등록일</th>
        <th>제목</th>
        <div class="outer">
          <div class="inner">
            <div class="centered" v-for="board in boards" :key="board.id">
              <div>
                {{ board.id }} - <i>{{ board.writer }}</i>
                - [{{ board.year }}:{{ board.month }}:{{ board.day }}] -
                <router-link :to="{ name: 'Detail', params: { id: board.id } }"> {{ board.title }}</router-link>
              </div>
            </div>
          </div>
          <v-btn outlined class="mr-4"  color="grey darken-2" @click="fnWrite" v-if ="$store.state.account.id">글쓰기 </v-btn>
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

<template>
  <div class="container">
    <div>
    <b-table striped hove :items="items" :fields="fields" @row-clicked="Click"></b-table>
    </div>
    <v-btn class="mr-4"  color="grey darken-2" @click="fnWrite" v-if ="$store.state.account.id">글쓰기 </v-btn>
    <div class="post-search">
          <v-text-field input type="text" name="contents" cols="3" rows="3" required v-model="searchbar"
            class="w3-input w3-border" style="resize: none;"></v-text-field>
          <select v-model="searchoption">
            <option>ID</option>
            <option>작성자</option>
          </select>
          <v-btn class="btn btn-primary" color="grey darken-2" @click="searchbutton">검색</v-btn>
      </div>
  </div>


</template>

<script>
//        <v-btn type="button" class="w3-button w3-round w3-blue-gray" v-on:click="searchbutton">검색</v-btn>
/* eslint-disable */


export default {
  created() {                                              // 조건 : 게시판에 들어왔을때 , 결과 : 백엔드에 게시글 목록 요청.
    this.$http.get("/api/boardlist").then(response => {
      let res_items = response.data.sort((a,b) => {return b.id-a.id})
      this.items = res_items;                      // 번호, 제목, 작성자, 등록일
    });
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
    };
  },
  methods: {
    Click(item, index,e) {                               // 글쓰기 버튼 누르면 BoardWrite.vue 로 이동.
      this.$router.push({
        path: `/board/detail/${item.id}`
      })
    },

    fnWrite() {                               // 글쓰기 버튼 누르면 BoardWrite.vue 로 이동.
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