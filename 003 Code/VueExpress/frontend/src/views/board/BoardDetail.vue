<!--BoardDetail.vue-->
<template>
    <div>
        <h1>상세 내용</h1>
        <div class="container">
            <div class="outer">
                <div class="inner">
                    <strong>제목: {{ board.title }}</strong> - <i>작성자: {{ board.writer }}</i>
                            [{{ board.year }}.{{ board.month }}.{{ board.day }}]
                    <div class="centered">
                        <div class="border" id="lender">
                            <!-- 게시글 텍스트 내용 표시 -->
                            <div v-html="boardText"></div>
                            <!-- 게시글 내 이미지 동적 표시 -->
                            <img v-for="(img, index) in displayedImages" :key="index"
                                 :src="img.displaySrc" @click="showOriginal($event, img.originalSrc)" 
                                 v-if="board.image_tag === 'warning'">
                        </div>
                        <v-btn class="mr-4" color="blue" @click="fnWrite" v-if="$store.state.account.id">수정 </v-btn>
                        <v-btn class="mr-4" color="red" @click="fndelete" v-if="$store.state.account.id">삭제 </v-btn>
                    </div>
                    <div class="comment" v-for="comment in comments" :key="comment.id">
                        <div class="list">
                            <li v-if="comment.id === board.id">
                                <strong>{{ comment.writer }}</strong> -
                                [{{ comment.year }}:{{ comment.month }}:{{ comment.day }}] : {{ comment.contents }}
                            </li>
                        </div>
                    </div>
                    <form method="post" @submit.stop.prevent="mySubmit">
                        <div class="write">
                            <p></p>
                            <label for="contents" v-if="$store.state.account.id">댓글 작성:</label>
                            <textarea input type="text" name="contents" cols="150" rows="3" required
                                v-model="comment_to_write.contents" class="form-control" style="resize: none;" v-if="$store.state.account.id"></textarea>
                            <div class="border" v-else>{{ "댓글을 작성하시려면 먼저 로그인 해주세요"}}</div>
                            <button type="submit" v-if="$store.state.account.id">댓글 등록</button>
                        </div>
                    </form>
                    <v-btn color="grey darken-2" @click="goBack_list">돌아가기</v-btn>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
export default {
    created: function () {
        var id = Number(this.$route.params.id);
        this.$http.get(`/api/boardlist/id/${id}`).then(response => {
            this.board = response.data[0];
        });
        this.$http.get(`/api/commentlist`).then(response => {
            this.comments = response.data;
        });
    },
    data: function () {
        return {
            board: {},
            comments: {},
            comment_to_write: {
                id: 0,
                writer: "",
                year: 0,
                month: 0,
                day: 0,
                contents: "",
            }
        };
    },
    computed: {
        boardText() {
            let div = document.createElement('div');
            div.innerHTML = this.board.contents;
            Array.from(div.querySelectorAll('img')).forEach(img => {
                img.remove();
            });
            return div.innerHTML;
        },
        displayedImages() {
            let div = document.createElement('div');
            div.innerHTML = this.board.contents;
            let imgs = div.querySelectorAll('img');
            return Array.from(imgs).map(img => {
                return {
                    originalSrc: img.src,
                    displaySrc: this.board.image_tag === 'warning' ? require('@/assets/blind_image_ksg.png') : img.src
                };
            });
        }
    },
    methods: {
        showOriginal(event, originalSrc) {
            if (event.target.src === originalSrc) return;
            if (confirm('유해한 이미지입니다. 정말 원본을 보시겠습니까?')) {
                event.target.src = originalSrc;
            }
        },
        mySubmit() {
            var id = this.$route.params.id;
            var today = new Date();

            var year = today.getFullYear();
            var month = ('0' + (today.getMonth() + 1)).slice(-2);
            var day = ('0' + today.getDate()).slice(-2);

            this.comment_to_write.year = year;
            this.comment_to_write.month = month;
            this.comment_to_write.day = day;
            this.comment_to_write.writer = "익명" 
            this.comment_to_write.id = id;

            this.$http.post("api/commentlist/upload", this.comment_to_write)
                .then(res => {
                    alert("댓글이 등록되었습니다.")
                })
                .catch(err => {
                    console.error('upload fail!');
                });

            this.$router.go(this.$router.currentRoute);
        },
        fndelete() {
            var id = this.$route.params.id;
            this.$http.delete(`/api/boardlist/id/${id}`, this.board)
                .then(res => {
                    alert("게시글이 삭제되었습니다.")
                })
        },
        goBack_list() {
            this.$router.push({ name: 'List' });
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
  text-align: left;
}
.centered {
  position: relative;
  display: contents;
  width: 50%;
  padding: 1em;
  font-size: 1em;
}
</style>
