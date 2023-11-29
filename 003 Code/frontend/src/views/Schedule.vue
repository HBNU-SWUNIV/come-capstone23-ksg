<template>
  <v-app>
    <v-row class="fill-height">
      <v-col>
        <v-sheet height="64">

          <v-toolbar flat>
            <v-btn outlined class="mr-4" color="grey darken-2" @click="setToday">
              Today
            </v-btn>
            <v-btn fab text small color="grey darken-2" @click="prev">
              <v-icon small>
                mdi-chevron-left
              </v-icon>
            </v-btn>
            <v-btn fab text small color="grey darken-2" @click="next">
              <v-icon small>
                mdi-chevron-right
              </v-icon>
            </v-btn>

            <v-toolbar-title v-if="$refs.calendar">
              {{ $refs.calendar.title }}
            </v-toolbar-title>


            <v-spacer></v-spacer>


            <v-dialog v-model="dialog" max-width="600px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn color="primary" dark v-bind="attrs" v-on="on">
                  일정추가
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="text-h5"></span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>

                      <v-col cols="12" sm="6">
                        <v-date-picker v-model="dates" range></v-date-picker>
                      </v-col>
                      <v-col cols="12" sm="6">
                      </v-col>

                      <v-col style="width: 350px; flex: 0 1 auto;">
                        <h2>Start:</h2>
                        <v-time-picker v-model="timer.starttime" format="24hr" :max="timer.endtime"></v-time-picker>
                      </v-col>
                      <v-col style="width: 350px; flex: 0 1 auto;">
                        <h2>End:</h2>
                        <v-time-picker v-model="timer.endtime" format="24hr" :min="timer.starttime"></v-time-picker>
                      </v-col>


                      <v-col cols="12">
                        <v-text-field label="일정 이름" v-model="scheduleplus.schedulename" required></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-autocomplete :items="['단기 일정', '장기 일정']" label="일정 타입" single></v-autocomplete>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="dialog = false">
                    Close
                  </v-btn>
                  <v-btn color="blue darken-1" text @click="submitschedule">
                    Save
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>



            <v-menu bottom right>
              <template v-slot:activator="{ on, attrs }">
                <v-btn outlined color="grey darken-2" v-bind="attrs" v-on="on">
                  <span>{{ typeToLabel[type] }}</span>
                  <v-icon right>
                    mdi-menu-down
                  </v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item @click="type = 'day'">
                  <v-list-item-title>Day</v-list-item-title>
                </v-list-item>
                <v-list-item @click="type = 'week'">
                  <v-list-item-title>Week</v-list-item-title>
                </v-list-item>
                <v-list-item @click="type = 'month'">
                  <v-list-item-title>Month</v-list-item-title>
                </v-list-item>
                <v-list-item @click="type = '4day'">
                  <v-list-item-title>4 days</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>


          </v-toolbar>
        </v-sheet>


        <v-sheet height="600">
          <v-calendar ref="calendar" v-model="focus" color="primary" :events="events" :event-color="getEventColor"
            :type="type" @click:event="showEvent" @click:more="viewDay" @click:date="viewDay"
            @change="updateRange"></v-calendar>



          <v-menu v-model="selectedOpen" :close-on-content-click="false" :activator="selectedElement" offset-x>
            <v-card color="grey lighten-4" min-width="300px" flat>

              <v-toolbar :color="selectedEvent.color" dark>
                <v-btn icon>
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon>
                  <v-icon>mdi-heart</v-icon>
                </v-btn>
                <v-btn icon @click="prev">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </v-toolbar>

              <v-card-text>
                <span v-html="selectedEvent.details"></span>
              </v-card-text>

              <v-card-actions>
                <v-btn text color="secondary" @click="selectedOpen = false">
                  Cancel
                </v-btn>

              </v-card-actions>
            </v-card>
          </v-menu>
        </v-sheet>
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
export default {

  data: () => ({
    focus: '',
    type: 'month',
    typeToLabel: {
      month: 'Month',
      week: 'Week',
      day: 'Day',
      '4day': '4 Days',
    },
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    events: [],
    schedules: [],
    colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
    names: ['미팅', '휴일', '면담', '가족여행', '행사', '수강', '강연', '모임'],
    dialog: false,

    scheduleplus: {
      schedulename: "",
      start: "",
      end: "",
      color: "black"
    },

    dates: [],
    timer: () => ({
      starttime: null,
      endtime: null
    })
  }),

  mounted() {
    this.$refs.calendar.checkChange()
  },
  methods: {
    viewDay({ date }) {
      this.focus = date
      this.type = 'day'
    },
    getEventColor(event) {
      return event.color
    },
    setToday() {
      this.focus = ''
    },
    prev() {
      this.$refs.calendar.prev()
    },
    next() {
      this.$refs.calendar.next()
    },
    showEvent({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event
        this.selectedElement = nativeEvent.target
        requestAnimationFrame(() => requestAnimationFrame(() => this.selectedOpen = true))
      }

      if (this.selectedOpen) {
        this.selectedOpen = false
        requestAnimationFrame(() => requestAnimationFrame(() => open()))
      } else {
        open()
      }

      nativeEvent.stopPropagation()
    },
    updateRange({}) {
      const events = [];

      this.$http.get("/api/schedulelist").then(response => {
        this.schedules = response.data;
        const allDay = this.rnd(0, 3) === 0

        for (let i = 0; i < this.schedules.length; i++) {

          console.log("진입함")
          const schedulename = this.schedules[i].schedulename;
          const first = new Date(this.schedules[i].start);
          const second = new Date(this.schedules[i].end);
          const currentcolor = this.schedules[i].color;

          events.push({
            name: schedulename,
            start: first,
            end: second,
            color: currentcolor,
            timed: !allDay,
          })

          console.log("name : " + schedulename)
          console.log("start : " + first)
          console.log("end : " + second)
          console.log("color : " + currentcolor)

        }
        this.events = events// 번호, 제목, 작성자, 등록일
      });
    },


    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a
    },

    /// 여기까지 기본 제공 예제


    submitschedule() {                      // 일정 추가 버튼 눌리면
      this.dialog = false;

      this.scheduleplus.start = this.dates[0] + "T" + this.timer.starttime + ":00"
      this.scheduleplus.end = this.dates[1] + "T" + this.timer.endtime + ":00"

      console.log(typeof (this.scheduleplus.start))
      console.log(this.scheduleplus.start)
      console.log(this.scheduleplus.schedulename)

      this.$http.post("api/schedulelist/upload", this.scheduleplus)
        .then(res => {
          console.log('upload success!');
        })
        .catch(err => {
          console.error('upload fali!');
        });

        this.$router.go(0);
    },
  },

}
</script>