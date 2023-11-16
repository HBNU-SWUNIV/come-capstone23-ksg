<!-- MyPage.vue -->
<template>
  <div class="mypage-container">
    <br>
    <div class="username">
      <h2>{{ userName }} 님의 마이페이지</h2>
    </div>

    <br>
    <div class="useractive">
      <h3>7일간 활동 내역</h3>
      <table>
        <tr>
          <th v-for="date in lastSevenDays" :key="date">{{ date }}</th>
        </tr>
        <tr>
          <td v-for="date in lastSevenDays" :key="`count-${date}`">{{ postCountByDate[date] || 0 }}</td>
        </tr>
      </table>
    </div>
  
    <br>
    <div class="userpost">
      <h3>최근 작성 게시글</h3>
      <table>
        <tr>
          <th>게시글 번호</th>
          <th>제목</th>
          <th>작성일</th>
        </tr>
        <tr v-for="post in userPosts" :key="post.id">
          <td>{{ post.id }}</td>
          <td class="cell_title">
            <router-link :to="`/board/detail/${post.id}`">{{ post.title }}</router-link>
          </td>
          <td>{{ formatDate(post.year, post.month, post.day) }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userPosts: [],
      lastSevenDays: [],
      postCountByDate: {}
    };
  },
  computed: {
    userName() { // 현재 로그인한 사용자의 이름
      return this.$store.state.account.name
    }
  },
  methods: {
    getLastSevenDays() { // 최근 7일간의 날짜 리턴
      const dates = [];
      for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        dates.push(date.toISOString().split('T')[0]);
      }
      return dates;
    },
    countPostsByDate(allPosts) { // 특정 날짜에 사용자가 작성한 게시글 수 리턴
      const counts = {};
      for (const date of this.lastSevenDays) {
        counts[date] = allPosts.filter(post => this.formatDate(post.year, post.month, post.day) === date).length;
      }
      return counts;
    },
    formatDate(year, month, day) {
      return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    }
  },
  created() {
    this.lastSevenDays = this.getLastSevenDays();

    // 로그인한 사용자의 이름과 작성자가 동일한 게시글 탐색
    this.$http.get(`/api/boardlist/writer/${this.userName}`)
      .then(response => {
        const userPosts = response.data;
        this.userPosts = userPosts
          .sort((a, b) => b.id - a.id)
          .slice(0, 5);
        this.postCountByDate = this.countPostsByDate(userPosts);
      })
      .catch(error => {
        console.log("userpost error", error);
      });
  }
}
</script>

<style scoped>
  .useractive, .userpost {
    text-align: center; /* 텍스트 가운데 정렬 */
  }

  .useractive table, .userpost table {
    margin: auto; /* 테이블 가운데 정렬 */
    border-collapse: collapse; /* 테두리 겹치기 */
  }

  .useractive th, .useractive td,
  .userpost th, .userpost td {
    border: 1px solid #ddd; /* 셀 테두리 */
    padding: 8px; /* 셀 내부 여백 */
  }

  .useractive th, .userpost th {
    background-color: #f2f2f2; /* 헤더 배경색 */
  }

  .userpost a, .userpost a:visited {
    color: inherit; /* 링크 색상을 상위 요소와 동일하게 설정 */
    text-decoration: none; /* 밑줄 제거 */
  }

  .userpost a:hover {
    text-decoration: underline; /* 마우스 오버 시 밑줄 표시 */
  }

  .userpost .cell_title {
    padding-left: 10px; /* 왼쪽 여백 */
    padding-right: 10px; /* 오른쪽 여백 */
  }

</style>
